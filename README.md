# mongoose-plugin-plugin #

A Mongoose plugin that plugs-in plugins!

## Installation ##

```shell
npm install --save mongoose-plugin-plugin
```

## Usage ##

Let's say that we have 3 plugins that we'd like to apply to all of our Schemas.  We can do this as follows:

```javascript
// Here are some various Mongoose plugins
var plugin1 = require('mongoose-plugin1');
var plugin2 = require('mongoose-plugin2');
var plugin3 = require('mongoose-plugin3');

// Here's our hero!  mongoose-plugin-plugin!
var createMPP = require('mongoose-plugin-plugin');


// Let's create an instance...
var mpp = createMPP()

// Let's add the plugins and desired options
mpp.push(plugin1)
   .push(plugin2, {output: "log.txt"})
   .push(plugin3, {fancy: true});


// Now we can plugin mpp to each of our Schemas
PersonSchema.plugin(mpp);
CarSchema.plugin(mpp);
CoffeeSchema.plugin(mpp);
```

## ...why? ##

Here's a more realistic example.  In this case, we want to change the way our plugins are configured depending upon whether or not we are in debug mode:

```javascript

var createMPP = require('mongoose-plugin-plugin');

function createPlugin(isDebugMode, amqpChannel) {
  var mpp = createMPP();

  // Automatically update the 'updated_at' timestamps
  mpp.push(updateTimestamps);

  // If we're in debug mode, then log EVERYTHING.  Otherwise,
  // only log the operations that caused errors.
  mpp.push(loggingPlugin, {
    onSuccess: isDebugMode,
    onError:   true
  });

  // Publish model changes to ActiveMQ
  mpp.push(amqpPlugin, {
    exchange: 'model.events',
    channel:  amqpChannel
  });

  return mpp;
}

```

## ...so what? ##

Now we have an easy way to verify exactly how the plugins will be configured _before_ they are plugged into the Schemas.  For example:

```
var mpp = createMPP(true, channel);

// Show exactly which plugins will be used, and how
// they will be configured.
console.log(mpp.spec);
```
