# Project 3: Spots

### Overview  

* Intro  
* CSS Grid
* Media Queries

[Github page link](https://psswincher.github.io/se_project_spots/)

[Video Tour Link](https://www.loom.com/share/77a4efdfd3c24c31bab02c4b4cad9101?sid=f5c3c03b-878d-4ebc-b475-1caff9df03a5) 
  
**Intro**
  
This project was an exercise in ensuring all design elements display properly across several popular screen sizes. This was done with two techniques: CSS Grid and Media Queries.
  
**CSS Grid**  

The cards.css file features the primary code that enables the images in the body of the website to vary their layout from screen size to screen size:

```
.cards__list {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25.8rem, 1fr));
    row-gap: 40px;
    column-gap: 20px;
}
```

By setting an auto-fill within on the number of columns in a repeat function, the number of columns scales automatically to to the user's screen size. The minimum column width of 25.8rem is calculated based on the maximum container size and desired column-gap for the grid. 

This auto-fill sizing takes care of both desktop and tablet views, giving the user three and two columns of photos (respectivelly) based on available view width.

**Media Queries**  

There are several crucial media queries to creating the responsive design for mobile devices. These media queries needed accomplish two tasks:
* rearrange the profile section of the page to vertically stack elements when the screen width no longer leaves space for all elements to be laid out in a row
* resize the user's avatar when the device no longer has width to show it clearly
* resize the width of grid columns and their included photos when the screen's width gets too small to support the full sized ones from the tablet/desktop views.

In this exercise, I approached resizing the images as separate from the rearranging of the page's elements. The media queries are designed to rearrange page elements as soon as text becomes overcrowded in order to ensure their legibility. On the other hand, images are resized when the screen becomes too small to support them at their full resolution.

As such, the media query sizes that seemed to best accomplish these goals occur at a min-width of 840px (rearranging elements) and then again at 500px (shrinking images). Media queries make use of min-width as the site was built from the desktop view first, and then smaller screens are accomodated via subsequent adjustments.