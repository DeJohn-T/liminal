
package tallycounter;

/**
 *
 * @author deejayythompson
 */
public class Competition {
    
    public static void main(String[] args) {
        // TODO code application logic here
    
        TallyCounter ctr = new TallyCounter();
        
        for(int i = 0; i < 10000;i++){
        ctr.click();
        System.out.printf("The Counter is at: ");
        ctr.display();
       
        }


        
    }

    
}

