/* 
 * author: DeJohn Thompson
 * ID 890586057
 * Section: 002
 */

enum Genre{
	SCIENCE, 
	ROMANCE, 
	COMIC, 
	CLASSIC, 
	ATHLETIC,
	BEAUTY, 
	FASHION, 
	ENTERTAINMENT, 
	THRILLER
}


public class Publication implements Comparable <Publication> {
	
	private String title;
	private Genre genre;
	private int edition;
	private int year;
	
	public Publication(String title, Genre genre, int edition, int year){
		this.title =  title;
		this.genre = genre;
		this.edition = edition;
		this.year = year;
}

	public String printInfo(){
		String info = title + " edition " + edition + " published in " + year;
		return info;
}

	public String printFooter() {
		String Footer = ("All rights reserved!\n--------------------");
		return Footer;
	}

	
	@Override
	public int compareTo(Publication other) {
	int genreComparison = this.genre.compareTo (other.genre);
	if (genreComparison == 0) {
	return this.title.compareTo (other.title);
	}
	
	return genreComparison;
	
	}
	
	public String getTitle(){
		return title;
	}
	
	public Genre getGenre(){
		return genre;
	}
	
	public int getEdition(){
		return edition;
	}
	
	public int getYear(){
		return year;
	}
	
	
}