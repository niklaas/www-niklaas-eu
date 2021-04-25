---
title: "reveal.js and remote pointers"
author: "Niklaas Baudet von Gersdorff"
date: 2017-05-14T14:39:12+02:00

tags: ["reveal.js"]
---

[Reveal.js](https://github.com/hakimel/reveal.js) is a great framework for
creating presentations based on HTML5, CSS, and JavaScript. There is only one
thing that is a bit puzzling: the default key bindings do not work with remote
pointers.

<!-- more -->

Remote pointers issue arrow-keys, however the default key bindings for moving
back and forth in `reveal.js` slide decks are `Shift-Space` and `Space`. The
arrow keys are used for navigating between slides _independently from their
logical sequence_. As a consequence, in two-dimensional slide decks, using a
remote will erroneously skip slides.

While there are [several](http://stackoverflow.com/a/19628928/2300759)
[solutions](http://stackoverflow.com/a/35606596/2300759) to the problem
discussed on the web, none of them solves the problem entirely. Either they
remap the Up and Down or the Left and Right arrow-keys. A complete solution
remaps all of them:

```{JavaScript}
// Either Reveal.initialize({ ... or
Reveal.configure({
    keyboard: {
        37: 'prev',
        38: 'prev',
        39: 'next',
        40: 'next'
    }
})
```

One final thought: At first glance, remapping the arrow keys seems inconvenient
because when in "overview-mode" (by pressing `o`) navigating through the slides
using the arrow-keys is no longer possible. But since reveal.js is quite
hack-ish and thought out, the vim key bindings `h`, `j`, `k`, and `l` supplement
the arrow keys. Thus, in overview-mode you can use these keys to navigate left,
down, up, and right.
