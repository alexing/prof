package com.Test.test;

import edu.uci.ics.crawler4j.crawler.CrawlConfig;
import edu.uci.ics.crawler4j.crawler.CrawlController;
import edu.uci.ics.crawler4j.fetcher.PageFetcher;
import edu.uci.ics.crawler4j.robotstxt.RobotstxtConfig;
import edu.uci.ics.crawler4j.robotstxt.RobotstxtServer;

public class Controller {
    public static void main(String[] args) throws Exception {
            String crawlStorageFolder = "/home/kunta/crawler";
            int numberOfCrawlers = 100;

            CrawlConfig config = new CrawlConfig();
            config.setCrawlStorageFolder(crawlStorageFolder);

            
            
//            config.setMaxDepthOfCrawling(10);
            config.setMaxConnectionsPerHost(1);
            config.setUserAgentString(" Googlebot/2.1 (+http://www.google.com/bot.html)");
//            config.setResumableCrawling(true);
//            config.setMaxTotalConnections(10);
//            config.setMaxPagesToFetch(100);
//            config.setConnectionTimeout(1000000);
            /*
             * Instantiate the controller for this crawl.
             */
            PageFetcher pageFetcher = new PageFetcher(config);
            RobotstxtConfig robotstxtConfig = new RobotstxtConfig();
            RobotstxtServer robotstxtServer = new RobotstxtServer(robotstxtConfig, pageFetcher);
            CrawlController controller = new CrawlController(config, pageFetcher, robotstxtServer);
            
            
            /*
             * For each crawl, you need to add some seed urls. These are the first
             * URLs that are fetched and then the crawler starts following links
             * which are found in these pages
             */                       
            
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/agricultura/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/automotores/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/comercios/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/comunicaciones/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/educacion/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/electrodomesticos/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/electrodomesticos/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/entretenimientos/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/envases/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/hogar/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/industria/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/marketing/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/medicina/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/organismos/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/profesionales/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/recreacion/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/servicios/c/");
    		controller.addSeed("http://www.paginasamarillas.com.ar/b/textil/c/");            
            
            

            /*
             * Start the crawl. This is a blocking operation, meaning that your code
             * will reach the line after this only when crawling is finished.
             */
            

            controller.start(MyCrawler.class, numberOfCrawlers);    
    }
}
