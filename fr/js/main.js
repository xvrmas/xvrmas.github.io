import paletsreferencia from './magatzem.js';
//import dadesTest from './test.js';

var endresaTaula = [];
const taula = document.getElementById('taulaId');


document.getElementById('resumPalets').addEventListener('click', principal);
document.getElementById('endresaTaula').addEventListener('click', endresa);
document.getElementById('modifica').addEventListener('click', modifica);
//document.getElementById('imprimirStock').addEventListener('click', imprimirStock);

taula.addEventListener('click', function (event) 
{
    if (event.target && event.target.classList.contains('btn-eliminar')) 
    {
        const fila = event.target.closest('tr');  
        eliminar(fila);
    }
});

function imprimirStock()
{
    for (let item of paletsreferencia)
    {
        pinta(1, item, 1);
        endresaTaula.push(item)
    }
}

//la funcio permet sel·leccionar un codi del llistat i modificar la quantitat demanada
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
                if (quantitatModificar % endresaTaula[i].quantitatMinima != 0)
                {
                    while (quantitatModificar % endresaTaula[i].quantitatMinima != 0)
                    {
                      alert(`la quantitat per palet del codi ${codiModificar} es ${endresaTaula[i].quantitatMinima }`);
                      quantitatModificar = Number(prompt('entra una quantitat'))
                    }
                }
                if (quantitatModificar % endresaTaula[i].quantitatMinima === 0 && quantitatModificar != 0)
                {
                    let nouPalet = quantitatModificar / endresaTaula[i].quantitatMinima;
                    endresaTaula[i].quantitatDemanada = quantitatModificar;
                    endresaTaula[i].paletsPreparar = nouPalet;
                    repintaTaula();
                    recontePalets();
                }
            }
            i++;
        }
    }
}


//en cas de que fem algun canvi en el llistat aquesta funcio permet refrescar el llistat i mostrar els canvis
function repintaTaula()
{
    const repintaTaula = document.querySelector('.taulaDinamica tbody');
    repintaTaula.innerHTML = '';

    for (let item of endresaTaula)
    {
        pinta(item.quantitatDemanada, item, item.paletsPreparar);
    }
}

//tenim la opció d'endreçar el llistat seguint diferents criteris
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

//funcio que pinta en pantalla la informació que anem generant
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

//recalcula el contador total de palets en cas d'eliminar o modificar la llista
function recontePalets() 
{
    let suma2 = 0;
    let total = document.querySelector('.total');
    for (let i of endresaTaula)
        suma2 += i.paletsPreparar;
    total.innerHTML = `${suma2} palets`;
}

//comprova si el codi entrat existeix a l'array magatzem en cas de no existir mostra un missatge d'error
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

//comprova si el codi entrat existeix a l'array modificable
function comprobaCodi(codi)
{
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

//permet eliminar un codi amb tota la info
function eliminar(fila) 
{

    let linea = fila.closest('tr');
    let quantitatEliminada = parseInt(linea.querySelector('.paletsPreparar').innerText);
    let codiEliminat = linea.querySelector('.codiArticle').innerText;
    let i = 0;
    if (quantitatEliminada == 1) 
    {
        var confirmaElimnarLinea = confirm(`vols eliminar 1 palet del codi ${codiEliminat}?`)
    }
    else 
    {
        confirmaElimnarLinea = confirm(`vols eliminar ${quantitatEliminada} palets del codi ${codiEliminat}?`)
    }
    if  (confirmaElimnarLinea == true) 
    {
        fila.remove();
        while (i < endresaTaula.length )
        {
            if (endresaTaula[i].model === Number(codiEliminat))
            {
                endresaTaula.splice(i,1)
                recontePalets();
            }                
            i++;
        }
    }
    console.log(endresaTaula);  
}

//funcio que rep les dades entrades per l'usuari i reparteix a les diferents funcions per mostrar la informació per pantalla
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
                infoPreparacio.paletsPreparar = paletsPreparar;
                infoPreparacio.quantitatDemanada = quantitatDemanada;
                endresaTaula.push(infoPreparacio);   
                recontePalets();
                pinta(quantitatDemanada,infoPreparacio,paletsPreparar); 
                ('principal',endresaTaula);
            }
        }
    }
}















