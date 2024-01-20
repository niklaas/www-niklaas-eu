---
title: "Using tinc for a simple meshed VPN network"
date: 2018-05-10T16:44:32+02:00

taxonomies:
  tags: ["tinc", "sysadmin", "ip-addr", "ip-route", "VPN", "Debian"]
---

Accessing your computers from remote at home isn't easy since you lack a public
IP address in most cases. A workaround is to use a server with a public IP
address as an entrance to a meshed [tinc][tinc] virtual private network (VPN).

<!-- more -->

In this post I describe the basic procedure to configure two Debian machines
(one with a public IP address and one with a private IP address) to communicate
over a tinc network. In principle, you can follow the [the official configuration
guide][tinc-config], however there are some aspects you must take care of
specifically.

While the main configuration `/etc/tinc/<vpnname>/tinc.conf` can remain as it
is, I had to put more energy into setting up the tunnel device. Check out the
following files:

```conf
# /etc/tinc/<vpnname>/tinc.conf
Name: example_name
ConnectTo: public_server
Device: /dev/net/tun  # for Debian
```

```sh
# /etc/tinc/<vpnname>/tinc-up
#!/bin/sh
ip link set $INTERFACE up

ip addr add 10.<IP>.0.1/8 dev $INTERFACE
ip addr add fd83:10d3:98f3:<IP>::1/48 dev $INTERFACE
```

Remember to make the previous script executable with `chmod +x tinc-up`.
Further, specify the IP addresses as your network set-up requires. Ultratools
provides a [convenient tool](https://www.ultratools.com/tools/rangeGenerator)
for generating local IPv6 randomly. Remember that you are allowed to use `/48`
networks while Ultratools generates `/64` address ranges by default. Simply omit
the fourth block of the generated address.

1. You must turn on the tunnel device explicitly.
2. The subnets that each host provides must be smaller than the subnet you route
   to on the tunnel. Otherwise you would need to add routes to the foreign
   subnets manually. See below:

```conf
# /etc/tinc/<vpnname>/example_name
Subnet: 10.<IP>.0.0/16
Subnet: fd83:10d3:98f3:<IP>::/64
```

In the next step, generate a key pair with `tincd -n <vpnname> -K 4096` and
interchange all public keys between the hosts.

After starting tinc on all hosts, try to `ping` each host in the network. For
debugging, you can use the following command to launch `tincd` directly:

```sh
$ tincd -n <vpnname> -D
```

You can use `CTRL-C` to toggle verbosity. In case you want to start `tincd` with
higher verbosity from the beginning, use the following command flag: `-d5`. The
logging information helps a lot when debugging the network setup.

Finally, to launch `tincd` when booting, enable it in `systemd` with the
following command. Note that you need to provide the name of the tinc network,
replacing `<vpnname>` in the following command:

```sh
$ systemctl enable tinc
$ systemctl enable tinc@<vpnname>
```

[tinc]: https://www.tinc-vpn.org
[tinc-config]: https://tinc-vpn.org/documentation/index.html
