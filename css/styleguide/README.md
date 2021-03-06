# CSS styleguide

## Units

### Static

Units that do not change with respect to the other elements on the page:
- **px** - pixels
- **cm** - centimeters
- **in** - inches
- **mm** - milimeters
- **pt** - points = 1/72 of an inch
- **pc** - picas = 12 points

### Relative

Units that change depending on their container or the browser window:
- **%** - percent (100% - the entire space)
- **em** - relative to the height of the font 1 em - the width of a capital letter M. Inheritence is taken into account
- **vw** - viewport width - relative to a percentage of the width of the browser window
- **vh** - viewport height - relative to a percentage of the height of the browser window
- **vmin** - the smaller size comparing 1vw and 1vh
- **vmax** - the larger size comparing 1vw and 1vh
- **rem** - root em - the same as em for the default base font-size. Inheritence plays no role here.
- **ex** - height of a lower-case letter x
- **ch** - width of the number 0

### Unitless values

If you don't set a unit on  some css properties - the value you set acts as a multiplying factor.

```
line-height: 1.5;
```


### Good practices

It's a good practise to:
- use only relative units when creating a component.
- to work in `rem`s in your entire project. That way you can scale everything just by tweaking the root element's font-size.
- to work in `em`s when writing a component that should have the ability to be scaled up or down.

### Bad practices

It's a bad practise to:
- mix static and relative units together when styling an element.

## Naming

// TODO: .wrapper > .container .content > div .....etc.

## Nesting

// TODO .parent > .child > div

## Grid using "CSS Flex"

We use grids to create the entire layout of our page. Every page can be separated to a grid of nested rectangles. No matter how curvy the design is - it can always be described using rectangular shapes (if you do not agree please see [Multivariable Calculus](http://tutorial.math.lamar.edu/Classes/CalcIII/DoubleIntegrals.aspx))

If you're having troubles with the grids in css you should check if your HTML structure is correct first. **CSS code should not have to get around a bad HTML design/nesting.** Rather think about weather your HTML has a good structure before starting with the css grid.

Lets split a single level of a grids into a `container` (parent) element and `cell` child elements. A container element contains cells. A cell could be a container itself but for a deeper level of nesting.

### Good practices

Several rules about grids:
- A container's width is determined by its parent.
- A cell's width should ideally be relative to the parent. (You would rarely need fixed cell widths within a container)
- A cell should not have a margin defined. Cells in a grid should be either right next to each other or separated by using `justify-content`
- A cell should have a `box-sizing:border-box` if it has a `padding`
- A cell should not have a `border` for the same reason as it shouldn't have a `margin`. If you need a border - define it on an element within the cell instead. A cell should only wrap its contents without styling them
- Get familiar with `display: flex` `justify-content:...` `align-items:` `flex-direction:` `flex-wrap:`

### Bad practices

- Using margin between cells in a grid
- Having a `border` on cells

### Examples

**Note:** Troughout all the examples we will not change the way that the html is structured in order to show that we can do any grid by using only css

#### Simple grid example:

![Grid 1](assets/grid_1_1.png)

So how is this grid constructed?

![Grid 1 highlighted](assets/grid_1_1_highlighted.png)

We can see in the highlighted image that cells have no space between them despite that the gray boxes in the first image have some white space between them. This is because a cell should only wrap its contents and not style them. Note that this space between the gray boxes is made using `padding` in the cells rather than `margin` between the cells.
You can find the code [here](examples/grid_flex/grid_1_1.html)

If you want to - you can have grids with an odd number of columns like this:

![Grid 1 2](assets/grid_1_2.png)

Code can be found [here](examples/grid_flex/grid_1_2.html)

#### Wrapped grid example:

In order to create a wrapped grid you should have several things in mind:
- The cells should have a flex-basis value that is not merely a number but a percentage or a fixed amount.
- You should be using `justify-content:flex-start` (the default one) instead of `center`
- You should tell your container that elements inside are supposed to be wrapped by stating `flex-wrap: wrap`

![Grid 2](assets/grid_2.png)

![Grid 2](assets/grid_2_highlighted.png)

##### Common mistake 1:

Using `flex-basis:1;` (relative fraction) instead of `flex-basis: 25%;` (relative percent) will lead to the following:

![Grid 2 mistake 1](assets/grid_2_mistake_1.png)

Using `flex-grow: 1;` instead of `flex-grow:0;`. (here we correctly use `flex-basis:25%`) will result in the following:

![Grid 2 mistake 2](assets/grid_2_mistake_2.png)

This doesn't look bad and sometimes it is really the desired behavior. It can easily become a feature rather than a bug. But use it carefully because adding a 7th element results in the following:

![Grid 2 mistake 3](assets/grid_2_mistake_3.png)

And removing an element results in the following:

![Grid 2 mistake 4](assets/grid_2_mistake_4.png)

These last two are mistakes because the grid should rarely (almost never) look differently depending on the amount of elements it has. If you **DO** need a grid that has cells with different widths - check out the *Uneven Grid* section of this styleguide.

**Summary:** `flex-basis` sets the element's minimum width within a grid. `flex-grow` sets if and how much should the element grow if there is space left in the grid. When `flex-grow` is set to 0 it means that the element should not take more space than specified by `flex-basis`. Both `flex-basis` and `flex-grid` are compacted into the `flex` attribute as fhe first and second argument respectively.

##### Common mistake 2:

Not using `flex-wrap` in a multy-line grid:

![Grid 2 mistake 5](assets/grid_2_mistake_5.png)

This happens when using `flex-wrap:nowrap` (the default) despite setting `flex-basis` to 25% or even some fixed ammount (for example 300px). The grid's width is less than the width of all cells combined so they are reduced to an amount that will fit in the container.

##### Common mistake 3:

Using `justify-content: center`
This is sometimes the desired behavior:

![Grid 2 mistake 6](assets/grid_2_mistake_6.png)

You can find the code and play around with it [here](examples/grid_flex/grid_2.html)

#### Uneven grid

![Grid 3 1](assets/grid_3_1.png)

This effect is achieved by setting a `large` class on the larger cell with styles `flex-basis:50%;`
You can also do something like this:

![Grid 3 2](assets/grid_3_2.png)

You can even do a grid like the following:

![Grid 4](assets/grid_4.png)

Yes this is a grid and note that we haven't changed the html at all. All the cells are in the same container like before. You can see the code [here](examples/grid_flex/grid_4.html)

You can even do something like this:

![Grid 5](assets/grid_5.png)

Code can be found [here](examples/grid_flex/grid_5.html)

You can have a grid that doesn't even look like a grid:

![Grid 6](assets/grid_6.png)

Code can be found [here](examples/grid_flex/grid_6.html)

#### Grid with spread cells

![Grid 7 1](assets/grid_7_1.png)

**Note** that the cells in this example do not "touch":

![Grid 7 1 highlighted](assets/grid_7_1_highlighted.png)

Code can be found [here](examples/grid_flex/grid_7_1.html)

This type of grids have a strange side effects when wrapping with less cells than can be contained.

![Grid 7 2](assets/grid_7_2.png)

#### Grids with even width and height cells

//TODO

#### Grids that are not rectangular

// TODO

### Aligning grids on top of each other minding the padding

// TODO

## Grid using "CSS Grid"

// TODO

## Forms

// TODO

## Images

// `background-image` vs `<img/>`

## The `position:` drama 

// Working with position fixed/absolute/relative. When not to.

## Popups/Modals/Tooltips the right way

// TODO

## Centering elements

The main concern when centering an element is that it has to be in the center no matter the parent width or height.
Centering the element only on the horizontal plane is easy if you set `display: flex` with `margin: auto;`
There are many ways in which you can achieve that. You can use `position: absolute;` with a negative margin. You can use `display:flex;` with `justify-content: center;` and `align-items: center;`. You can even use percentages to size your element 
// how to put something in the center of an element. Insights into margin: auto, position: absolute, negative margins. how to make modals and so on...

## Symbols in css > + ~ etc.

// TODO

## Custom shapes

// arrows made with borders, elipses, strange squares, donuts etc.

## CSS in React

// Good practices with reference to HackSoft react styleguide

## General good practices

// TODO

## General bad practices

- Using `important` when overwriting a non-static class.