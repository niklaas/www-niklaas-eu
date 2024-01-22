---
title: "FreeBSD and bluetooth keyboards"
author: "Niklaas Baudet von Gersdorff"
date: 2017-06-09T12:09:15+02:00

taxonomies:
  tags: ["FreeBSD", "bluetooth"]
---

<!-- more -->

It is not quite straighforward to get a bluetooth keyboard running on
FreeBSD.[^1] First, the bluetooth service must be started for the device. You
can check for the device name in `/var/log/messages` (in this case it is
`ubt0`).

```
$ service bluetooth start ubt0
```

Once started, turn on your bluetooth peripheral and set it to discovery
mode i.e., prepare it for pairing. Now, search the device on your FreeBSD
box and note its bluetooth address.

```
$ hccontrol -n ubt0hci inquiry
```

Add the address to `/etc/bluetooth/hosts` in the following format:

```
BD_ADDR     bt-kb
```

And also add it to `/etc/bluetooth/hcsecd.conf` in the following way:

```
device {
    bdaddr  BD_ADDR;
    name    "bt-kb";
    key     nokey;
    pin     "1234";
}
```

`BD_ADDR` is the address of the bluetooth device you found with the
previous command and `bt-kb` is an arbitrary name chosen for the device.
You can choose whatever name you prefer.

Depending on your device you need to provide a `pin`. For some devices the
bluetooth pin is hardcoded, for others you need to provide the pin chosen
here during pairing.


Subsequently enable the following services in `/etc/rc.conf`:

```
hcsecd_enable="YES"
bthidd_enable="YES"
sdpd_enable="YES"
```

Start these services. Then, register your keyboard with the following
command:

```
$ bthidcontrol -a BD_ADDR query >> /etc/bluetooth/bthidd.conf
```

You further need to load the following kernel module:

```
$ kldload vkbd
```

To make this permanent, add the following line to `/boot/loader.conf`.

```
vkbd_load="YES"
```

Make sure that your keyboard is in discovery mode. FreeBSD will try to
connect your bluetooth peripheral. If necessary issue the pin you set in
`hcsecd.conf` on your keyboard. (I had to subsequently press `1`, `2`,
`3`, `4`, and `ENTER`.)

If you encounter problems, run `hcsecd` and/or `bthidd` in foreground with

```
$ hcsecd -d
$ bthidd -d
```

and inspect the output. Do not forget to stop their already running
instances beforehand.

[^1]: The [FreeBSD Handbook](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/network-bluetooth.html) provides some insight but fails to mention how to initate the pairing process *from* the FreeBSD box itself. This I found out in the [forums](https://forums.freebsd.org/threads/39679/page-2#post-220632).
