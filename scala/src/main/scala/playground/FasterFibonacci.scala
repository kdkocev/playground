package playground

import collection.mutable.Map

object FasterFibonacci extends App {
  val theMap: Map[Int, BigInt] = Map(0 -> 0, 1 -> 1)

  def fib(n: Int): BigInt = {
    println(s"Look for $n")
    theMap.get(n) match {
      case Some(n) => {
        println("Hit")
        n
      }
      case None => {
        println(s"Not found $n. Calculating")
        val res = fib(n-1) + fib(n-2)
        theMap.addOne((n, res))
        res
      }
    }
  }

  println(fib(50), theMap)
}
