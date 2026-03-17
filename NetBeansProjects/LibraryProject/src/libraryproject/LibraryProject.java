
package libraryproject;

import java.util.Scanner;


public class LibraryProject {

    public static void main(String[] args) {
        
        Library lib = new Library(); 
        
        lib.addBook("Hooked", "Nir Eyal");
        lib.addBook("Indistractable", "Nir Eyal");
        lib.addBook("Sapiens", "Yuval Noah Harar");
        lib.addBook("Atomic Habits", "James Clear");
        lib.addBook("Nudge", "Richard Thaler");
        lib.addBook("NOPE", "Jordan Peele");
        lib.addBook("IT", "Stephen King");
        lib.addBook("Alternate", "Tyler Kai");
        lib.addBook("Lights Out", "Not even sure");
        lib.addBook("Insidious", "James Wan");
        
        
        
        Scanner input = new Scanner(System.in);
        int exit = 0;
        
        while(exit != 4){
            
            System.out.println("-------------------------------");
            System.out.println("\t1- Reserve a book\n\t2- Return a book\n\t3- List All books \n\t4- Exit");         
        
            int choice = input.nextInt(); 
        
            switch (choice) {
                case 1: 
                    System.out.println("Enter book title: ");
                    input.nextLine();
                    String bookName = input.nextLine();
                    lib.reserveBook(bookName);
                    break;

                case 2: 
                    System.out.println("Enter book title: ");
                    input.nextLine();
                    bookName = input.nextLine();
                    lib.returnBook(bookName);
                    break;

                case 3: 
                    lib.listBooks();
                    break;
                    
                case 4: 
                    exit = 4;
                    break;    

                default:
                    System.out.println(); 
                    break;
            }
        
        }
        
        
        
    }
    
}