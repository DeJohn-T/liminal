
package ipodproject;

enum MOVIE_GENRE{Fiction, Drama, Comedy, Thriller, Horror}

public class Movie extends Mediafile {
    
    private String director;
    private MOVIE_GENRE movieGenre; 

    public Movie(String Director, MOVIE_GENRE MovieGenre, String MovieName) {
        fileName = MovieName; 
        director = Director;
        movieGenre = MovieGenre;
    }
    
    public void changeQuality(String quality){
        System.out.println("Setting play quality to " + quality); 
    }

    @Override
    public String getFileInfo() {
        return "Movie: " + fileName + " directed by " + director; 
                
    }
    
    
}
