package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class DetailsBo implements Serializable {
	private static final long serialVersionUID = 7056964069249146590L;

	private String name;

	private InvoiceBo invoice;

	private ClientBo client;
}
