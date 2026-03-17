
package examp;
/*DeJohn Thompson
 * 890586057
 * 002
 */


public class Examp {
	
	public static long recursiveFib(int n) {

		if (n<=2)
			return 1;
		
		else
			return recursiveFib(n-1)+ recursiveFib(n-2);
				}
				
	
	public static long iterativeFib(int n) {
		if (n <= 2)
			return 1;
		
		else {
			long olderValue = 1;
			long oldValue = 1;
			long newValue = 1;
			
			
			for(int i = 3; i <=n ; i++) {
				newValue = oldValue + olderValue;
				olderValue = oldValue;
				oldValue = newValue;
			}
			
			return newValue;
		}
}



public static void main (String []args) {
	
	System.out.printf("%-10s%-15s%-20s%-10s\n", "x", "fib(x)", "Recursive(ns)", "Iterative(ns)");
	System.out.println("==========================================================");


	for(int i = 10; i <= 50; i += 10)
	 {

	//Calculate time in nano second for recursive Fibonacci
	 long start= System.nanoTime();
	Examp.recursiveFib(i);
	 long elapsedRec = System.nanoTime() - start;

	 //Calculate time in nano second for iterative Fibonacci
	start= System.nanoTime();
	 long feb = Examp.iterativeFib(i);
	long elapsedIter = System.nanoTime() - start;

	 System.out.printf("%-10d%-15d%,-20d%,-10d\n",i, feb, elapsedRec, elapsedIter);
	 }

	System.out.println("==========================================================");

}

}
