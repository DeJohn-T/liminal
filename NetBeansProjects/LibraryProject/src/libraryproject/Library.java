package libraryproject;

import java.util.ArrayList;
import java.util.Collections;


public class Library {
    
    ArrayList<Book> books = new ArrayList<>();
    
          
    public void listBooks(){
        Collections.sort(books);
        
        for(Book b: books)
            System.out.println(b.getBookInfo()); 
    }
    
    public void addBook(String bookTitle, String bookAuthor){
        books.add(new Book(bookTitle, bookAuthor));
    }
    
    public void returnBook(String bookName){
        
        for(Book b: books)
            if(b.getTitle().compareToIgnoreCase(bookName) == 0){
                b.Return(); 
                return;
            }
        
        System.out.println("Book is not found."); 
        
    }
    
    public void reserveBook(String bookName){
        for(Book b: books){
            if(b.getTitle().compareToIgnoreCase(bookName) == 0){
                if(b.isAvailable()){
                    b.Reserve();
                    System.out.println("Reserved. ");
                    }
                else 
                    System.out.println("Chosen book is currently out."); 
            return;    
            }
        }
    
        System.out.println("Book is not found."); 
        
    }
    
}
