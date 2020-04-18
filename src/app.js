// Requirements
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Handlebars
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Static Dir to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App v1.0.2',
        name: 'Praanshu'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Praanshu'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Praanshu',
        message: 'What help do you need?'
    })
})


app.get('/weather',(req,res)=>{
    
if(!req.query.address) {
   return res.send({
        error: 'Search term needed!'
    })

}

geocode ( req.query.address, (error, {longitude,latitude,location} = {} ) => {
    if (error){
        return res.send( error )
    } 
        
    forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
            return res.send( error )
        }

       res.send({
           forecast: forecastData,
           location,
           address: req.query.address
      })
    
    })
})

})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: 'Help not found',
        name: 'Praanshu',
        message: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404' , {
        title: '404 - Page Not Found' ,
        name: 'Praanshu',
        message: 'Page not Found!'
    })
})


app.listen(3000, () => {
    console.log('Server is up!')
})