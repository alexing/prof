package com.Dataminer.Main;

import java.io.IOException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import com.Dataminer.DAO.Companies;
import com.Dataminer.DAO.CompanyInfoDAO;

public class Searchers {

	
	/**
	 * Realizar la busqueda utilizando sellenium y javascript, no logre que ande
	 * con el HtmlUnitDriver.
	 * 
	 * @param search
	 * @param numberOfPages
	 * @deprecated
	 */
	public static void googleSearch(String search, int numberOfPages) {
		// final WebDriver driver = new HtmlUnitDriver(true);
		final WebDriver driver = new FirefoxDriver();

		driver.get("https://www.google.com.ar");

		driver.findElement(By.name("q")).sendKeys(search);
		driver.findElement(By.name("q")).submit();
		driver.findElement(By.name("q")).sendKeys(Keys.ESCAPE);

		String itext = driver.getPageSource();

		driver.close();

		Document doc;

		doc = Jsoup.parse(itext);

		List<WebElement> listOfAddress = driver.findElements(By
				.cssSelector("a[href]"));
		System.out.println(listOfAddress.size());
		for (WebElement Address : listOfAddress) {
			System.out.println(Address.getText());
		}

	}

	/**
	 * no funciona, intento para realizar la busqueda en paginas amarillas con
	 * sellenium (javascript)
	 * 
	 * @deprecated
	 * @param search
	 * @param numberOfPages
	 */
	public static void yelowPaperSearchSellenium(String search,
			int numberOfPages) {
		final HtmlUnitDriver driver = new HtmlUnitDriver();

		driver.get("http://www.paginasamarillas.com.ar/");

		driver.findElement(By.id("keyword")).sendKeys(search);
		driver.findElement(By.id("locality")).sendKeys("Argentina");
		driver.findElement(By.id("buscar")).click();

		System.out.println(driver.getPageSource());
		// address extraction
		List<WebElement> listOfAddress = driver.findElements(By
				.className("m-results-business--see-phone"));
		for (WebElement Address : listOfAddress) {
			System.out.println(Address.getText());
		}

		// phone extraction
		// List<WebElement> listOfPhone =
		// driver.findElements(By.className("m-results-business--address"));
		List<WebElement> listOfPhone = driver.findElements(By
				.cssSelector("span[itemprop=telephone]"));
		for (WebElement phone : listOfPhone) {
			System.out.println(phone.getText());
		}

		driver.close();

	}

	/**
	 * extrae la ciudad y el telefono de la compania, falta testear en caso de
	 * espacios y agregar cuando hay mas paginas.
	 * 
	 * @param company
	 *            nombre de la compania a buscar
	 */
	public static void yellowPaperSearch(String company) {
		Document doc = null;
		try {
			doc = Jsoup
					.connect(
							"http://www.paginasamarillas.com.ar/buscar/argentina/q/"
									+ company).userAgent("Mozilla")
					.ignoreHttpErrors(true).timeout(3000).get();

			// doc = Jsoup.connect("http://www.paginasamarillas.com.ar/")
			// .userAgent("Mozilla")
			// .timeout(20000)
			// .data("word","Playboy")
			// .data("locality", "Argentina")
			// .post();
			//
			// Connection connection =
			// Jsoup.connect("http://www.paginasamarillas.com.ar/");
			// connection.data("word", "playboy");
			// connection.data("locality", "Argentina");
			// connection.post();
			// doc = connection.get();

			Elements linkLocality = doc
					.select("span[itemprop=addressLocality]");

			for (Element link : linkLocality) {
				System.out.println("\nlink : " + link.attr("href"));
				System.out.println("text : " + link.text());
			}

			Elements linkPhoneNumber = doc.select("span[itemprop=telephone]");
			for (Element link : linkPhoneNumber) {
				System.out.println("\nlink : " + link.attr("href"));
				System.out.println("text : " + link.text());
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * obtiene las categorias de las paginas amarillas, nombre y enlace
	 * 
	 * @return
	 */
	public static List<Link> getCategorias() {
		LinkedList<Link> links = new LinkedList<Link>();
		Document doc = null;
		try {
			doc = Jsoup.connect("http://www.paginasamarillas.com.ar")
					.userAgent("Mozilla").ignoreHttpErrors(true).timeout(3000)
					.get();
			for (Element categoria : doc.select("div[class=span-8 last]")
					.select("a")) {
				links.add(new Link(categoria.text(), categoria.attr("href")));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return links;

	}

	public static int getNumberOfPagesOfYellowPage(String initialAddress) {
		Document doc = null;
		try {
			doc = Jsoup.connect(initialAddress).get();
			Pattern p = Pattern.compile("-?\\d+");
			Matcher m = p.matcher(doc.select("span[class=m-header--count]")
					.text());
			m.find();
			int auxInt = Integer.parseInt(m.group());
			if (auxInt <= 25) {
				return 1;
			} else
				return (int) Math.ceil(auxInt / 25.0);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @deprecated
	 * @param address
	 * @return
	 */
	public static List<CompanyInfoDAO> getPage(String address) {
		int numberOfPages = Searchers.getNumberOfPagesOfYellowPage(address);
		LinkedList<CompanyInfoDAO> companies = new LinkedList<CompanyInfoDAO>();
		Document doc = null;
		try {
			for (int i = 1; i <= numberOfPages; i++) {
				String auxAddress = address + "p-" + i + "/";
				doc = Jsoup.connect(auxAddress).ignoreHttpErrors(true)
						.timeout(0).get();
				for (Element company : doc
						.select("li[class],[ m-results-business ]")) {
					CompanyInfoDAO companyInfoDAO = new CompanyInfoDAO();
					String aux = company
							.select("div[class],m-results-business-header")
							.select("h3[class],m-results-business--name")
							.text();
					if (!aux.isEmpty()) {
						try {
							aux = aux.substring(0,
									aux.indexOf("Información adicional sobre"));
						} catch (StringIndexOutOfBoundsException e) {
						}
						companyInfoDAO.setCompanyName(aux);
					}
					aux = company.select("span[itemprop=addressLocality]")
							.text();
					if (!aux.isEmpty()) {
						companyInfoDAO.setAddressLocality(aux);
					}
					aux = company.select("span[itemprop=streetAddress]").text();
					if (!aux.isEmpty()) {
						companyInfoDAO.setStreetAddress(aux);
					}
					aux = company
							.select("dl[class=m-results-business--online]")
							.text();
					if (!aux.isEmpty()) {
						aux = aux.substring(8, aux.length());
						companyInfoDAO.setWebpage(aux);
					}
					aux = company.select("span[itemprop=telephone]").text();
					if (!aux.isEmpty()) {
						companyInfoDAO.setTelephone(aux);
					}
					if ((companyInfoDAO.getCompanyName() != null)
							&& (!companies.contains(companyInfoDAO))) {
						companies.add(companyInfoDAO);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return companies;
	}
	
	public static void addCompanies(String htmlCode) {
		Document doc = Jsoup.parse(htmlCode);
		
		for (Element company : doc
				.select("li[class],[ m-results-business ]")) {
			CompanyInfoDAO companyInfoDAO = new CompanyInfoDAO();
			String aux = company
					.select("div[class],m-results-business-header")
					.select("h3[class],m-results-business--name")
					.text();
			if (!aux.isEmpty()) {
				try {
					aux = aux.substring(0,
							aux.indexOf("Información adicional sobre"));
				} catch (StringIndexOutOfBoundsException e) {
				}
				companyInfoDAO.setCompanyName(aux);
			}
			aux = company.select("span[itemprop=addressLocality]")
					.text();
			if (!aux.isEmpty()) {
				companyInfoDAO.setAddressLocality(aux);
			}
			aux = company.select("span[itemprop=streetAddress]").text();
			if (!aux.isEmpty()) {
				companyInfoDAO.setStreetAddress(aux);
			}
			aux = company
					.select("dl[class=m-results-business--online]")
					.text();
			if (!aux.isEmpty()) {
				aux = aux.substring(8, aux.length());
				companyInfoDAO.setWebpage(aux);
			}
			aux = company.select("span[itemprop=telephone]").text();
			if (!aux.isEmpty()) {
				companyInfoDAO.setTelephone(aux);
			}
			if ((companyInfoDAO.getCompanyName() != null)  
					&& (!Companies.getInstance().getCompanies().contains(companyInfoDAO))) {
				Companies.getInstance().getCompanies().add(companyInfoDAO);
			}
		}
	}

}
