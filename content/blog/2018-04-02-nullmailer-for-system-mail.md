---
title: "Nullmailer for System Mail"
date: 2018-04-02T17:39:16+02:00

tags: ["sysadmin", "Unix", "Debian", "Mail", "nullmailer"]
---

**Update:** See this [updated
post](@/2018-04-08-from-nullmailer-to-dma.md) on why you should *not*
use nullmailer but dma for relaying system mail.

<!-- more -->

One thing we often forget -- although it's one of the most important parts of
administering a Unix machine -- is system mail. However, if you don't set it up
correctly, you won't receive important information about the health of the
systems you administer.

On systems that are only used by a single user, you don't need a full-fledged
mail transfer agent (MTA)[^MTA] to receive system mail. You want every mail to
be delivered to a single user i.e., the email address you regularly check. This
is when [nullmailer](http://untroubled.org/nullmailer/) shines.

Once you replace the default MTA of your system with nullmailer, you can set it
up to forward every mail to a single email address. This is quite handy because
then you can make sure that you will receive important information about your
servers e.g., unattended upgrades, failed cron jobs and the like.

In the following I describe how to configure nullmailer on Debian. After having
it installed with `sudo apt install nullmailer`, we need to check three
configuration files:

* `/etc/nullmailer/adminaddr`: the address all system mail should be relayed to
* `/etc/nullmailer/defaultdomain`: appended to all hostnames that aren't fully
  qualified
* `/etc/nullmailer/remotes`: contains the mail relays where all system should be
  relayed through

It makes sense to relay mail through a server / an account that you can trust.
Of course, you can relay mail through your own systems. However, what will you
do, if these systems strike too? It makes sense to use a third party service
that provides the required security (sensitive information might be relayed!).

How will we use such a service? On the one hand we will use an extern email
account to send system mail. On the other hand we will use the very same account
to receive the mail we sent. This sounds a bit weird in the first place but
makes totally sense once you realise that this makes for a very easy setup.

It's not easy to find a secure email provider that you can trust. I decided to
use [Posteo](https://www.posteo.de) because it provides a lot of [security
features](https://posteo.de/en/site/features#featuresprivacy) that other
providers lack. It only costs 1 Euro per month which makes it very cheap too.
(Disclaimer: I am *not* affiliated to Posteo.)

Once you registered an external account, nullmailer requires the login settings
of the account. In the following example I use STARTTLS for a secure connection
and configure nullmailer to use the appropriate port and username/password
combination. `mail.example.com` is the SMTP server while `smtp` specifies the
chosen protocol.

```conf
# /etc/nullmailer/remotes
mail.example.com smtp --port=587 --starttls --user=username --pass=secret
```

Since you probably administer multiple systems, it makes sense to filter the
mail you receive on the external account into subfolders. This can be achieved
quite easily by so-called recipient delimiters, the plus sign `+` being a quite
prominent one.[^recipient-delimiter] The following is a general example.

```conf
# /etc/nullmailer/adminaddr
account+hostname@service.tld
```

Recipient delimiters also work for Google Mail addresses such as
`john+important@gmail.com`. Although an additional tag `important` was provided,
`john@gmail.com` would receive the message. However, John could easily filter
the message because of the provided tag.

I recommend to transfer this idea to our example, use the hostname of the system
as a unique tag, and filter the received mail on the external account accordingly.

For system mail that doesn't provide a fully qualified domain e.g., mail sent to
`root@localhost` you should provide the default domain in file `defaultdomain`.

```conf
# /etc/nullmailer/defaultdomain
myhostname.tld
```

You can test if everything works by using the `sendmail` command provided by nullmailer:

```sh
$ echo "test" | /usr/sbin/sendmail root
```

Check your external email account. You should have received a message containing
the text "test".

[^MTA]: I highly recommend reading the Wikipedia post on mail infrastructure to get a better understanding on how it works.

[^recipient-delimiter]: To get a better understanding of what a recipient delimiter is, take a look a the [Postfix configuration page](http://www.postfix.org/postconf.5.html#recipient_delimiter). This isn't a feature unique to Postfix but implemented by a variety of MTAs and email service providers.
