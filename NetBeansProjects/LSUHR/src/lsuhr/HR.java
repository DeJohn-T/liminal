
package lsuhr;

/**
 *
 * @author deejayythompson
 */
public class HR {
    
    public static void main(String[]args){
        
        LSUStudents student1 = new LSUStudents();
        
        LSUStudents student2 = new LSUStudents();
        
        student1.setName("john");
        student1.setID(90989987);
        
        student2.setName("deej");
        student2.setID(58950543);
       
        
        student1.printInfo();
        student2.printInfo();
    }
    
}
