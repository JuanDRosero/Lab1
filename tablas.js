//import * as name from "estatico.js";

var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 100, 100);
  ctx.strokeRect(0,0,300,200);

function dibujarCuadrado() {

  return num
}

procesosNombre = [{id: 1, name: "SO", memoria: 1048575},
{id: 2, name: "Notepad", memoria: 224649},
{id: 3, name: "Word", memoria: 286708},
{id: 4, name: "Excel", memoria: 309150},
{id: 5, name: "AutoCAD", memoria: 436201},
{id: 6, name: "Calculadora", memoria: 209462},
{id: 7, name: "Windows Defender", memoria: 3996608},
{id: 8, name: "PowerPoint", memoria: 1785608},
{id: 9, name: "Chrome", memoria: 2696608}];

function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];
  
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");

    var celda1 = document.createElement("td");
    var textoCelda1 = document.createTextNode("Nombre Programa");
    // Crea las celdas
    for (var i = 1; i < procesosNombre.length; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");
  
      for (var j = 0; j < 2; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(procesosNombre[i].name);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
  
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }
  
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
  }