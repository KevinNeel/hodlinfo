const express = require('express');
const app = express();
const path = require('path')
const fetchData = require('./fetchData');

//Database Schema
const hodlinfo = require('./db_collection/db_collection')

//Connection to the Database
require('./db_collection/db_collection');

//Setting the port
const port = process.env.PORT || 8000;

//Setting the view engine
app.set('views', path.join(__dirname, '../public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', async (req, res) => {
    try {
        const apiData = fetchData(async (cb) => {
            cb.forEach( async function(item) {
                console.log(item.name);
                const saveData = new hodlinfo({
                    name: cb.name,
                    last: cb.last,
                    buy: cb.buy,
                    sell: cb.sell,
                    volume: cb.volume,
                    base_unit: cb.base_unit
                })
                const result = await saveData.save();
            });
            res.status(200).render('index', {results : cb})
            
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running at port${port}`);
})