package com.Test.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.Dataminer.DAO.CompanyInfoDAO;

public class MySQLAccess {

	private static final String DB_PASSWORD = "qazwsx27";
	private static final String DB_USER = "dsacircl_Luis";
	private static final String DB_NAME = "dsacircl_DataM";
	private Connection connect = null;
	private Statement statement = null;
	private Statement stmt = null;

	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;

	public MySQLAccess() throws ClassNotFoundException {

		// this will load the MySQL driver, each DB has its own driver
		try {

			connect = DriverManager
					.getConnection("jdbc:mysql://just48.justhost.com:3306/"
							+ "dsacircl_DataM", "dsacircl_Luis", "qazwsx27");
			// statements allow to issue SQL queries to the database
			statement = connect.createStatement();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// setup the connection with the DB.

	}

	public void insertIntoDataBase(CompanyInfoDAO dao) throws SQLException {

		// preparedStatements can use variables and are more efficient
		preparedStatement = connect
				.prepareStatement("insert into dsacircl_DataM.COMPANY_INFO values (default,?,?,?,?,?,?,?)");
		// "companyname, webpage, adress, telephone, COMPANYINFO from FEEDBACK.COMPANYINFO");
		// parameters start with 1
		preparedStatement.setString(1, dao.getCompanyName());
		preparedStatement.setString(2, dao.getEmail());
		preparedStatement.setString(3, dao.getWebpage());
		preparedStatement.setString(4, dao.getStreetAddress());
		preparedStatement.setString(5, dao.getAddressLocality());
		preparedStatement.setString(6, dao.getTelephone());
		preparedStatement.setString(7, dao.getComments());
		preparedStatement.executeUpdate();

	}

	public void deleteByCompanyName(String name) {
		try {
			preparedStatement = connect.prepareStatement("delete from "
					+ DB_NAME + ".COMPANYINFO where companyname= ? ; ");
			preparedStatement.setString(1, name);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void readDataBase() throws Exception {
		try {

			// // resultSet gets the result of the SQL query
			// getResultForQuery("select * from FEEDBACK.COMPANYINFO");
			//
			// // preparedStatements can use variables and are more efficient
			// preparedStatement = connect
			// .prepareStatement("insert into  FEEDBACK.COMPANYINFO values (default, ?, ?, ?, ? , ?, ?)");
			// //
			// "companyname, webpage, adress, telephone, COMPANYINFO from FEEDBACK.COMPANYINFO");
			// // parameters start with 1
			// preparedStatement.setString(1, "Test");
			// preparedStatement.setString(2, "TestEmail");
			// preparedStatement.setString(3, "TestWebpage");
			// preparedStatement.setString(4, "TestAdress");
			// preparedStatement.setString(5, "TestSummary");
			// preparedStatement.setString(6, "TestComment");
			// preparedStatement.executeUpdate();
			//
			// preparedStatement = connect
			// .prepareStatement("SELECT companyname, webpage, adress, telephone, comments from "+
			// DB_NAME+".COMPANYINFO");
			// resultSet = preparedStatement.executeQuery();
			// getDAOListByResultSet(resultSet);
			//
			// // remove again the insert comment
			// preparedStatement = connect
			// .prepareStatement("delete from "+
			// DB_NAME+".COMPANYINFO where companyname= ? ; ");
			// preparedStatement.setString(1, "Test");
			// preparedStatement.executeUpdate();
			//
			resultSet = statement.executeQuery("select * from " + DB_NAME
					+ ".COMPANYINFO");
			writeMetaData(resultSet);

		} catch (Exception e) {
			throw e;
		} finally {
			close();
		}

	}

	/**
	 * @throws SQLException
	 */
	private ArrayList<CompanyInfoDAO> getResultForQuery(String query)
			throws SQLException {
		// Query Extample: select * from FEEDBACK.COMPANYINFO
		resultSet = statement.executeQuery(query);
		return getDAOListByResultSet(resultSet);

	}

	private void writeMetaData(ResultSet resultSet) throws SQLException {
		// now get some metadata from the database
		System.out.println("The columns in the table are: ");
		System.out.println("Table: " + resultSet.getMetaData().getTableName(1));
		for (int i = 1; i <= resultSet.getMetaData().getColumnCount(); i++) {
			System.out.println("Column " + i + " "
					+ resultSet.getMetaData().getColumnName(i));
		}
	}

	private ArrayList<CompanyInfoDAO> getDAOListByResultSet(ResultSet resultSet)
			throws SQLException {
		// resultSet is initialised before the first data set

		// Creo una lista distinta por cada consulta
		ArrayList<CompanyInfoDAO> queryResult = new ArrayList<CompanyInfoDAO>();

		while (resultSet.next()) {
			/***
			 * it is possible to get the columns via name also possible to get
			 * the columns via the column number which starts at 1 e.g.,
			 * resultSet.getSTring(2);
			 */
			CompanyInfoDAO dao = new CompanyInfoDAO();

			String companyName = resultSet.getString("companyname");
			String email = resultSet.getString(2);// email, no se porque da
													// error si pongo el string
													// email
			String website = resultSet.getString("webpage");
			String telephone = resultSet.getString("telephone");
			String adress = resultSet.getString("adress");
			String comments = resultSet.getString("comments");

			dao.setCompanyName(companyName);
			dao.setEmail(email);
			dao.setWebpage(website);
			dao.setTelephone(telephone);
			dao.setStreetAddress(adress);
			dao.setComments(comments);

			queryResult.add(dao);

		}// End While
		return queryResult;
	}

	// you need to close all three to make sure
	private void close() throws SQLException {
		resultSet.close();
		statement.close();
		connect.close();
	}

}
