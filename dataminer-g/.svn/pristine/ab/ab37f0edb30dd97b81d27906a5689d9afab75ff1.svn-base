package com.Dataminer.DAO;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

public class CompanyInfoDAO implements Comparable, Externalizable {
	private static final long serialVersionUID = 1L;
	private static final long versionDeDatos = 1L;

	private String businessName;
	private String email;
	private String webpage;
	private String streetAddress;
	private String addressLocality;
	private String telephone;
	private String comments;

	public CompanyInfoDAO() {
	}

	public CompanyInfoDAO(String companyName, String email, String webpage,
			String streetAddress, String telephone, String comments) {
		super();
		this.businessName = companyName;
		this.email = email;
		this.webpage = webpage;
		this.streetAddress = streetAddress;
		this.telephone = telephone;
		this.comments = comments;
	}

	public String getCompanyName() {
		return businessName;
	}

	public void setCompanyName(String companyName) {
		this.businessName = companyName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public String getWebpage() {
		return webpage;
	}

	public void setWebpage(String webpage) {
		this.webpage = webpage;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getAddressLocality() {
		return addressLocality;
	}

	public void setAddressLocality(String addressLocality) {
		this.addressLocality = addressLocality;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	@Override
	public String toString() {
		return "CompanyInfoDAO [businessName=" + businessName + ", email="
				+ email + ", webpage=" + webpage + ", streetAddress="
				+ streetAddress + ", addressLocality=" + addressLocality
				+ ", telephone=" + telephone + ", comments=" + comments + "]";
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		return this.businessName.equals(((CompanyInfoDAO) obj).businessName);
	}

	@Override
	public int compareTo(Object o) {
		CompanyInfoDAO persona = (CompanyInfoDAO) o;

		return this.businessName.compareToIgnoreCase(persona.businessName);

	}

	@Override
	public void writeExternal(ObjectOutput out) throws IOException {
		out.writeObject(CompanyInfoDAO.versionDeDatos);
		out.writeObject(this.businessName);
		out.writeObject(this.email);
		out.writeObject(this.webpage);
		out.writeObject(this.streetAddress);
		out.writeObject(this.addressLocality);
		out.writeObject(this.telephone);
		out.writeObject(this.comments);
	}

	@Override
	public void readExternal(ObjectInput in) throws IOException,
			ClassNotFoundException {
		try {
			long versionDatos = (long) in.readObject();
			if (versionDatos == CompanyInfoDAO.versionDeDatos) {
				this.businessName = (String) in.readObject();
				this.email = (String) in.readObject();
				this.webpage = (String) in.readObject();
				this.streetAddress = (String) in.readObject();
				this.addressLocality = (String) in.readObject();
				this.telephone = (String) in.readObject();
				this.comments = (String) in.readObject();

			}
		} catch (ClassNotFoundException ex) {
		} catch (IOException ex) {
		}

	}

}
