---
title: "Disable ssh-agent in Xfce"
date: 2019-02-16
taxonomies:
  tags: ["Xfce", "ssh-agent", "GnuPG"]
---

While switching from `ssh-agent` itself to GnuPG's `ssh-agent` capabilities, I
had to prevent `ssh-agent` from starting when logging into Xfce. It seems [the
only way][1] to do this is with the following command:

```
$ xfconf-query -c xfce4-session -p /startup/ssh-agent/enabled -n -t bool -s false
```

<!-- more -->

[1]: https://wiki.archlinux.org/index.php/Xfce#SSH_agents
