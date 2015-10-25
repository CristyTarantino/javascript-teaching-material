/* In this inheritance method there is no use of prototypes.
 * It's really simple
 * NOTE Only the primitive types are duplicated.
 * All objects, including functions and arrays are passed by reference only.
 * Line 39, 56, 58 (Side effect)
 */

function extend(parent, properties) {
  // 1. extend
  var child = {};

  for (var i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }

  // 2. augment prototype
  // with common properties
  for (var property in properties) {
    if (properties.hasOwnProperty(property)) {
      child[property] = properties[property];
    }
  }

  child.uber = parent;
  return child;
}

var shape = {
  name: 'Shape',
  toString: function() {
    return this.name;
  },
};

var twoDShapeProp = {
  name: '2D shape',
  own: ['side', 'height', 'area'],
  toString: function() {
    return this.uber.toString() + ', ' + this.name;
  },
};

var twoDShape = extend(shape, twoDShapeProp);

var triangleProp = {
  name: 'Triangle',
  getArea: function() {
    return this.side * this.height / 2;
  },
};

var triangle = extend(twoDShape, triangleProp);

console.log('Triangle.prototype.own.pop();', triangle.own.pop());

console.log('TwoDShape.prototype.own', twoDShape.own);

var myTriangle = triangle;
myTriangle.side = 5;
myTriangle.height = 10;

console.log(myTriangle.name + '\'s Area: ', myTriangle.getArea());
