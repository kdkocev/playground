package playground

/**
 * In mathematics, a Diophantine equation is a polynomial equation, usually with two or more unknowns, such that only the integer solutions are sought or studied.
 *
 * In this kata we want to find all integers x, y (x >= 0, y >= 0) solutions of a diophantine equation of the form:
 *
 * x2 - 4 * y2 = n
 * (where the unknowns are x and y, and n is a given positive number) in decreasing order of the positive xi.
 *
 * If there is no solution return [] or "[]" or "". (See "RUN SAMPLE TESTS" for examples of returns).
 *
 * Examples:
 * solEquaStr(90005) --> "[[45003, 22501], [9003, 4499], [981, 467], [309, 37]]"
 * solEquaStr(90002) --> "[]"
 * Hint:
 * x2 - 4 * y2 = (x - 2*y) * (x + 2*y)
 */

object DiophantineEquation extends App {
  /**
   * x ^2 - 4*y^2 = n
   * (x - 2y)*(x + 2y) = n
   * (x - a)*(x + a) = n
   *
   * So if n can be presented as a multiplication of Integers
   * n = p * q
   * Then
   *
   * (x - a) = p
   * (x + a) = q
   *
   * If we take all the divisors of n - we can find p and q by multiplying the divisors into two groups
   * Example:
   * 90005 divisors = [5, 47, 383]
   * groups -> [ (5, 47*383), (5*47, 383), (5*383, 47) ]
   * Then we just check which groups work for us in the above equation and present the answer
   */
  def solEquaStr(n: Long): String = {
    val lod = listOfDivisors(n)

    val valuesForXAndA = (for {
      lodPerm <- lod.permutations
      i <- 1 to lod.length / 2
    } yield {
      (lodPerm.take(i).product, lodPerm.drop(i).product)
    }).map{case (a, b) => if (a < b) (a, b) else (b, a)} // Sort lower in front
      .toSet
      .toList

    val finalRes = valuesForXAndA
      .filter{case (a, b) => (b + a) % 2 == 0 && (b - a) % 2 == 0}
      .map{case (a, b) => ((b + a)/ 2, (b - a) / 2)} // Here we have the x and a values from above
      .filter{case (_, b) => b % 2 == 0} // Filtering all a % 2 == 0 since we have a = 2*y
      .map{case (a, b) => List(a, b/2)} // For all cases left go back to x and y by splitting a
      .sortBy(-_.head)

    "[" + finalRes.map(x => s"(${x.mkString(", ")})").mkString(", ") + "]"
  }

  def isPrime(n: Long): Boolean = ! ((2L to Math.sqrt(n).toLong) exists (n % _ == 0))

  def listOfDivisors(n: Long): List[Long] = {
    def iter(num: Long, curr: Long, res: List[Long]): List[Long] = {
      if (!isPrime(curr)) iter(num, curr+1, res)
      else if(isPrime(num)) res :+ num
      else if(num % curr == 0) {
        iter(num / curr, curr, res :+ curr)
      } else {
        iter(num, curr + 1, res)
      }
    }
    1L :: iter(n, 2, List())
  }

  val time1 = System.currentTimeMillis()
  val res = solEquaStr(1330560)
  val time2 = System.currentTimeMillis()
  println(res)
  println(s"${time2 - time1}ms")



  /**
   * Actual: [(97, 10), (95, 2), (505, 248), (647, 320), (415, 202), (153, 60), (225, 102), (353, 170), (103, 20), (4505, 2252), (1503, 750), (135, 48)]
     * Expect:
   * [(4505, 2252), (1503, 750), (647, 320), (505, 248), (415, 202), (353, 170), (225, 102), (153, 60), (135, 48), (103, 20), (97, 10), (95, 2)]
   */
}
