
let rateSave = [];

function aleatori() {
    let numero = Math.ceil(Math.random() * 100)
    console.log(numero)
    if (numero % 2 == 0) {
        getJoke();
    } else {
        getJokeNorris();
    }
}

async function getJoke() {
    const response = await fetch(` https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`
        }
    });
    const joke = await response.json();
    console.log(joke.joke)
    document.getElementById(`app`).innerHTML = joke.joke;
}


async function getJokeNorris() {
    const response = await fetch(`https://api.chucknorris.io/jokes/random`);
    const jokeNorris = await response.json();
    console.log(jokeNorris.value)
    document.getElementById(`app`).innerHTML = jokeNorris.value;
}

class Rating {
    constructor(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}

function reportAcudits(score) {
    let joke = document.getElementById(`app`).textContent;
    const d = new Date();
    let date = d.toISOString();
    let rate = new Rating(joke, score, date)
    rateSave.push(rate)
    console.log(rateSave)
    alert(`Gracies per votar`)
}
