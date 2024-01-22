---
draft: true
---

```ecmascript 6
beforeAll(() => {
  jest.doMock('fuse.js', () => () => ({ search: jest.fn().mockReturnValue([]) }))

  suggestEntireDomain = require('./suggest-entire-domain').suggestEntireDomain
})

afterAll(() => {
  jest.unmock('fuse.js')
  jest.resetModules()
})
```
