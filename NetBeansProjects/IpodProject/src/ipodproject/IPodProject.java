
package ipodproject;

import java.util.Collections;


public class IPodProject {

    public static void main(String[] args) {
        
        Library myLibrary = new Library("My Sad Library"); 
        
        
        myLibrary.addMediaFile(new Song("Taylor Swift", SONG_GENRE.INDIE , "Folklore", "Seven"));
        myLibrary.addMediaFile(new Song("Taylor Swift", SONG_GENRE.INDIE, "Folklore", "Mad Woman"));
        myLibrary.addMediaFile(new Song("Taylor Swift", SONG_GENRE.COUNTRY, "Speak Now", "Mean"));
        myLibrary.addMediaFile(new Song("Taylor Swift", SONG_GENRE.POP, "Fearless", "You belong with me"));
                
        
        myLibrary.addMediaFile(new Movie("Steven Spielberg", MOVIE_GENRE.Drama ,"Schindler's list"));
        myLibrary.addMediaFile(new Movie("Ben Stiller", MOVIE_GENRE.Comedy ,"Tropic Thunder"));
        myLibrary.addMediaFile(new Movie("Christopher Nolan", MOVIE_GENRE.Fiction ,"Inception"));
        myLibrary.addMediaFile(new Movie("Christopher McQuarrie", MOVIE_GENRE.Thriller ,"Mission: Impossible - Fallout"));
        
        
        
        myLibrary.listMediaFiles();
        myLibrary.shuffle();

    }
    
}