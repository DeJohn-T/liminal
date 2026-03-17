
package ipodproject;
import java.util.ArrayList;
import java.util.Random; 

public class Library {
    
    ArrayList<Mediafile> myLib = new ArrayList<>(); 
    private String libName; 

    public Library(String LibName) {
        this.libName = LibName;
    }

           
    
    public void addMediaFile(Mediafile mf){
        myLib.add(mf); 
    }
    
    public void listMediaFiles(){
        
        for(Mediafile mf: myLib)
            System.out.println(mf.getFileInfo()); 
        
    }
    
    public void shuffle()
    {
        Random rand = new Random();
        int randomInt = rand.nextInt(myLib.size()); 
        myLib.get(randomInt).Play();
    }
                  
    
}