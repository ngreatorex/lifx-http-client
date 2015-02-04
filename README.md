# lifx-http-client 

This project is a web application written in [AngularJS](http://angularjs.org/).

It is designed to provide a pretty front-end to the LiFX Cloud HTTP API (currently in beta).

## Installing

After cloning the repository, you should run:

```
npm install
```

You also need to create the file `app/js/token.js` and make sure it contains the following:

```
window.LiFXToken = '<INSERT API TOKEN HERE>';
```

## Running

For simple development purposes, you can run a local server on port 8000 by running:

```
npm start
```

For prolonged use, consider running a production server such as Apache. A sample configuration
is provided in `apache/lifx-http-client.conf`.

