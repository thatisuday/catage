# get factorial of a number
def factorialFunc(num):
  if( num == 1 ):
    return 1
  else:
    # !n = n * !(n-1)
    return num * factorialFunc( num - 1 )

# call `factorialFunc` function
result = factorialFunc( 4 )
print( 'factorialFunc( 4 ) => ', result )