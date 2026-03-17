/* creating an object tally counter
currentCount
Methods: Click, Display, Reset.
*/

package tallycounter;

/**
 *
 * @author deejayythompson
 */
public class TallyCounter {

int currentCount = 0;
    
    // programmimg the method
    // 1. define method
    // 2. program what it needs to do within ()
    
    // VOID : method doesn't return anything.
    public void click(){
        currentCount = currentCount + 1;
    }
    
    public void display(){
        // print the count on the user's screen.
        System.out.println(currentCount);
    }
    
    public void reset(){
        currentCount = 0;
    }
    
}
