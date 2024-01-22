---
title: "Unattended Upgrades"
date: 2018-05-10T21:49:31+02:00

taxonomies:
  tags: ["Debian", "sysadmin", "upgrades", "security", "crontab"]
---

In some cases it makes sense to install upgrades of packages automatically. This
can reduce time for maintenance a lot. To do so, install the little helpers
`unattended-upgrades` and `apt-listchanges` with the following command:

<!-- more -->

```sh
$ apt install unattended-upgrades apt-listchanges
```

Now make sure to set the following entries in the configuration file. This way
the result of the upgrade process is sent to `root`'s inbox. We further
configure to reboot automatically at 02:00 if upgrades require a restart.

```conf
# /etc/apt/apt.conf.d/50unattended-upgrades
Unattended-Upgrade::Mail "root";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

We should also configure crontab to send a notification once the system rebooted
successfully. This way we can make sure that both upgrading and rebooting were
successful.

```
# crontab -e
@reboot echo "Subject: Rebooted at $(date -Iseconds)" | /usr/sbin/sendmail root
```
