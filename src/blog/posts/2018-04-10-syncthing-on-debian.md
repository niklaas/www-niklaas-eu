---
title: "Setting up syncthing with systemd on Debian"
date: 2018-04-10T19:11:53+02:00

tags: ["syncthing", "Debian", "sysadmin", "systemd"]
---

[Syncthing][syncthing] is a great tool for keeping machines in sync. This is
quick write-up on how to configure automatic start with systemd on server.
Important: This is different from setting it up on a client machine. In this
case you would run it as the user logged in.

<!-- more -->

On Debian systems I recommend to [install the `deb`
packages](https://apt.syncthing.net/). These will also copy appropriate service
files in `/lib/systemd/system`. Further I recommend to use a dedicated user for
running the syncthing server.

```{shell}
$ adduser --system --group syncthing
```

To enable the service in systemd, run the following code:

```{shell}
$ systemctl enable syncthing@syncthing.service
$ systemctl enable syncthing-resume.service  # to restart syncthing after resume
```

You can start syncthing with the following line:

```{shell}
$ systemctl start syncthing@synching.service
```

Afterwards the server listens on `localhost:8384`. Most probably you want it to
listen on all interfaces to get remote access. This needs further configuration
in `/home/syncthing/.config/syncthing/config.xml`. Change the following line
removing `localhost`:

```{xml}
<address>:8384</address>
```

[syncthing]: https://www.syncthing.org
