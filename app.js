import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

const yourToken = "8c90be77cc137bb4bded7ee5d7f46cea";

function randomHeroes() {
  let numberHeroes = Math.floor((Math.random() * 731) + 1);

  return numberHeroes;
}

// Pour envoyer les fichier static sur le navigateur
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.get('/randomheroes', async (req, res) => {

  let heroesID = randomHeroes();
  //console.log(heroesID);
    
  try {
    const response = await axios.get('https://superheroapi.com/api/' + yourToken + '/' + heroesID);
    //console.log(response.data.name);

    res.render('index.ejs', { heroes : response.data });
  } catch (error) {
    console.error(error);
  }

  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})