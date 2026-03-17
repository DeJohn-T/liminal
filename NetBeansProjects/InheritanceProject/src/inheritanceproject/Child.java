
package inheritanceproject;


public class Child extends Parent {
    
    private String txt;

    public Child() {
        // use when passing parent class has a number
        //super(5);
       
        // will execute parent constructor and then child constructor (because inheritance)
       System.out.println("Child Class...");
     
       
    }
    
    
}
