
package lsuhr;

/**
 *
 * @author deejayythompson
 */
public class LSUStudents {

    private String name = "pattywfatty";
    private int uniqueID;
    
    //program methods
    
    //method should be public
    // data should be private
    
    
    public void setName(String studentName){
        name = studentName;
    }

    public void setID(int studentID){
        uniqueID = studentID;
    }
    
    public void printInfo(){
        System.out.println(name);
        System.out.println(uniqueID);
    }
    
}
