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
import java.util.Arrays;

public class aOrderedList  {

	final int SIZEINCREMENTS = 20;
	private car[] oList; //the ordered list
	private int listSize; //the size of the ordered LIST
	private int numObjects;
	
	public aOrderedList(int SIZEINCREMENTS ,car oList, int listSize, int numObjects) {
		numObjects = 0;
		listSize = SIZEINCREMENTS;
		int[] intArray = new int[SIZEINCREMENTS];
	    ArrayList<car> arrlist = new ArrayList<car>(SIZEINCREMENTS);
	}
	
	public void add(car newCar) {
		
	}  
	
	public int size() {
		return SIZEINCREMENTS;
		
		
	}
	
	public car get (int index) { 
		return null;
		
	}
	
	public boolean isEmpty() {
		return false;
	
	}
	
	public void remove (int index) {
		
	}
	
    @Override
    public String toString() {
        return super.toString() + "oList=" + oList + '}';
    }
	
    
}
