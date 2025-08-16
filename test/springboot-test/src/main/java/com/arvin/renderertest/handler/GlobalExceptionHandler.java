package com.arvin.renderertest.handler;

import com.arvin.renderertest.exception.TemplateRenderException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * @author arvin
 * @date 2025/05/22
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler(TemplateRenderException.class)
	public Map<String, String> handleTemplateRenderException(TemplateRenderException e) {
		log.error("pdf生成异常", e);
		final Map<String, String> map = new HashMap<>();
		map.put("code", "500");
		map.put("message", "pdf生成异常");
		return map;
	}

}
