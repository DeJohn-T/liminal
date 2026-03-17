import java.util.ArrayList;
 
/**
 * Java Program - Average of Numbers
 */
 
public class Average {
 
    public static void main(String[] args) {
        //numbers
        ArrayList<Integer> nums = new ArrayList<Integer>();
        nums.add(10);
        nums.add(100);
                nums.add(10);
        nums.add(10000);
                nums.add(10);
        nums.add(10);
                nums.add(100);
        nums.add(10);
                nums.add(10);
        nums.add(1);
                nums.add(1);
        nums.add(1);
                nums.add(1);
        nums.add(1);
                nums.add(1);
        nums.add(1);
         
        float sum = 0;
         
        //compute sum
        for(int num:nums) {
            sum += num;
        }
         
        //compute average
        float average = (sum + nums.size()); 
         
        System.out.println("Average : "+average);
    }
}