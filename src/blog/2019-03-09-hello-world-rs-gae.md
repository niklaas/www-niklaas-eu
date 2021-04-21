---
title: "Performant and lightweight Rust API Server powered by Google App Engine"
date: 2019-03-09T16:21:47+01:00
tags: ["google-app-engine", "gae", "rust", "web"]
---

The article provides some background to the example project
[hello-world-rs-gae][hello-world-rs-gae]. The project demonstrates how to
deploy a simple "Hello World!" server on [Google App Engine][gae] served by a
static Rust binary.

Nowadays there is no longer need to supervise servers for providing a
performant web application. Since containerization, Docker, Kubernetes and the
like have become mainstream, more and more cloud providers offer managed
solutions for hosting any type of container. Examples include [AWS Elastic
Beanstalk][aws-beanstalk], [nanobox.io][nanobox] and [Digital Ocean's new
managed Kubernetes service][do-kubernetes].

Another service I came across recently is [Google App Engine][gae]. At first
glance it seemed to target specific languages only, such as JavaScript, Python,
Ruby, Go, etc. but, in fact, it supports _any language_ you can think of -- as
long as you can provide your application in a Docker container that serves a
so-called "[custom runtime][gae-about-custom-runtimes]".

So I thought this would be a great opportunity to run an [actix][actix] server
in a [Rust][rust] runtime. It turned out not to be too simple because compiling
a server based on actix takes some time. Regularly, compiling [a simple hello
world project][hello-world-rs-gae] in the Google Cloud ran into a timeout and
the deployment of the application failed. This was when I got the idea to
compile the project somewhere else (locally) and reduce the actual deployment
in the cloud to a lightweight Docker container. In the container, the compiled
binary serves as entry point for the application.

For the deployment to the cloud being fast and using the least resources
possible, I decided to use [rust-musl-builder][rust-musl-builder] and host the
resulting binary in a [`scratch` container][dockerfile]. While I was quite
skeptic about this idea in the first place, I turned out to work. And it is
pretty useful because it offers a very simple way of hosting an automatically
scaling REST endpoint that is light on resources.

[actix]: https://actix.rs
[aws-beanstalk]: https://aws.amazon.com/elasticbeanstalk/
[do-kubernetes]: https://www.digitalocean.com/products/kubernetes/
[dockerfile]: https://github.com/niklaas/hello-world-rs-gae/blob/master/Dockerfile
[gae-about-custom-runtimes]: https://cloud.google.com/appengine/docs/flexible/custom-runtimes/about-custom-runtimes
[gae]: https://cloud.google.com/appengine/
[hello-world-rs-gae]: https://github.com/niklaas/hello-world-rs-gae
[nanobox]: https://nanobox.io
[rust]: https://www.rust-lang.org
[rust-musl-builder]: https://github.com/emk/rust-musl-builder
