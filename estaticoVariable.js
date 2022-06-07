
//NO OLVIDAR INICIALIZAR EL ARREGLO SEGÚN EL ALGORITMO QUE SE QUIERE USAR
//Las direcciones son el valor*1024

let procesosNombre = [{id: 1, name: "SO", memoria: 1048575},
{id: 2, name: "Notepad", memoria: 224649},
{id: 3, name: "Word", memoria: 286708},
{id: 4, name: "Excel", memoria: 309150},
{id: 5, name: "AutoCAD", memoria: 436201},
{id: 6, name: "Calculadora", memoria: 209462},
{id: 7, name: "Windows Defender", memoria: 3996608},
{id: 8, name: "PowerPoint", memoria: 1785608},
{id: 9, name: "Chrome", memoria: 2696608}];

//variable que representa la RAM
let procesos=[];

//Funcion que ordena la ram en particiones de objetos mejor Ajuste (de pequeño a grande) (1,256,256,512,512,512,1024,1024,1024,2048,496,496)
function IniciarMejor(){
    procesos=
    [
        {
            "Proceso":1,
            "Tamaño":1048576,
            "DirIn":"0x000000",
            "DirFin":"0x0FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":268288,
            "DirIn":"0x100000",
            "DirFin":"0x13FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":268288,
            "DirIn":"0x140000",
            "DirFin":"0x17FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":536576,
            "DirIn":"0x180000",
            "DirFin":"0x1FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":536576,
            "DirIn":"0x200000",
            "DirFin":"0x27FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":536576,
            "DirIn":"0x280000",
            "DirFin":"0x2FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1048576,
            "DirIn":"0x300000",
            "DirFin":"0x3FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1048576,
            "DirIn":"0x400000",
            "DirFin":"0x4FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1048576,
            "DirIn":"0x500000",
            "DirFin":"0x5FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":2097152,
            "DirIn":"0x600000",
            "DirFin":"0x7FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4194304,
            "DirIn":"0x800000",
            "DirFin":"0xBFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4194304,
            "DirIn":"0xC00000",
            "DirFin":"0xFFFFFF"
        },
        
    ]
}


//que ordena la ram en particiones de objetos peor Ajuste (de pequeño a grande) (1,4096,4096,2048,1024,1024.1024,512,512,512,256,256)
function IniciarPeor(){
    procesos=
    [
        {
            "Proceso":1,
            "Tamaño":1048576,
            "DirIn":"0x000000",
            "DirFin":"0x0FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4194304,
            "DirIn":"0x100000",
            "DirFin":"0x4FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4194304,
            "DirIn":"0x500000",
            "DirFin":"0x8FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":2097152,
            "DirIn":"0x900000",
            "DirFin":"0xAFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1048576,
            "DirIn":"0xB00000",
            "DirFin":"0xBFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1048576,
            "DirIn":"0xC00000",
            "DirFin":"0xCFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1048576,
            "DirIn":"0xD00000",
            "DirFin":"0xDFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":536576,
            "DirIn":"0xE0000",
            "DirFin":"0xE7FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":536576,
            "DirIn":"0xE80000",
            "DirFin":"0xEFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":536576,
            "DirIn":"0xF00000",
            "DirFin":"0xF7FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":268288,
            "DirIn":"0xF80000",
            "DirFin":"0xFBFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":268288,
            "DirIn":"0xFC0000",
            "DirFin":"0xFFFFFF"
        },
    ]
}

function Insertar(numeroP){
    //hay que revisar primero si está iniciada la memoria en el mejor proceso o peor proceso respectivamente
    let MProceso=procesosNombre.find(function (element){
        return element.id==numeroP;
    }).memoria;
    let correcto=false;
    let i=1;
    while(correcto===false && i<procesos.length){
        if(procesos[i].Proceso===null){ //Revisa si esta libre
            if(MProceso<=procesos[i].Tamaño){   //Revisa si cabe
                procesos[i].Proceso=numeroP;
                correcto=true;
            }    
        }
        i++;    //Aumenta
    }
    if(correcto===false){   //No se pudo insertar
        alert("No fue posible insertar el elemento debido a que no hay memoria suficiente");
    }
    console.log(procesos);
    actualizarTabla()
    pintado();
}

function Eliminar(numeroP){
    let correcto=false;
    let i=1;
    while (correcto===false && i<procesos.length ){
        if(procesos[i].Proceso===numeroP){
            procesos[i].Proceso=null;
            correcto=true;
        }
        i++;
    }
    if(correcto===false){   //No se pudo eliminar
        alert("No fue posible eliminar el proceso por que no se encontró");
    }
    actualizarTabla()
    pintado();
}

function pintado(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.clearRect(0, 0, 300, 700);
    // ctx.strokeRect(0,0,300,200);
    // ctx.strokeRect(0,0,300,200);
    let inicio=0;
    for (let i = 0; i < procesos.length; i++) {
        ctx.strokeRect(0,inicio,300,(procesos[i].Tamaño)*(700/(16*1048576)));

        if(procesos[i].Proceso != null){
            let MProceso=procesosNombre.find(function (element){
                return element.id==procesos[i].Proceso;
            }).memoria;
            ctx.fillRect(0, inicio, 300, (MProceso*(procesos[i].Tamaño)*(700/(16*1048576)))/procesos[i].Tamaño);
        }

        // ctx.fillRect(10, (listaProcesos[i].Tamanio/(1048575*16))*700, 100, 100);
        inicio+=(procesos[i].Tamaño)*(700/(16*1048576))   
    }
}

function actualizarTabla(){
    var todo = "<tr><th>Item</th><th>Nombre Proceso</th><th>Tamaño</th><th>Dirección inicial partición</th><th>Dirección final partición</th></tr>"
    const lista = document.getElementById("procEjec");
    lista.innerHTML = todo;

    for (var i = 0; i < procesos.length; i++) {
        if(procesos[i].Proceso != null){
            var proceso = procesosNombre.find(function (element){
                return element.id==procesos[i].Proceso;
            });
            lista.innerHTML += "<tr><td>"+proceso.id+"</td><td>"+proceso.name+"</td><td>"+proceso.memoria+"</td><td>"+procesos[i].DirIn+"</td><td>"+procesos[i].DirFin+"</td></tr>"    
        }
        
    }  
}
IniciarMejor();

/*
IniciarMejor();
Insertar(2);
console.log("Se inserto 2");
Insertar(4);
console.log("Se inserto 4");
Insertar(8);
console.log("Se inserto 8");
console.log(procesos);
console.log("--------------------------------------")
Eliminar(3);
Eliminar(4);
console.log(procesos);
*/

