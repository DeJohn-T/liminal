
package cakeproject;
import java.util.ArrayList;

public class CakeProject {


    public static void main(String[] args) {
        
        Cake c = new Cake ("Vanilla", 3 , 40.99);
        System.out.println(c.getInfo());
        
        WeddingCake cd = new WeddingCake ("Sarah ", "Adam ", "Vanilla ", 5, 500.20);
        System.out.println(cd.getInfo());
        
        BirthdayCake bd = new BirthdayCake(1, "Leslie ", "Strawberry ", 3, 20.30);
        System.out.println(bd.getInfo());
        
        PartyCake pd = new PartyCake(26, 8,"Lil deej",20, "Stacey","Vanilla",3,30.00 );
        System.out.println(pd.getInfo());
        
        ArrayList<Cake> cakes = new ArrayList<>();
       cakes.add(c);
       cakes.add(cd);
       cakes.add(bd);
       cakes.add(pd);
        
        for (Cake i : cakes)
            System.out.println(i.getInfo());
                
    }
    
}
