'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const app = express();
const cors = require('cors');
// const { response } = require('express');
const PORT = process.env.PORT || 3015;
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.log('client on error'));



app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

function Poke(mans) {
    this.name = mans.name ? mans.name : 'Unown';
}

app.get('/', (req, res) => {

    const url = 'https://pokeapi.co/api/v2/pokemon';
    superagent.get(url)
        .then(list => {
            let apiList = list.body.results.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
            let pokemon = apiList.map( mans => new Poke(mans));
            res.render('pages/searches/show', {pokemon: pokemon});
        })
        .catch(err => console.log('get / error'))
});

app.post('/pokemon', savePokemon);

function savePokemon(req, res){
    let pokeName = req.body.name;
    let sql = `INSERT INTO pokemans(name) VALUES('${pokeName}');`;
    client.query(sql)
        .then( results => {
            res.redirect('/');
        })
        .catch(err => console.log('save pokemon error'))
}

app.get('/favorites', (req, res) => {
    let sql = 'SELECT * FROM pokemans;'
    client.query(sql)
        .then(results => {
            res.render('pages/pokemon/favorites.ejs', {pokemon: results.rows});
        })
        .catch(err => console.log('/favorites error'))
});

app.get('*', (req, res) => console.log('wildcard error'));

client.connect().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
})