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


// var app = App(config)

// var addr = app.getAddress()
// console.log('addr', addr)

// var App2 = SecretStack({
//     appKey: '1KHLiKZvAvjbY1ziZEHMXawbCEIM6qwjCDm3VYRan/s='
// })
//     // .use(require('ssb-db'))
//     // .use(require('ssb-replicate'))

// var app2 = App2()
// app2.connect(addr, (err, res) => {
//     console.log('connected', err, res)
// })

