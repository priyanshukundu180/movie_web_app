
import java.io.IOException; 

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.xml.internal.bind.v2.schemagen.xmlschema.List;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class dataloadtestnew
 */
@WebServlet("/dataloadtestnew")
public class dataloadtestnew extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public dataloadtestnew() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		// TODO Auto-generated method stub
		
		 response.setContentType("application/json");
		    PrintWriter out=response.getWriter();

String driverName = "com.mysql.cj.jdbc.Driver";
String connectionUrl = "jdbc:mysql://localhost:3306/";
String dbName = "sakila";
String userId = "root";
String password = "root";

try {
Class.forName(driverName);
} catch (ClassNotFoundException e) {
e.printStackTrace();
}

Connection connection = null;
Statement statement = null;
ResultSet resultSet = null;


try{ 
connection = DriverManager.getConnection(connectionUrl+dbName, userId, password);
statement=connection.createStatement();
String sql ="SELECT * FROM TEMP";
Gson gson=new GsonBuilder().setPrettyPrinting().create();
JSONArray customers=new JSONArray();
resultSet = statement.executeQuery(sql);
while(resultSet.next()){
	
int total_rows = resultSet.getMetaData().getColumnCount();
       

JSONObject obj = new JSONObject();
			for (int i = 0; i <total_rows; i++) {
            
             obj.put(resultSet.getMetaData().getColumnLabel(i+1)
                     .toLowerCase(), resultSet.getObject(i+1));
            



}
         
         customers.put(obj);
       
}

out.print(customers);
		
out.flush();	

	}

catch (Exception e) {
e.printStackTrace();
}
	
	
	}
	
	

		
		/*
		String name = request.getParameter("name");
		Response resp = new Response();
		resp.setName(name);
		Gson gson = new Gson();
		 String data = gson.toJson(resp);
		 PrintWriter out = response.getWriter();
		 response.setContentType("application/json");
		 response.setCharacterEncoding("UTF-8");
		 out.print(data);
		 out.flush();
		
		*/
		
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub



}
	}
	
