
interface NBA {
	
	public void Hoop();
	
}

interface footballer {
	
	public int Kick();
	
	public void Tackle();
	
}



public class Athlete implements NBA, footballer {

	
	public int Kick() {
		return 100;
	}
	
	public void Tackle() {
		System.out.println("Tackle");
		}
	
	public void Hoop() {
		System.out.println("Hoop");
	}
	
	
	public static void mainuho; (String []args) {
		
		//creating object
		Athlete tom = new Athlete();
		System.out.printf("Tom is kicking ", tom.Kick());
		tom.Hoop();
		tom.Tackle();
		
	}
	
	
	
	
}
