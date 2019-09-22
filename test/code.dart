/**
 * @source: https://github.com/thatisuday/dart-getting-started-guide
 * @author: Uday Hiwarale <thatisuday@gmail.com>
 * A Dart class can inherit instance variables and instance methods of another class.
 * Using `extend` keyword, a class basically extends the properties and behaviours of another class.
 *
 * Apart from static properties and constructor functions, everything else is inherited.
 * A class that is inherting another class is called sub-class while the class that it inherits from is called `super-class`.
 *
 * When a class is inheried, Dart provides `super` keyword in `sub-class` to point to `super-class`.
 * `super` when used as a function calls the `default` constructor of the `super-class`.
 * We use `super.namedConstructor()` syntax to call a named constructor of the `super-class`.
 * A `sub-class` can access instance methods of the `super-class` using `super.methodName` syntax.
 *
 * When a `super-class` constructor function or method is called from the `sub-class`,
 * `this` object inside those functions is still pointing to the `sub-class` object.
 */
void main() {
  
  // create an Employee object
  var e = Employee( 'Ross', 'Geller', 1000 );
  print( 'Employee e : ${ e.firstName } ${ e.lastName }, salary: ${ e.salary }' );

  // create Student object
  var s = Student( 'Rachel', 'Green', 418 );
  print( 'Student s : ${ s.firstName } ${ s.lastName }, salary: ${ s.score }%' );

  // create Person object
  var p = Person( 'Joey', 'Tribbiani' );
  print( 'Person p : ${ p.firstName } ${ p.lastName }' );
  
  // execute async job
  executeAsyncJob();

}

// [super-class]
// Person class with basic details
class Person {
  String firstName, lastName;

  // default constructor
  Person( this.firstName, this.lastName );

  // named constructor
  Person.withUpperCase( String firstName, String lastName ) {
    this.firstName = firstName.toUpperCase();
    this.lastName = lastName.toUpperCase();
  }
}

// [sub-class]
// Employee class shares feature of Person class
class Employee extends Person {
  int salary;

  // default constructor calls the default constructor of `Person` class using `super` function
  // constructor of the `Person` is executed first before the constructor of the `Employee` class
  // arguments of the `sub-class` default constructor function are available in `super` call
  Employee( String firstName, String lastName, this.salary ): super( firstName, lastName );
}

// Student class shares feature of Person class
class Student extends Person {
  num score;

  // default constructor calls `Person.withUpperCase` constuctor function of `Person` class
  Student( String firstName, String lastName, num marks ): super.withUpperCase( firstName, lastName ) {
    this.score = num.parse( ( (marks / 500) * 100 ).toStringAsFixed( 6 ) ); // limit decimal places to 2
  }
}

/**
 * @source: https://github.com/thatisuday/dart-getting-started-guide
 * @author: Uday Hiwarale <thatisuday@gmail.com>
 * Like JavaScript promises, `then` and `catchError` method also return another `Future` object.
 * The individual callback function passed to `then` and `catchError` method act as an `invoker` function.
 * Using these principles, it is possible to chain a `then` method on another `then` method.
 *
 * Then chaining is used to perform asynchronous jobs in series.
 * It is a standard practice to chain multiple `then` callback but have only one `catchError` callback
 * to handle error happended in any chained `then` callback.
 */
void executeAsyncJob() {

  // create future object that executes the `invoker` function after `3` seconds
  Future<String> future = Future.delayed( Duration(seconds: 3), () => "Hello from the future" );
  
  // listen to `Future` object
  future

  // 1. executes when `Future` object resolves
  .then( (result) => "$result: then_1" )

  // executes when previous `then` method returns a value (resolves)
  // 2. returns a future object with a string value
  .then( (result_of_1) => "$result_of_1: then_2" )
  
  // executes when previous `then` method returns a value (resolves)
  // 3. return a `Future` object but throws an exception in the `invoker` function
  .then( (result_of_2) {
    print( 'result in then_3: $result_of_2' );
    throw FormatException( 'Something went wrong in then method 3.' );
  } )

  // 4. never gets called because of an exception was thrown in the `Future` object it is attached to
  // it is reacting to
  .then( (result_of_3) {
    print( 'result in then_4: $result_of_3' );
  } )
  
  // gets called when an exception occurs in the original `future` object
  // or in any of the `then` method callback functions
  .catchError( ( error ) {
    print( 'Error: $error' );
  } );

  // just a simple statement
  print( 'Job is done!' );

}