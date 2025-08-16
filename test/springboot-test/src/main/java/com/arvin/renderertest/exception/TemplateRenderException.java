package com.arvin.renderertest.exception;

/**
 * @author arvin
 * @date 2025/05/22
 */
public class TemplateRenderException extends RuntimeException {
	private static final long serialVersionUID = -2129772952272644110L;

	public TemplateRenderException(String message) {
		super(message);
	}

	public TemplateRenderException(String message, Throwable cause) {
		super(message, cause);
	}
}
