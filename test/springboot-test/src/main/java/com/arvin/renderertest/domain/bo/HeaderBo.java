package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class HeaderBo implements Serializable {
	private static final long serialVersionUID = 2123096858617082697L;

	private String logo;

	private DetailsBo details;
}
