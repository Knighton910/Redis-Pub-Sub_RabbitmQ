var rabbit = require('rabbitmq-nodejs-client')
var subHub = rabbit.create({ task: 'sub', channel: 'myChannel'})
var pubHub = rabbit.create({ task: 'pub', channel: 'myChannel'})

subHub.on('connection', function(hub) {
    hub.on('message', function(msg) {
        console.log(msg)
    }.bind(this))
})
subHub.connect()

pubHub.on('connection', function(hub) {
    hub.send('Hellow World')
})
pubHub.connect()

var zmq = require('zmq')
var push = zmq.socket('push')
var pull = zmq.socket('pull')

push.bindSync('tcp://127.0.0.1:3000')
pull.connect('tcp://127.0.0.1:3000')
console.log('Producer bound to port 3000')

setInterval(function() {
    console.log('sending work')
    push.send('some work')
}, 500)

pull.on('message', funciton(msg) {
    console.log('work: %s', msg.toString())
})

//Redis pub/sub with node
var signals = require('signals')
var myObj = {
    started: new signals.Signal()
}
function onStarted(param1, param2) {
    console.log(param1, param2)
}
myObj.started.add(onStarted)
myObj.started.dispatch('hello', 'world')

