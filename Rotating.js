/*
 * Rotating.js
 * Version 20160122
 * Written by Harry Wong (RedAndBlueEraser)
 */

/**
 * Operates on HTML elements to smoothly and continuously rotate webpage
 * elements.
 */

/**
 * The collection of constants and functions required to smoothly and
 * continuously rotate webpage elements on the Y-axis, as an Object object.
 */
var RotatingY = {};

/**
 * The rotation for a full cycle in degrees, as a number.
 */
RotatingY.FULL_ROTATION_CYCLE = 180;
/**
 * The rotation for half a cycle in degrees, as a number.
 */
RotatingY.HALF_ROTATION_CYCLE = RotatingY.FULL_ROTATION_CYCLE / 2;
/**
 * The initial rotation in degrees, as a number.
 */
RotatingY.START_ROTATION_CYCLE = -RotatingY.HALF_ROTATION_CYCLE;
/**
 * The final rotation in degrees, as a number.
 */
RotatingY.END_ROTATION_CYCLE = RotatingY.START_ROTATION_CYCLE + RotatingY.FULL_ROTATION_CYCLE;
/**
 * The speed of the rotation in milliseconds, as a number.
 */
RotatingY.SPEED = 1000;

/**
 * The elements to be rotated.
 */
RotatingY.elements = document.getElementsByClassName("rotating-y");
/**
 * The current rotation in degrees, as a number.
 */
RotatingY.rotation = RotatingY.START_ROTATION_CYCLE;
/**
 * The CSS transition used to smoothly rotate webpage elements, as a string.
 */
RotatingY.transition = "transform " + RotatingY.SPEED + "ms linear";

/**
 * Sets the CSS transform for webpage elements.
 * @param  transform  the CSS transform, as a string.
 */
RotatingY.setElementsStyleTransform = function (transform)
{
    "use strict";

    // Store elements and elements.length as a local variable.
    var elements = this.elements,
        elementsLength = elements.length;

    for (var i = 0; i < elementsLength; i++)
    {
        var elementStyle = elements[i].style;

        // Set the CSS transform for all vendor prefixes.
        elementStyle.WebkitTransform = transform;
        elementStyle.MozTransform = transform;
        elementStyle.OTransform = transform;
        elementStyle.transform = transform;

        // Force a reflow on the element.
        elements[i].offsetHeight;
    }

    return;
};

/**
 * Sets the CSS transition for webpage elements.
 * @param  transition  the CSS transition, as a string.
 */
RotatingY.setElementsStyleTransition = function (transition)
{
    "use strict";

    // Store elements and elements.length as a local variable.
    var elements = this.elements,
        elementsLength = elements.length;

    for (var i = 0; i < elementsLength; i++)
    {
        var elementStyle = elements[i].style;

        // Set the CSS transition for all vendor prefixes.
        elementStyle.WebkitTransition = "-webkit-" + transition;
        elementStyle.MozTransition = "-moz-" + transition;
        elementStyle.OTransition = "-o-" + transition;
        elementStyle.transition = transition;
    }

    return;
};

/**
 * Updates the transition and rotation on webpage elements.
 */
RotatingY.update = function ()
{
    "use strict";

    // Add current rotation. This can be in smaller steps for more precision.
    this.rotation += this.FULL_ROTATION_CYCLE;

    // If current rotation is greater than the final rotation.
    if (this.rotation > this.END_ROTATION_CYCLE)
    {
        // Reset current rotation to the initial rotation.
        this.rotation = this.START_ROTATION_CYCLE;

        // Temporary disable CSS transition to jump directly between rotations.
        this.setElementsStyleTransition(null);
        this.setElementsStyleTransform("rotateY(" + this.rotation + "deg)");
        // Re-enable CSS transition.
        this.setElementsStyleTransition(this.transition);

        /* Re-update the transition and rotation on webpage elements
         * immediately.
         */
        this.update();
    }
    else
    {
        this.setElementsStyleTransform("rotateY(" + this.rotation + "deg)");
    }

    return;
};

// Temporary disable CSS transition to jump directly between rotations.
RotatingY.setElementsStyleTransition(null);
RotatingY.setElementsStyleTransform("rotateY(" + RotatingY.rotation + "deg)");
// Re-enable CSS transition.
RotatingY.setElementsStyleTransition(RotatingY.transition);

/* Re-update the transition and rotation on webpage elements
 * immediately.
 */
RotatingY.update();

/* Create a new interval to repeatedly update the transition and rotation
 * on webpage elements.
 */
setInterval(
    function ()
    {
        "use strict";

        RotatingY.update();
    },
    RotatingY.SPEED
    );

/**
 * The collection of constants and functions required to smoothly and
 * continuously rotate webpage elements on the X-axis, as an Object object.
 */
var RotatingX = {};

//TODO
