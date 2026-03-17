package libraryproject;

public class Book implements Comparable<Book>{
    
    private String author;
    private String title;
    private boolean available; 
    
    public Book(String bookTitle, String bookAuthor){
        author = bookAuthor;
        title = bookTitle; 
        available = true;
        
    }
    
    public boolean isAvailable(){
        return available; 
    }
    
    public String getTitle(){
        return title;
    }
    
    public void Reserve(){
        available = false; 
    }
    
    public void Return(){
        available = true; 
    }
        
    
    public String getBookInfo() {
        String info = title + " by " + author + ". ";
        
        if(available)
            info += "This book is currently avialable.";
        else 
            info += "This book is currently out.";
        
        return info; 
    }
    
    public int compareTo(Book other) {
        if(author.compareTo(other.author) == 0)
            return title.compareTo(other.title);
        else 
           return author.compareTo(other.author);             
    }
}
