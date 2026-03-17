package Heap;

//sample code and/or guided pseudocode for a binary heap

import java.io.*;
import java.util.*;

public class Heap
{
  int[]A; //you may use ArrayList instead
  int size = 0;
  int max;
  
  public Heap(int max)
  {
      A = new int[max];
      this.max = max;
  }
  
 

  int min(int i, int j)
  { //returns index of minimum value within A[i..j] 
      int minindex = i;
      for(int k=i+1; k<=j; k++)
          if (A[k] < A[minindex]) minindex = k;
      return minindex;
  }
  

  void swap(int i, int j) {int temp = A[i]; A[i]= A[j]; A[j] = temp;}

  public int extractmin()
  {
      if (size == 0) return -1; //error
      int retval = A[0];
      A[0] = A[size-1]; //put last element at the top
      size--;
      heapify(0);
      return retval;
  }
  
  void heapify(int top) {
      if (top*2+1 > size-1) return; // No children
      int minChild;

      int minChildIndex = minChild(top);
      if (A[minChildIndex] < A[top]) {
          swap(top, minChildIndex);
          heapify(minChildIndex); // Recursively fix subtree
      }
  }
  


/* void heapify(int top)
  {
      if (top*2+1 > size-1) return;
      int minChild;
      
      //calculate minChild - refer below to non-recursive heapify as a guideline
      //for this block of code
      
      //if minchild and top do not conflict then return 
      //else there is violation of value property so "swap( , )";
      //recurse with minChild - to fix further down
  }
*/
  void insert(int newkey)
  {
          if (size == max) return; //error - you may want to throw an exception
          A[size] = newkey; // add new key at the end of the heap
          size++; //heap's size grows by one due to this new arrival
          int pos = size-1; //set pos to last items location
          percolate(pos);
  }

  void percolate(int pos)
  {// fixes upwards recursively
      
          if (pos <= 0) return;
          int parent = (pos - 1) / 3;
          if (A[pos] < A[parent]) {
              swap(pos, parent);
              percolate(parent); // Recursively fix upwards
          }
          //calcuate the position of parent of pos
          //if all fine (no conflict above) then return
          //if conflict the swap with parent
          //recurse - continue percolating upwards starting at parent now
  }
  
  void decreasekey(int pos, int newkey)
  {// decreases the key at A[pos] to a new value
	  
	  if (newkey > A[pos]) return; // Nothing to do

      A[pos] = newkey;
      percolate(pos); // Fix potential violation
  }
  
      //if newkey is bigger than A[pos] nothing to do
      //else change A[pos] to newkey
      //fix value property
  
  public static void main(String[] args)
  {
      Heap H = new Heap(100);

      for (int i = 10; i > 0; i--)
          H.insert((i*3497+379)%1000);
	   H.decreasekey(9,100);
      for (int i = 0; i < 10; i++)
          System.out.println(H.extractmin());
  }


//----- non-recursive version below ----------

  void insert_nr(int newkey)
  {
      if (size == max) return; //error - you may want to throw an exception
      A[size] = newkey; // add new key at the end of the heap
      int pos = size;
      size++;
      int parent;
      while(pos > 0)
      {
          parent = (pos-1)/2; //calcuate the position of parent
          if (A[parent] <= A[pos]) break;//if all fine then break the loop
          swap(parent,pos); //if conflict then swap with parent
          pos = parent;
      }
  }
  void heapify_nr(int top)
  {
      int minChild;
      
      while (top*2+1 <= size-1)
      {
          minChild = top*2+1;
          if((top*2+2 <= size-1) && (A[minChild] > A[top*2+2]))		     
              minChild = top*2+2;
          if(A[top] <= A[minChild]) break;
          swap(top, minChild);
          top = minChild; 
      }
  }
}