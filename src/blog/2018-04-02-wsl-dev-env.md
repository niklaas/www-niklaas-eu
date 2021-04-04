---
title: "Setting up a Development Environment in Windows's WSL"
date: 2018-04-02T18:40:08+02:00

tags: [post, "dev", "Windows", "WSL", "mintty"]
---

Setting up a development environment had always been difficult but became much
easier with the lunch of [Windows Subsystem for
Linux](http://wsl-guide.org/en/latest/background.html) (WSL). Because Windows's
default terminal `cmd` is a shame and I prefer using [zsh](https://www.zsh.org)
over [bash](https://www.gnu.org/software/bash/), I recommend to do the following:

<!-- more -->

1. Install [wsltty](https://github.com/mintty/wsltty) i.e.,
   [Mintty](https://mintty.github.io/) for WSL
2. Open WSL and install zsh: `sudo apt install zsh`
3. Make zsh your default shell by appending the following to the shortcut of
   wsltty on the desktop: `/bin/zsh -l`
