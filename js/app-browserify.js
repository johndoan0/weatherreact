// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
    Backbone = require('backbone')

console.log('loaded javascript')

//==== MODEL
var weatherModel = Backbone.Model.extend({
    url: function() {
        console.log(this.latlong)
        return 'https://api.forecast.io/forecast/d7420952a925f111f6437e0ef6c5c530/'
	      + this.latlong
    }
})

//==== VIEW
var weatherView = Backbone.View.extend({
    el: "#wcontainer",

    initialize: function() {
        // console.log('view init run')
        console.log(this.model)
        // this.render();
        this.listenTo(this.model, "change", this.render)
    },

    apparentTemp: function() {
        var aTemp = this.model.attributes.currently.apparentTemperature,
            aTempli = `Feels like: ${aTemp}`
        return aTempli
    },

    icon: function() {
        var icon = this.model.attributes.currently.icon,
            iconli = `icon: ${icon}`
        return iconli
    },

    precipProb: function() {
        var precProb = this.model.attributes.currently.precipProbability,
            precProbli = `Precipitation: ${precProb}`
        return precProbli
    },

    summary: function() {
        var summ = this.model.attributes.currently.summary,
            summli = `Guys, today is going to be ${summ}`
        return summli
    },

    realTemp: function() {
        var rTemp = this.model.attributes.currently.temperature,
            rTempli = `Real Temperature: ${rTemp}`
        return rTempli
    },

    render: function() {
        // console.log('render start')
        this.$el.html(
            `<ul id="currentWeather">
				<li>${this.apparentTemp()}</li>
				<li>${this.icon()}</li>
				<li>${this.precipProb()}</li>
				<li>${this.summary()}</li>
				<li>${this.realTemp()}</li>
			</ul>`)
    },
})

//==== CONTROLLER
var weatherRouter = Backbone.Router.extend({
    routes: {
        'coords/:latlong': 'coordinates',  
        '*anyroute': 'weatherDefault'
    },

    coordinates: function(llong){
    	// console.log(location.hash)
    	// console.log(llong)
    	this.wModel.latlong = llong
    	this.wModel.fetch({
    		dataType: 'jsonp'
    	})
    },

    weatherDefault: function(){
        // console.log('router.weatherdefault run',this)
        self = this
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;        
            location.hash = 'coords/' + lat + ',' + long;            
        })
    },

    initialize: function() {
    	this.wModel = new weatherModel     
        this.wView = new weatherView({
            model: this.wModel
        })
        console.log(this)
    }
})

var wRouter = new weatherRouter
Backbone.history.start()
