/**
*
* CSC 1351 Programming Project No 1
* Section 2
*
* @author DeJohn Thompson
* @since 10/16/2023
*
*/

public class car {

	
	private String make;
	private int year;
	private int price;
	private String prefix;
	
	public car (String prefix, String make, int year, int price) {
		this.make = make;
		this.year = year;
		this.price = price;
		this.prefix = prefix;
	}
	
	public String getMake() {
		return make;
	}
	
	public int getYear() {
		return year;
	}
	
	public int getPrice() {
		return price;
	}
	

	public String  toString() {
		return ("Make: " + make + "\nYear: " + year + "\nPrice: $" + price + "\n\n" );
	
}
	
}
