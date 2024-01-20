---
title: "Easy deployment with git hooks"
author: "Niklaas Baudet von Gersdorff"
date: 2017-07-16T16:16:50+02:00

taxonomies:
  tags: ["git"]
---

I use [Git](www.git-scm.com) for managing this website. After commiting content
locally, I push it to the remote side. Traditionally, then, I would `ssh`
into remote and copy the repositories content somewhere under `/var/www`.
This was before I found out about a very handy feature implemented in Git
called "hooks".[^1]

<!-- more -->

Hooks can automate tasks, such as deploying the repositories content on
the integration server when changes are pushed to the "live" branch. For
this to work, the following script must be put in the `hooks` folder under
`.git` (or directly under `hooks` if it's a `--bare` repository) and must
be named `post-receive`.

```
#!/bin/sh

deploydir=/var/www

while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)
    if [ "$branch" == "master" ]
    then
        git --work-tree=$deploydir checkout -f $branch
    fi
done
```

Obviously, this is just one of many possible tasks that can be achieved
with hooks.

[^1]: For more information on this feature see [Git's official handbook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).
