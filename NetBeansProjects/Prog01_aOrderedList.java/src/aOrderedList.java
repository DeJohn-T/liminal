import java.util.ArrayList;

public class aOrderedList {

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

    @Override
    public String toString() {
        return super.toString() + "oList=" + oList + '}';
    }
	
	
	
}
