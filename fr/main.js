


const paletsReferencia =
    [
        {
            model: 920007,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: 19,
        }, {
            model: 920107,
            quantitatMinima: 150,
            midaReferencia: 'ample',
            carrer: 7,
            bloc: 10,
        }, {
            model: 920146,
            quantitatMinima: 480,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: '29-30',
        }, {
            model: 920243,
            quantitatMinima: 480,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: 12,
        }, {
            model: 920244,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: 6,
        }, {
            model: 920245,
            quantitatMinima: 240,
            midaReferencia: 'estret',
            carrer: 8,
            bloc: 4,
        }, {
            model: 920299,
            quantitatMinima: 220,
            midaReferencia: 'ample',
            carrer: 9,
            bloc: '16-17',
        }, {
            model: 920342,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: '23-24-25-26',
        }, {
            model: 920351,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: '12-13',
        }, {
            model: 920352,
            quantitatMinima: 120,
            midaReferencia: 'estret',
            carrer: 8,
            bloc: '7-8-9-10-11',
        }, {
            model: 920353,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: 32,
        }, {
            model: 920354,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: '20-21-22',
        }, {
            model: 920355,
            quantitatMinima: 120,
            midaReferencia: 'estret',
            carrer: 9,
            bloc: '7-8-9',
        }, {
            model: 920359,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: '17-18',
        }, {
            model: 920361,
            quantitatMinima: 240,
            midaReferencia: 'estret',
            carrer: 0,
            bloc: 0,
        }, {
            model: 920366,
            quantitatMinima: 240,
            midaReferencia: 'estret',
            carrer: 9,
            bloc: '10-11-12-13-14',
        }, {
            model: 920442,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: '23-24-25-26',
        }, {
            model: 920393,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: 8,
        }, {
            model: 920394,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: 20,
        }, {
            model: 920396,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: 11,
        }, {
            model: 920614,
            quantitatMinima: 120,
            midaReferencia: 'ample',
            carrer: '7-9',
            bloc: "carrer 7, blocs 11-12 || carrer 9, blocs 5-6",
        }, {
            model: 920111,
            quantitatMinima: 120,
            midaReferencia: 'estret',
            carrer: 8,
            bloc: '16-17',
        }, {
            model: 920372,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: '6-7',
        }, {
            model: 920380,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 8,
            bloc: 33,
        }, {
            model: 920427,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: '9-10',
        }, {
            model: 920618,
            quantitatMinima: 396,
            midaReferencia: 'estret',
            carrer: 9,
            bloc: 15,
        }, {
            model: 920430,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: 16,
        }, {
            model: 920438,
            quantitatMinima: 240,
            midaReferencia: 'ample',
            carrer: 0,
            bloc: 0,
        }, {
            model: 920439,
            quantitatMinima: 396,
            midaReferencia: 'ample',
            carrer: 11,
            bloc: 14,
        }, {
            model: 920449,
            quantitatMinima: 240,
            midaReferencia: 'estret',
            carrer: 7,
            bloc: "4-5-6",
        }
    ]

/* let buto = document.querySelector('button'); */


function borrar() {
    document.getElementById('minim').innerHTML = '';
    document.getElementById('demanat').innerHTML = '';
    document.getElementById('carrer').innerHTML = '';
    document.getElementById('bloc').innerHTML = '';
    document.getElementById('palets').innerHTML = '';
    document.getElementById('referencia').value = '';
    document.getElementById('quantitat').value = '';
    document.getElementById('palets').style.backgroundColor = 'white';
}
function resumPalets() {
    let referencia = document.getElementById('referencia').value;
    let mida = parseInt(document.getElementById('quantitat').value);

    let result = paletsReferencia.filter(element => element.model == referencia);

    if (result.length == 0 || isNaN(mida)) {
        alert('falten dades o son incorrectes!')
    }
    else {
        document.getElementById('minim').innerHTML = 'Quantitat per palet: ' + result[0].quantitatMinima;
      //document.getElementById('demanat').innerHTML = 'Quantitat demanada: ' + mida;
        document.getElementById('carrer').innerHTML = 'Carrer: ' + result[0].carrer;
        document.getElementById('bloc').innerHTML = 'Bloc: ' + result[0].bloc;
        if ((mida / result[0].quantitatMinima) == 1) {
            document.getElementById('palets').innerHTML = 'Total: ' + (mida / result[0].quantitatMinima) + ' palet ' + result[0].midaReferencia;
        }
        else {
            document.getElementById('palets').style.color = '#3c762d';
            document.getElementById('palets').style.backgroundColor = '#dff0d8';
            document.getElementById('palets').innerHTML = 'Total: ' + (mida / result[0].quantitatMinima) + ' palets ' + result[0].midaReferencia + 's';
        }
    }
}

/* buto.addEventListener('click', () => {
    document.getElementById('palets').style.boxShadow = '1px 2px 2px gray';
}) */



