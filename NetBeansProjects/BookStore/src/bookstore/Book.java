
package bookstore;

public class Book extends Publication {
    
    private String author;

    protected Book(String author, String title, GENRE genre) {
        super(title, genre);
        this.author = author;
    }

    @Override
    protected String getInfo() {
        return super.getInfo() + " Written by " + author;
    }
    
    
    
}
