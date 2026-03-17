
package cakeproject;

public class PartyCake extends BirthdayCake {
    
    public int people;
    public int twofer;
    public String person;

    public PartyCake(int people, int twofer, String person, int age, String name, String flavor, int tiers, double price) {
        super(age, name, flavor, tiers, price);
        this.people = people;
        this.twofer = twofer;
        this.person = person;
    }

    @Override
    public String getInfo() {
        return super.getInfo() + "There will be " + people + " at the party in room " + twofer + " you're favorite person " + person + " will be there.";
    }
    
    
    
}
