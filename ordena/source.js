

let numNou = new Array();
var frase = '';
var frase2 = '';


function len(frase)
{
    let len;

    len = 0;
    while (frase[len] != undefined)
        len++;
    return (len - 1);
}


function push() 
{
    let num = (parseInt(document.getElementById('entrada').value));
    if(isNaN(num))
    { 
        alert('numero!');
        document.getElementById('entrada').value = '';        

    }
    else  
    { 
        numNou.push(num);
        document.getElementById('texte1').innerHTML = numNou;
        document.getElementById('entrada').value = '';        
    }
}

function ordena()
{
    let i;
    let j;
    let temp;

    i = 0;
    j = 0;
    temp = 0;
    if (numNou.length == 0)
        alert('numeros!!')
    else
    {

        while (i < numNou.length) 
        {
            j = i + 1;
            while (j < numNou.length) 
            {
                if (numNou[i] > numNou[j]) 
                {
                    temp = numNou[i];
                    numNou[i] = numNou[j];
                    numNou[j] = temp;
                }
                j++;
            }
            i++;    
        }
        let darrerNum = len(numNou);
        let suma = 0;
        let k = 0;
        while (k < numNou.length)
        {
            suma = suma + numNou[k];
            k++;
        }
        document.getElementById('texte2').innerHTML = numNou;
        document.getElementById('texte3').innerHTML = "Em endreçat " + numNou.length + " numeros";
        if (numNou[0] == 1)
        {  
            document.getElementById('texteEstadistica').innerHTML = "El menor es l' " + numNou[0] + " i el mes gran el " + numNou[darrerNum] ;

        }
        else
        {
            document.getElementById('texteEstadistica').innerHTML = "El menor es el " + numNou[0] + " i el mes gran el " + numNou[darrerNum];
        }          
        document.getElementById('texteSuma').innerHTML = "La suma total dels numeros introduits es: " + suma;
        console.log(numNou);
    }
    
}

function reset() 
{
    document.getElementById('texte1').innerHTML = ' ';
    document.getElementById('texte2').innerHTML = ' ';
    document.getElementById('texte3').innerHTML = ' ';
    document.getElementById('texteEstadistica').innerHTML = '';
    document.getElementById('texteSuma').innerHTML = '';

    numNou = [];
}
//<-------------------------------------------------------------------------------------->
//funcions per girar una frase


/* function pushRevers()
{

    frase = document.getElementById('entrada2').value;
    document.getElementById('texte4').innerHTML = 'La frase: ' + frase;
    document.getElementById('entrada2').value = '';        
} */

function    ordenaRevers()
{
    let longitud;
    frase = document.getElementById('entrada2').value;
    document.getElementById('entrada2').value = '';

    if (frase.length == 0)
        alert('entra un paraula');
    else 
    { 
        longitud = len(frase);
        document.getElementById('texte4').innerHTML = frase;
        while (longitud >= 0)
        {
            document.getElementById('texte5').innerHTML += frase[longitud];
            frase2 += frase[longitud];
            longitud--;
        }
    }
}
function majuscules()
{
    console.log(frase);
    document.getElementById('texteMajuscules').innerHTML = frase.toUpperCase();
    document.getElementById('texte6').innerHTML = frase2.toUpperCase();
}
    

function    resetRevers()
{
    document.getElementById('texte4').innerHTML = ' ';
    document.getElementById('texte5').innerHTML = ' ';
    document.getElementById('texte6').innerHTML = ' ';
    document.getElementById('texteMajuscules').innerHTML = '';
    frase = [];
    frase2 = '';

}

function quadrat()
{
    let linea = parseInt(document.getElementById('lineas').value);
    let forma = document.getElementById('forma').value;
    document.getElementById('lineas').value = '';
    document.getElementById('forma').value = '';
    let i = 0;
    let j = 0;

    while (i < linea)
    {
        j = 0;
        while (j < linea)
        {
            if (i == 0 || i == linea -1 || j == 0 || j == linea - 1)
                document.getElementById('quadrat').innerHTML += forma;
            else
                document.getElementById('quadrat').innerHTML += forma;
            j++;
        }
        document.getElementById('quadrat').innerHTML += '<br>';
        i++;
    }
}

function esborra()
{
    document.getElementById('quadrat').innerHTML = '';
}