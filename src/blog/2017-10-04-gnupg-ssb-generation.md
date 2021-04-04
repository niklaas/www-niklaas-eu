---
title: "Generating a new subkey with GnuPG"
author: "Niklaas Baudet von Gersdorff"
date: 2017-10-04T19:04:22+02:00
slug: "gnupg-ssb-generation"

tags: [post, "GnuPG", "gpg2", "gpg"]
---

You should store your master key at a save place i.e., not on your notebook.
When generating a new key subkey, don't copy your master key to your local file
system. Rather tell GnuPG where your master key is and edit it there. *Make
sure that you use GnuPG version 2.*

```{shell}
$ export GNUPGHOME=<where your master key is>
$ gpg --edit-key <your email address>
```

In the menu run `expire` to change the expiration date of your master key if
necessary. Add two additional keys, one for encryption and one for signing,
with `addkey` and the following menus. Quit and save the new subkeys with
`save`.

Export the keys with the following command:

```{shell}
$ gpg --armor --export-secret-subkeys > secret-subkeys.asc
```

Copy the file `secret-subkeys.asc` to your notebook (or any other device where
you need your keys) and import them with `gpg --import secret-subkeys.asc`.
