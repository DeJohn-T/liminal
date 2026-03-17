//DeJohn Thompson
//890586057

package algorithmsproject;

public class Algorithms {
    
    public static void BubbleSort(int[]array)  
    {
        for(int i = 0; i < array.length - 1; i++)
            for(int j = 0; j < array.length - i - 1; j++)
                if(array[j] > array[j + 1])
                {
                    int temp = array[j];
                    array[j] = array[j + 1]; 
                    array[j + 1]  = temp;
                }
    }
    
    //Complete Bubble Sort - Short Circuit (25)
    public static void BubbleSortCS(int[]array)
    {
        for(int i = 0; i < array.length-1; i++)
        for(int j = 0; j < array.length-i-1; j++)
        if(array[j] > array[j+1])
            
            {
                int temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
    }
    
    //Complete Selection Sort (25)
    public static void SelectionSort(int[]array)
    {
        for (int i = 0; i < array.length - 1; i++)
    {
            int minIndex = i;
                for (int j = i + 1; j < array.length; j++)
                if (array[j] < array[minIndex])
                minIndex = j;
        
        int smallerNumber = array[minIndex];
        array[minIndex] = array[i];
        array[i] = smallerNumber;
    }
}
    
    //Complete Insertion Sort (25)
    public static void InsertionSort(int array[])
    {
        int i, key, j;
        for (i = 1; i < array.length; i++)
        {
        key = array[i];
        j = i - 1;
        while (j >= 0 && array[j] > key)
        {
        array[j + 1] = array[j];
        j = j - 1;
        }
        array[j + 1] = key;
        }

    }
   
    
    //Complete Merge Sort (25)
    public static void MergeSort(int[] array)
    {
        if (array.length < 2)
            return;
        
        int mid = array.length / 2;
        int[] l = new int[mid];
        int[] r = new int[array.length - mid];
        
        for (int i = 0; i < mid; i++)
            l[i] = array[i];
        
        for (int i = mid; i < array.length; i++)
            r[i - mid] = array[i];
        
        MergeSort(l);
        MergeSort(r);
        
        Merge(array, l, r, mid, array.length - mid);
}
    public static void Merge(int[] array, int[] l, int[] r, int left, int right) 
    {
        int i = 0, j = 0, k = 0;
        while (i < left && j < right) {
            if (l[i] <= r[j]) {
            array[k] = l[i];
            i++;
            }
        else {
            array[k] = r[j];
            j++;
            }
        k++;
}
        while (i < left)
        array[k++] = l[i++];
        while (j < right)
        array[k++] = r[j++];
}
    
}
    
