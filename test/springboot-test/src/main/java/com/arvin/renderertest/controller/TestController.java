package com.arvin.renderertest.controller;

import com.arvin.grpc.StaticTemplateServiceGrpc;
import com.arvin.grpc.TemplateProto;
import com.arvin.renderertest.convertor.ConvertTemplate1Bo2Proto;
import com.arvin.renderertest.domain.bo.Template1DataBo;
import com.arvin.renderertest.exception.TemplateRenderException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author arvin
 * @date 2025/05/22
 */
@RestController
@Slf4j
@RequiredArgsConstructor
public class TestController {

	private final ObjectMapper objectMapper;

	@GrpcClient("GLOBAL")
	private StaticTemplateServiceGrpc.StaticTemplateServiceStub stub;

	@GetMapping("/download")
	public ResponseEntity<ResponseBodyEmitter> downloadPdf() {
		// 模拟后端生成数据
		final ClassPathResource resource = new ClassPathResource("data/template1.json");
		Template1DataBo bo;
		try (InputStream inputStream = resource.getInputStream()) {
			bo = objectMapper.readValue(inputStream, Template1DataBo.class);
		} catch (IOException e) {
			throw new TemplateRenderException("json解析错误！", e);
		}
		final TemplateProto.Template1Data data = ConvertTemplate1Bo2Proto.convertDto(bo);

		final ResponseBodyEmitter emitter = new ResponseBodyEmitter(10_000L);
		emitter.onTimeout(() -> {
			emitter.completeWithError(new TemplateRenderException("grpc 调用超时！"));
		});

		final AtomicInteger chunkCount = new AtomicInteger();
		final AtomicInteger chunkCount4Check = new AtomicInteger();

		CompletableFuture.runAsync(() -> {
			stub.template2(data, new StreamObserver<TemplateProto.PdfStream>() {
				@Override
				public void onNext(TemplateProto.PdfStream value) {
					// 接收总切片数
					if (value.hasCount()) {
						chunkCount4Check.set(value.getCount());
						return;
					}

					// 接收切片
					try {
						final byte[] chunk = value.getChunk().toByteArray();
						log.info("接收chunk大小：{}", chunk.length);
						emitter.send(chunk);
						chunkCount.incrementAndGet();
					} catch (IOException e) {
						emitter.completeWithError(new TemplateRenderException("接收chunk失败！", e));
					}
				}

				@Override
				public void onError(Throwable t) {
					emitter.completeWithError(new TemplateRenderException("grpc 接收错误！", t));
				}

				@Override
				public void onCompleted() {
					log.info("grpc 接收完成！");
					if (chunkCount.get() != chunkCount4Check.get()) {
						emitter.completeWithError(new TemplateRenderException("切片数不一致！预期 " + chunkCount4Check.get()
								+ " 个，实际 " + chunkCount.get() + " 个"));
					} else {
						emitter.complete();
					}
				}
			});
		}).exceptionally(error -> {
			emitter.completeWithError(new TemplateRenderException("grpc 调用异常！", error));
			return null;
		});

		final HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(
				ContentDisposition.attachment()
						.filename("template.pdf") // TODO 改成动态生成
						.build()
		);
		return ResponseEntity.ok()
				.headers(headers)
				.body(emitter);
	}

}
