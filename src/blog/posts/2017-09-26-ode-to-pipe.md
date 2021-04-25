---
title: "An ode to the pipe operator"
author: "Niklaas Baudet von Gersdorff"
date: 2017-09-26T19:31:06+02:00
slug: "ode-to-pipe"

tags: ["R", "tidyverse", "magrittr"]
---


What I particularly like about the [tidyverse](https://www.tidyverse.org) is
the pipe operator `%>%`. For me it is more than a convenient way of
concatenating tasks, prettifying and/or reducing the amount of code.
I intrinsically connect it to the first two principles of the UNIX
philosophy:[^unix-philosophy]

<!-- more -->

1. Write programs that do one thing and do it well.
2. Write programs to work together.

The philosophy tells us that, by focusing on smaller functions (or programs)
addressing smaller problems, it is easier to find a solution to bigger
problems; and, as an extra, we can simply reuse our "small" solutions in other
circumstances to tackle other problems.[^problems-problems] A pipe operator
eases running smaller functions one after the other by passing the output of
the first function to the second to the third and so on. That is, the operator
can serve as (the missing) link between your functions to quickly -- but
comprehensibly -- solve a problem. Its mere existence makes following the UNIX
philosophy attractive and serves as great motivation to pursue it.

On UNIX shells, such as `sh` or `bash`, the pipe operator is `|` and one of the
most fundamental tools for everyone who works on the command line. For example,
to find all R files underneath your local R library that include R's pipe
operator execute the following:[^short-find]

```{bash}
find ~/R -name '*.R' -print0 | xargs -0 grep '%>%' | head
```

In this case, the pipe operator helps us to combine the power of `find`,
`xargs` and `grep`. In fact, these are independent programs but their
developers have done there best to ensure that they work together. We can
combine them in an arbitrary manner to solve problems nobody has thought of
before, such as finding all R files underneath our local R library that include
R's pipe operator `%>%`.

R's pipe operator is not part of `base::`. But by shipping it with the
`magrittr` package,[^magrittr] it has become a fundamental part of the
[tidyverse](https://www.tidyverse.org). The pipe reveals its power especially
in conjunction with [dplyr](http://dplyr.tidyverse.org/) (and
[tidyr](http://tidyr.tidyverse.org/)) -- but let's start small. What is it for
exactly?

Let's say you have two functions `f1` and `f2`, and some data `x`. If you were
to apply the first and the second function to x *one after the other* you would
probably do something like the following:

```{r, eval=FALSE}
y <- f2(f1(x))
```

Or, something like this:

```{r, eval=FALSE}
x <- f1(x)
y <- f2(x)
```

Using the pipe operator `%>%` you can simplify the code:

```{r, eval=FALSE}
y <- x %>% f1 %>% f2
```

In this case, imagine `x` as a stream of data that flows through `f1` and `f2`
following the direction `%>%` points to. Each time it reaches a function, the
function is applied to the data, and passed further on along the stream. Once
it reaches the end of the line, the result is stored in `y`. This way,
reasoning about the code is much easier.

Take a more complex example with some example data from `iris`.  Let's say you
want to inspect species `setosa` and calculate the mean of `Sepal.Length`.
Traditionally, you would do something like the following:

```{r}
data(iris)
idx <- iris$Species == "setosa"
setosa <- iris[idx, ]
mean(setosa$Sepal.Length)
```

With the pipe operator you can simplify the task by combining dplyr's `filter`
and `summarize` functions.

```{r, message=FALSE}
library(magrittr)
library(dplyr)
```

```{r}
iris %>%
  filter(Species == "setosa") %>%
  summarize(mean:  mean(Sepal.Length)) %>%
  unlist(use.names: FALSE)
```

Once again, we can imagine a data stream that flows through `filter` and
`summarize`. Each time it reaches a function, the function is applied to the
stream. At the end the final output is printed. (In this example, you could
omit the call to `unlist` at the end. It only serves the purpose to make the
output look like the one of the first example.)

Arguably, it is much easier to reason about the second example using `%>%`.
First, you can clearly see what data you are operating on because it's the very
first word in the sequence of expressions. In the example above, this is more
difficult to reason about because `iris` is spread throughout the code. Second,
you can clearly identify that three functions are applied to the data. In the
example showing the traditional approach, you do grasp that, in the end, a mean
is calculated, but you must read the code backwards. You must find out what is
stored in `setosa` and what `idx` is for.

Obviously, the pipe operator is only useful if functions exist that are
compatible to piping. Compatibility is guaranteed by writing functions with the
first argument being for data input, such as

```{r, eval=FALSE}
pipe_function <- function(.data, ...) {
    # do something here

    .data_manipulated
}
```

So, why not always use piping? It makes debugging difficult. If an error occurs
somewhere along the pipe, `traceback()` won't help you a lot because its output
will be cluttered with `%>%`'s internals. Thus, it makes sense to split the
pipe in reasonable sizes. This way you will be able to investigate each part of
the pipe on its own and trace errors more easily.

```{r}
setosa <- iris %>%
  filter(Species == "setosa")

setosa %>%
  filter(Sepal.Width > 3) %>%
  summarize(mean:  mean(Sepal.Length)) %>%
  unlist(use.names: FALSE)
```

To summarize, R's pipe operator enables us to follow a philosophy that has
proven itself to be very useful. While it encourages programmers to build
functions that obey a simple principle, it opens the doors for code that is
easier comprehensible. By doing so, it is the "glue" that holds together an
infrastructure that makes data analyses straightforward and fun: the tidyverse.
Thus, to me, it's an element of R that I never want to miss.

[^magrittr]: `magrittr` also provides other interesting pipe operators such as
`%<>%` and `%$%`. Take a look at [the
vignette](https://cran.r-project.org/web/packages/magrittr/vignettes/magrittr.html)
to learn more about it.

[^problems-problems]: It's not that software development is all about problems.
Don't get me wrong here. Actually it's a lot about creative work -- and fun!

[^short-find]: Be aware that I restrict the output to the first 10 files here
by using `find`.

[^unix-philosophy]: The
[Wikipedia](https://en.wikipedia.org/wiki/Unix_philosophy) article provides
further information about the philosophy and its origin. There you can read
more about the third principle too: 3. Write programs to handle text streams,
because that is a universal interface.

