---
title: "Configuring vimtex on Windows"
author: "Niklaas Baudet von Gersdorff"
date: 2017-09-11T20:13:25+02:00
taxonomies:
  tags: ["Windows", "LaTeX", "vim", "vimtex"]
draft: true
---

Using [vimtex](https://github.com/lervag/vimtex) on Windows is not as easy as I
thought. Unfortunately, there aren't any specific installation instructions, so
here you go:

<!-- more -->

1. Install [SumatraPDF][sumatrapdf]. I chose the 64-bit installer but you should do fine with every version.
2. Put SumatraPDF in Windows's `PATH`. Luckily, there is a [good explanation][path] on how to change `PATH` on Windows online.
3. Install Perl as documented in [this blogpost on `latexmk`][installing-perl]. When doing so, pay attention to the following two things: First, the version of Perl must be the same version! and must be 32-bit!

- define PERL5LIB appropriately

- link final version of this post in https://github.com/lervag/vimtex/issues/416

[sumatrapdf]: https://www.sumatrapdfreader.org/download-free-pdf-viewer.html
[path]: https://superuser.com/a/949577/278092
[installing-perl]: http://bquistorff.blogspot.de/2015/01/getting-latexmk-working-within-lyx.html
