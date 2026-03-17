/**
 * 
 */

import java.util.ArrayList;
import java.util.Collections;

/**
 * 
 */


// interfaces have abstract methods.
// do not have any definition (body)

// 


public class Car implements Comparable<Car>{

	/**
	 * @param args
	 */
	
	private String make;
	private int price; 
	private String vinNo; 
	
	public Car (String make, int price, String vinNo) {
		this.make = make;
		this.price = price;
		this.vinNo = vinNo;
	}
	

	@Override
	// what to compare based on 
	// can return 0, it can return 1, it can return -1 
	// 0: when both props are equal
	// 1: a > b
	// -1: a < b
	// based on price
	
//		if (a > b ) {
//			return 1 
//		}
//		else if (a > b) {
//			return -1 
//		}
//		else return 0; 
	
	// defines behavior for comparing to the collections framework 
	
	public int compareTo(Car o) {
		return Integer.compare(this.price, o.price);
	    // str1.compareTo(str2)
	}
	
	public void printInfo(){
		  System.out.println(make +" "+ vinNo +" "+ price ); 
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Car car1 = new Car ("Mazda", 35000, "AXDSCD112S");
		Car car2 = new Car ("Honda", 65000, "SXDDER1ADF4");
		Car car3 = new Car ("Ferrari", 55000, "AXDSER11DSA");
	
		// Array : 		// Collections dont work with Arrays 
		// ArrayLists 
		// Collections (extend List ) will work only with: ArrayLists, LinkedLists, Maps  
		
		
		// ArrayList of objects of car 
		ArrayList<Car> carList = new ArrayList<Car>(); 
		carList.add(car1);
		carList.add(car2);
		carList.add(car3);
				
		
		
   for(Car c : carList ) {
	  c.printInfo();
	}
        
   
   // Collections 
   Collections.sort(carList);
		
   System.out.println("----------------Sorting------------ ");
   for(Car c : carList ) {
	  c.printInfo();
	}
        
   	
		
		
	}

	
	
}