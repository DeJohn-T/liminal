
package bookstore;


public class Magazine extends Publication {
    
    private String publisher; 

    protected Magazine(String publisher, String title, GENRE genre) {
        super(title,genre);
        this.publisher = publisher;
    }

    @Override
    protected String getInfo() {
        return super.getInfo() + ". published by " + publisher;
    }
    
    
    
}
