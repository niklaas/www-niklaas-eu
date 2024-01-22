---
title: 'Deferring functions for "on entry" actions'
author: "Niklaas Baudet von Gersdorff"
date: 2018-02-25T19:25:25+02:00

taxonomies:
  tags: ["golang", "programming", "functions"]
---

I decided to learn [Go](https://golang.org) because it seems an interesting and
easy to learn low-level programming language. There are several free online
resources to learn the language, such as [The Go Tour](https://tour.golang.org),
but I decided to Go for the book ["The Go Programming
Language"](http://www.gopl.io) (GOPL) by Alan Donovan and Brian Kernighan. In
the book, there are some code examples that I find particularly elegant. Here, I
want to record some of these examples for future reference -- while having the
chance to add some additional comments on the code for myself.[^gopl-github]

<!-- more -->

In Go there exists the `defer` statement to execute a function when the parent
function exits. For example, this is useful when you want to defer the closing
of a file that you opened:

```Go
func main() {
    file, err := os.Open("file.go")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()
}
```

But defer can also be used to execute a code on both exit _and entry_,
e.g.:[^gopl-example]

```Go
func bigSlowOperation() {
	defer trace("bigSlowOperation")() // don't forget the extra parentheses
	// ...lots of work...
	time.Sleep(10 * time.Second) // simulate slow operation by sleeping
}

func trace(msg string) func() {
	start := time.Now()
	log.Printf("enter %s", msg)
	return func() { log.Printf("exit %s (%s)", msg, time.Since(start)) }
}
```

The secret lies in two aspects of the code above: First, `trace` returns an
anonymous function. Second, the anonymous function is run by the extra
parenthesis in `bigSlowOperation`. When the function is executed, `trace`
executes because of the extra parenthesis, which initialises variable `start`
and prints `msg`. The anonymous function is returned and handed over to `defer`
which will execute it as soon as `bigSlowOperation` is exited. Eventually this
prints the exit message.

[^gopl-github]: The original source code of the examples can be found in [the book's GitHub repository](https://github.com/adonovan/gopl.io/). The code is licensed under [CC BY-NC-SA](http://creativecommons.org/licenses/by-nc-sa/4.0/).
[^gopl-example]: The example is taken from [gopl.io/ch5/trace](gopl.io/ch5/trace/main.go).
