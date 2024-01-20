---
title: "Using a proper pinentry remotely when running X"
date: 2019-03-10T16:59:49+01:00
taxonomies:
  tags: ["Debian", "ssh", "pinentry", "gpg", "GnuPG"]
---

The application `pinentry` opens when you need to provide your password for
decrypting your GnuPG key. You can install different interfaces for providing
the password via `pinentry`. There are graphical and non-graphical variants
e.g.,

    $ dpkg -l | grep pinentry
    pinentry-curses
    pinentry-gnome3
    pinentry-gtk2
    pinentry-tty

<!-- more -->

It makes sense to open a graphical interface when `pinentry` is called by a
graphical program (e.g., when encrypting an email composed in Thunderbird) and
a non-graphical interface when `pinentry` is called by a non-graphical program
(e.g., when signing a commit through `git commit`). That said, this is not
default behaviour.

    update-alternatives --config pinentry

shows the current variant used when calling `pinentry`. On newer systems this
is `pinentry-gnome3`, which seems fine but has one caveat: it will always run a
graphical interface if a X session is running. This is [quite][1]
[problematic][2] when connecting to a machine that has a X session running
remotely. This is indeed an issue with `pinentry-gnome3` and [can be avoided by
using `pinentry-gtk2` instead][3].

[1]: http://gnupg.10057.n7.nabble.com/GnuPGv2-amp-pinentry-on-Linux-w-remote-access-td53946.html
[2]: https://lists.gnupg.org/pipermail/gnupg-users/2017-March/057967.html
[3]: https://dev.gnupg.org/T2818#92294
