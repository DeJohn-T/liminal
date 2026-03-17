import java.util.Scanner;
/*
 * DeJohn Thompson
 * CalculateInterest
 * This our requestewd Homework. Created 2 input methods for balance and annual interest rate. 
 * After finding the interest rate from those outputs, I presented all the information.
 */


public class CalculateInterest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Scanner scanner = new Scanner(System.in);
		
		System.out.print("Please enter your account balance.");
		double balance =scanner.nextDouble();
		
		
		System.out.print("Please enter your annual percentage interest iate.");
		double annualInterestRate =scanner.nextDouble();
		
		double interest = balance * (annualInterestRate / 1200);
		
		System.out.println("\n========Monthly Interest Result======");
		System.out.printf("Account Balance:      $%,.2f%n", balance);
		System.out.printf("Annual Interest Rate:     $%.3f%%%n  ", annualInterestRate);
		System.out.printf("Interest for Next Month:      $%,.2f%n", interest);
		
	}

}
