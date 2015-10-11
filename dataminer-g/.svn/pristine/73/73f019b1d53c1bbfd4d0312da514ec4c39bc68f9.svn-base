package com.Dataminer.GoogleSearcher;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.Dataminer.DAO.CompanyInfoDAO;
import com.Dataminer.DAO.GoogleDAO;

public class GoogleSearcher {

	private static final String PASWORD = " ";
	private static final String USER = " ";
	private static final String URL = "http://www.google.es/advanced_search";
	private static final String URL2 = "https://www.google.com/search?q=";
	private static final String NPAGESXSEARCH = "&num=100";
	private static WebDriver driver = null;

	private static Pattern patternDomainName, facebookDomainName;
	private Matcher matcher;
	private Matcher matcherFB;

	private static final String GRAL_URL_DOMAIN = "(https?|http|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%?=~_|!:,.;]";

	private static final String FACEBOOK_DOMAIN = "(?:http://)?(?:www.)?"
			+ "facebook.com/(?:(?:\\W)*#!/)" + "?(?:pages/)?(?:[" + "?\\W"
			+ "\\-" + "]*/)?(?" + ":profile.php\\?id" + "=(\\d.*))?"
			+ "([\\W\\-]*)?";
	// ="/(?:http://)?(?:www\\.)?facebook\\"
	// + ".com/(?:(?:\\W)*#!/)?(?:pages/)"
	// + "?(?:[\\W\\-"
	// + "]*/)*("
	// + "[\\W\\"
	// + "-]*)/";
	static {
		facebookDomainName = Pattern.compile(FACEBOOK_DOMAIN);
		patternDomainName = Pattern.compile(GRAL_URL_DOMAIN);

	}
	private ArrayList<GoogleDAO> results;

	public GoogleSearcher() {

		results = new ArrayList<GoogleDAO>();
	}

	public ArrayList<GoogleDAO> search(String search) throws IOException {

		DesiredCapabilities capabilities = DesiredCapabilities.firefox();
		capabilities
				.setBrowserName("Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0");
		capabilities.setVersion("24.0");
		driver = new HtmlUnitDriver(capabilities);
		// DesiredCapabilities capabilities = DesiredCapabilities.firefox();
		// capabilities.setBrowserName("X11; Ubuntu; Linux i686; rv:34.0) Gecko/20100101 Firefox/34.0");
		// capabilities.setVersion("34.0");
		driver = new HtmlUnitDriver();

		driver.get("https://www.google.com.ar");

		driver.findElement(By.name("q")).sendKeys(search);
		driver.findElement(By.name("q")).submit();
		driver.findElement(By.name("q")).sendKeys(Keys.ESCAPE);

		// lo cambie para realize la busqueda el sellenium, no con la direccion
		// driver.get(URL2+search+NPAGESXSEARCH);

		// driver = new HtmlUnitDriver();
		//
		// driver.navigate().to("https://www.google.com.ar");

		String itext = driver.getPageSource();

		Document doc;

		doc = Jsoup.parse(itext);
		Elements links = doc.select("li[class=g]");
		for (Element link : links) {
			Elements titles = link.select("h3[class=r]");
			String title = titles.text();

			Elements bodies = link.select("span[class=st]");
			String body = bodies.text();

			Elements subLinksVerdeLista = link.select("cite");
			String subLinksVerde = subLinksVerdeLista.text();

			Elements linksToPages = link.select("h3[class=r]");
			Element aElement = linksToPages.select("a").first();
			String linkToPage = aElement.attr("href");

			if (linkToPage.startsWith("/url?q=")) {
				// use regex to get domain name
				if (linkToPage.contains("youtube")) {
					// TODO; Validar que el link este completo y no con puntos
					// suspensivos
					linkToPage = subLinksVerde;

				} else {
					linkToPage = getDomainName(linkToPage);
				}

				if (!linkToPage.startsWith("http")) {
					linkToPage = "http://" + linkToPage;
				}
				if (linkToPage.endsWith("pdf") || linkToPage.endsWith("mp3")) {
					linkToPage = "http://www.google.com.ar";

				}
				linkToPage = linkToPage.replaceAll("\\s+", "");
			}
			linkToPage = linkToPage.replaceAll("\\s+", "");
			// http://www.wherevent.com/detail/Sam-Romano-Curso-Argentina-Pivot-Point-e-Llongueras

			GoogleDAO istResult = new GoogleDAO();
			istResult.setTitle(title);
			istResult.setDescription(body);
			istResult.setUrl(linkToPage);
			results.add(istResult);
		}

		return results;
	}

	public String getFirstUrl(String search) {
		driver = new HtmlUnitDriver();
		driver.get(URL2 + search + NPAGESXSEARCH);

		String itext = driver.getPageSource();

		Document doc;
		String linkToPage = "";
		doc = Jsoup.parse(itext);
		Elements links = doc.select("li[class=g]");
		for (Element link : links) {
			Elements titles = link.select("h3[class=r]");
			String title = titles.text();

			Elements bodies = link.select("span[class=st]");
			String body = bodies.text();

			Elements subLinksVerdeLista = link.select("cite");
			String subLinksVerde = subLinksVerdeLista.text();

			Elements linksToPages = link.select("h3[class=r]");
			Element aElement = linksToPages.select("a").first();
			linkToPage = aElement.attr("href");

			if (linkToPage.startsWith("/url?q=")) {
				// use regex to get domain name
				if (linkToPage.contains("youtube")) {
					// TODO; Validar que el link este completo y no con puntos
					// suspensivos
					linkToPage = subLinksVerde;

				} else {
					linkToPage = getDomainNameCaseSensitive(linkToPage);
				}

				if (!linkToPage.startsWith("http")) {
					linkToPage = "http://" + linkToPage;
				}
				if (linkToPage.endsWith("pdf") || linkToPage.endsWith("mp3")) {
					linkToPage = "http://www.google.com.ar";

				}
				linkToPage = linkToPage.replaceAll("\\s+", "");
			}
			linkToPage = linkToPage.replaceAll("\\s+", "");
			// http://www.wherevent.com/detail/Sam-Romano-Curso-Argentina-Pivot-Point-e-Llongueras

			break;

		}

		return linkToPage;
	}

	public String getDomainName(String url) {

		String domainName = "";
		matcher = patternDomainName.matcher(url);
		matcherFB = facebookDomainName.matcher(url);
		if (url.contains("facebook")) {
			domainName = StringUtils.substringBefore(url, "&");
			matcher = patternDomainName.matcher(domainName);
			matcher.find();
			domainName = matcher.group(0).toLowerCase().trim();
		} else if (url.contains("youtube")) {

		} else if (url.endsWith("pdf") || url.endsWith("mp3")) {
			domainName = "http://www.google.com.ar";
		}

		else if (matcher.find()) {
			domainName = StringUtils.substringBefore(url, "&");
			matcher = patternDomainName.matcher(domainName);
			matcher.find();
			domainName = matcher.group(0).toLowerCase().trim();

		}
		return domainName;

	}

	public String getDomainNameCaseSensitive(String url) {
		String domainName = "";

		if (matcher.find()) {
			domainName = StringUtils.substringBefore(url, "&");
			matcher = patternDomainName.matcher(domainName);
			matcher.find();
			domainName = matcher.group(0).trim();

		}
		return domainName;

	}

	// TODO probar phantomJS o ocultar pantalla firefox
	public static CompanyInfoDAO getCompanyData(String name)
			throws InterruptedException {
		Document doc = null;

		driver = new FirefoxDriver();

		driver.get(URL2 + name + NPAGESXSEARCH);

		// JavascriptExecutor js = (JavascriptExecutor) driver;
		// String mainURL = (String)
		// js.executeScript("return productObj.mainURL");
		String itext = driver.getPageSource();

		doc = Jsoup.parse(itext);

		CompanyInfoDAO companyInfoDAO = new CompanyInfoDAO();
		Iterator<Element> it = doc.select("div[class=_mr]").select("span")
				.iterator();

		while (it.hasNext()) {
			// TODO aca se puede agregar si aparecen mas datos o de forma
			// distinta
			String aux = it.next().text();
			if (aux.equalsIgnoreCase("Dirección:")) {
				String auxAddress = it.next().text();
				companyInfoDAO.setStreetAddress(auxAddress.substring(0,
						auxAddress.indexOf(",")));
				companyInfoDAO.setAddressLocality(auxAddress.substring(
						auxAddress.indexOf(",") + 2, auxAddress.length()));
			} else if (aux.equalsIgnoreCase("Teléfono:")) {
				companyInfoDAO.setTelephone(it.next().text());
			} else if (aux.equalsIgnoreCase("Atención al cliente")) {
				companyInfoDAO.setTelephone(it.next().text());
			}
		}
		// driver.close();
		return companyInfoDAO;
	}

}