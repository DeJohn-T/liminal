
package animal;


public class Animal extends Testing{

	private int year;
	private String color;
        private String make;
        private String model;
	
	public Animal (int yr, String clr, String mak, String mod) {
		year = yr;
		color = clr;
                make = mak;
                model = mod;
		System.out.println("This is the Vehicle constructor");
	}
	
	public void drive() {
		System.out.println("The whip is parking");
	}
	
	public void park() {
		System.out.print("PARK");
	}

}

class Dog extends Animal{
	
	public Dog () {
		
		super(2023, "hot green", "dodge", "fgfd"); // passes these arguments to the Animal constructor. 
		
		System.out.println("This is the Car constructor"); 
}
	
	public void whip() {
		System.out.println("RUFF RUFF");
	}
	
} 

class Testing {
            public static void main(String[] args) {
		Dog tom = new Dog ();
		tom.drive();
                tom.park();
                tom.park();
             
	}
}




