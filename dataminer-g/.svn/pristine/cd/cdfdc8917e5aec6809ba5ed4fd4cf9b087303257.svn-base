package com.Test.test;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
 
public class FacebookLogin {
 
private static final String PASWORD = "TonyStark2523641987";
private static final String USER = "martinixfavor@hotmail.com";
private static final String URL = "http://www.facebook.com/login.php";
private static WebDriver driver = null;
 
public static void main(String[] args) {
	
	String facebookusername=USER;
	String facebookpassword=PASWORD;
	
		driver = new FirefoxDriver();
		loginToFacebook(driver, facebookusername, facebookpassword);
	
	}

/**
 * @param facebookusername
 * @param facebookpassword
 */
private static void loginToFacebook(WebDriver driver, String facebookusername,
		String facebookpassword) {
	// Create a new instance of the Firefox driver
	 
	
	 
	driver.get(URL);
	 
		// Put an Implicit wait on driver
	 
	driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
 
	driver.findElement(By.id("email")).sendKeys(facebookusername);
	driver.findElement(By.id("pass")).sendKeys(facebookpassword);
	driver.findElement(By.name("login")).click();
}
}