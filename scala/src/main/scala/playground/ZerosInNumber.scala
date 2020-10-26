package playground

/** Write a program that will calculate the number of trailing zeros in a factorial of a given number.

N! = 1 * 2 * 3 * ... * N

Be careful 1000! has 2568 digits...

For more info, see: http://mathworld.wolfram.com/Factorial.html

Examples
zeros(6) = 1
# 6! = 1 * 2 * 3 * 4 * 5 * 6 = 720 --> 1 trailing zero

zeros(12) = 2
# 12! = 479001600 --> 2 trailing zeros

 */


object ZerosInNumber extends App {
  def zeros(n: Int): Int = {
    def iter(i: Int, res: Int): Int = {
      if (i < n) iter(i * 5, res + n / i)
      else res
    }
    iter(5, 0)
  }

  def factorial(n: BigInt): BigInt = {
    def iter(i: BigInt, res: BigInt): BigInt = {
      println(i, res)
      if(i == n) res
      else iter(i+1, res*i)
    }
    iter(1, 1)
  }

  println(factorial(34))
//  println(zeros(34))
//  println(factorial(35))
//  println(zeros(35))
//  println(factorial(36))
//  println(zeros(36))
}
