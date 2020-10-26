package playground

import math.{min, max}

object RGBfunc extends App {
  /**
   * The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.
   *
   * Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.
   *
   * The following are examples of expected output values:
   *
   * rgb(255, 255, 255) // FFFFFF
   * rgb(255, 255, 300) // FFFFFF
   * rgb(0, 0, 0)       // 000000
   * rgb(148, 0, 211)   // 9400D3
   */
  def rgb(r: Int, g: Int, b: Int): String =
    List(r, g, b)
      .map(x => ("0" + min(max(x, 0), 255).toHexString) takeRight 2)
      .mkString.toUpperCase

  println(rgb(9, 0, 0))
  println(rgb(255, 255, 234))
}
