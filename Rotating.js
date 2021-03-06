/*
 * Rotating.js
 * Version 20160124
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
 * The CSS class selector for active transition, as a string.
 */
Object.defineProperty(RotatingY, "TRANSITION_CSS_CLASS_SELECTOR", { value: "rotating-y-transition" });
/**
 * The CSS class selector for disabled transition, as a string.
 */
Object.defineProperty(RotatingY, "NO_TRANSITION_CSS_CLASS_SELECTOR", { value: "rotating-y-no-transition" });
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
 * Sets the CSS transition to active or disabled for webpage elements.
 * @param  transition  the activeness of the CSS transition, as a boolean.
 */
RotatingY.setTransition = function (transition)
{
    "use strict";

    // Store elements and elements.length as a local variable.
    var elements = this.elements,
        elementsLength = elements.length;

    // If transition is truthy.
    if (transition == true)
    {
        for (var i = 0; i < elementsLength; i++)
        {
            // Remove and add CSS classes.
            elements[i].classList.remove(this.NO_TRANSITION_CSS_CLASS_SELECTOR);
            elements[i].classList.add(this.TRANSITION_CSS_CLASS_SELECTOR);
        }
    }
    else
    {
        for (var i = 0; i < elementsLength; i++)
        {
            // Remove and add CSS classes.
            elements[i].classList.remove(this.TRANSITION_CSS_CLASS_SELECTOR);
            elements[i].classList.add(this.NO_TRANSITION_CSS_CLASS_SELECTOR);

            // Force a reflow on the element.
            elements[i].offsetHeight;
        }
    }
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
        this.setTransition(false);
        this.setElementsStyleTransform(this.getTransform());
        // Re-enable CSS transition.
        this.setTransition(true);

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
        this.setTransition(false);
        this.setElementsStyleTransform(this.getTransform());
        // Re-enable CSS transition.
        this.setTransition(true);

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

    // Create CSS class for active and disabled transitions.
    var transition = "transform " + this.SPEED + "ms linear";
    var style = document.createElement('style');
    style.innerHTML = "." + this.TRANSITION_CSS_CLASS_SELECTOR +
        "{-webkit-transition:-webkit-" + transition +
        ";-moz-transition:-moz-" + transition + ";-o-transition:-o-" +
        transition + ";transition:" + transition +
        ";}." + this.NO_TRANSITION_CSS_CLASS_SELECTOR +
        "{-webkit-transition:none;-moz-transition:none;-o-transition:none;transition:none;}";
    document.getElementsByTagName("head")[0].appendChild(style);

    // Temporary disable CSS transition to jump directly between rotations.
    this.setTransition(false);
    this.setElementsStyleTransform(this.getTransform());
    // Re-enable CSS transition.
    this.setTransition(true);

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

/**
 * The collection of constants and functions required to smoothly and
 * continuously rotate webpage elements on the X-axis, as an Object object.
 */
var RotatingX = {};

/**
 * The rotation for a full cycle in degrees, as a number.
 */
Object.defineProperty(RotatingX, "FULL_ROTATION_CYCLE", { value: 360 });
/**
 * The rotation for half a cycle in degrees, as a number.
 */
Object.defineProperty(RotatingX, "HALF_ROTATION_CYCLE", { value: RotatingX.FULL_ROTATION_CYCLE / 2 });
/**
 * The initial rotation in degrees, as a number.
 */
Object.defineProperty(RotatingX, "START_ROTATION_CYCLE", { value: -RotatingX.HALF_ROTATION_CYCLE });
/**
 * The final rotation in degrees, as a number.
 */
Object.defineProperty(RotatingX, "END_ROTATION_CYCLE", { value: RotatingX.START_ROTATION_CYCLE + RotatingX.FULL_ROTATION_CYCLE });
/**
 * The clockwise direction, as a number.
 */
Object.defineProperty(RotatingX, "CLOCKWISE", { value: 1 });
/**
 * The anticlockwise direction, as a number.
 */
Object.defineProperty(RotatingX, "ANTICLOCKWISE", { value: -RotatingX.CLOCKWISE });
/**
 * The CSS class selector for active transition, as a string.
 */
Object.defineProperty(RotatingX, "TRANSITION_CSS_CLASS_SELECTOR", { value: "rotating-x-transition" });
/**
 * The CSS class selector for disabled transition, as a string.
 */
Object.defineProperty(RotatingX, "NO_TRANSITION_CSS_CLASS_SELECTOR", { value: "rotating-x-no-transition" });
/**
 * The direction of the rotation, as a number.
 */
RotatingX.DIRECTION = RotatingX.ANTICLOCKWISE;
/**
 * The speed of the rotation in milliseconds, as a number.
 */
RotatingX.SPEED = 2000;
/**
 * The step of the rotation in degrees, as a number.
 */
RotatingX.STEP = RotatingX.FULL_ROTATION_CYCLE;

/**
 * The identifier of the interval for the continuous rotation.
 */
RotatingX.intervalID = null;
/**
 * The elements to be rotated.
 */
RotatingX.elements = [];
/**
 * The current rotation in degrees, as a number.
 */
RotatingX.rotation = 0;

/**
 * Returns the CSS transform used to rotate webpage elements.
 * @return  the CSS transform used to rotate webpage elements, as a string.
 */
RotatingX.getTransform = function ()
{
    "use strict";

    return "rotateX(" + this.rotation + "deg)";
};

/**
 * Sets the CSS transform for webpage elements.
 * @param  transform  the CSS transform, as a string.
 */
RotatingX.setElementsStyleTransform = function (transform)
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
 * Sets the CSS transition to active or disabled for webpage elements.
 * @param  transition  the activeness of the CSS transition, as a boolean.
 */
RotatingX.setTransition = function (transition)
{
    "use strict";

    // Store elements and elements.length as a local variable.
    var elements = this.elements,
        elementsLength = elements.length;

    // If transition is truthy.
    if (transition == true)
    {
        for (var i = 0; i < elementsLength; i++)
        {
            // Remove and add CSS classes.
            elements[i].classList.remove(this.NO_TRANSITION_CSS_CLASS_SELECTOR);
            elements[i].classList.add(this.TRANSITION_CSS_CLASS_SELECTOR);
        }
    }
    else
    {
        for (var i = 0; i < elementsLength; i++)
        {
            // Remove and add CSS classes.
            elements[i].classList.remove(this.TRANSITION_CSS_CLASS_SELECTOR);
            elements[i].classList.add(this.NO_TRANSITION_CSS_CLASS_SELECTOR);

            // Force a reflow on the element.
            elements[i].offsetHeight;
        }
    }
};

/**
 * Updates the transition and rotation on webpage elements.
 */
RotatingX.update = function ()
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
        this.setTransition(false);
        this.setElementsStyleTransform(this.getTransform());
        // Re-enable CSS transition.
        this.setTransition(true);

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
        this.setTransition(false);
        this.setElementsStyleTransform(this.getTransform());
        // Re-enable CSS transition.
        this.setTransition(true);

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
RotatingX.main = function ()
{
    "use strict";

    // Store this (RotatingX) as a local variable.
    var self = this;

    // Initialize variables.
    this.elements = document.getElementsByClassName("rotating-x");
    this.rotation = this.START_ROTATION_CYCLE;

    // Create CSS class for active and disabled transitions.
    var transition = "transform " + this.SPEED + "ms linear";
    var style = document.createElement('style');
    style.innerHTML = "." + this.TRANSITION_CSS_CLASS_SELECTOR +
        "{-webkit-transition:-webkit-" + transition +
        ";-moz-transition:-moz-" + transition + ";-o-transition:-o-" +
        transition + ";transition:" + transition +
        ";}." + this.NO_TRANSITION_CSS_CLASS_SELECTOR +
        "{-webkit-transition:none;-moz-transition:none;-o-transition:none;transition:none;}";
    document.getElementsByTagName("head")[0].appendChild(style);

    // Temporary disable CSS transition to jump directly between rotations.
    this.setTransition(false);
    this.setElementsStyleTransform(this.getTransform());
    // Re-enable CSS transition.
    this.setTransition(true);

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
        RotatingX.main();
        RotatingY.main();
    }
    );
