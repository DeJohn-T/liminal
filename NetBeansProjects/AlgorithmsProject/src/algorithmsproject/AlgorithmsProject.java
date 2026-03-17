//DeJohn Thompson
//890586057

package algorithmsproject;

import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;


public class AlgorithmsProject {


    public static void main(String[] args) {
        
        
        //Read array size from user
        System.out.print("Enter array size: ");
        Scanner in = new Scanner(System.in);
        int[] array = new int[in.nextInt()]; 
        
        //populate array
        populateArray(array); 
        
        //Bubble sort the array and measure the execution time
        long startTime = System.currentTimeMillis();
        Algorithms.BubbleSort(array.clone());
        long elapsedTime = System.currentTimeMillis() - startTime;   
        System.out.println("Bubble sort time: " + elapsedTime + " (ms)");
        
        
        startTime = System.currentTimeMillis();
        Algorithms.BubbleSortCS(array.clone());
        elapsedTime = System.currentTimeMillis() - startTime;   
        System.out.println("Bubble sort CS time: " + elapsedTime + " (ms)");
           
        startTime = System.currentTimeMillis();
        Algorithms.SelectionSort(array.clone());
        elapsedTime = System.currentTimeMillis() - startTime;   
        System.out.println("Selection sort time: " + elapsedTime + " (ms)");
        
        startTime = System.currentTimeMillis();
        Algorithms.InsertionSort(array.clone());
        elapsedTime = System.currentTimeMillis() - startTime;   
        System.out.println("Insertion sort time: " + elapsedTime + " (ms)");

        startTime = System.currentTimeMillis();
        Algorithms.MergeSort(array.clone());
        elapsedTime = System.currentTimeMillis() - startTime;   
        System.out.println("Merge sort time: " + elapsedTime + " (ms)");
        
        startTime = System.currentTimeMillis();
        Arrays.sort(array.clone());
        elapsedTime = System.currentTimeMillis() - startTime;   
        System.out.println("Java (quick) sort time: " + elapsedTime + " (ms)");
        
        
    }
    
    
    public static void populateArray(int [] array)
    {
        Random rand = new Random();
        for(int i = 0; i < array.length; i++)
            array[i] = rand.nextInt(1000);
    }
    
}
