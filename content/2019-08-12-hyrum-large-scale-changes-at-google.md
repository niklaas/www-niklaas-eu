---
author: "Niklaas Baudet von Gersdorff"
title: "'Large-Scale Changes at Google...' by Hyrum Wright"
date: 2019-08-12T20:30:40+02:00
draft: true

taxonomies:
  tags: ["Hyrum Wright", "bugs", "summary", "Google", "software design"]
---

Some time ago I stumbled upon Hyrum Wright's talk "Large-Scale Changes
at Google: Lessons Learned From 5 Years of Mass Migrations". (A video
recording of the talk is embedded below.) If I remember correctly, I
thought that, while the size of the code bases I work with are much,
much smaller than Google's, I might get a glimpse of how to work in
Google's universe.

So, the more I was surprised that I could apply a lot of the lessons
learned in my daily work. This falls in line with what Hyrum says
at some point in his talk: "large-scale change" does not necessarily
mean changes of scales he is used to at Google. Rather, "large-scale"
means in comparison to the average size of changes performed on your
codebase.

In the following, I try to summarize Hyrum's key findings. Obviously,
for you, the reader, this is a different experience than watching the
talk by yourself (I highly recommend to do so!) but it can be -- as it
is for me -- a future reference to quickly recapture what he reasoned.

[![Large-Scale Changes
at Google: Lessons Learned From 5 Years of Mass Migrations](http://img.youtube.com/vi/TrC6ROeV4GI/0.jpg)](http://www.youtube.com/watch?v=TrC6ROeV4GI "Video Title")

[Hyrum Wright](personal-homepage) introduces [his talk](talk-on-utube)
by summarizing some well-known truths about software development and
systems. He formulates these facts negatively -- to gain the attention
of the audience, I assume. So, let's re-formulate them positively for
clarity. They say:

- A system's dependencies (including hardware) are never perfectly
  secure.
- Any system will eventually need features of newer
  languages/compilers/standards.
- Any system will eventually need to interoperate with newer systems.
- Code contains bugs.

Although they sound like truisms, they underline very well what every
codebase is victim of: _change_. That said, software engineers rather
train and prepare for disaster mitigation than for changing code
quickly.

Nobody is a perfect programmer, which is only OK as long as we can
repair misbehaving systems quickly if necessary. As a consequence, a
fundamental rule at Google is:

> No haunted graveyards! There may not be any area in a codebase
> people are afraid to make changes to.

In addition, when refactoring, non-atomic refactoring should be
preferred to atomic refactoring i.e.,

1. add the new service/component/...
2. fix all bugs migrating causes
3. remove the old service/component/...

Otherwise, especially when dealing with repositories that are victims
of lots of changes, while someone is migrating the code to the new
standard, someone else bases their own implementation on the old one.
After a non-atomic change is achieved, tooling ensures that old code
becomes deprecated and that it is communicated as such. So, parts that
had not been migrated yet, are adapted in the next step and the old
standard is finally removed.

[personal-homepage]: http://www.hyrumwright.org/
[talk-on-utube]: https://www.youtube.com/watch?v=TrC6ROeV4GI
