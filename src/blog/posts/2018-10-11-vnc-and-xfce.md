---
title: "VNC and two Xfce sessions"
date: 2018-10-11
tags: ["vnc", "xfce4"]
---

I ran into the following errors when trying to start another Xfce session for
VNC while an existing one was already running.

```
/usr/bin/startxfce4: X server already running on display :1
Unable to create /home/niklaas/.dbus/session-bus
Xlib:  extension "RANDR" missing on display ":1".
```

<!-- more -->

As a quick workaround, I found that adding the following two lines to
`~/.vnc/xstartup` allowed Xfce to start successfully.

```
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
```
