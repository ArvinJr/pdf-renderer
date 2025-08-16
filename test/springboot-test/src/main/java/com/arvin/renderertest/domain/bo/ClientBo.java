package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class ClientBo implements Serializable {
	private static final long serialVersionUID = -3049320615340111164L;

	private String name;

	private Long phone;

	private String email;

	private String address;
}
