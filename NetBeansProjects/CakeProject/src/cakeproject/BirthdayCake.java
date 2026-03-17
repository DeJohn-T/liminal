
package cakeproject;

public class BirthdayCake extends Cake {
    
    public int age;
    public String name;

    public BirthdayCake(int age, String name, String flavor, int tiers, double price) {
        super(flavor, tiers, price);
        this.age = age;
        this.name = name;
    }

    @Override
    public String getInfo() {
        return super.getInfo() + " Happy Birthday to " + name + " you're finally  " + age + " years old. ";
    }

      
}
