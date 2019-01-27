---
date: '2019/01/23'
slug: 'three-key-concepts'
title: '3 Key Concepts for beautiful, responsive layouts'
tag: 'Border-box, Flex-box, and Grids'
thumbnail: './thumbnail.png'
---

When I first became interested in programming as a freshman in high school, one of the first things I stumbled upon was web development.
I am fairly certain this came to be thanks to a search like _'How do I make a website?'_.
After tinkering a little with laying out HTML elements on a page, I realized that my site looked like it was from the 90's.
A few more equally eye-opening queries lead me to discover CSS.

**Great!** Now I can layout my page exactly how I want.
After successfully making a basic header and some body information, I was ecstatic!
That was until the idea crossed my mind to resize the browser window.
Turns out layouts based on absolute pixel locations are not exactly what one would call responsive.
Fast-forward to 2019, and I can proudly say that my ability to design and implement layouts have improved.

A few days ago, an idea popped into my head: <br />
**If I could go back to the beginning, what is one thing that I wish I knew?**

---

After some _serious_ silent reflection, I decided it would be knowing how to make simple, responsive layouts with CSS.
My learning process was filled with headaches and frustration, and I am better for having gone through it.
But here are my notes on this topic anyway!.

The 3 topics I would like to focus on are Border Box, Flex, and Grid.

# Border Box

```css
* {
  box-sizing: border-box;
}
```

## Why box-sizing: border-box?

As you probably know, HTML elements size is defined by a width and height property.
However, what counts as the width or height is often unclear.
Take a common example, adding some styling to a \<button\> tag.
Given a basic input form:

```html
<html>
  <head></head>
  <body>
    <form>
      <h2>Join my mailing list!</h2>
      <input type="text" placeholder="Enter your email here" />
      <button>Sign me up!</button>
    </form>
  </body>
</html>
```

![Screenshot_1](./border-box/SCREENSHOT_1.png)

Since I want to really grab the user's attention, I want to make my button nice and big.
This container is 300px, and I think 250px is how wide my button should be.

![Screenshot_2](./border-box/SCREENSHOT_2.png)

Something seems kind of off, but I just want some space around the text of the button, which is called padding.
I think 20px of vertical and 40px of horizontal padding sounds good.

![Screenshot_3](./border-box/SCREENSHOT_3.png)

Wait, what happened?

## What is box-sizing?

The box-sizing of an element is the bounding box for defining the dimensions of an element.
There are 4 properties of an element that affect its dimensions.
From the center of an element out they are: content, padding, border, margin.

When you define a height or width, you are specifying the size of the box.
In HTML, the default box-sizing value is content-box.
(Some browser mitigate this issue by forcing border-box as the default, but the HTML standard is still content-box)
This means that when you define a height or width, you are specifying the dimensions of the content.
Everything beyond the content, which is the padding, border, and margin is then considered outside the bounding box of the element.
Therefore if you have an element that is 100px by 100px, if you add 20px of padding, its _true_ dimensions are 140px by 140px.

So, by changing this box-sizing property, we can change how the dimensions of an element are calculated.
Choosing border-box takes the padding and border into consideration when determining the width and height.
This makes the most sense, as the padding and border can be considered a part of the element.
Take the example of the 100px by 100px element now, and apply 20px of padding to it.
Its dimensions will still be 100px by 100px, but the size of the content-box will be shrunk to 60px by 60px.

## Why is this applied on all elements?

Gone are the days of calculating margin between elements based on padding values.
By applying this to all elements on the page, we ensure that as long as we use non-negative values for our margin and padding no elements will overlap.
Many popular UI libraries such as
<elink to="https://getboostrap.com/">Bootstrap</elink>
use this very technique to make layouts much more simple.

## Button Padding Example

Check out these links to see this in action:

[box-sizing: content-box]()

[box-sizing: border-box]()

All of the extraneous CSS is just to center everything so that when the box-sizing is changed, the difference becomes more apparent.

## Note

At the beginning of creating any stylesheet, the first thing I do is place the following at the top.

```css
* {
  padding: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;
}
```

This ensures that every element on the page will behave the way I want and expect them to.

---

# Flex

```css
.my-class {
  display: flex;
}
```

## Why display: flex?

By declaring the display property as flex, we have defined our element to be a flex-box.
This makes our element a container that applies flex rules, only to its direct children.

## What is a flex-box?

A flex-box is a type of container that allows for organization of its children elements in a relative and therefore reactive manner.
Instead of relying on absolute pixel positions or percentages, we can simply use a flex-box.
I will not dig too deep here, and only intend to go over some basic things one would need to implement a flex-box in most cases.

Take the examples from above.
Notice how the form was centered both horizontally and vertically?
This was done using a flex-box.

## Organization patterns

When using flex-boxes, there are a few things we must always do.
First, apply `display: flex;` to the container.
Next, define the height and width of this container.
(In the previous examples, the dimensions were 100vw x 100vh, or the size of the window).
After that, we can specify our justify-content property.
By default this allows us to control the left-right placement of the children, however this can be changed by altering the flex-direction.
Here we can also define a value for align-items, which is the up-down placement by default.
Finally, we can define the flex-wrap property, if we want our children to be automatically wrapped based on the size of the container.

## Smart wrapping

Flex-boxes provide a way to intelligently wrap your elements when the size of their container shrinks.
A new row is automatically wrapped if:

- The window resizes and shrinks the container
- The next child element makes the total row width greater than the container

A key thing to remember is that this is true of the default flex-direction, changing it will make the above true, just with respect to columns and not rows.

## Usage

What has been mentioned above are the basic ideas that one needs in order to use a flex-box in most cases.
Getting more out of this display type mostly revolves around knowing what values each property can have and what they mean.

In order to use flex-boxes to their full potential please [review this documentation](W3SCHOOLS).

## Header Example

When using flex-boxes, you will often find yourself nesting layers of flex-boxes;
the following is an example of how this can happen and how to handle it.

![header_example](./flex/header.png)

See the whole HTML document here: [Header Example]()

---

# Grid

```css
.my-class {
  display: grid;
}
```

## Why display: grid?

Similar to above, this property allows us to define our element as a container, but instead of a flex-box we get a grid.
These grids give us more control in two dimensions for laying out our data, and often are an easy way to approach situations that can become complicated with just flex-boxes.

## What is a grid?

Grids are defined in rows and columns.
Fortunately, we can define our grids in a simple way to make them responsive.
With this approach you should be able to get away from having to assign classes like `col-1 3-wide`.

The best approach is to think of your page in sections, or grid areas.
A grid-area is a 'cell' in a grid.
Grid-areas may span multiple columns and rows.

`grid-area: <area-name>;` is a CSS property that can be applied to children elements of your container.
A great example of this is a generic page layout, with a fixed header and sidebar.

## Side Panel Example

Here is a very simple way to layout a page with two containers, with one as a sidebar and the other as the main section.

![grid_example_1](./grid/grid_1.png)

Here, the whole body is:

```html
<body>
  <div class="wrapper">
    <div class="sidebar"></div>
    <div class="head"></div>
    <div class="main"></div>
  </div>
</body>
```

And here is all of the relevant style:

```css
.wrapper {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: grid; // highlight-line
  grid-template-columns: 300px auto; // highlight-line
  grid-template-rows: 200px auto; // highlight-line
  grid-template-areas: 'sidebar head' 'sidebar main'; // highlight-line
}
.sidebar {
  grid-area: sidebar; // highlight-line
  min-width: 100%;
  min-height: 100%;
  background: #00ff00;
}
.head {
  grid-area: head; // highlight-line
  min-width: 100%;
  min-height: 100%;
  background: #0000ff;
}
.main {
  grid-area: main; // highlight-line
  min-width: 100%;
  min-height: 100%;
  background: #ff0000;
}
```

First, I set `grid-template-columns: 300px auto`.
This define two columns, with the left one being fixed at 300px, while the right will just take up the rest of the space.
Next, I define `grid-template-rows: 200px auto`.
This says I have two rows, a fixed top one and a fluid bottom one.
Same as with flex-boxes, you can use any unit to define the size of your rows and columns.
Be it percents, pixels, fractions; it all works here.
Now, I define the layout of grid with `grid-template-areas: 'sidebar head' 'sidebar main';`

When setting this property, each string represents a row.
There should be as many strings are there are rows, and each string should have as many labels as there are columns.
A space can be left blank by using a period '.'.

Finally, with our grid defined, we can now assign these areas to other classes by setting their `grid-area` property.

## Benefits

One great thing about grids is that the above grid can be changed to this:

![grid_example_2](./grid/grid_2.png)

just by changing:

```css
grid-template-areas: 'sidebar head' 'sidebar main';
```

to:

```css
grid-template-areas: 'head head' 'sidebar main';
```

---

# Combined

The real potential of these three concepts becomes apparent when they are combined.
Take this example:

## Header, Sidebar, and Main section

![combined_example](./combined/combined.png)

Thanks to the grid layout system, all that is needed to make this page render on a mobile viewport is a media query where you redefine the grids to be one column.
The result of just changing the page and main grids is the following:

![combined_mobile_1](./combined/combined_mobile_1.png)

![combined_mobile_2](./combined/combined_mobile_2.png)

## Closing

The crucial takeaway with these three topics is that they become most useful when used in conjunction.
By nesting flex-boxes and grids you can create responsive layouts with ease.

All of the source code can be found here:

![]()

Thank you for reading!
