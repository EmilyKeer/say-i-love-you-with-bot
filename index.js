var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('I love you Derek!')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'derektao') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


// API End Point

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text

            switch (text) {
              case '晚安':
              case '晚安啦':
              case '晚安啊':
                sendTextMessage(sender, "晚安 == wan an == Wo Ai Ni Ai Ni")
                break
              case '早安':
              case '早安啊':
                sendTextMessage(sender, "愿你今天一天都开心！")
                break
              default:
              sendTextMessage(sender, "My honey Derek says " + text.substring(0, 200))
            }
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "Use your own token"

// function to echo back messages

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


// Send an test message back as a card

function sendGenericMessageOne(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "I love you Baby",
                    "subtitle": "To celebrate 5.20 for us",
                    "image_url": "http://weknowyourdreams.com/images/love/love-07.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.imgrum.org/tag/%E4%B9%BE%E7%85%B8%E5%9B%9B%E5%AD%A3%E8%B1%86%E5%9B%9B%E5%B7%9D%E9%85%B8%E8%8F%9C%E9%AD%9A%E7%89%87",
                        "title": "Who are we"
                    }, {
                        "type": "web_url",
                        "url": "https://ninchanese.com/blog/2016/05/20/520-chinese-love-word-number/",
                        "title": "What is 5.20"
                    },{
                        "type": "web_url",
                        "url": "https://www.youtube.com/watch?v=AayHUbAFb1Y",
                        "title": "Our song"
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessageTwo(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "我们的故事",
                    "subtitle": "这是一个很充实的故事，彼此还有无限美好的未来。",
                    "image_url": "http://weknowyourdreams.com/images/love/love-07.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://ibb.co/jmcwFv",
                        "title": "我想说"
                    }, {
                        "type": "web_url",
                        "url": "https://www.youtube.com/watch?v=cir0sANnR4E/",
                        "title": "亲爱的你"
                    },{
                        "type": "web_url",
                        "url": "http://clickme.net/1084",
                        "title": "别点！小黄文"
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
