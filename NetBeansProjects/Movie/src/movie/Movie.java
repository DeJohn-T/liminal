package movie;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

/**
 * Author : DeJohn Thompson
 * LSU ID: 89-058-6057
 * Section : 002
 */
public class Movie {
   
    static String title;  //data members
    static int year;
    static String review;
    static String operation;
    static int rating;

    public String Movie(String operation, String title, int year, String review, int rating) {
        this.title = title;
        this.year = year;
        this.review = review;
        this.operation = operation;
        this.rating = rating;
        
        return null;
    }
   
    	public String getTitle() {
		return title;
	}
        
                public static void sort(ArrayList<Movie> movieList1) {
 
        movieList1.sort((o1, o2)
                  -> o1.getTitle().compareTo(
                      o2.getTitle()));
            }
            
        public static void sort2(ArrayList<Movie> movieList2) {
 
        movieList2.sort((o1, o2)
                  -> o1.getTitle().compareTo(
                      o2.getTitle()));
            }
        
    
    public static void main(String[] args) throws FileNotFoundException {

       ArrayList<Object> movieList1 = new ArrayList <Object>();
       ArrayList<Object> movieList2 = new ArrayList <Object>();

        File inputFile = new File("inputfile1.txt");
        Scanner in = new Scanner(inputFile);
   
        File otherinputFile = new File("inputfile2.txt");
        Scanner ino = new Scanner(otherinputFile);
       
       System.out.print("Input File 1:\n");
       
       while(in.hasNextLine()){	
           
        String Movies = in.nextLine();
        movieList1.add(Movies);
      
       }
       
       for (Object M : movieList1) { System.out.println(M); }
       
     
      System.out.print("\nInput File 2:\n");
        while(ino.hasNextLine()){
	    	
            String Movie = ino.nextLine();
            //String[] movie2split = Movie.split(", "); 
            movieList2.add(Movie);
            
       }
              
       for (Object M2 : movieList2) { System.out.println(M2); }
        
        
        
        
        PrintWriter outFile = new PrintWriter("inputfile3.txt");   
        movieList1.addAll(movieList2); 
        outFile.println("MERGED LIST:\n");
        for (Object all : movieList1) { outFile.println("" + all);}
        
        
       
       in.close();
       ino.close();
       outFile.close(); 

       
    }
    

 
}
    
    
