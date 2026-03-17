
package cakeproject;


public class WeddingCake extends Cake {
    
    public String bridesName;
    public String groomsName;


    public WeddingCake(String bridesName, String groomsName, String flavor, int tiers, double price)
    {
        super(flavor, tiers, price);
        this.bridesName = bridesName;
        this.groomsName = groomsName;
    }
    
    public String getInfo(){
      
        return super.getInfo() + "Congratulations to " + bridesName + " & " + groomsName;
    }
    
}
