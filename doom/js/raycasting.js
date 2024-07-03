var canvas;
var ctx;
var fps = 50;

//dimensions canvas

var canvasAlt = 500;
var canvasAmple = 500;

var escenari;
var jugador;

// colors de la pared y jugador
const paretColor = "#000000";
const terraColor = "#666666";
const colorJugador = "#FFFFFF";

//------------------------------------------------------------------------------------------
//NIVELL 1

var nivell1 =
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

//------------------------------------------------------------------------
//teclat

document.addEventListener('keydown', function (tecla) {

    switch (tecla.keyCode) {
        case 38:
            jugador.adalt();
            break;
        case 40:
            jugador.abaix();
            break;
        case 39:
            jugador.dreta();
            break;
        case 37:
            jugador.esquerra();
            break;
    }
}
);
document.addEventListener('keyup', function (tecla) {
    switch (tecla.keyCode) {
        case 38:
            jugador.adaltDes();
            break;
        case 40:
            jugador.abaixDes();
            break;
        case 39:
            jugador.giraDes();
            break;
        case 37:
            jugador.giraDes();
            break;
    }
});

//normalitza l'angle

function normalitzaAngle(angle) {
    angle = angle % (2 * Math.PI);

    if (angle < 0)
        angulo = angle + (2 * Math.PI);
    return angle;

}



//clase escenari
class Nivell {
    constructor(can, con, arr) {
        this.canvas = can;
        this.ctx = con;
        this.matriu = arr;

        //dimensions matriu
        this.altM = this.matriu.length;
        this.ampleM = this.matriu[0].length;

        //diemnsions reals del escenari
        this.altC = this.canvas.width;
        this.ampleC = this.canvas.height;

        //dimensions tiles
        this.altT = parseInt(this.altC / this.altM);
        this.ampleT = parseInt(this.ampleC / this.ampleM);

    }

    colisio(x, y) {
        var choca = false;
        if (this.matriu[y][x] != 0)
            choca = true;
        return choca;
    }

    dibuixa() {
        var color;
        var y = 0;


        while (y < this.altM) {
            var x = 0;
            while (x < this.ampleM) {
                if (this.matriu[y][x] == 1)
                    color = paretColor;
                else
                    color = terraColor;
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x * this.ampleT, y * this.altT, this.ampleT, this.altT);
                x++;
            }
            y++;
        }
    }
}




class Player {
    constructor(con, escenari, x, y) {
        this.ctx = con;
        this.escenari = escenari;

        this.x = x;
        this.y = y;

        this.avanza = 0;  //0 = parat  1 = endavant  -1 = endarrera
        this.gira = 0;    // -1 = esquerra   1 = dreta

        this.angleRotacio = 0;

        this.velMoviment = 3;               //pixels
        this.velGir = 3 * (Math.PI / 180);   //graus
    }
    colisio(x, y) {
        var choca = false;

        //averigua a quina casella esta el jugador
        var casillaX = parseInt(x / this.escenari.ampleT);
        var casillaY = parseInt(y / this.escenari.altT);

        if (this.escenari.colisio(casillaX, casillaY))
            choca = true;

        return choca;
    }

    actualitza() {
        var novaX = this.x + (this.avanza * Math.cos(this.angleRotacio) * this.velMoviment);
        var novaY = this.y + (this.avanza * Math.sin(this.angleRotacio) * this.velMoviment);

        if (!this.colisio(novaX, novaY)) {
            this.x = novaX;
            this.y = novaY;
        }

        this.angleRotacio += this.gira * this.velGir;
        this.angleRotacio = normalitzaAngle(this.angleRotacio);
    }

    dibuixa() {
        this.actualitza();

        this.ctx.fillStyle = colorJugador;
        this.ctx.fillRect(this.x - 3, this.y - 3, 6, 6);

        //linedireccio
        var xDesti = this.x + Math.cos(this.angleRotacio) * 30;
        var yDesti = this.y + Math.sin(this.angleRotacio) * 30;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(xDesti, yDesti);
        this.ctx.strokeStyle = colorJugador;
        this.ctx.stroke();


    }

    adalt() {
        this.avanza = 1;
    }
    abaix() {
        this.avanza = -1;
    }
    dreta() {
        this.gira = 1;
    }
    esquerra() {
        this.gira = -1;
    }

    adaltDes() {
        this.avanza = 0;
    }
    abaixDes() {
        this.avanza = 0;
    }
    giraDes() {
        this.gira = 0;
    }


}

function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //modifiquem la mida del canvas
    canvas.width = canvasAmple;
    canvas.height = canvasAlt;


    escenari = new Nivell(canvas, ctx, nivell1);
    jugador = new Player(ctx, escenari, 70, 100)

    //creem el bucle princial del joc
    setInterval(function () { principal(); }, 1000 / fps);
}

function borrarCanvas() {
    canvas.width = canvasAmple;
    canvas.height = canvasAlt;
}



function principal() {
    borrarCanvas();
    escenari.dibuixa();
    jugador.dibuixa();
}