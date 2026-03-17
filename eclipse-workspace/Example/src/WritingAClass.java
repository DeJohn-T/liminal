import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;

public class WritingAClass {

	public static void main(String[] args) throws FileNotFoundException {
		
		PrintWriter outFile = new PrintWriter ("output.txt");
		Scanner in = new Scanner(System.in);
		
		for (int i = 1; i <= 5; i++)
		{
			System.out.print("Please Enter Name # " + i + ":");
			String name = in.nextLine();
			outFile.println("The name you entered was: " + name);
		}
		
		outFile.close();
	}

}
