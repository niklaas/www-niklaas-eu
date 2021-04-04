---
title: "Initial hardening of FreeBSD server"
author: "Niklaas Baudet von Gersdorff"
date: 2017-11-05T17:59:17+01:00
slug: "freebsd-hardening"

tags: [post, "FreeBSD", "security"]
---

In the following I shortly describe the procedure to harden a vanilla FreeBSD server. This is basically about securing SSH and setting up PF (firewall) to protect against possible intruders.

```
pkg install sudo vim tmux git mosh sshguard-pf
```

```
# File: /etc/ssh/sshd_config

PermitRootLogin no
AuthenticationMethods publickey,keyboard-interactive
```

```
# File: /etc/rc.conf

pf_enable="YES"
sshguard_enable="YES"
```

```
# File: /etc/pf.conf

pf_enable="YES"
sshguard_enable="YES"
```

Enable firewall `pf` in `/usr/local/etc/sshguard.conf`
