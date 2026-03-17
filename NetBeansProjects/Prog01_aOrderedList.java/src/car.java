
public class car {

	
	private String make;
	private int year;
	private int price;
	
	public car (String make, int year, int price) {
		this.make = make;
		this.year = year;
		this.price = price;
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
		 return ("Make :" + make + " Year: " + year + " Price: $" + price + "\n" );
	}
	
}
