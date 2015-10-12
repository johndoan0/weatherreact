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
        // console.log('info passed in view', this.props.weatherinfo)
        return(
            <div id='wview'>
                <WeeklyTitle weatherinfo={this.props.weatherinfo}/>
                <DaysMapArr weatherinfo={this.props.weatherinfo}/>
            </div>)
    }
})

var WeeklyTitle = React.createClass({
    render: function(){
        console.log('weeklytitle', this.props.weatherinfo)
        var summaryWeek = this.props.weatherinfo.daily.summary
        return (
            <div className="titlehead">
                <h3 id='weeklytitle'>Weekly Weather Report</h3>
                <h5>This Week: {summaryWeek}</h5> 
            </div>
        )
    }
})

var DaysMapArr = React.createClass({

    _daysnumberandinfo: function(daysinfo){
        return(
            <DaysColumns weatherinfo={daysinfo}/>
        )
    },

    render: function(){
        var wInfo = this.props.weatherinfo.daily.data 
        return(
            <div id="week">{wInfo.map(this._daysnumberandinfo)}</div>
        )
    }
})

var DaysColumns = React.createClass({

    getInitialState: function(){
        return{
            dayInfoDisplay: 'none'
        }
    },

    _handleDayInfoDisplay: function(event){
        // console.log('click on dayinfo')
        if (this.state.dayInfoDisplay === 'none'){ 
            this.setState({dayInfoDisplay:'block'})
        }
        else{this.setState({dayInfoDisplay: 'none'})}
        
    },

    render: function(){
        console.log("weather info per day", this.props.weatherinfo)
        var dayofWeek = new Date(this.props.weatherinfo.time).toString().substr(0,3)
        var tempHigh = this.props.weatherinfo.apparentTemperatureMax
        var tempLow = this.props.weatherinfo.apparentTemperatureMin
        var precip = Math.floor(this.props.weatherinfo.precipProbability)*100
        var daySummary = this.props.weatherinfo.summary
        var dayInfoDisplayObj = {display: this.state.dayInfoDisplay}
        return(
            <div className='daycolumn'>
                <div className="daynumsumm" onClick={this._handleDayInfoDisplay}>{dayofWeek}: {daySummary}</div>
                <div className="dayinfo" style={dayInfoDisplayObj}>
                    <div className="temphigh">High: {tempHigh} F</div>
                    <div className="templow">Low: {tempLow} F</div>
                    <div className="precip">Rain: {precip}%</div>
                </div><br></br>
            </div>    
=======

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
>>>>>>> d815b565b437bb2f2ce88e9ef8165c1325f4dee7
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
<<<<<<< HEAD
        this.wModel.latlong = llong
        var self = this
        this.wModel.fetch({
            dataType: 'jsonp'
        }).done(function(data){
=======
    	this.wModel.latlong = llong
        var self = this
    	this.wModel.fetch({
    		dataType: 'jsonp'
    	}).done(function(data){
>>>>>>> d815b565b437bb2f2ce88e9ef8165c1325f4dee7
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
        // console.log('router', this)
=======

    renderView: function(pull){
        React.render(<WeatherViewReact weatherinfo={pull}/>, document.getElementById("wcontainer"))
    },

    initialize: function(){
    	this.wModel = new weatherModel     
        console.log('router', this)
>>>>>>> d815b565b437bb2f2ce88e9ef8165c1325f4dee7
    }
})
var wRouter = new weatherRouter
Backbone.history.start()
