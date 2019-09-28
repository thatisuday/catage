/**
 * A set is like a List data structure but it can only contain unique values.
 * A set can be created with {} literal syntax or using `Set` class.
 */
void main() {

  // creating an empty set
  var myEmptySet = new Set();
  var myEmptyStringSet = new Set<String>(); // or `Set<String> myEmptyStringSet = new Set();` declaration
  
  // creating a set with initial values
  // if all initial values belong to same the Data Type, a set with fixed Data Type is created
  var fruits = { 'Apple', 'Orange', 'Banana', 'Orange' }; // duplicate values are removed
  fruits.add( 'Mango' );
  // fruits.add( 100 ); // invalid operation as `fruits` has `Set<String>` type
  print( 'fruits: $fruits' ); 

  // we can only create an empty set using `Set` class.
  // `{}` syntax is reserved to create empty maps.
  var otherFruits = new Set<String>();
  otherFruits.add( 'Grapes' );
  otherFruits.addAll( fruits ); // add elements from a set
  otherFruits.addAll( [ 'Guava', 'Grapes', 'Guava' ] ); // add elements from a list
  print( 'otherFruits: $otherFruits' ); 
}
