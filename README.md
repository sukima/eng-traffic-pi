# eng-traffic-pi

This is a client project for a simple traffic light to tell your coworkers in
the office when it is ok to interupt you.

The idea is a RaspberryPi runs a wb server that this Ember app connects to via
socket.io. You then can control the traffic light and the corrisponding GPIO
pins toggle on the RaspberryPi.

The setup uses the
[Pi-GPIO-Server](https://github.com/projectweekend/Pi-GPIO-Server) project.
A simple LED setup like this diagram:

<img src="wire-diagram.png" width="300" alt="RaspberryPi GPIO wiring diagram">

And this project configured to point to the Pi-GPIO-Server.

## Configuration

Client side settingas are stored in `localStorage`. The initial defaults are
defined in `config/environment.js`.

#### `ENV.enableEasterEggs`

* **Default:** `true`
* **User customizable:** NO

If you do not which to include the [Konami
code](https://en.wikipedia.org/wiki/Konami_Code) Easter eggs you can set this
to false.

#### `ENV.APP.defaultTheme`

* **Default:** `standard`
* **User customizable:** YES

Sets the [hack.css](http://hackcss.com/) theme.

#### `ENV.APP.socketUrl`

* **Default:** `http://localhost:4200/` (dev) / `http://10.0.0.100:5000/` (prod)
* **User customizable:** YES

This is the socket.io URL to connect to. In development mode it is the same as
the ember server because there is a mock socket.io server that gets started
when you run `ember serve` for demo / development purposes. This should point
to your RaspberryPi's IP address (Pi-GPIO-Server defaults to port 5000) in
production.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd eng-traffic-pi`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
