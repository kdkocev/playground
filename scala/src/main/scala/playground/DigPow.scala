package playground

import scala.math.pow

object DigPow extends App {

  def digPow(n: Int, p: Int): Int = {
    val res: Double = digitsToList(n, List()).zipWithIndex.map{case (n, i) => pow(n, i + p)}.sum

    if ((res / n).toInt * n == res)
      res.toInt / n
    else
      -1
  }

  def digitsToList(n: Int, res: List[Int]): List[Int] = {
    if (n == 0)
      res
    else
      digitsToList(n / 10, (n % 10) +: res)
  }

  println(digPow(89, 1))
  println(digPow(92, 1))
  println(digPow(695, 2))
  println(digPow(46288, 3))
  println(digPow(46288, 5))
}
