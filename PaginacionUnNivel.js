//Diccionario de procesos 
procesosNombre = [{id: 1, name: "SO", memoria: 1048575,color: "#4D9032"},
{id: 2, name: "Notepad", memoria: 224649,color: "#836E40"},
{id: 3, name: "Word", memoria: 286708,color: "#4F8340"},
{id: 4, name: "Excel", memoria: 309150,color: "#40837C"},
{id: 5, name: "AutoCAD", memoria: 436201,color: "#404B83"},
{id: 6, name: "Calculadora", memoria: 209462,color: "#774083"},
{id: 7, name: "Windows Defender", memoria: 3996608,color: "#834078"},
{id: 8, name: "PowerPoint", memoria: 1785608,color: "#22307E"},
{id: 9, name: "Chrome", memoria: 2696608,color: "#588380"}];

let tamPagina = 524288;

listaProcesos = [
    {
        idMarco : 0,
        idProceso : 1,
        disponible: false,
        Tamanio : 524288
    },
    {
        idMarco : 1,
        idProceso: 1,
        disponible : false,
        Tamanio : 524288
    },
    {
        idMarco : 2,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 3,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 4,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 5,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 6,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 7,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 8,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 9,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 10,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 11,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 12,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 13,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 14,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 15,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 16,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 17,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 18,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 19,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 20,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 21,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 22,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 23,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 24,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 25,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 27,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 28,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 29,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 30,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    },
    {
        idMarco : 31,
        idProceso: null,
        disponible : true,
        Tamanio : 524288
    }
];

listaDeTablasDeProceso = [
    {
        proceso: "SO",
        marcosUsados: [0,1],
        paginas: 2,
    }
];

function calcularPaginas(numeroP){
    let proceso = procesosNombre.find(function (element){
        return element.id == numeroP;
    }).memoria;
    return Math.ceil(proceso/tamPagina);
}

function insertarProceso(numeroP){
    let idProceso = procesosNombre.find(function (element){
        return element.id == numeroP;
    }).id;

    let nombreProceso = procesosNombre.find(function (element){
        return element.id == numeroP;
    }).name;

    let marcosDisponibles = 0;
    let cantidadDeMarcos = calcularPaginas(numeroP);

    for(var i = 0; i < listaProcesos.length; i++){
        if(listaProcesos[i].idProceso == null){
            marcosDisponibles++;
        }
    }
    console.log("MARCOS DISPONIBLES " + marcosDisponibles);
    var ban = false;
    for(var i = 0; i < cantidadDeMarcos; i++){
        for(j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].idProceso == null && marcosDisponibles >= cantidadDeMarcos){
                listaProcesos[j].idProceso = idProceso;
                ban = true;
                j = listaProcesos.length;
                
            }
        }      
        if(i == cantidadDeMarcos - 1 && !ban){
            console.log("No se puede insertar el proceso, marcos insuficientes")
        }
    }
    if(ban == true){
        listaDeTablasDeProceso.push({
            proceso : nombreProceso,
            marcosUsados : marcosUsados(numeroP),
            paginas : calcularPaginas(numeroP)
        });
        console.log("Se inserto el proceso");
    }
    actualizarTabla();
    console.log(listaDeTablasDeProceso);
    pintado();
}

function marcosUsados(numeroP){
    let marcosUsados = [];
    for(var i = 2; i < listaProcesos.length; i++){
        if(listaProcesos[i].idProceso == numeroP && listaProcesos[i].disponible == true){
            listaProcesos[i].disponible = false
            marcosUsados.push(listaProcesos[i].idMarco);
        }
    }
    return marcosUsados;
}

function eliminarProceso(numeroP){
    var marcosEliminar = [];
    let idProceso = procesosNombre.find(function (element){
        return element.id == numeroP;
    }).name;
    for(var i = 0; i < listaDeTablasDeProceso.length; i++){
        if(listaDeTablasDeProceso[i].proceso == idProceso && listaDeTablasDeProceso[i].marcosUsados.length > 0){
            marcosEliminar = listaDeTablasDeProceso[i].marcosUsados;
            console.log("marcos " + listaDeTablasDeProceso[i].marcosUsados);
            listaDeTablasDeProceso[i].marcosUsados = [];
            i = listaDeTablasDeProceso.length ;
        }
    }
    let ban = false;
    for(var i = 0; i < listaProcesos.length; i++){
        for(var j = 0; j < marcosEliminar.length; j++){
            if(listaProcesos[i].idMarco == marcosEliminar[j]){
                listaProcesos[i].idProceso = null;
                listaProcesos[i].disponible = true;
                j = marcosEliminar.length; 
                ban = true;
            }
            if(j == marcosEliminar.length - 1){
                console.log("Se elimino el proceso")
            }
        }
        if(i == listaProcesos.length - 1 && !ban){
            console.log("No se contro el proceso")
        }
    }
    actualizarTabla();
    console.log(listaDeTablasDeProceso);
    pintado();
}

function actualizarTabla(){
    var todo = "<tr><th>Item</th><th>Nombre Proceso</th><th>Tamaño</th><th>Dirección inicial partición</th><th>Dirección final partición</th></tr>"
    const lista = document.getElementById("procEjec");
    lista.innerHTML = todo;

    for (var i = 0; i < listaProcesos.length; i++) {
        if(listaProcesos[i].Proceso != null){
            var proceso = procesosNombre.find(function (element){
                return element.id==listaProcesos[i].Proceso;
            });
            lista.innerHTML += "<tr><td>"+proceso.id+"</td><td>"+proceso.name+"</td><td>"+proceso.memoria+"</td><td>"+listaProcesos[i].DirInicial+"</td><td>"+listaProcesos[i].DirFinal+"</td></tr>"    
        }
        
    }  
}

function pintado(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.clearRect(0, 0, 300, 700);

    for (let i = 0; i < listaProcesos.length; i++) {
        ctx.strokeRect(0,(524288*i/(524288*31))*700,300,700/31);

        if(listaProcesos[i].idProceso != null){
            let colorPro=procesosNombre.find(function (element){
                return element.id==listaProcesos[i].idProceso;
            }).color;
            ctx.fillStyle = colorPro;
            
            ctx.fillRect(0, (524288*i/(524288*31))*700, 300, (524288/(524288*31))*700);
        }
        
    }
}

window.onload = function(){
    actualizarTabla();
    pintado();
    }

// insertarProceso(9);
// insertarProceso(3);
// insertarProceso(9);
// //console.log(listaProcesos, listaDeTablasDeProceso);
// //console.log(marcosUsados(9));
// //console.log(listaDeTablasDeProceso);
// //console.log(listaProcesos);
// eliminarProceso(9);
// insertarProceso(4);
// insertarProceso(9);
// //console.log("---------------------------");
// console.log(listaDeTablasDeProceso);
// //console.log(listaProcesos);
// //eliminarProceso(9);
// //console.log("-----------------------------");
// console.log(listaProcesos);
