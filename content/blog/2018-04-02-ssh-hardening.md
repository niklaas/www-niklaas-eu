---
title: "SSH hardening"
date: 2018-04-02T16:18:24+02:00

tags: ["security", "ssh", "sysadmin", "Debian", "FreeBSD"]
---

Often I am unhappy with the default settings of the SSH daemon. Not that they
provide a security threat to the systems but you can make it even more difficult
for an attacker to get access to a system. In addition to the default settings I
always enable the following:

<!-- more -->

* Authentication with both public-key and passphrase
* Disable login with `root` user
* Use `git-shell` for Git account

In the following I shortly explain the necessary steps to enable these features
on a [Debian](https://www.debian.org) system. At the end of the post, I provide
a similar configuration for [FreeBSD](https://www.freebsd.org) systems.

We take a look at the SSH server configuration in `/etc/ssh/sshd_config`. By
default, Debian disables `ChallengeResponseAuthentication`. However, it's needed
to allow multiple authentication methods.^[[StackExchange: Does
keyboard-interactive authentication support two sequential
passwords?](https://unix.stackexchange.com/a/241240/74540)] Thus, you should
enable it with the following line:

```conf
ChallengeResponseAuthentication yes
```

Once enabled, you can specify the required authentication mechanism and the
sequence in which they must be provided in `AuthenticationMethods`. You must
separate the methods with a comma (`,`). To ask for a public key first and
subsequently require the password of the user, you can use the following line:

```conf
AuthenticationMethods publickey,keyboard-interactive:pam
```

In the same file you can change (or add) the following line to disable
authentication as the root user:

```conf
PermitRootLogin no
```

For some users you might want to disable public key authentication. This may be
interesting for an account that you only use to share Git repositories. Such an
account should be secured by using `git-shell` as its default shell anyway. (We
will discuss this in the next step.)

To disable multiple authentication methods for a specific user, you can match by
the user's name and specify possible authentication methods separating them with
a space ( ) -- and not a comma. In the following example, the user `git` may
authenticate through *either* public key *or* password.

```conf
Match User git
    AuthenticationMethods publickey keyboard-interactive:pam
```

To limit `git`'s available commands to those of Git, change the shell of the
user to `git-shell`.

```sh
$ sudo chsh -s $(command -v git-shell) git
```

On FreeBSD machines it isn't necessary to specifically enable
`ChallengeResponseAuthentication` because it's enabled by default. Neither you
need to reference to [PAM](http://www.linux-pam.org/). Thus the following is
sufficient:

```conf
AuthenticationMethods publickey,keyboard-interactive
```
