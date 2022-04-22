
const express = require('express');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');


const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    const information = {
        number : 18360859025,
        name : "Ceyda" ,
        surname : "Tekin"   
    }
    // res.render ('index.html', {filename :  index.html},(fn)=>{

    // })
    res.send("<html><body><H1>Ceyda Tekin </H1> <h2>18360859025</h2></body></html>")
  
 
})

app.get('/test_text', (req, res) => {
    res.send("18360859025")
})
app.get('/test_html', (req, res) => {
    res.send("<html><body><H1>Ceyda Tekin </H1></body></html>")
})
app.get('/test_json', (req, res) => {
    const information = {
        number : 18360859025,
        name : "Ceyda" ,
        surname : "Tekin"   
    }
    res.send(information)
})
app.get('/test_weather', (req, res) => {
    // res.send(req.query.city)
    const city = req.query.city;
    geocode(city, (err, {enlem, boylam, konum}) => {
        // res.send("Enlem : " + enlem + "Boylam " + boylam)
        if(err){
            return res.send(err)
        }
        weather(enlem, boylam, (err, data) => {
            if(err) {
                return res.send(err);
            }
            const showData = {
                konum : konum,
                sicaklik : data.temperature,
                nem : data.humidity,
                basinc : data.pressure,
                hava_durumu : data.weather_descriptions[0]
            }
            res.send(showData)
        })
    })
})





app.listen(PORT, () => {
    console.log('Server is up on port : ' + PORT)
})