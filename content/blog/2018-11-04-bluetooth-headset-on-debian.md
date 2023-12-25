---
title: "Bluetooth Headset on Debian"
date: 2018-11-04
tags: ['bluetooth', 'Debian', 'audio']
---

I had some trouble connection my new [Teufel Rockster XS](rockster) (actually
not a headset but a portable speaker) with my Debian notebook. Pairing worked
without any problem but connection to the audio sink of the speaker -- to
actually stream audio to the device -- returned the error:

> Connection Failed: blueman.bluez.errors.DBusFailedError: Protocol Not available

<!-- more -->

The root cause was a [missing package](solution-se); so I installed it it with `apt`:

```sh
$ apt install pulseaudio-module-bluetooth
```

After installing the package I made sure the module is loaded and restarted the
bluetooth service (be aware that all current connections will be terminated).

```sh
$ pactl load-module module-bluetooth-discover
$ systemctl restart bluetooth
```

You should also make sure the module is loaded after reboot. If the following
command returns sensible information that should be the case.

```sh
$ grep bluetooth /etc/pulse/default.pa
```

I re-paired the device and could connect to the audio sink eventually.

[rockster]: https://www.teufel.de/bluetooth/rockster-xs-p16578.html
[solution-se]: https://askubuntu.com/a/801669/441510
