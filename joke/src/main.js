


async function getJoke() {
    const response = await fetch(` https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`
        }
    });
    const joke = await response.json();
    console.log(joke);
    document.getElementById(`app`).innerHTML = joke.joke;
}


async function getJokeNorris() {
    const response = await fetch(`https://api.chucknorris.io/jokes/random`);
    const jokeNorris = await response.json();
    console.log(jokeNorris.value)
    document.getElementById(`app`).innerHTML = jokeNorris.value;

}


const d = new Date();
let text = d.toISOString();
console.log(text)