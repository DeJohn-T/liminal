import java.io.*;
import java.util.*;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Prog01_aOrderedList {
	
	public static void main(String[] args) throws FileNotFoundException {
		
		
		Prog01_aOrderedList aOrderedList = new Prog01_aOrderedList();

        File file = new File(
            "C:\\Users\\deejayythompson\\eclipse-workspace\\Prog01_aOrderedList");
        
		PrintWriter outFile = new PrintWriter(new File("testfile.txt"));
        
		for(int i=1;i<=1;i++){
            outFile.print(car1);
            outFile.print(car2);
            outFile.print(car3);
		}
		outFile.close();
        
		
		
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
	
	static car car1 = new car ("Kia",2007,4000);
	static car car2 = new car ("Honda",2009,10000);
	static car car3 = new car ("Toyota",1999,1800);
	

