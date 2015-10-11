package com.Dataminer.DAO;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.LinkedList;

public class Companies {
	private static final long serialVersionUID = 1L;
    private static final long versionDeDatos = 1L;
    private final LinkedList<CompanyInfoDAO> companies;
	
    private Companies() {
    	companies = new LinkedList<CompanyInfoDAO>();
    }
                
    public static Companies getInstance() {
        return CompaniesHolder.INSTANCE;
    }
    
    private static class CompaniesHolder {

        private static final Companies INSTANCE = new Companies();
    }
    
    public LinkedList<CompanyInfoDAO> getCompanies() {
    	return companies;
    }
    
    public void guardar(String dir) {
    	ObjectOutputStream oos;
		try {
			oos = new ObjectOutputStream(new FileOutputStream(dir));
			oos.writeObject(this.companies);
			oos.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
    }
    
    public void cargar(String dir) {
    	this.companies.clear();
    	try {
			ObjectInputStream ois = new ObjectInputStream(new FileInputStream(dir));
			this.companies.addAll((LinkedList<CompanyInfoDAO>)ois.readObject());
			ois.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}    	
    }
}
