/* 
 * author: DeJohn Thompson
 * ID 890586057
 * Section: 002
 */

import java.util.ArrayList;
import java.util.Collections;

public class PublicationProject {

	
	public static void main(String[] args) {
		ArrayList<Publication> pubs = new ArrayList<>();
		pubs.add(new Books("John Carreyrou", "Bad Blood: Secrets and Lies in a Silicon Valley Startup", 
		Genre.THRILLER, 1, 2018));
		pubs.add(new Books("Andriy Burkov", "The Hundred-Page Machine Learning Book", Genre.SCIENCE, 1, 
		2019)); 
		pubs.add(new magazine("Meredith Corporation", "Sports Illustrated", Genre.ATHLETIC, 633, 2020));
		pubs.add(new magazine("Meredith Corporation", "People", Genre.ENTERTAINMENT, 466, 2020));
		 
		Collections.sort(pubs);
		 for(Publication p : pubs)
		 System.out.println(p.printInfo());

	}
}
