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
@WebServlet("/delete")
public class deleterowServlet extends HttpServlet {
	private Gson gson = new Gson();
    private static final long serialVersionUID = -2128122335811219481L;
    public deleterowServlet() {
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
    	String ry="";
    	String lang="English";
    	
    	  while (parameterNames.hasMoreElements()) {
    		  
              String paramName = parameterNames.nextElement();
              
   
              String[] paramValues = req.getParameterValues(paramName);
              
                  
                  System.out.println(paramName);
                  
                  if(paramName.equals("pkid"))
                  {
                	  title=paramValues[0];
                  
                  }
                  
                  if(paramName.equals("val"))
                  {
                	  des=paramValues[0];
                  
                  }
                  
                  
                  if(paramName.equals("val"))
                  {
                	  ry=paramValues[0];
                  
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
        connection = DriverManager.getConnection(connectionUrl+dbName, userId, password);
        statement=connection.createStatement();
        
        
        
        String sql1 = "DELETE FROM temp WHERE title = '" + title + "';";
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