package Palindrome;

// За да можем да въвеждаме през клавиатурата,
// трябва да добавим този клас
import java.util.Scanner;

public class Palindrome {

    // Когато дефинираме метод като public static ... в същия клас,
    // можем да го извикваме в main без допълнителни описания
    public static int reverse(int n){
        // Това ще е числото, което връщаме. В началото е 0 заради логиката по-нататък
        int reversed = 0;
        // Помощна променлива, която е само за яснота на кода - може и без нея
        int number;
        
        // Докато подаденото число е >0
        while(n > 0) {
            // Запаметяваме в помощната променлива всяка цифра от n по ред
            // започвайки от последната към първата
            number = n%10;
            // Премахваме последната цифра от n след като сме я запаметили в number
            n = n / 10;
            
            // изместваме всички цифри на reversed, като го умножаваме с 10
            // и добавяме последата взета цифра от n
            reversed = reversed * 10 + number;
        }

        return reversed;
    }
    
    public static void main(String[] args) {
        // Ползваме scanner за да въвеждаме от клавиатурата
        Scanner scanner = new Scanner(System.in);
        
        // Тази част е извън задачата и е само за да демонстрира
        // как се въвежда char от клавиатурата, чрез scanner
        char b = scanner.next().charAt(0);
        System.out.println(b);
        
        // с метода .nextInt() запаметяваме в "number" следващото въведено число
        int number = scanner.nextInt();
        // събираме "number" с обратното на "number" число
        number = number + reverse(number);
        
        if(reverse(number) == number){
            System.out.println(number + " is a palindrome");
        } else {
            System.out.println(number + " is NOT a palindrome");
        }
    }

}
