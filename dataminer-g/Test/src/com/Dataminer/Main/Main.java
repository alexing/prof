package com.Dataminer.Main;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import net.javacoding.jspider.JSpider;

import org.jsoup.Jsoup;

import com.Dataminer.DAO.Companies;
import com.Dataminer.DAO.CompanyInfoDAO;
import com.Dataminer.DAO.GoogleDAO;
import com.Dataminer.ExtractUtils.EmailExtractor;
import com.Test.test.Controller;
import com.Test.test.MyCrawler;
import com.Test.test.MySQLAccess;

public class Main {

	public static void main(String[] args) throws IOException,
			InterruptedException, ClassNotFoundException, SQLException {	
		
		try {
			Controller.main(null);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		Collections.sort(Companies.getInstance().getCompanies());		
		Companies.getInstance().guardar("companies.dat");
		MySQLAccess dao = new MySQLAccess();

		for (CompanyInfoDAO link : Companies.getInstance().getCompanies()) {
			dao.insertIntoDataBase(link);
		}		
		
		
//		LinkedList<String> categorias = new LinkedList();

//		categorias.add("http://www.paginasamarillas.com.ar/b/agricultura/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/automotores/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/comercios/c/");
//		categorias
//				.add("http://www.paginasamarillas.com.ar/b/comunicaciones/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/educacion/c/");
//		categorias
//				.add("http://www.paginasamarillas.com.ar/b/electrodomesticos/c/");
//		categorias
//				.add("http://www.paginasamarillas.com.ar/b/electrodomesticos/c/");
//		categorias
//				.add("http://www.paginasamarillas.com.ar/b/entretenimientos/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/envases/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/hogar/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/industria/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/marketing/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/medicina/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/organismos/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/profesionales/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/recreacion/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/servicios/c/");
//		categorias.add("http://www.paginasamarillas.com.ar/b/textil/c/");
		
		
		
		
//		List<CompanyInfoDAO> companies = new LinkedList();
//		for (String categoria : categorias) {
//			companies = Searchers.getPage(categoria);
//		}



		// for (String categoria : categorias) {
		// List<CompanyInfoDAO> companies = Searchers.getPage(categoria);
		// for (CompanyInfoDAO link : companies) {
		// System.out.println(link.toString());
		// }
		// }

		// System.out.println(GoogleSearcher.getCompanyData("Pivot Point"));

		// toma los datos de las companias de paginas amarillas
		// LinkedList<Link> categorias = (LinkedList<Link>)
		// Searchers.getCategorias();
		// List<CompanyInfoDAO> companies =
		// Searchers.getPage(categorias.getFirst().direccion);

		// Searchers.yellowPaperSearch("Accenture");
		//
		// /**
		// * Esta porcion del main realiza la busqueda en Google del sitio que
		// deseemos
		// */
		// ArrayList<GoogleDAO> result;
		// GoogleSearcher searcher= new GoogleSearcher();
		// result=searcher.search("pivot point Argentina");
		// informationViewer(result);

		// /**
		// * Version de prueba Para testear mineria en archivos
		// */
		// //****************************************************************************//
		// File input = new File("../tmp/input.html");
		// Document doc = Jsoup.parse(input, "UTF-8", "http://example.com/");
		// //***************************************************************************//
		//
		// //Formateo a html puro, se elimina codigo javascript
		// String unsafe = doc.html();
		// String safe = Jsoup.clean(unsafe, Whitelist.basic());
		// System.out.println(safe);
		//
		// //En los sitios que contengan direccion de Email se le extrae
		// //TODO:Implementacion Multihilo con Crawler
		// String html=safe;
		// EmailExtractor emailE= new EmailExtractor(html);
		// String s= emailE.findeFirstEmail();
		// System.out.println(s);
	}

	/**
	 * @param imprime
	 *            resultados de busqueda en google por consola TODO: Tiene
	 *            acoplada la busqueda de Emails esto no es correcto, se debe
	 *            desacoplar.
	 */
	private static void informationViewer(ArrayList<GoogleDAO> result) {

		for (GoogleDAO istResult : result) {

			System.out.println(istResult.getTitle());

			System.out.println(istResult.getDescription());

			System.out.println(istResult.getUrl());
			String html;
			try {
				html = Jsoup.connect(istResult.getUrl()).get().html();
				InputStream is = new ByteArrayInputStream(html.toString()
						.getBytes());
				EmailExtractor emailE = new EmailExtractor(is);
				ArrayList<String> s = emailE.findMails();
				if (s.size() > 0) {

					System.out.println(s.get(0));
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			System.out.println();
			//
		}

	}
}