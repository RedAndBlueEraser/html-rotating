/*
 * Rotating.js
 * Version 20160123
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
Object.defineProperty(RotatingY, "FULL_ROTATION_CYCLE", { value: 180 });
/**
 * The rotation for half a cycle in degrees, as a number.
 */
Object.defineProperty(RotatingY, "HALF_ROTATION_CYCLE", { value: RotatingY.FULL_ROTATION_CYCLE / 2 });
/**
 * The initial rotation in degrees, as a number.
 */
Object.defineProperty(RotatingY, "START_ROTATION_CYCLE", { value: -RotatingY.HALF_ROTATION_CYCLE });
/**
 * The final rotation in degrees, as a number.
 */
Object.defineProperty(RotatingY, "END_ROTATION_CYCLE", { value: RotatingY.START_ROTATION_CYCLE + RotatingY.FULL_ROTATION_CYCLE });
/**
 * The clockwise direction, as a number.
 */
Object.defineProperty(RotatingY, "CLOCKWISE", { value: -1 });
/**
 * The anticlockwise direction, as a number.
 */
Object.defineProperty(RotatingY, "ANTICLOCKWISE", { value: -RotatingY.CLOCKWISE });
/**
 * The direction of the rotation, as a number.
 */
RotatingY.DIRECTION = RotatingY.ANTICLOCKWISE;
/**
 * The speed of the rotation in milliseconds, as a number.
 */
RotatingY.SPEED = 1000;
/**
 * The step of the rotation in degrees, as a number.
 */
RotatingY.STEP = RotatingY.FULL_ROTATION_CYCLE;

/**
 * The identifier of the interval for the continuous rotation.
 */
RotatingY.intervalID = null;
/**
 * The elements to be rotated.
 */
RotatingY.elements = [];
/**
 * The current rotation in degrees, as a number.
 */
RotatingY.rotation = 0;
/**
 * The CSS transition used to smoothly rotate webpage elements, as a string.
 */
RotatingY.transition = "";

/**
 * Returns the CSS transform used to rotate webpage elements.
 * @return  the CSS transform used to rotate webpage elements, as a string.
 */
RotatingY.getTransform = function ()
{
    "use strict";

    return "rotateY(" + this.rotation + "deg)";
};

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

    // Add current rotation.
    this.rotation += this.DIRECTION * this.STEP;

    // If current rotation is greater than the final rotation.
    if (this.rotation > this.END_ROTATION_CYCLE)
    {
        // Reset current rotation to the initial rotation.
        this.rotation = this.START_ROTATION_CYCLE;

        // Temporary disable CSS transition to jump directly between rotations.
        this.setElementsStyleTransition(null);
        this.setElementsStyleTransform(this.getTransform());
        // Re-enable CSS transition.
        this.setElementsStyleTransition(this.transition);

        /* Re-update the transition and rotation on webpage elements
         * immediately.
         */
        this.update();
    }
    // If current rotation is smaller than the initial rotation.
    else if (this.rotation < this.START_ROTATION_CYCLE)
    {
        // Set current rotation to the final rotation.
        this.rotation = this.END_ROTATION_CYCLE;

        // Temporary disable CSS transition to jump directly between rotations.
        this.setElementsStyleTransition(null);
        this.setElementsStyleTransform(this.getTransform());
        // Re-enable CSS transition.
        this.setElementsStyleTransition(this.transition);

        /* Re-update the transition and rotation on webpage elements
         * immediately.
         */
        this.update();
    }
    else
    {
        // Rotate webpage elements normally (using transition).
        this.setElementsStyleTransform(this.getTransform());
    }

    return;
};

/**
 * Starts the smooth and continuous rotation on webpage elements.
 */
RotatingY.main = function ()
{
    "use strict";

    // Store this (RotatingY) as a local variable.
    var self = this;

    // Initialize variables.
    this.elements = document.getElementsByClassName("rotating-y");
    this.rotation = this.START_ROTATION_CYCLE;
    this.transition = "transform " + this.SPEED + "ms linear";

    // Temporary disable CSS transition to jump directly between rotations.
    this.setElementsStyleTransition(null);
    this.setElementsStyleTransform(this.getTransform());
    // Re-enable CSS transition.
    this.setElementsStyleTransition(this.transition);

    /* Re-update the transition and rotation on webpage elements
     * immediately.
     */
    this.update();

    // If an interval already exists.
    if (this.intervalID !== null)
    {
        // Cancel the existing interval.
        clearInterval(this.intervalID);
    }
    /* Create a new interval to repeatedly update the transition and rotation
     * on webpage elements.
     */
    this.intervalID = setInterval(
        function ()
        {
            self.update();
        },
        this.SPEED
        );

    return;
};

window.addEventListener(
    "load",
    function ()
    {
        "use strict";
        RotatingY.main();
    }
    );

/**
 * The collection of constants and functions required to smoothly and
 * continuously rotate webpage elements on the X-axis, as an Object object.
 */
var RotatingX = {};

//TODO
