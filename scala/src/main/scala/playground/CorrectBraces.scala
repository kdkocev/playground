package playground

object CorrectBraces extends App {

  def validBraces(s: String): Boolean = {
    def init(braces: List[Char], stack: List[Char]): Boolean = {
      braces match {
        case head :: tail if head == '[' || head == '(' || head == '{' => init(tail, head +: stack)
        case _ if braces.nonEmpty && stack.isEmpty => false
        case ']' :: tail if stack.head == '[' => init(tail, stack.tail)
        case '}' :: tail if stack.head == '{' => init(tail, stack.tail)
        case ')' :: tail if stack.head == '(' => init(tail, stack.tail)
        case List() if stack.isEmpty => true
        case _ => false
      }
    }

    init(s.toList, List())
  }

  println(validBraces("[()]{}({})"))
}
