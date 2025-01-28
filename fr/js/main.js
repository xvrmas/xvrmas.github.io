import paletsReferencia from './magatzem.js';

var suma = [];
const taula = document.getElementById('taulaId');

document.getElementById('resumPalets').addEventListener('click', resumPalets);
document.getElementById('imprimirStock').addEventListener('click', imprimirStock);

taula.addEventListener('click', function (event) 
{
    if (event.target && event.target.classList.contains('btn-eliminar')) 
    {
        const fila = event.target.closest('tr');  
        eliminar(fila);
    }
});

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

    while (i < paletsReferencia.length)
    {
        objecteCaixa.push(paletsReferencia[i])
        pinta(0, objecteCaixa, 0);
        objecteCaixa = [];
        i++;
    }
}

function capturaCodi(referencia) 
{
    let i = 0;
    let resultat = [];
    while (i < paletsReferencia.length)
    {
        if (referencia == paletsReferencia[i].model)
        {
            resultat.push(paletsReferencia[i]);
            return (resultat);
        }
        i++;
    }  
    alert('falten dades o son incorrectes!')
}

function pinta(demanat, result, totalPalets)
{
    const taulaDinamicaBody = document.querySelector('.taulaDinamica tbody');
    const fila = document.createElement('tr');

    fila.innerHTML = `
            <td class="mida">${result[0].midaReferencia}</td>
            <td class="carrer">${result[0].carrer}</td>
            <td class="bloc">${result[0].bloc}</td>
            <td class="quantitatPalet">(${result[0].quantitatMinima})</td>
            <td class="quantitaDemanada">${demanat}</td>
            <td class="totalPalets">${totalPalets}</td>
            <td class="codiArticle">${result[0].model}</td>
            <td><button class="btn-eliminar" data-id="1">ELIMINAR</button></td>
            <td class="nof"></td>
    `;
    taulaDinamicaBody.appendChild(fila);
    recontePalets(suma);
}

function resumPalets() 
{
    let referencia = document.getElementById('referencia').value;
    let demanat = document.getElementById('quantitat').value;
    let result = capturaCodi(referencia);
    let totalPalets = parseInt(demanat / result[0].quantitatMinima);
    suma.push(totalPalets);

    if (result.length == 0 || isNaN(demanat)) 
    {
        alert('falten dades o son incorrectes!')
    }
    else 
    {

        if (demanat % result[0].quantitatMinima != 0 || demanat < result[0].quantitatMinima)
            alert(`revisa que la quantitat demanada sigui correcte, la quantitat minima del codi ${result[0].model} es de ${result[0].quantitatMinima}`);
        else 
        {
            pinta(demanat,result,totalPalets);
        }
    }
}

function eliminar(fila) 
{
    let linea = fila.closest('tr');
    let quantitatEliminada = parseInt(linea.querySelector('.totalPalets').innerText);
    let codiEliminat = linea.querySelector('.codiArticle').innerText;
    if (quantitatEliminada == 1) 
    {
        var pregunta = confirm(`vols eliminar ${quantitatEliminada} palet del codi ${codiEliminat}?`)
    }
    else 
    {
        pregunta = confirm(`vols eliminar ${quantitatEliminada} palets del codi ${codiEliminat}?`)
    }
    if (pregunta == true) 
    {
        suma.splice(suma.indexOf(quantitatEliminada), 1);
        fila.remove();
        recontePalets(suma);
    }
}












