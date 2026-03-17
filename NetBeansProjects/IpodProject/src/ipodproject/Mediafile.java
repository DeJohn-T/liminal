
package ipodproject;


public class Mediafile implements Comparable <Mediafile> {
    
    public String fileName; 
    protected double fileSize;
    
    public void Play(){
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>"); 
        System.out.println(fileName + " Playing ... "); 
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>"); 
    } 
    
    public void Stop(){
        System.out.println("Stop ... "); 
    }
    
    public void Pause(){
        System.out.println("Pause ... "); 
    }
    
    public String getFileInfo()
    {
        return fileName + ", " + fileSize; 
    }

    @Override
    public int compareTo(Mediafile o) {
        return fileName.compareToIgnoreCase(o.fileName);
    }
    
    
    
}
