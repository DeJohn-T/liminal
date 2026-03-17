
package ipodproject;

// static means once defined, you dont need to create a new library or instance. Belongs to class not instances.

enum SONG_GENRE{POP, INDIE, COUNTRY, RAP, JAZZ}

public class Song extends Mediafile {
    
    
    private String singer; 
    private SONG_GENRE musicGenre; 
    private String albumName; 

  
    
    public Song(String Singer, SONG_GENRE MusicGenre, String AlbumName, String SongName) {
        fileName = SongName; 
        this.singer = Singer;
        this.musicGenre = MusicGenre;
        this.albumName = AlbumName;
    }
    
    
    
    public void setBass(String BassLevel){
        System.out.println("Setting bass to " + BassLevel); 
    }
    
    @Override 
    public String getFileInfo()
     {
         return "Song: " + fileName + " by " + singer + " from Album " + albumName; 
     }
    
}
    
