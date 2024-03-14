// Define the custom StraightLineBrush class
fabric.StraightLineBrush = fabric.util.createClass(fabric.BaseBrush, {
    type: 'StraightLineBrush',

    initialize: function (canvas) {
        this.canvas = canvas;
        this.points = [];
        this.isMouseDown = false;
        this.tempLine = null;
    },

    onMouseDown: function (pointer, options) {
        this.isMouseDown = true;
        this.points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.tempLine = new fabric.Line(this.points, {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            originX: 'left',
            originY: 'top',
            selectable: false
        });
        this.canvas.add(this.tempLine);
    },

    onMouseMove: function (pointer, options) {
        if (!this.isMouseDown) return;

        this.points[2] = pointer.x;
        this.points[3] = pointer.y;
        this.tempLine.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.requestRenderAll();
    },

    onMouseUp: function (/* pointer */) {
        if (!this.isMouseDown) return;

        var line = new fabric.Line(this.points, {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            originX: 'left',
            originY: 'top'
        });
        this.canvas.add(line);
        this.canvas.remove(this.tempLine);
        this.points = [];
        this.isMouseDown = false;
    }
});

// Define the custom ArrowBrush class
fabric.ArrowBrush = fabric.util.createClass(fabric.BaseBrush, {
    type: 'ArrowBrush',

    initialize: function (canvas) {
        this.canvas = canvas;
        this.points = [];
        this.isMouseDown = false;
        this.tempLine = null;
    },

    onMouseDown: function (pointer, options) {
        this.isMouseDown = true;
        this.points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.tempLine = new fabric.Line(this.points, {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            originX: 'left',
            originY: 'top',
            selectable: false
        });
        this.canvas.add(this.tempLine);
    },

    onMouseMove: function (pointer, options) {
        if (!this.isMouseDown) return;

        this.points[2] = pointer.x;
        this.points[3] = pointer.y;
        this.tempLine.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.requestRenderAll();
    },

    onMouseUp: function (/* pointer */) {
        if (!this.isMouseDown) return;

        var deltaX = this.points[2] - this.points[0];
        var deltaY = this.points[3] - this.points[1];
        var angle = Math.atan2(deltaY, deltaX);

        var arrowLength = 20;
        var arrowAngle = Math.PI / 6; // 30 degrees

        var x1 = this.points[0];
        var y1 = this.points[1];
        var x2 = this.points[2];
        var y2 = this.points[3];

        var arrowX = x2 - arrowLength * Math.cos(angle - arrowAngle);
        var arrowY = y2 - arrowLength * Math.sin(angle - arrowAngle);

        var arrowX2 = x2 - arrowLength * Math.cos(angle + arrowAngle);
        var arrowY2 = y2 - arrowLength * Math.sin(angle + arrowAngle);

        var arrow = new fabric.Line([x2, y2, arrowX, arrowY], {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            originX: 'left',
            originY: 'top'
        });

        var arrow2 = new fabric.Line([x2, y2, arrowX2, arrowY2], {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            originX: 'left',
            originY: 'top'
        });

        this.canvas.add(this.tempLine, arrow, arrow2);
        this.canvas.remove(this.tempLine);
        this.points = [];
        this.isMouseDown = false;
    }
});

//! Dash Line And Arrow Start
// Define the custom DashedLineBrush class
fabric.DashedLineBrush = fabric.util.createClass(fabric.BaseBrush, {
    type: 'DashedLineBrush',

    initialize: function (canvas) {
        this.canvas = canvas;
        this.points = [];
        this.isMouseDown = false;
        this.tempLine = null;
    },

    onMouseDown: function (pointer, options) {
        this.isMouseDown = true;
        this.points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.tempLine = new fabric.Line(this.points, {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            strokeDashArray: [5, 5], // Example dash pattern
            originX: 'left',
            originY: 'top',
            selectable: false
        });
        this.canvas.add(this.tempLine);
    },

    onMouseMove: function (pointer, options) {
        if (!this.isMouseDown) return;

        this.points[2] = pointer.x;
        this.points[3] = pointer.y;
        this.tempLine.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.requestRenderAll();
    },

    onMouseUp: function (/* pointer */) {
        if (!this.isMouseDown) return;

        var line = new fabric.Line(this.points, {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            strokeDashArray: [5, 5], // Example dash pattern
            originX: 'left',
            originY: 'top'
        });
        this.canvas.add(line);
        this.canvas.remove(this.tempLine);
        this.points = [];
        this.isMouseDown = false;
    }
});

// Define the custom DashedArrowBrush class
fabric.DashedArrowBrush = fabric.util.createClass(fabric.BaseBrush, {
    type: 'DashedArrowBrush',

    initialize: function (canvas) {
        this.canvas = canvas;
        this.points = [];
        this.isMouseDown = false;
        this.tempLine = null;
    },

    onMouseDown: function (pointer, options) {
        this.isMouseDown = true;
        this.points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.tempLine = new fabric.Line(this.points, {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            strokeDashArray: [5, 5], // Example dash pattern
            originX: 'left',
            originY: 'top',
            selectable: false
        });
        this.canvas.add(this.tempLine);
    },

    onMouseMove: function (pointer, options) {
        if (!this.isMouseDown) return;

        this.points[2] = pointer.x;
        this.points[3] = pointer.y;
        this.tempLine.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.requestRenderAll();
    },

    onMouseUp: function (/* pointer */) {
        if (!this.isMouseDown) return;

        var deltaX = this.points[2] - this.points[0];
        var deltaY = this.points[3] - this.points[1];
        var angle = Math.atan2(deltaY, deltaX);

        var arrowLength = 20;
        var arrowAngle = Math.PI / 6; // 30 degrees

        var x1 = this.points[0];
        var y1 = this.points[1];
        var x2 = this.points[2];
        var y2 = this.points[3];

        var arrowX = x2 - arrowLength * Math.cos(angle - arrowAngle);
        var arrowY = y2 - arrowLength * Math.sin(angle - arrowAngle);

        var arrowX2 = x2 - arrowLength * Math.cos(angle + arrowAngle);
        var arrowY2 = y2 - arrowLength * Math.sin(angle + arrowAngle);

        var arrow = new fabric.Line([x2, y2, arrowX, arrowY], {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            strokeDashArray: [5, 5], // Example dash pattern
            originX: 'left',
            originY: 'top'
        });

        var arrow2 = new fabric.Line([x2, y2, arrowX2, arrowY2], {
            stroke: this.color,
            strokeWidth: this.width,
            strokeLineCap: 'round',
            strokeDashArray: [5, 5], // Example dash pattern
            originX: 'left',
            originY: 'top'
        });

        this.canvas.add(this.tempLine, arrow, arrow2);
        this.canvas.remove(this.tempLine);
        this.points = [];
        this.isMouseDown = false;
    }
});

// Define the custom CircleBrush class
fabric.CircleBrush = fabric.util.createClass(fabric.BaseBrush, {
    type: 'CircleBrush',

    initialize: function (canvas) {
        this.canvas = canvas;
        this.points = [];
        this.isMouseDown = false;
        this.tempCircle = null;
    },

    onMouseDown: function (pointer, options) {
        this.isMouseDown = true;
        this.points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.tempCircle = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            strokeWidth: this.width,
            stroke: this.color,
            fill: 'transparent',
            selectable: false
        });
        this.canvas.add(this.tempCircle);
    },

    onMouseMove: function (pointer, options) {
        if (!this.isMouseDown) return;

        var radius = Math.sqrt(Math.pow(pointer.x - this.points[0], 2) + Math.pow(pointer.y - this.points[1], 2));
        this.tempCircle.set({ radius: radius });
        this.canvas.requestRenderAll();
    },

    onMouseUp: function (/* pointer */) {
        if (!this.isMouseDown) return;

        var radius = Math.sqrt(Math.pow(this.points[2] - this.points[0], 2) + Math.pow(this.points[3] - this.points[1], 2));
        var circle = new fabric.Circle({
            left: this.points[0] - radius,
            top: this.points[1] - radius,
            radius: radius,
            strokeWidth: this.width,
            stroke: this.color,
            fill: 'transparent',
            selectable: true // Make the circle draggable
        });

        // this.canvas.remove(this.tempCircle); // Remove temporary circle
        this.canvas.add(circle); // Add drawn circle
        this.canvas.setActiveObject(circle); // Select the circle
        this.canvas.requestRenderAll(); // Render canvas
        this.points = [];
        this.isMouseDown = false;
    }
});

//! Dash Line And Arrow End

// Optionally, register the brushes with the canvas
fabric.Canvas.prototype.getBrush = function (type) {
    return fabric[type + 'Brush'] && new fabric[type + 'Brush'](this);
};