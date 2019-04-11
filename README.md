# Coffee Status Bot

[![Build Status](https://travis-ci.org/arthurlockman/coffee-bot.svg?branch=master)](https://travis-ci.org/arthurlockman/coffee-bot)

![Build Status](http://s3.amazonaws.com/arthurlockman-static-assets/share/cold-brew.jpg)

This little bot keeps track of the coffee stock status in the office.

## API

To get the coffee status make a `GET` call to `https://coffeestatus.rthr.me/status`. It will return JSON,
either `true` or `false` depending on the status. `true` is in stock, and `false` is out of stock.

To update the coffee status make a `POST` call to `https://coffeestatus.rthr.me/status` with this body:

    {
        "status": true
    }

Sending `true` will update the status to true, and sending `false` will update it to false.

Sending a status update will also post an update to the coffee Slack room.
