import java.util.Random;

public class Algorithmproject {

 
    public static void main(String[] args) {
        // TODO code application logic here
        int[] array = new int (1000);
        populateArray(array);
        printArray(array);
        
        long start = System.currentTimeMillis();
        Algorithms.BubbleSort(array);
        long elapsed = System.currentTimeMillis();
        
        System.out.println("Bubble Sort time: " + elapsed + "time");
         
        start = System.currentTimeMillis();
        Algorithms.BubbleSort(array);
        elapsed = System.currentTimeMillis();
         
    }
    
    
    public static void populateArray(int[] array)
    {
        Random rand = new Random();
        for(int i = 0; i < array.length;i++)
                array[i] = rand.nextInt(1000);
    }
    
        public static void printArray(int[] array)
    {
        for(int i = 0; i < array.length;i++)
                System.out.println()
}
        
}
