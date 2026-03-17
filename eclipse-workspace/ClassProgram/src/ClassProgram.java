import java.util.Stack;

public class ClassProgram {
	
	public static int evaluateExpression(String input) {
		
	
		char[] String = input.toCharArray(); 
		Stack<Character> myStack = new Stack<>(); 
		
		for (int i = 0; i < String.length; i++) {
			myStack.push(String[i]);
		
		
		if (String[i]=='*'||String[i]=='+'||String[i]=='-'||String[i]=='/') {
			int num1 = myStack.pop();
			int num2 = myStack.pop();
	
			
			if(char[i])
		}
		
		}
		
		return 0;
		
		
	}

}
