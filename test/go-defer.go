package main

// import `fmt` package
import "fmt"

// simple function
func sayDone() {
	fmt.Println("I am done")
}

// main execution function
func main() {
	fmt.Println("main started")

  // defer function execution until `main` returns
	defer sayDone()

	fmt.Println("main finished")
}
