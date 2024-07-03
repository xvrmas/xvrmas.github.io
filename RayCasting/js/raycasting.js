var canvas;
var ctx;
var fps = 50;

//dimensions canvas

var canvasAlt = 500;
var canvasAmple = 500;

var escenari;

//
const paretColor = "#000000";
const terraColor = "#666666";

//------------------------------------------------------------------------------------------
//NIVELL 1

var nivell1 =
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

//------------------------------------------------------------------------
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

        console.log(this.altT);
    }

    dibuixa() {
        var color;

        for (var y = 0; y < this.altM; y++) {
            for (var x = 0; x < this.ampleM; x++) {
                if (this.matriu[y][x] == 1)
                    color = paretColor;
                else
                    color = terraColor;

                this.ctx.fillStyle = color;
                this.ctx.fillRect(x * this.ampleT, y * this.altT, this.ampleT, this.altT);
            }
        }
    }

}

function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //modifiquem la mida del canvas
    canvas.width = canvasAmple;
    canvas.height = canvasAlt;

    //
    escenari = new Nivell(canvas, ctx, nivell1);

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
}