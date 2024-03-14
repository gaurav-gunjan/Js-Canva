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

// Optionally, register the brush
fabric.Canvas.prototype.getBrush = function (type) {
    return fabric[type + 'Brush'] && new fabric[type + 'Brush'](this);
};



// // Define the custom StraightLineBrush class
// fabric.StraightLineBrush = fabric.util.createClass(fabric.BaseBrush, {
//     type: 'StraightLineBrush',

//     initialize: function (canvas) {
//         this.canvas = canvas;
//         this.points = [];
//         this.isMouseDown = false;
//     },

//     onMouseDown: function (pointer, options) {
//         this.isMouseDown = true;
//         this.points = [pointer.x, pointer.y, pointer.x, pointer.y];
//         this.canvas.renderAll();
//     },

//     onMouseMove: function (pointer, options) {
//         if (!this.isMouseDown) return;

//         this.points[2] = pointer.x;
//         this.points[3] = pointer.y;
//         this.canvas.requestRenderAll();
//     },

//     onMouseUp: function (/* pointer */) {
//         if (!this.isMouseDown) return;

//         var line = new fabric.Line(this.points, {
//             stroke: this.color,
//             strokeWidth: this.width,
//             strokeLineCap: 'round',
//             originX: 'left',
//             originY: 'top'
//         });
//         this.canvas.add(line);
//         this.points = [];
//         this.isMouseDown = false;
//     }
// });

// // Optionally, register the brush
// fabric.Canvas.prototype.getBrush = function (type) {
//     return fabric[type + 'Brush'] && new fabric[type + 'Brush'](this);
// };