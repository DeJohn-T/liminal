
package errorexample;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;

public class ErrorExample {

    public static void main(String[] args) throws FileNotFoundException {
    
        String inputFileName = "dataIn.txt";
        String outputFileName = "dataOut.txt";
        File inputFile = new File(inputFileName);
        Scanner in = new Scanner(inputFile);
        PrintWriter out = new PrintWriter(outputFileName);
        
    }
    
    
}
