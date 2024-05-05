package com.idl.mnir.payload.response;

import java.util.List;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String first_name;
	private String family_name;
	private String email;
	private Long mobile;
	private List<String> roles;

	public JwtResponse(String accessToken, Long id, String first_name,String family_name, String email,Long mobile, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.first_name=first_name;
		this.family_name=family_name;
		this.email = email;
		this.mobile=mobile;
		this.roles = roles;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getFamily_name() {
		return family_name;
	}

	public void setFamily_name(String family_name) {
		this.family_name = family_name;
	}

	public Long getMobile() {
		return mobile;
	}

	public void setMobile(Long number) {
		this.mobile = number;
	}
}

