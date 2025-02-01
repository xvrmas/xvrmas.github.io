import paletsreferencia from './magatzem.js';

var suma = [];
var endresaTaula = [];
const taula = document.getElementById('taulaId');

document.getElementById('resumPalets').addEventListener('click', principal);
document.getElementById('imprimirStock').addEventListener('click', imprimirStock);

taula.addEventListener('click', function (event) 
{
    if (event.target && event.target.classList.contains('btn-eliminar')) 
    {
        const fila = event.target.closest('tr');  
        eliminar(fila);
    }
});

const endresa =  () => 
{
            /*
            console.log('1',endresaTaula);
            let i = 0;
            let j;
            let aux = 0;
        
            while (i < endresaTaula.length)
            {
                j = 0;
                while (j < endresaTaula.length)
                {
                    if (endresaTaula[i].midaReferencia == 'X')
                    aux = endresaTaula[j];
                    endresaTaula[j] = endresaTaula[i];
                    endresaTaula[i] = aux;
                    j++;
                }
                i++;
            }*/
            console.log('2',endresaTaula);
} 

function pinta(quantitatDemanada, infoPreparacio, paletsPreparar)
{
    const taulaDinamicaBody = document.querySelector('.taulaDinamica tbody');
    const fila = document.createElement('tr');

    fila.innerHTML = `
            <td class="mida">${infoPreparacio.midaReferencia}</td>
            <td class="carrer">${infoPreparacio.carrer}</td>
            <td class="bloc">${infoPreparacio.bloc}</td>
            <td class="quantitatPalet">(${infoPreparacio.quantitatMinima})</td>
            <td class="quantitaDemanada">${quantitatDemanada}</td>
            <td class="codiArticle">${infoPreparacio.model}</td>
            <td class="paletsPreparar">${paletsPreparar}</td>
            <td class="boto"><button class="btn-eliminar" data-id="1">ELIMINAR</button></td>
            <td class="nof"></td>
    `;
    taulaDinamicaBody.appendChild(fila);
}

/*function    comprovaDuplicat(referencia)
{
    let i = 0;
    
    while (i < duplicat.length)
    {
        if (duplicat[i] == referencia)
        {  
           return (1);
        }
        i++;
    }
    return 0;
}*/

function recontePalets(suma) 
{
    let i = 0;
    let suma2 = 0;
    let total = document.querySelector('.total')

    while (i < suma.length) 
    {
        suma2 += suma[i]
        i++;
    }
    total.innerHTML = `${suma2} palets`;
}

function imprimirStock()
{
    let i = 0;
    let objecteCaixa = [];
    
    while (i < paletsreferencia.length)
    {
        objecteCaixa.push(paletsreferencia[i])
        pinta('', objecteCaixa, '');
        objecteCaixa = [];
        i++;
    }
}

function capturaCodi(referenciaDemanda) 
{
    let i = 0;
    let creaInfoCodi = '';
    while (i < paletsreferencia.length)
    {
        if (referenciaDemanda == paletsreferencia[i].model)
        {
            creaInfoCodi = paletsreferencia[i];
            return (creaInfoCodi);
        }
        i++;
    }  
    alert('falten dades o son incorrectes!')
}

function eliminar(fila) 
{
    let linea = fila.closest('tr');
    let quantitatEliminada = parseInt(linea.querySelector('.paletsPreparar').innerText);
    let codiEliminat = linea.querySelector('.codiArticle').innerText;
    if (quantitatEliminada == 1) 
    {
        var confirmaElimnarLinea = confirm(`vols eliminar ${quantitatEliminada} palet del codi ${codiEliminat}?`)
    }
    else 
    {
     confirmaElimnarLinea = confirm(`vols eliminar ${quantitatEliminada} palets del codi ${codiEliminat}?`)
    }
    if  (confirmaElimnarLinea == true) 
    {
        suma.splice(suma.indexOf(quantitatEliminada), 1);
        fila.remove();
        recontePalets(suma);
    }
}

function principal() 
{
    let referenciaDemanda = document.getElementById('referencia').value;
    let quantitatDemanada = document.getElementById('quantitat').value;
    let infoPreparacio = capturaCodi(referenciaDemanda);
    let paletsPreparar = 0;
    if (infoPreparacio.length == 0 || isNaN(quantitatDemanada)) 
    {
        alert('falten dades o son incorrectes!')
    }
    else 
    {
        if (quantitatDemanada % infoPreparacio.quantitatMinima != 0 || quantitatDemanada < infoPreparacio.quantitatMinima)
            alert(`revisa que la quantitat demanada sigui correcte, la quantitat minima del codi ${infoPreparacio.model} es de ${infoPreparacio[0].quantitatMinima}`);
        else 
        { 
            paletsPreparar = parseInt(quantitatDemanada / infoPreparacio.quantitatMinima);
            suma.push(paletsPreparar);
            endresaTaula.push(infoPreparacio);
            recontePalets(suma);
            pinta(quantitatDemanada,infoPreparacio,paletsPreparar); 
        }
    }
}















