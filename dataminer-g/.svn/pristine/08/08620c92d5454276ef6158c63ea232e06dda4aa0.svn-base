package com.Dataminer.ExtractUtils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Whitelist;

public class EmailExtractor {

	public ArrayList<String> emailList = new ArrayList<String>(30);
	private InputStream inStream;

	public EmailExtractor(InputStream inStream) {
		this.inStream = inStream;
	}

	public EmailExtractor(String inStream) {
		InputStream is = new ByteArrayInputStream(inStream.toString()
				.getBytes());

		this.inStream = is;
	}

	public ArrayList<String> findMails() {
		readFile(inStream);
		return emailList;
	}

	public String findeFirstEmail() {

		readFile(inStream);
		if (emailList.size() > 0) {
			return emailList.get(0);
		} else
			return "";
	}

	public void readFile(InputStream inputStream) {
		try {
			DataInputStream in = new DataInputStream(inputStream);
			BufferedReader br = new BufferedReader(new InputStreamReader(in));

			String strLine = "";

			while ((strLine = br.readLine()) != null) {
				// fileContent += strLine+"\n";
				getEmail(strLine);
			}

			in.close();
		} catch (Exception e) {// Catch exception if any
			System.err.println("Error: " + e.getMessage());
		}
	}

	public void getEmail(String line) {
		final String RE_MAIL = "([\\w\\-]([\\.\\w])+[\\w]+@([\\w\\-]+\\.)+[A-Za-z]{2,4})";
		Pattern p = Pattern.compile(RE_MAIL);
		Matcher m = p.matcher(line);

		while (m.find()) {
			if (!emailList.contains(m.group(1))) {
				emailList.add(m.group(1));
				// System.out.println(m.group(1));
			}
		}
	}

}
