package com.Test.test;

import java.util.List;
import java.util.regex.Pattern;

import com.Dataminer.Main.Searchers;

import edu.uci.ics.crawler4j.crawler.Page;
import edu.uci.ics.crawler4j.crawler.WebCrawler;
import edu.uci.ics.crawler4j.parser.HtmlParseData;
import edu.uci.ics.crawler4j.url.WebURL;

public class MyCrawler extends WebCrawler {

    private final static Pattern FILTERS = Pattern.compile(".*(\\.(css|js|bmp|gif|jpe?g" 
                                                      + "|png|tiff?|mid|mp2|mp3|mp4"
                                                      + "|wav|avi|mov|mpeg|ram|m4v|pdf" 
                                                      + "|rm|smil|wmv|swf|wma|zip|rar|gz))$");

    /**
     * You should implement this function to specify whether
     * the given url should be crawled or not (based on your
     * crawling logic).
     */
    @Override
    public boolean shouldVisit(WebURL url) {   
            String href = url.getURL().toLowerCase();
            if (FILTERS.matcher(href).matches()) return false; 
            
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/agricultura/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/automotores/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/automotores/c/")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/comercios/c/")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/comunicaciones/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/educacion/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/electrodomesticos/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/electrodomesticos/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/entretenimientos /c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/envases/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/hogar/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/industria/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/marketing/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/medicina/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/organismos/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/profesionales/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/recreacion/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/servicios/c/")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/textil/c/")) return true;
      
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/agricultura/p-")) return true;            
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/automotores/p-")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/automotores/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/comercios/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/comunicaciones/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/educacion/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/electrodomesticos/p-")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/electrodomesticos/p-")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/entretenimientos/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/envases/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/hogar/p-")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/industria/p-")) return true;
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/marketing/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/medicina/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/organismos/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/profesionales/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/recreacion/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/servicios/p-")) return true; 
            if (href.startsWith("http://www.paginasamarillas.com.ar/b/textil/p-")) return true;                                                                                                                                                                                                                                                                                    
            return false;                                         
    }                                                             

    /**
     * This function is called when a page is fetched and ready 
     * to be processed by your program.
     */
    @Override
    public void visit(Page page) {    	
            String url = page.getWebURL().getURL();
            if (page.getParseData() instanceof HtmlParseData) {
                    HtmlParseData htmlParseData = (HtmlParseData) page.getParseData();
                    String text = htmlParseData.getText();
                    String html = htmlParseData.getHtml();
                    List<WebURL> links = htmlParseData.getOutgoingUrls();                    
                    Searchers.addCompanies(html);
            }
    }
    
    
}
