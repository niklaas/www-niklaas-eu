---
title: "Mounting VirtualBox's shared folders"
author: "Niklaas Baudet von Gersdorff"
date: 2017-09-09T11:18:30+02:00
slug: "mounting-vboxsf"

tags: ["virtual-box", "sysadmin", "Windows", "Linux", "Permissions"]
---

When mounting VirtualBox folders shared by Windows with `mount -t vboxsf <shared folder> <mountpoint>` on a Unix machine, the permissions of files and
folders are often incorrect. Both files and folders are mounted with `umask 000`.

<!-- more -->

As a workaround I mount shared folders with the following options:

```
mount -t vboxsf -o uid=<username>,gid=<username>,fmask=122,dmask=022 <shared folder> <mountpoint>
```

The options enforce ownership and `umask`s for files and folders. This means
that both ownership and permissions from the original file system are
_overridden_. This could be not what you actually intend, especially when
mounting Unix file systems. However, for Windows file systems I consider it a
useful workaround because ownership and permissions become more useful for daily
work.

The command translates to the following entry in `/etc/fstab`:

```
<shared folder> <mountpoint> vboxsf uid=<username>,gid=<username>,fmask=122,dmask=022 0 0
```
