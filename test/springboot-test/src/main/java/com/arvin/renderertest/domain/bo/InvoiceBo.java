package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class InvoiceBo implements Serializable {
	private static final long serialVersionUID = 9161666863362905399L;

	private String no;
	
	private String date;
}
