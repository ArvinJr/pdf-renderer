package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class BodyBo implements Serializable {
	private static final long serialVersionUID = 7862793593528263069L;

	private String description;

	// 特殊类型
	private String price;

	// 特殊类型
	private String quantity;
}
