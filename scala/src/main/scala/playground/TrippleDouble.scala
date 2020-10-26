package playground

/**
 * Write a function
 *
 * tripleDouble(num1: Long, num2: Long): Int
 * which takes numbers num1 and num2 and returns 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2.
 *
 * If this isn't the case, return 0
 *
 * Examples
 * // num1 has straight triple 999s and num2 has straight double 99s
 * tripleDouble(451999277, 41177722899) == 1
 *
 * // num1 has straight triple 2s but num2 has only a single 2:
 * tripleDouble(1222345, 12345) == 0
 *
 * tripleDouble(12345, 12345) == 0
 *
 * tripleDouble(666789, 12345667) == 1
 */

case class Repeating(repeated: Char, numberOfTimes: Int, repeatedChars: List[(Char, Int)])

object TripleDouble extends App {
  def histogram(num1: Long): List[(Char, Int)] = {
    val res = num1.toString.foldLeft(Repeating('1', 0, List())) {
      case (Repeating(repeated, numOfTimes, repeatedChars), ch) if ch == repeated =>
        Repeating(repeated, numOfTimes + 1, repeatedChars)
      case (Repeating(repeated, numOfTimes, repeatedChars), ch) if ch != repeated =>
        Repeating(ch, 1, (repeated, numOfTimes) +: repeatedChars)
    }
    (res.repeated, res.numberOfTimes) +: res.repeatedChars
  }

  def tripleDouble(num1: Long, num2: Long): Int = {
    val num2Hist: List[(Char, Int)] = histogram(num2)

    val res = histogram(num1).exists {
      case (ch1, n) =>
        n >= 3 && num2Hist.exists {
          case (ch2, n2) => ch1 == ch2 && n2 >= 2
        }
    }

    if (res) 1 else 0
  }

  println(tripleDouble(451999277L, 41177722899L))
  println(tripleDouble(1222345L, 12345L))
  println(tripleDouble(12345L, 12345L))
  println(tripleDouble(666789L, 12345667L))
  println(tripleDouble(10560002L, 100L))
  println(tripleDouble(1112L, 122L))
}
