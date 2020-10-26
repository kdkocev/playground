package playground

/**
 * Given a rational number n
 *
 * n >= 0, with denominator strictly positive
 *
 * as a string (example: "2/3" in Ruby, Python, Clojure, JS, CS, Go)
 * or as two strings (example: "2" "3" in Haskell, Java, CSharp, C++, Swift)
 * or as a rational or decimal number (example: 3/4, 0.67 in R)
 * or two integers (Fortran)
 * decompose this number as a sum of rationals with numerators equal to one and without repetitions (2/3 = 1/2 + 1/6 is correct but not 2/3 = 1/3 + 1/3, 1/3 is repeated).
 *
 * The algorithm must be "greedy", so at each stage the new rational obtained in the decomposition must have a denominator as small as possible. In this manner the sum of a few fractions in the decomposition gives a rather good approximation of the rational to decompose.
 *
 * 2/3 = 1/3 + 1/3 doesn't fit because of the repetition but also because the first 1/3 has a denominator bigger than the one in 1/2 in the decomposition 2/3 = 1/2 + 1/6.
 *
 * Example:
 * (You can see other examples in "Sample Tests:")
 *
 * decompose("21/23") or "21" "23" or 21/23 should return
 *
 * ["1/2", "1/3", "1/13", "1/359", "1/644046"] in Ruby, Python, Clojure, JS, CS, Haskell, Go
 *
 * "[1/2, 1/3, 1/13, 1/359, 1/644046]" in Java, CSharp, C++
 */

object DecomposeRationalNumber extends App {
  def decompose(nrStr: String, drStr: String): String = {
    def iter(numerator: Int, denominator: Int, currentDen: Int, res: List[String]): List[String] = {
      if (numerator == 0) res
      else if (Math.round(numerator / denominator) == numerator.toDouble / denominator) {
        res :+ (numerator / denominator).toString
      } else {

        println(numerator, denominator, currentDen, res)
        if (numerator * currentDen - denominator == 0) res :+ s"1/$currentDen"
        else {
          val newNum = numerator * currentDen - denominator
          val newDen = denominator * currentDen
          val newTestDen = Math.ceil(newDen.toDouble / newNum).toInt
          iter(
            newNum,
            newDen,
            newTestDen,
            res :+ s"1/$currentDen"
          )
        }
      }
    }
    "[" + iter(nrStr.toInt, drStr.toInt, Math.ceil(drStr.toDouble / nrStr.toDouble).toInt, List()).mkString(", ") + "]"
  }

//  println(decompose("1001", "3456"))

//  num *       1                ??    -             <>
//  num * Math.ceil(den / num) - den - Math.floor(num / den) * den

  //              1              -           <>
  //  num * Math.ceil(den / num) - Math.floor(num / den) * den
  //                                     ||
  //              <>             -           1
  //  num * Math.ceil(den / num) - Math.ceil(num / den) * den

  def decompose2(nrStr: String, drStr: String): String = {
    @scala.annotation.tailrec
    def iter(num: Int, den: Int, res: List[String]): List[String] = {
      if (num == 0) res
      else if (num == 1) res :+ s"1/$den"
      else {
        val t = Math.ceil(den.toDouble / num).toInt
//        println(num, den, t)
        if (t == 1) {
          iter(
            num - (num / den) * den,
            den,
            res :+ (num / den).toString
          )
        }
        else {
          iter(
            (num * t) - den,
            den * t,
            res :+ s"1/$t"
          )
        }
      }
    }
    "[" + iter(nrStr.toInt, drStr.toInt, List()).mkString(", ") + "]"
  }


  def decompose3(nrStr: String, drStr: String): String = {
    @scala.annotation.tailrec
    def iter(num: Int, den: Int, res: List[String]): List[String] = {
//      println(num,den, Math.ceil(den.toDouble / num ))
      if (num == 0) res
      else if(num >= den) {
        iter(num % den, den, res :+ s"${num/den}")
      } else {
        val t = Math.ceil(den.toDouble / num).toInt
        iter(num * t - den, den * t, res :+ s"1/$t")
      }
    }
    "[" + iter(nrStr.toInt, drStr.toInt, List()).mkString(", ") + "]"
  }

  def decompose4(nrStr: String, drStr: String): String = {
    @scala.annotation.tailrec
    def iter(num: BigInt, den: BigInt, res: List[String]): List[String] = {
      if(num == 0) res
      else if(num >= den) iter(num % den, den, res :+ s"${num/den}")
      else {
        val t = BigDecimal(Math.ceil(den.toDouble / num.toDouble)).toBigInt
        println(den / num)
        iter(num * t - den, den * t, res :+ s"1/$t")
      }
    }
    "[" + iter(nrStr.toInt, drStr.toInt, List()).mkString(", ") + "]"
  }

//  println(decompose("50", "4187"))
//  println(decompose2("50", "4187"))
//  println(decompose3("50", "4187"))
  println(decompose4("50", "4187"))

}

