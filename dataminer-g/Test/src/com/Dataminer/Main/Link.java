package com.Dataminer.Main;

public class Link {
	/**
	 * encapsulados los enlaces de la web
	 */
	public String texto;
	public String direccion;

	public Link(String texto, String direccion) {
		this.texto = texto;
		this.direccion = direccion;
	}

	public Link(String texto) {
		this.texto = texto;
		this.direccion = "";
	}

	@Override
	public String toString() {
		return "Link [texto=" + texto + ", direccion=" + direccion + "]";
	}

}
