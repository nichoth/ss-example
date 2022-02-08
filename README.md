An example of using `secret-stack`

```js
var SecretStack = require('secret-stack')
// var caps = require('ssb-caps')
var seeds = require('./seeds')

var App = SecretStack({
    appKey: '1KHLiKZvAvjbY1ziZEHMXawbCEIM6qwjCDm3VYRan/s='
}).use({
    manifest: {
        hello: 'sync'
    },
    permissions: {
        anonymous: {
            allow: ['hello'],
            deny: null
        }
    },
    init: function (api) {
        return {
            hello: function (name) {
                return 'Hello, ' + name + '.'
            }
        }
    }
})


// __the `seed` option__
// https://github.com/ssb-js/secret-stack/issues/76
// You must either pass is `seed` or { keys: ssbKeys.loadOrCreate() }

var alice = App({ seed: seeds.alice })
var bob = App({ seed: seeds.bob })
// var alice = App()
// var bob = App()


console.log('addr', bob.address())

alice.connect(bob.address(), (err, rpc) => {
    console.log('connected', err, !!rpc.hello)

    rpc.hello('alice', (err, res) => {
        console.log('hello response --- ', err, res)
    })

    alice.close()
})
```

