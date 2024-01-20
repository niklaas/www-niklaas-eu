---
author: "Niklaas Baudet von Gersdorff"
title: "Benchmarking `bun run` and `bun build` with `hyperfine`"
date: 2024-01-17T16:01:00+02:00

taxonomies:
  tags: ["bun", "hyperfine", "javascript"]
---


When writing small tools that support me with my daily work, I usually opted to shell-scripting with `sh`, `bash` or 
even `zsh` because I find the concept of piping text from one command to another pretty appealing. It's a 
straightforward and powerful concept that doesn't require a lot of set up: most CLI tools operate on a per-line 
basis, so it's a bliss to combine them.

The situation becomes more challenging when I need to work on JSONs, which are more natural in the JavaScript world, 
where I often work in. Usually, I opted for `jq` to parse JSON into line-based data, but I keep forgetting its 
syntax, which also can turn out complex and difficult to read.

<!-- more -->

So far, the intricacies of getting JavaScript code that is meant for the browser to run using node.js on the command 
line, kept me from actually considering this option. Usually, I would run into issues because the code I want to 
reuse for a quick command-line session used browser APIs that don't work in node.js.

When I learned about [bun.js](https://bun.sh), claiming that it makes running JavaScript code _just work_ on the 
command-line, I got very interested. And it turns out it holds its promises---at least for the specific use case that I
had some days ago. I had implemented a function that provides a suggestion for a misspelled email domain and wanted to
run it with [GNU parallel](https://www.gnu.org/software/parallel/) on a bunch of misspelled domains. (Using GNU parallel
saved me from dealing with JavaScript's single-threaded-ness and `async/await`s.)

I ended up writing a short JavaScript file that takes in a single parameter and calls my function with the parameter 
as an argument. Then, I was able to run `bun run my-script.js` and it took care of different styles of imports, 
`node_modules` and whatever would have caused my headaches using `nodejs` for executing the file. 🎉

Since `bun run` would reparse the file on every call, I decided to use `bun build` to compile the script to a binary.
I continued running the binary in parallel, this time avoiding the unnecessary reparsing. Creating a binary from a 
JavaScript turned out to be straightforward as well using `bun build`:

```shell
bun build my-script.js --compile --outfile my-script
```

Before running the binary in parallel, I wanted to know whether, as I had anticipated, the compiled version would 
run faster than calling `bun run` again and again. As it turned out, that day I would make yet another discovery 
that would make this quest pretty easy to solve: `hyperfine` for command line benchmarking:

```shell
hyperfine --warmup 5 'bun run my-script-cli.js' './my-script-cli'
```

```text
Benchmark 1: bun run my-script-cli.js
  Time (mean ± σ):      32.6 ms ±   0.6 ms    [User: 47.7 ms, System: 20.3 ms]
  Range (min … max):    31.1 ms …  33.8 ms    84 runs

Benchmark 2: ./my-script-cli
  Time (mean ± σ):      15.2 ms ±   0.6 ms    [User: 15.5 ms, System: 4.4 ms]
  Range (min … max):    14.2 ms …  18.6 ms    168 runs

Summary
  ./my-script-cli ran
    2.14 ± 0.10 times faster than bun run suggest-domain-cli.js
```

In the end, with the new tooling that I had found, it was straightforward for me to convert existing business logic 
that was ingrained in a frontend project to a command line utility. In addition to that, some more keystrokes later, 
I had performed a basic benchmark of that utility too!
