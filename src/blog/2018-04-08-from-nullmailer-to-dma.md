---
title: "Drop Nullmailer for DragonFly Mail Agent (dma)"
date: 2018-04-08T09:38:19+02:00

tags: ["Unix", "Mail", "dma", "nullmailer", "sysadmin"]
---

 **Update:** In the previous version of this post, the sequence of the
 credentials in `/etc/dma/auth.conf` was wrong.

Not a long time ago, in a [previous
post](@/2018-04-02-nullmailer-for-system-mail.md), I recommended to
use [nullmailer][nullmailer] for a simple send-only mail transfer
agent to relay system mail. I must revise that advice because of two
reasons:

 <!-- more -->

1. It seems Nullmailer does not allow changing the sender of sent mails.
2. Providing credentials in `/etc/nullmailer/remotes` is a security flaw because
   they can be caught by any user running `ps aux`.

However, changing the sender is important. While installing nullmailer on a
local system over the weekend, I again got struck by the fact that
[Posteo][posteo] would not allow relaying mail from a host that does not have a
fully-qualified domain name -- obviously my local Raspberry Pi does not have
one.

The solution is to change the sender. Instead of sending mail with a sender like
e.g., `root@rpi-local`, masquerade the sender with an envelope-from. In our case
we can use the Posteo account.

That said, it seems nullmailer cannot do so, see this [StackExchange
post][stackexchange-post]. In the same post they also talk about the above
mentioned security flaw. But there is an easy to use alternative: DragonFly Mail
Agent (dma).

So, after removing Nullmailer from the system, install dma and configure it in
`/etc/dma/dma.conf` like the following:

```
SMARTHOST posteo.de
PORT 587
AUTHPATH /etc/dma/auth.conf
SECURETRANSFER
STARTTLS
MASQUERADE <account>@posteo.de
```

As you can see, credentials must go to `/etc/dma/auth.conf`, which will be *read*
by dma. (On the contrary, Nullmailer seems to simply execute each line of
`/etc/nullmailer/remotes`. Consequently users can catch these lines, including
the credentials, by executing `ps`.)

```
<account>@posteo.de|posteo.de:<password-for-account>
```

What's left though is forwarding all mail i.e., mail received by any local user
on the system, including `root`, `postmaster`, and the like, to our account at
Posteo (or any other provider you chose). Since dma reads `/etc/aliases` this
can be achieved with the following line:

```
*: <account>@posteo.de
```

[nullmailer]: http://untroubled.org/nullmailer
[posteo]: https://www.posteo.de
[stackexchange-post]: https://askubuntu.com/a/759682/441510
