/* 
 * author: DeJohn Thompson
 * ID 890586057
 * Section: 002
 */

public class Books extends Publication {
	
	private String author;

	public Books(String author, String title, Genre genre, int edition, int year) {
		super(title, genre, edition, year);
		this.author = author;
	}
	
	@Override
	public String printInfo(){
		String info = super.getTitle() + " Edition " + super.getEdition() + " Published in " + super.getYear() + "\n" + super.getGenre() + " Book By " + author + "\n" + super.printFooter(); 
		return info;
}
	

}
