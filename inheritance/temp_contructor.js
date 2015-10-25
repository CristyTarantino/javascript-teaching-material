/* This inheritance method is efficient and fast as there is a light prototype chain
 * NOTE differently from the simple prototype chaining, this method
 * there is inheritanc only inheritance of properties of the prototype
 * and not of the instance properties
 */

// NOTE Overwriting a prototype has side effects on the contructor property.
// Therefore it's good practice to reset the contructor after inheriting.
function extend(Child, Parent, properties) {
  // 1. extend
  var F = function() {};

  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.contructor = Child;
  Child.prototype.uber = Parent.prototype;

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
  return this.uber ? this.uber.toString() + ', ' + this.name : this.name;
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
TwoDShape.uber = Shape.prototype;

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

console.log('\nTriangle');
console.log('--------Triangle.prototype = F = TwoDShape.prototype', Triangle.prototype.__proto__);
console.log('---------------------------------TwoDShape.prototype = F = Shape.prototype', Triangle.prototype.__proto__.__proto__);
