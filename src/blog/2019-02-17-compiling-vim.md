---
title: "Compiling Vim with modern features"
date: 2019-02-17
tags: ["Vim", "Lua", "Python", "Debian"]
---

I prefer the most updated version of `vim` these days. First, you must make
sure that you have installed the required dependencies for building.

```{shell}
$ apt install \
    libx11-dev \
    libxt-dev
```

<!-- more -->

If you want support for `lua` you need to link to some library files in
`/usr/include`.

```{shell}
# Fix lua paths
$ ln -s /usr/include/lua5.3 /usr/include/lua
$ ln -s /usr/lib/x86_64-linux-gnu/liblua5.3.so /usr/local/lib/liblua.so
```

Finally, configure the build process. Enabling the following features is just
an example. Personally, I use `vim` on the command line only, nonetheless, it
makes sense to configure `--with-x` to have access to the system clipboards in
`vim`'s registers `"*` and `"+`. Further, `--enable-fail-if-missing` is
recommended if you want to notice missing dependencies that are required for
the provided configuration.

```{shell}
$ ./configure \
    --enable-pythoninterp \
    --enable-python3interp \
    --enable-luainterp \
    --with-features=huge \
    --with-x \
    --enable-fail-if-missing
```

Depending on your system, the dependencies listed at the top of this post are
not sufficient. Most probably you must install other libraries and restart the
configuration. If that is the case (or if you change the arguments of
`./configure`) remember to run the following command. This will clean the
cached results of the configuration run previously.

```{shell}
$ make distclean
```

When configuring the built process was successful, you can start the built
process and install the compiled files.

```{shell}
$ make
$ make install
```

You can double-check whether the version you compiled includes all features
with `vim --version`. This will return the version and a list of compiled
features.

If you want to compile from source again, first, run the following command to
clean the build directory.

```{shell}
$ make clean
```

To remove the compiled files from `/usr` and others run `make uninstall`.
