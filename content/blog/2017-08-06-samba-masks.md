---
title: "Samba's file and directory masks"
author: "Niklaas Baudet von Gersdorff"
date: 2017-08-06T09:10:47+02:00
slug: "samba-masks"

taxonomies:
  tags: ["samba", "permissions"]
---

When setting up [Samba](https://www.samba.org/) shares, I always wonder how to
set file and directory masks correctly. The following is a best practice
example that works quite well in `smb.conf`:

<!-- more -->

```
[<share-name>]
   path=<path-to-share>
   browseable=yes
   writeable=yes
   valid users=<user>
   create mask=0644
   directory mask=0755
```
