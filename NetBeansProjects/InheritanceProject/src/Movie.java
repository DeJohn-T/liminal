
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.File;
import java.util.Random;
import java.util.Scanner;

/**
 * Author : DeJohn Thompson
 * LSU ID: 89-058-6057
 * Section : 002
 */
public class Movie {
    
    	String title;  //data members
	static int year;
	String review;
	String operation;

        public Movie (String operation, String string,String title, int year, String review) {
            this.operation = operation;
            this.title = title; 			//constructor
            this.year = year;
            this.review = review;
	}

    public static void main(String[] args) throws FileNotFoundException {
        
        
        PrintWriter outFile = new PrintWriter("inputfile1.txt");
        PrintWriter outerFile = new PrintWriter("inputfile2.txt");
        Random rand = new Random();
    
        /*
        for(int i=1;i<=1000;i++){
            outFile.print("\n" + rand.nextInt(1000+1));
        
        }
        outFile.close();
*/
    

        File inputFile = new File ("inputfile1.txt");
        File otherinputFile = new File ("inputfile2.txt");
        Scanner in = new Scanner(inputFile);
   
       int j = 1;
      
       while(in.hasNextLine()){
            String Movie = in.nextLine();
            System.out.println("\n Line Number " + j + ": "+ Movie);
          
    }
       in.close();
    }
    
    
}
