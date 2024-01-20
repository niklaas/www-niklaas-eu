---
author: "Niklaas Baudet von Gersdorff"
title: "Using the jsdom test environment"
date: 2024-01-17T15:03:42+02:00
tags: ["javascript"]
---

Recently, I started working on a new JavaScript codebase that uses the Jest test runner. After stumbling upon the 
following error when running some test cases in a file, I realized that I wasn't aware of the fact that Jest 
supports more than one test environment.

```text
  ● Test suite failed to run

    The error below may be caused by using the wrong test environment, see https://jestjs.io/docs/configuration#testenvironment-string.
    Consider using the "jsdom" test environment.
    
    ReferenceError: window is not defined

    (...)
```

<!-- more -->

As it turned out, the module of the function under test pulled in some other function that used `window`. I fixed 
the error by changing the import from a barrel import to an individual file import, but learned that there is an easy 
way to change the jest environment per file using the following JsDoc.

```js
/**
 * @jest-environment jsdom
 */
```
