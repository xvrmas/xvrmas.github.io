


const paletsReferencia =
    [
        {
            model: 920007,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        },
        {
            model: 920107,
            quantitatMinima: 150,
            midaReferencia: 'ample',
        },
        {
            model: 920146,
            quantitatMinima: 480,
            midaReferencia: 'ample',
        }, {
            model: 920243,
            quantitatMinima: 480,
            midaReferencia: 'ample',
        }, {
            model: 920244,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920245,
            quantitatMinima: 240,
            midaReferencia: 'estret',
        }, {
            model: 920299,
            quantitatMinima: 220,
            midaReferencia: 'ample',
        }, {
            model: 920342,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920351,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920352,
            quantitatMinima: 120,
            midaReferencia: 'estret',
        }, {
            model: 920353,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920354,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920355,
            quantitatMinima: 120,
            midaReferencia: 'estret',
        }, {
            model: 920359,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920361,
            quantitatMinima: 240,
            midaReferencia: 'estret',
        }, {
            model: 920366,
            quantitatMinima: 240,
            midaReferencia: 'estret',
        }, {
            model: 920442,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920393,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920394,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920396,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920614,
            quantitatMinima: 120,
            midaReferencia: 'ample',
        }, {
            model: 920111,
            quantitatMinima: 120,
            midaReferencia: 'estret',
        }, {
            model: 920372,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920380,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920427,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920618,
            quantitatMinima: 396,
            midaReferencia: 'estret',
        }, {
            model: 920430,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920438,
            quantitatMinima: 240,
            midaReferencia: 'ample',
        }, {
            model: 920439,
            quantitatMinima: 396,
            midaReferencia: 'ample',
        }, {
            model: 920449,
            quantitatMinima: 240,
            midaReferencia: 'estret',
        }
    ]

let buto = document.querySelector('button');

function resumPalets() {
    let referencia = document.getElementById('referencia').value;
    let mida = parseInt(document.getElementById('quantitat').value);

    let result = paletsReferencia.filter(element => element.model == referencia);

    if (result.length == 0 || isNaN(mida)) {
        alert('falten dades o son incorrectes!')
    }
    else {
        document.getElementById('minim').innerHTML = 'Quantitat per palet: ' + result[0].quantitatMinima;
        document.getElementById('demanat').innerHTML = 'Quantitat demanada: ' + mida;
        if ((mida / result[0].quantitatMinima) == 1) {
            document.getElementById('palets').innerHTML = 'Total: ' + (mida / result[0].quantitatMinima) + ' palet ' + result[0].midaReferencia;
        }
        else {
            document.getElementById('palets').innerHTML = 'Total: ' + (mida / result[0].quantitatMinima) + ' palets ' + result[0].midaReferencia + 's';
            document.getElementById('palets').style.boxShadow = '1px 2px 10px gray';


        }
    }
} 

/* buto.addEventListener('click', () => {
    document.getElementById('palets').style.boxShadow = '1px 2px 2px gray';
}) */



