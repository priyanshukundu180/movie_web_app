import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Enumeration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;  
import java.util.Date;  
public class addrowServlet extends HttpServlet {
	private Gson gson = new Gson();
    private static final long serialVersionUID = -2128122335811219481L;
    public addrowServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException,ServletException {
        handleRequest(req, res);
    }
 
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException,ServletException {
        handleRequest(req, res);
    }
 
    public void handleRequest(HttpServletRequest req, HttpServletResponse res) throws IOException,ServletException {
 
      
    	res.setContentType("application/json");
	    PrintWriter out=res.getWriter();
    	Enumeration<String> parameterNames = req.getParameterNames();
    	String title="";
    	String des="";
    	
    	String lang="";
    	String id="";
    	String rating="";
    	String sf="";
    	String ry="";
    	
    	
    	
    	  while (parameterNames.hasMoreElements()) {
    		  
              String paramName = parameterNames.nextElement();
              
   
              String[] paramValues = req.getParameterValues(paramName);
              
                  
                  System.out.println(paramName);
                  
                  if(paramName.equals("title"))
                  {
                	  title=paramValues[0];
                  
                  }
                  
                  if(paramName.equals("desc"))
                  {
                	  des=paramValues[0];
                  
                  }
                  
                  
                  if(paramName.equals("rely"))
                  {
                	  ry=paramValues[0];
                	  
                  }
                    
                  
                  if(paramName.equals("lang"))
                  {
                	  lang=paramValues[0];
                  
                  }
                  
                  if(paramName.equals("rating"))
                  {
                	  rating=paramValues[0];
                  
                  }
                  
                  
                  if(paramName.equals("special_features"))
                  {
                	 sf=paramValues[0];
                  
                  }
                  
                 
                  if(paramName.equals("id"))
                  {
                	 id=paramValues[0];
                  
                  } 
                	  
                 
                  
                  
                  
                  
            
   
          }
    	
    	
        
        
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
        
        System.out.println(title);
        System.out.println(ry);
        System.out.println(lang);
        System.out.println(sf);
        System.out.println(des);
        
        connection = DriverManager.getConnection(connectionUrl+dbName, userId, password);
        statement=connection.createStatement();
        
  	  
  		
  		String sql1 = "INSERT INTO temp(title,name,film_id,description,release_year,rating,special_features) " +"VALUES('"+title+"','"+lang+"','"+id+"','"+des+"','"+ry+"','"+rating+"','"+sf+"')";
		
        
        
        
        System.out.println(sql1);
        
        JSONArray movies=new JSONArray();
        statement.executeUpdate(sql1);
        
        
        String sql2 ="SELECT * FROM TEMP";
        resultSet = statement.executeQuery(sql2);
        while(resultSet.next()){
        	
        int total_rows = resultSet.getMetaData().getColumnCount();
               
        
        JSONObject obj = new JSONObject();
        			for (int i = 0; i <total_rows; i++) {
                    
                     obj.put(resultSet.getMetaData().getColumnLabel(i+1)
                             .toLowerCase(), resultSet.getObject(i+1));
                    
                    



        }
                 
                 movies.put(obj);
               
        }

        out.print(movies);
        		
        out.flush();	

        
        
        
 
    }
        catch (Exception e) {
        	e.printStackTrace();
        	}
 
}
}