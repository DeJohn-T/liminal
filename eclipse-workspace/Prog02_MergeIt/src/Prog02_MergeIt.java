/**
* <Class description>
*
* CSC 1351 Programming Project No 2
* Section 002
*
* @author dejohn thompson
* @since NOV 15
*
*/

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class Prog02_MergeIt {
	
	String title;  //data members
	static int year;
	String review;
	String operation;
	
public Prog02_MergeIt (String operation, String string,String title, int year, String review) {
		this.operation = operation;
		this.title = title; 			//constructor
		this.year = year;
		this.review = review;
		}

	public static void main(String[] args) throws IOException {
	

	    FileWriter f1 = null;
	    Scanner scan = new Scanner( System.in );
	    String fileName = "";
	    System.out.print("Enter Filename 1: ");                    // Ask for the file name
	    
	    try
	    {
	      fileName = scan.next();                                  // Get the file name
	      f1 = new FileWriter( fileName );                     // Create the file
	      
	    }
	    catch  ( IOException iox )
	    {
	      System.out.println("Error in creating file");            // On failure, write error message
	      return;                                                  // Return 
	    } 
		
	    
	    FileWriter f2 = null;
	    Scanner scanner = new Scanner( System.in );
	    String filesName = "";
	    System.out.print("Enter Filename 2: ");                    
	    
	    try
	    {
	      fileName = scan.next();                                  
	      f2 = new FileWriter( fileName );                     
	    }
	    catch  ( IOException iox )
	    {
	      System.out.println("Error in creating file");            
	      return;                                                 
	    } 
	    
	  
	    
	    String str = ",";
	    ArrayList<String> List = new ArrayList<>(Arrays.asList(str.split(","))); // split array using commas
	    ArrayList<String> array1 = new ArrayList<>(); //array for file 1
	    ArrayList<String> array2 = new ArrayList<>(); //array for file 2

	    
	    for(String line : array1) {
	    	if(line.trim().startsWith("A")) { // If A then add
	    		List.add(line);
	    	}
	    }
	    
	    for(String line : array1) {
	    	if(line.trim().startsWith("D")) { // If D then delete
	    		List.remove(line);
	    	}
	    }
	    
	    for(String line : array2) {
	    	if(line.trim().startsWith("A")) { // If A then add
	    		List.add(line);
	    	}
	    }
	    
	    for(String line : array2) {
	    	if(line.trim().startsWith("D")) { // If D then delete
	    		List.remove(line);
	    	}
	    }
	    


	    
	    Scanner input = new Scanner(fileName);
	    input.useDelimiter("-|\n");

	    Prog02_MergeIt[] movie = new Prog02_MergeIt[0]; //read each line and create object
	    while(input.hasNext()) {
	        String string = input.next(); //start with string
	        String title = input.next();  // title next
	        int year = input.nextInt();   // read year
	        String review = input.next(); // read review

	        Prog02_MergeIt newMovies = new Prog02_MergeIt(str, str, review, year, str);
	        movie = addMovie(movie, newMovies);
	    }

	    for (Prog02_MergeIt movies : movie) { // for every object print object
	        System.out.println(movies);
	    }
	}
	
	// method to count movies using an array
	private static Prog02_MergeIt[] addMovie(Prog02_MergeIt[] movie, Prog02_MergeIt movieToAdd) {
		Prog02_MergeIt[] newMovies = new Prog02_MergeIt[movie.length + 1]; //new array counting movies
	    System.arraycopy(movie, 0, newMovies, 0, movie.length);
	    newMovies[newMovies.length - 1] = movieToAdd;

	    return newMovies;
	}

	// user created file
	File f1 = new File(operation); 
	File f2 = new File(operation);
	
// milestone 1: to read from both inputfile 1 and print them on console if prefix is A
// milestone 2: create objects movie if line is printed in console 
// milestone 3: 
	
	
	
	
    if (value == 0)  // if both files have everything the same it will print this message
    { 
        System.out.println("Both files are equal"); 
    } 
    else if (value > 0)  
    { 
        System.out.println(f1); // if they are not equal and f2 has duplicate entries f1 will print
    } 
    else 
    { 
        System.out.println(f2); // if they are not equal and f1 has duplicate entries f2 will print
    } 
    
    // sort for both arrays
    Collections.sort(array1);
    Collections.sort(array2);


    
	}
}

