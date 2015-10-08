/// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
    Backbone = require('backbone'),
    React = require('react')

console.log('loaded javascript')

//==== MODEL
var weatherModel = Backbone.Model.extend({
    url: function() {
        console.log(this.latlong)
        return 'https://api.forecast.io/forecast/d7420952a925f111f6437e0ef6c5c530/'
          + this.latlong
    }
})

//==== VIEW USING REACT

var WeatherViewReact = React.createClass({
    render: function(){
        // console.log(this.props.weatherinfo)
        return(
            <div id='wview'>
                <WeeklyTitle />
                <DaysList />
                <DayWeatherInfo weatherinfo={this.props.weatherinfo} />
            </div>)
    }
})

var WeeklyTitle = React.createClass({
    render: function(){
        return (<h1>Weekly Weather Report</h1>)
    }
})

var DaysList = React.createClass({
    render: function(){
        return(
            <div className='dayslist'>    
                <div id="day1">Day 1</div>
                <div id="day2">Day 2</div>
                <div id="day3">Day 3</div>
                <div id="day4">Day 4</div>
                <div id="day5">Day 5</div>
                <div id="day6">Day 6</div>
                <div id="day7">Day 7</div>
                <div id="day8">Day 8</div>
            </div>    
        )
    }
})

var DayWeatherInfo = React.createClass({
    render: function(){
        console.log('viewinfo', this.props.weatherinfo)
        return(
            <div className='dayweatherinfo'>
                <div id='summaryinfo'>This Week's Weather: {this.props.weatherinfo}</div>
                <div id="day1info"></div>
                <div id="day2info"></div>
                <div id="day3info"></div>
                <div id="day4info"></div>
                <div id="day5info"></div>
                <div id="day6info"></div>
                <div id="day7info"></div>
                <div id="day8info"></div>
            </div>
        )
    }
})
//==== CONTROLLER
var weatherRouter = Backbone.Router.extend({
    routes: {
        'coords/:latlong': 'coordinates',  
        '*anyroute': 'weatherDefault'
    },
    coordinates: function(llong){
        this.wModel.latlong = llong
        var self = this
        this.wModel.fetch({
            dataType: 'jsonp'
        }).done(function(data){
            self.renderView(data)
            })
    },
    weatherDefault: function(){
        // console.log('router.weatherdefault run',this)
        self = this
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;        
            location.hash = 'coords/' + lat + ',' + long;            
        })
    },
    renderView: function(pull){
        React.render(<WeatherViewReact weatherinfo={pull}/>, document.getElementById("wcontainer"))
    },
    initialize: function(){
        this.wModel = new weatherModel     
        console.log('router', this)
    }
})
var wRouter = new weatherRouter
Backbone.history.start()