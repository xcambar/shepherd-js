# Shepherd

## What is it ?

__Shepherd__ is a polyfill for the new module syntax coming in ECMAScript:Harmony.

Shepherd enables the Harmony modules syntax in engines that don't support it yet.
ES:Harmony:modules compatible files can not be parsed on non ES6-enabled engines, unless using a polyfill such as Shepherd.

## Quick features list

__Shepherd__:

* is cross-side, which means it works well in the browser and in the server
* has a ECMAScript Harmony compatible syntax
* Ennables files/libraries you can not modify (eg, jQuery from a CDN) to be declared as modules
* Provides an optimizer + minifier (using [UglifyJS](https://github.com/mishoo/UglifyJS) for production

## Want more ?

You may want to check out the [home page](http://xcambar.github.com/shepherd-js) (which indeed uses Shepherd itself) or maybe even the [tests](http://xcambar.github.com/shepherd-js/vendor/shepherd/test/).

## Contact

You can join me:
* on Twitter: [@xcambar](http://twitter.com/xcambar)
* on the [mailing list](https://groups.google.com/forum/?fromgroups#!forum/shepherd-js)

## Credentials

__Shepherd__ uses a number of excellent third-party software. Here's an exhaustive list:
* [JISON](http://zaach.github.com/jison/), a port of Bison written in Javascript. Used to build the parser for the module syntax
* [when.js](https://github.com/cujojs/when), a Promises/A compliant library. Used to handle dependencies and async operations
* [UglifyJS](https://github.com/mishoo/UglifyJS) used in the build process for target generation and minification. Also used in the optimizer
* [node-optimist](https://github.com/substack/node-optimist) for parsing command-line parameters in the optimizer

Many thanks to the authors, your work is incredible, your contribution invaluable!!

And last but not least:

# Enjoy!

