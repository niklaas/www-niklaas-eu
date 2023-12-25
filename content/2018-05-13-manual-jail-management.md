---
title: "Manual Jail Management"
date: 2018-05-13T13:03:02+02:00
draft: true

tags: ["FreeBSD", "sysadmin"]
---

Some while ago I read a [very interesting article about manual jail
management][1] under FreeBSD. *Manual* because instead of using tools such as
[ezjail][ezjail], [iocage][iocage] or [qjail][qjail], you would adapt a workflow
that solely relies on tools integrated in the base system. This gives the
advantage that you are not dependent on these tools implementing new features of
the jail concept.

<!-- more -->

Initially, I used `ezjail` to manage jails on a production server. At some point
I realised that its no longer updated (see [ezjail's git
repository][ezjail-git]). For me this got a greater issue because jails were a
fundamental part of the production environment. At that stage I thought about
switching to another tool but eventually decided that this will probably lead me
to the same trap in the future.

The article mentioned above helped me a lot. So this post summarises its main
ideas: how to build the initial folder structure, combining "thinjails" and
`nullfs` mounts, and also how to upgrade the jails to newer versions of FreeBSD.

# Preparing the folder structure

I decided to store the jails in `/usr/local/jails`. Create the following folders:

```sh
# mkdir -p /usr/local/jails/templates
# mkdir -p /usr/local/jails/thinjails
```

In `templates` we store different releases of the FreeBSD base system. These are
shared among the various jails to ease upgrading. In `thinjails` we store
everything that is local to each jail in a separate folder.

To fetch a base system, find the appropriate `base.txz` under [FreeBSD's FTP
mirros][freebsd-mirror], and run the following command. Obviously, these
commands depend on the version you have chosen.

```sh
# fetch http://ftp.freebsd.org/pub/FreeBSD/releases/amd64/10.4-RELEASE/base.txz
# mkdir /usr/local/jails/templates/base-10.4-RELEASE
# tar -xJf base.txz -C /usr/local/jails/templates/base-10.4-RELEASE
```

We should also update to the latest patched version:

```sh
# UNAME_r=10.4-RELEASE freebsd-update -b /usr/local/jails/templates/base-10.4-RELEASE fetch
# UNAME_r=10.4-RELEASE freebsd-update -b /usr/local/jails/templates/base-10.4-RELEASE install
```

In case you run `freebsd-update` with `sudo`, remember to set flag `-E` to
receive the environment variable.

In the next step you move what will be local each jail to a template that we
will use for each thinjail:

```sh
# mkdir -p /usr/local/jails/templates/jail-10.4-RELEASE/usr/home
# mv /usr/local/jails/templates/base-10.4-RELEASE/{etc,root,tmp,var,jail-10.4-RELEASE}
# mv /usr/local/jails/templates/base-10.4-RELEASE/{usr/local,jail-10.4-RELEASE/usr}
```

For each jail `base-10.4-RELEASE` will be their root and *copies* of
`jail-10.4-RELEASE` will be mounted in it under `jail`. So we need to create
symlinks in both `base-10.4-RELEASE` and `jail-10.4-RELEASE` appropriately.

```sh
# cd /usr/local/jails/templates/jail-10.4-RELEASE
# ln -s usr/home
```

```sh
# cd /usr/local/jails/templates/base-10.4-RELEASE
# mkdir jail
# ln -s jail/etc
# ln -s jail/home
# ln -s jail/root
# ln -s ../jail/usr/local usr/local
# ln -s jail/tmp
# ln -s jail/var
```

TODO: How to configure `/etc/jail.conf`?

# Upgrading the jails

[1]: https://clinta.github.io/freebsd-jails-the-hard-way/#thin-jails-using-nullfs-mounts
[2]: https://www.freebsd.org/doc/handbook/jails-tuning.html#jails-updating

[ezjail]: https://erdgeist.org/arts/software/ezjail/
[ezjail-git]: https://erdgeist.org/gitweb/ezjail/
[iocage]: https://github.com/iocage/iocage
[qjail]: https://www.freebsd.org/cgi/man.cgi?query=qjail&sektion=8&manpath=FreeBSD+9.0-RELEASE+and+Ports

[freebsd-mirror]: http://ftp.freebsd.org/pub/FreeBSD/releases/
