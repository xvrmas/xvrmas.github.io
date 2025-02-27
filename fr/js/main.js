import paletsreferencia from './magatzem.js';
import dadesTest from './test.js';

var suma = [];
var endresaTaula = [];
const taula = document.getElementById('taulaId');


document.getElementById('resumPalets').addEventListener('click', principal);
document.getElementById('endresaTaula').addEventListener('click', endresa);
//document.getElementById('resetImput').addEventListener('click', resetImput);
document.getElementById('modifica').addEventListener('click', modifica);
//document.getElementById('test').addEventListener('click', test);
//document.getElementById('imprimirStock').addEventListener('click', imprimirStock);

taula.addEventListener('click', function (event) 
{
    if (event.target && event.target.classList.contains('btn-eliminar')) 
    {
        const fila = event.target.closest('tr');  
        eliminar(fila);
    }
});

function modifica()
{
    let i = 0;
    let codiModificar = Number(prompt('quin codi vols modificar?'));
    if (endresaTaula.length === 0)
        alert('No hi ha cap codi a modificar')
    else
    {
        while (i < endresaTaula.length)
        {
            if (endresaTaula[i].model === codiModificar)
            {
                let quantitatModificar = Number(prompt('entra una quantitat'));
                alert(`${quantitatModificar}`);
            }
            else
            {
                alert('aquets codi no està en preparació');  
            }
            i++;
        }
    }
}
/*
function resetImput()
{
    document.getElementById('referencia').value = '';
    document.getElementById('quantitat').value = '';
}*/
/*
function test()
{
    let i = 0;
    let testArray = '';
    while (i < dadesTest.length)
    {
        testArray = dadesTest[i]
        pinta(dadesTest[i].quantitatMinima, dadesTest[i], 1);
        endresaTaula.push(testArray)
        suma.push()
        i++;
    }
}*/

function repintaTaula()
{
    const repintaTaula = document.querySelector('.taulaDinamica tbody');
    repintaTaula.innerHTML = '';

    for (let item of endresaTaula)
    {
        pinta(item.quantitatDemanada, item, item.paletsPreparar);
    }
}

function endresa()
{
    let tria = Number(prompt('Tria com vols endreçar la taula:\n 1-mida (palets estrets primer, X estret, - ample)\n 2-carrer (de menor a major)\n 3-codi (de menor a major)\n 4-palets (de menor a major)'));
    if (endresaTaula.length === 0)
        alert('No hi ha res a endreçar')
    else
    {
        if (tria == 1)
            { 
                endresaTaula.sort((a, b) => 
                {
                    if (a.midaReferencia === 'X' && b.midaReferencia != 'X')
                        return -1;
                    else if (a.midaReferencia != 'X' && b.midaReferencia === 'X')
                        return 1;
                    else
                        return 0;
                    
                });
                repintaTaula();
              
            }
            else if (tria == 2)
            { 
                endresaTaula.sort((a, b) => a.carrer - b.carrer);
                repintaTaula();
            }
            else if (tria == 3)
            { 
                endresaTaula.sort((a, b) => a.model - b.model);
                repintaTaula();
            }
            else if (tria == 4)
            {
                endresaTaula.sort((a,b) => a.paletsPreparar - b.paletsPreparar);
                repintaTaula();
            }
            else 
            {
                alert('entra un numero del 1 al 4')
            }
            console.log('endresa',endresaTaula)

    }
}




function pinta(quantitatDemanada, infoPreparacio, paletsPreparar)
{
    if (quantitatDemanada == undefined || paletsPreparar == undefined)
    {
        quantitatDemanada = 1;
        paletsPreparar = 1;
    }
    const taulaDinamicaBody = document.querySelector('.taulaDinamica tbody');
    const fila = document.createElement('tr');

    fila.innerHTML = `
            <td class="mida">${infoPreparacio.midaReferencia}</td>
            <td class="carrer">${infoPreparacio.carrer}</td>
            <td class="bloc">${infoPreparacio.bloc}</td>
            <td class="quantitatPalet">(${infoPreparacio.quantitatMinima})</td>
            <td class="quantitatDemanada">${quantitatDemanada}</td>
            <td class="codiArticle">${infoPreparacio.model}</td>
            <td class="paletsPreparar">${paletsPreparar}</td>
            <td class="boto"><button class="btn-eliminar" data-id="1">ELIMINAR</button></td>
            <td class="nof"></td>
    `;
    taulaDinamicaBody.appendChild(fila);
}


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
    for (let item of paletsreferencia)
    {
        pinta('', item, '');
        endresaTaula.push(item)
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

function comprobaCodi(codi)
{
    console.log(codi);
    let i = 0;
    if (endresaTaula.length === 0)
        return false;
    while (i < endresaTaula.length)
    {
        if (endresaTaula[i].model === Number(codi))
        {
            return true;
        }
        i++;
    }
    return false;
}

function eliminar(fila) 
{

    let linea = fila.closest('tr');
    let quantitatEliminada = parseInt(linea.querySelector('.paletsPreparar').innerText);
    let codiEliminat = linea.querySelector('.codiArticle').innerText;
    let i = 0;
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
        while (i < endresaTaula.length )
        {
            if (endresaTaula[i].model === Number(codiEliminat))
                endresaTaula.splice(i,1)
            i++;
        }
        console.log('elimina',endresaTaula)
        recontePalets(suma);
    }
}

function principal() 
{
    let referenciaDemanda = document.getElementById('referencia').value;
    let quantitatDemanada = document.getElementById('quantitat').value;
    let infoPreparacio = capturaCodi(referenciaDemanda);
    let paletsPreparar = 0;

    if (isNaN(quantitatDemanada)) 
    {
        alert('falten dades o son incorrectes!')
    }
    else 
    {
        if (parseInt(quantitatDemanada) % infoPreparacio.quantitatMinima != 0)
            alert(`revisa que la quantitat demanada sigui correcte, la quantitat minima del codi ${infoPreparacio.model} es de ${infoPreparacio.quantitatMinima}`);
        else 
        { 
            let comprobaRepetit = comprobaCodi(referenciaDemanda);
            if (comprobaRepetit === true)
                alert(`El codi ${referenciaDemanda} ja està en preparació`)
            else
            {
                paletsPreparar = parseInt(quantitatDemanada / infoPreparacio.quantitatMinima);
                suma.push(paletsPreparar);
                infoPreparacio.paletsPreparar = paletsPreparar;
                infoPreparacio.quantitatDemanada = quantitatDemanada;
                endresaTaula.push(infoPreparacio);   
                recontePalets(suma);
                pinta(quantitatDemanada,infoPreparacio,paletsPreparar); 
                console.log('principal',endresaTaula);
            }
        }
    }
}















