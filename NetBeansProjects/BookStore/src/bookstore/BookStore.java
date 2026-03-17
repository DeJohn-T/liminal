//DeJohn Thompson
//890586057

package bookstore;

import java.util.ArrayList;
import java.util.Collections;

public class BookStore {


    public static void main(String[] args) {

        ArrayList<Publication> myBookStore = new ArrayList<>();

        myBookStore.add(new Book("Nil Ayal ", "Hooked, ", GENRE.Behavioral_Science));
        myBookStore.add(new Magazine("The Arena Group ", "Sports Illustrated, ", GENRE.Sports_and_Outdoors));
        myBookStore.add(new Publication("Atomic Habits, ", GENRE.Self_help));
        myBookStore.add(new Book("Nil Ayal ", "Indistractable, ", GENRE.Behavioral_Science));

        Collections.sort(myBookStore);

        for(Publication p: myBookStore)
        System.out.println(p.getInfo()); 
        
    }
    
}
