/* This inheritance method is efficient and fast as there is no prototype chain
 * NOTE however children can modify parents' functionality
 * as shown in the last line of code
 */

// NOTE Overwriting a prototype has side effects on the contructor property.
// Therefore it's good practice to reset the contructor after inheriting.
function extend(Child, Parent, properties) {
  // 1. extend
  Child.prototype = Parent.prototype;
  Child.prototype.contructor = Child;

  // 2. augment prototype
  // with common properties
  for (var property in properties) {
    if (properties.hasOwnProperty(property)) {
      Child.prototype[property] = properties[property];
    }
  }
}

function Shape() {
  // Add here instance properties only for efficiency
}

// Common shapes properties
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function() {
  return this.name;
};

function TwoDShape() {
  // Add here instance properties only for efficiency
}

// NOTE As you can see you have to take care of inheritance first
// before augmenting the prototype.
// Otherwise anything you add to TwoDShape.prototype gets wiped out
// when you inherit.

extend(TwoDShape, Shape, {
  name: '2D shape',
});

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}

var getArea = function() {
  return this.side * this.height / 2;
};

extend(Triangle, TwoDShape, {
  name: 'Triangle',
  getArea: getArea,
});

var myTriangle = new Triangle(5, 10);

console.log(myTriangle.toString() + ' 5 * 10:', myTriangle.getArea());

console.log('myTriangle.hasOwnProperty(\'side\'): ', myTriangle.hasOwnProperty('side'));

console.log('myTriangle.hasOwnProperty(\'side\'): ', myTriangle.hasOwnProperty('height'));

console.log('myTriangle.hasOwnProperty(\'name\'): ', myTriangle.hasOwnProperty('name'));

console.log('myTriangle.hasOwnProperty(\'toString\'): ', myTriangle.hasOwnProperty('toString'));

console.log('TwoDShape.prototype.isPrototypeOf(myTriangle): ', TwoDShape.prototype.isPrototypeOf(myTriangle));

console.log('Shape.prototype.isPrototypeOf(myTriangle): ', Shape.prototype.isPrototypeOf(myTriangle));

console.log('myTriangle instanceof Shape: ', myTriangle instanceof Shape);

console.log('myTriangle instanceof TwoDShape: ', myTriangle instanceof TwoDShape);

console.log('myTriangle instanceof Triangle: ', myTriangle instanceof Triangle);

var myShape = new Shape();

console.log('myShape', myShape.name);

console.log('\nShape.prototype------------|');
console.log('TwoDShape.prototype--------|---Same space in memory ');
console.log('Triangle.prototype---------|');
