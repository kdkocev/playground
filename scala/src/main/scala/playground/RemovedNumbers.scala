package playground

import scala.annotation.tailrec

object RemovedNumbers extends App {
  /**
   * A friend of mine takes a sequence of numbers from 1 to n (where n > 0).
   * Within that sequence, he chooses two numbers, a and b.
   * He says that the product of a and b should be equal to the sum of all numbers in the sequence, excluding a and b.
   * Given a number n, could you tell me the numbers he excluded from the sequence?
   * The function takes the parameter: n (n is always strictly greater than 0) and returns an array or a string (depending on the language) of the form:
   * [(a, b), ...] or [[a, b], ...] or {{a, b}, ...} or or [{a, b}, ...]
   */
  def removNb(n: Long): List[(Long, Long)] = {

    val sum = n*(n+1)/2
    println(sum)

    @tailrec
    def iter(a: Long, b: Long, prodAB: Long, initialA: Long, initialB: Long): List[(Long, Long)] = {
//      println(s"Checking $a * $b == ${a * b - (sum - (a + b))}")
      if (prodAB == sum - (a + b)) {
//        println("yeye")
        List((a, b))
      } else {
        if (prodAB > sum - (a + b)) {
//          iter(a, b-1, )
          iter(a, b-1, prodAB - a, initialA, initialB)
        } else {
          if (b == n+1)
            List()
          else
            iter(a-1, initialB, sum - (initialA - (a-1)) * initialB, initialA, initialB)
        }
      }
    }

    iter(n/2, n+1, sum, n/2, n+1) ++ iter(n, (n+1)/2, sum, n, (n+1)/2)
  }

  val t0 = System.nanoTime()
  val result = removNb(1000003)
//  val result = block    // call-by-name
  val t1 = System.nanoTime()
  println("Elapsed time: " + (t1 - t0) + "ns")
  println(result)
}
