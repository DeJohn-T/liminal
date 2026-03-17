/*
 * DeJohn Thompson
 * ThompsonRagged
 * Creates ragged array so the 5 rows could all vary in length, it will ask for it and then loop and after getting all info it will calcuate.
 * March 15
 * 
 */



import java.util.Scanner;

public class ThompsonRagged {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int[][] ragged = new int[5][];

        
        for (int i = 0; i < 5; i++) {
            System.out.print("Enter the length for row " + i + ": ");
            int length = scanner.nextInt();

            ragged[i] = new int[length];

            for (int j = 0; j < length; j++) {
                System.out.print("  Enter element " + j + " for row " + i + ": ");
                ragged[i][j] = scanner.nextInt();
            }
        }

       
        System.out.println("\n--- Row Statistics ---");

        for (int i = 0; i < 5; i++) {
            int sum = 0;
            int min = ragged[i][0];
            int max = ragged[i][0];

            for (int j = 0; j < ragged[i].length; j++) {
                sum += ragged[i][j];
                if (ragged[i][j] < min) min = ragged[i][j];
                if (ragged[i][j] > max) max = ragged[i][j];
            }

            double average = (double) sum / ragged[i].length;

            System.out.println("\nRow " + i + ":");
            System.out.println("  Sum:     " + sum);
            System.out.println("  Average: " + average);
            System.out.println("  Min:     " + min);
            System.out.println("  Max:     " + max);
        }

        scanner.close();
    }
}