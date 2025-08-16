package com.arvin.renderertest.convertor;

import com.arvin.grpc.TemplateProto;
import com.arvin.renderertest.domain.bo.*;

import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author arvin
 * @date 2025/05/14
 */
public class ConvertTemplate1Bo2Proto {

	public static TemplateProto.Template1Data convertDto(Template1DataBo bo) {
		final TemplateProto.Template1Data.Builder builder = TemplateProto.Template1Data.newBuilder();
		Optional.ofNullable(bo.getHeader()).ifPresent(header -> builder.setHeader(convertHeader(header)));
		builder.addAllBody(bo.getBody().stream().map(ConvertTemplate1Bo2Proto::convertBody).collect(Collectors.toList()));
		Optional.ofNullable(bo.getNote()).ifPresent(builder::setNote);
		Optional.ofNullable(bo.getFooter()).ifPresent(footer -> builder.setFooter(convertFooter(footer)));
		return builder.build();
	}

	private static TemplateProto.Footer convertFooter(FooterBo bo) {
		return TemplateProto.Footer.newBuilder()
				.setName(bo.getName())
				.setAddress(bo.getAddress())
				.setWebsite(bo.getWebsite())
				.setEmail(bo.getEmail())
				.setPhone(bo.getPhone())
				.build();
	}

	private static TemplateProto.Body convertBody(BodyBo bo) {
		return TemplateProto.Body.newBuilder()
				.setDescription(bo.getDescription())
				.setPrice(Double.parseDouble(bo.getPrice()))
				.setQuantity(Double.parseDouble(bo.getQuantity()))
				.build();
	}

	private static TemplateProto.Header convertHeader(HeaderBo bo) {
		final TemplateProto.Header.Builder builder = TemplateProto.Header.newBuilder();
		Optional.ofNullable(bo.getLogo()).ifPresent(builder::setLogo);
		Optional.ofNullable(bo.getDetails()).ifPresent(details -> builder.setDetails(convertDetails(details)));
		return builder.build();
	}

	private static TemplateProto.Details convertDetails(DetailsBo bo) {
		return TemplateProto.Details.newBuilder()
				.setName(bo.getName())
				.setInvoice(convertInvoice(bo.getInvoice()))
				.setClient(convertClient(bo.getClient()))
				.build();
	}

	private static TemplateProto.Client convertClient(ClientBo bo) {
		return TemplateProto.Client.newBuilder()
				.setName(bo.getName())
				.setPhone(bo.getPhone())
				.setEmail(bo.getEmail())
				.setAddress(bo.getAddress())
				.build();
	}

	private static TemplateProto.Invoice convertInvoice(InvoiceBo bo) {
		return TemplateProto.Invoice.newBuilder()
				.setNo(bo.getNo())
				.setDate(bo.getDate())
				.build();
	}
}
