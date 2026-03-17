/**
*
* CSC 1351 Programming Project No 1
* Section 2
*
* @author DeJohn Thompson
* @since 10/16/2023
*
*/


import java.util.ArrayList;
import java.io.*;
import java.util.*;
import java.io.FileNotFoundException;

public class Prog01_aOrderedList {
	
	public static void main(String[] args) throws FileNotFoundException  {
		
		
		Prog01_aOrderedList aOrderedList = new Prog01_aOrderedList();

        File file = new File(
            "C:\\Users\\deejayythompson\\eclipse-workspace\\Prog01_aOrderedList");
        
		
        PrintWriter outFile = new PrintWriter(new File("testfile.txt"));
		
        for(int i = 0; i<=2; i++) {
        Scanner sc = new Scanner(System.in);
		Scanner input = null;
		do {
		    System.out.print("Enter input filename: ");
		    String fileName = sc.next();
		    File inputFile = new File(fileName);
		    try {
		        input = new Scanner(inputFile);
		    } catch (IOException ex) {
		        System.out.println("File specified <oaisur.txt> does not exist. Would you like\n"
		        		+ "to continue? <Y/N> " + ex.getMessage());
		    }          
		} while (input == null);
		
        }
		
       		
		
	
	car car1 = new car ("A","Kia",2007,4000);
	car car2 = new car ("A","Honda",2009,10000);
	car car3 = new car ("D","Kia",2007,4000);

	
	// find a way to store each line of input into a string x; 
	// split x into different items/properties
	// String Brand = x.substring(  );
	
	ArrayList<car> carList = new ArrayList<car>(); 
	
	if(car1.prefix == A) {
		//add to collection
		
	// else if d then delete
		
	}
	

	
	int size = carList.size();
	outFile.println("Number Of Cars = " + size);
	

	   for(car c : carList ) {
			  outFile.print(c.toString());
			}
	   
	   outFile.close();
	
	
	

}
}



