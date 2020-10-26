package playground

object FindMissingLetter extends App {
  /**
   * #Find the missing letter
   *
   * Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.
   *
   * You will always get an valid array. And it will be always exactly one letter be missing. The length of the array will always be at least 2.
   * The array will always contain letters in only one case.
   *
   * Example:
   *
   * ['a','b','c','d','f'] -> 'e' ['O','Q','R','S'] -> 'P'
   */
  def findMissingLetter(chars: Array[Char]): Char = {
    chars.head.toInt
    println(chars.toList.zip(chars.head.toInt to 'z'.toInt).filter{case (ch: Char, n: Int) => ch.toInt != n}.head._2.toChar)

    'a'
  }

  println((Array('z', 'b', 'c', 'd', 'f').head.toInt to 122).toList)
  findMissingLetter(Array('a', 'b', 'c', 'd', 'f'))
}
