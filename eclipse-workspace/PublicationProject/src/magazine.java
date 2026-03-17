/* 
 * author: DeJohn Thompson
 * ID 890586057
 * Section: 002
 */

public class magazine extends Publication {
	
	private String publisher;

	public magazine(String publisher, String title, Genre genre, int edition, int year) {
		super(title, genre, edition, year);
		this.publisher = publisher;
	}
	
	@Override
	public String printInfo(){
		String info = super.getTitle() + " Edition " + super.getEdition() + " Published In " + super.getYear() + "\n" + super.getGenre() + " Magazine by " + publisher + "\n" + super.printFooter(); 
	
		return info;
}

}
