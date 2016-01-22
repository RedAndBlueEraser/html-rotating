/*
 * Rotating.js
 * Version 20160121
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

        for (var i = 0; i < this.elements.length; i++)
        {
            var elementStyle = this.elements[i].style;

            // Temporary disable CSS transition to jump directly between rotations.
            elementStyle.transition = null;
            elementStyle.transform = "rotateY(" + this.rotation + "deg)";
            this.elements[i].offsetHeight;
            // Re-enable CSS transition.
            elementStyle.transition = "transform " + this.SPEED + "ms linear";
        }

        /* Re-update the transition and rotation on webpage elements
         * immediately.
         */
        this.update();
    }
    else
    {
        for (var i = 0; i < this.elements.length; i++)
        {
            var elementStyle = this.elements[i].style;

            // Rotate webpage elements normally (using transition).
            elementStyle.transform = "rotateY(" + this.rotation + "deg)";
        }
    }

    return;
};

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
