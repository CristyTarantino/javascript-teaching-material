/* In this inheritance method all properties of the parent prototype
 * become properties of the child prototype;
 * so there is no need to create a new object only for inheritance.
 * The prototype chain is shorter too.
 * NOTE Only the primitive types are duplicated.
 * All objects, including functions and arrays are passed by reference only.
 * Line 65, 72, 74 (Side effect)
 */

// NOTE Overwriting a prototype has side effects on the contructor property.
// Therefore it's good practice to reset the contructor after inheriting.
function extend(Child, Parent, properties) {
  // 1. extend
  var parent = Parent.prototype;
  var child = Child.prototype;

  for (var i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }

  child.uber = parent;

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

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}

var getArea = function() {
  return this.side * this.height / 2;
};

console.log('TwoDShape.prototype.own = [\'side\', \'height\', \'area\'];', TwoDShape.prototype.own = ['side', 'height', 'area']);

extend(Triangle, TwoDShape, {
  name: 'Triangle',
  getArea: getArea,
});

console.log('Triangle.prototype.own.pop();', Triangle.prototype.own.pop());

console.log('TwoDShape.prototype.own', TwoDShape.prototype.own);

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

console.log('\nmyTriangle.__proto__.hasOwnProperty(\'name\')', myTriangle.__proto__.hasOwnProperty('name'));
console.log('myTriangle.__proto__.hasOwnProperty(\'toString\')', myTriangle.__proto__.hasOwnProperty('toString'));
console.log('myTriangle.__proto__.toString === TwoDShape.prototype.toString', myTriangle.__proto__.toString === Shape.prototype.toString);
console.log('myTriangle.__proto__.toString === TwoDShape.prototype.toString', myTriangle.__proto__.toString === TwoDShape.prototype.toString);
console.log('myTriangle.__proto__.toString === TwoDShape.prototype.toString', myTriangle.__proto__.toString === Triangle.prototype.toString);
