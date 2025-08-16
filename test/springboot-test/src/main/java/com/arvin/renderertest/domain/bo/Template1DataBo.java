package com.arvin.renderertest.domain.bo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author arvin
 * @date 2025/05/14
 */
@Data
public class Template1DataBo implements Serializable {
	private static final long serialVersionUID = 892326197707013196L;

	private HeaderBo header;

	private List<BodyBo> body;

	private String note;

	private FooterBo footer;
}
