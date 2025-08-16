package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class FooterBo implements Serializable {
	private static final long serialVersionUID = -3407345815367336228L;

	private String name;

	private String address;

	private String website;

	private String email;

	private Long phone;
}
