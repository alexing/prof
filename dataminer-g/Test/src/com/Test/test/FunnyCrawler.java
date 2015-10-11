package com.Test.test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.Dataminer.DAO.GoogleDAO;
import com.Dataminer.ExtractUtils.EmailExtractor;
 
public class FunnyCrawler {
 
  private static Pattern patternDomainName;
  private Matcher matcher;
  private static final String DOMAIN_NAME_PATTERN 
	= "([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}";
  static {
	patternDomainName = Pattern.compile(DOMAIN_NAME_PATTERN);
  }
 
  
  private static void informationViewer(Set<GoogleDAO> result) throws IOException{
		
		for( GoogleDAO istResult: result){
			
			System.out.println(istResult.getTitle());
	
			System.out.println(istResult.getDescription());
	
			System.out.println(istResult.getUrl());
			
			InputStream is = new ByteArrayInputStream(Jsoup.connect(istResult.getUrl()).get().html().toString().getBytes());
			EmailExtractor emailE= new EmailExtractor(is);
			ArrayList<String> s= emailE.findMails();
			if(s.size()>0){
				
				System.out.println(s.get(0));
			}
			System.out.println();
			
		}

	}
  public static void main(String[] args) throws IOException {
 
	FunnyCrawler obj = new FunnyCrawler();
	Set<GoogleDAO> result = obj.getDataFromGoogle("mario");
	
	informationViewer(result);
  }
 
  public String getDomainName(String url){
 
	String domainName = "";
	matcher = patternDomainName.matcher(url);
	if (matcher.find()) {
		domainName = matcher.group(0).toLowerCase().trim();
	}
	return domainName;
 
  }
 
  private Set<GoogleDAO> getDataFromGoogle(String query) {
 
	Set<GoogleDAO> result = new HashSet<GoogleDAO>();	
	String request = "https://www.google.com/search?q=" + query + "&num=100";
	System.out.println("Sending request..." + request);
 
	try {
 
		// need http protocol, set this as a Google bot agent :)
		Document doc = Jsoup
			.connect(request)
			.userAgent(
			  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")
			.timeout(5000).get();
 
		// get all links
		
//		
//		Elements links = doc.select("a[href]");
//		for (Element link : links) {
		Elements dataByResultList = doc.select("li[class=g]");
		for (Element dataByResult : dataByResultList) {

		    GoogleDAO istResult= new GoogleDAO();
		
			
			
		    Elements titles = dataByResult.select("h3[class=r]");
		    String title = titles.text();

		    Elements bodies = dataByResult.select("span[class=st]");
		    String body = bodies.text();
		    
			Elements linksPerResultList = dataByResult.select("a[href]");
			String urlLink="";

			
			
				String temp = linksPerResultList.get(0).attr("href");	
				
				if(temp.startsWith("/url?q=")){
	                                //use regex to get domain name
					 urlLink = getDomainName(temp);
				}
				if(!urlLink.startsWith("http")){
					urlLink="http://"+urlLink;
			    }
				urlLink= urlLink.replaceAll("\\s+","");
				
				  	
			
			istResult.setTitle(title);
		    istResult.setDescription(body);
		    istResult.setUrl(urlLink);
		    urlLink="";
			result.add(istResult);
		}
 
	} catch (IOException e) {
		e.printStackTrace();
	}
 
	return result;
  }
 
}