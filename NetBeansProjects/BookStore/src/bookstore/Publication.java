
package bookstore;

enum GENRE {Behavioral_Science, Self_help, Fiction, Programming, Entertainment, Lifestyle, Sports_and_Outdoors, Politics}

public class Publication implements Comparable<Publication> {
    
    private GENRE genre;
    private String title;

    protected Publication(String title, GENRE genre) {
        this.genre = genre;
        this.title = title;
    }

protected String getInfo()
{
    return String.format(title + genre);
}

    @Override
    public int compareTo(Publication o) {
        if (genre.compareTo(o.genre)!= 0)
            return genre.compareTo(o.genre);
        
        else
            return title.compareTo(o.title);
    }


    
    
}
