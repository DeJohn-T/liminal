package stack;

import java.util.Stack;
        
public class Stack {


    public static void main(String[] args) {
        
        System.out.println(isBalancedExpr("[()]"));
        
    }
    
    public static boolean isBalancedExpr(String input)
    {
        char [] chars = input.toCharArray();
        Stack <Character> myStack = new Stack<>();
        
        for(int i = 0; i < chars.length;i++){
            if (chars[i] != '{'&& chars[i] != '(') 
            myStack.push(chars[i]);
            
            else if(chars[i] != '{'&& chars[i] != '('){
                if(myStack.empty())
                    return false;
                
                char op = myStack.pop();
                
                if(op == '(' && chars [i] != ')')
                    return false;
            }       
            
        }
        
        if(myStack.isEmpty())
            return true;
        
        return false;
        
            
    }
    
}
