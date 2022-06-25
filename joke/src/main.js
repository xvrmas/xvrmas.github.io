let rateSave = [];

async function weatherForecast() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=13.7715&lon=123.0485&appid=00031fdfb443bfcf6352873e8e4fbb04`)
    console.log(response)
    const temp = await response.json()
    var temperatura = ((temp.main.temp - 273.15).toFixed(0))
    const icona = `<img src=http://openweathermap.org/img/w/${temp.weather[0].icon}.png`;
    console.log(icona)
    document.getElementById(`temps`).innerHTML = '<h3>' + temperatura + ` º C |` + icona + ` </h3>`
}

function aleatori() {
    let numero = Math.ceil(Math.random() * 100)
    console.log(numero)
    if (numero % 2 == 0) {
        getJoke();
    } else {
        getJokeNorris();
    }
};

async function getJoke() {
    const response = await fetch(` https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`
        }
    });;
    const joke = await response.json();
    console.log(joke.joke)
    document.getElementById(`app`).innerHTML = `"`+ joke.joke + `"`;
};

async function getJokeNorris() {
    const response = await fetch(`https://api.chucknorris.io/jokes/random`);
    const jokeNorris = await response.json();
    console.log(jokeNorris.value)
    document.getElementById(`app`).innerHTML = `"` + jokeNorris.value + `"`;
}

class Rating {
    constructor(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
};

function reportAcudits(score) {
    let joke = document.getElementById(`app`).textContent;
    if (joke === "" || document.getElementById(`app`).textContent === `Graciès per votar!`) {
        alert(`clica a "Següent acudit"`)
    } else {
        const d = new Date();
        let date = d.toISOString();
        let rate = new Rating(joke, score, date)
        rateSave.push(rate)
        console.log(rateSave)
        document.getElementById(`app`).innerHTML = `Graciès per votar!`;
    }
};

weatherForecast();