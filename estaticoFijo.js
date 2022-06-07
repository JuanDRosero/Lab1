

//Diccionario de procesos 
procesosNombre = [
    {
        id: 1, 
        name: "SO",
        memoria: 1048575
    },
    {
        id: 2, 
        name: "Notepad", 
        memoria: 224649
    },
    {
        id: 3, 
        name: "Word", 
        memoria: 286708
    },
    {
        id: 4, 
        name: "Excel", 
        memoria: 309150
    },
    {
        id: 5, 
        name: "AutoCAD", 
        memoria: 436201
    },
    {
        id: 6, 
        name: "Calculadora", 
        memoria: 209462
    },
    {
        id: 7, 
        name: "Windows Defender", 
        memoria: 3996608
    },
    {
        id: 8, 
        name: "PowerPoint", 
        memoria: 1785608
    },
    {
        id: 9, 
        name: "Chrome", 
        memoria: 2696608
    }
];

listaProcesos = [
    {
        Proceso : 1,
        Tamanio : 1048575,
        DirInicial : "0x000000",
        DirFinal : "0x0FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial: "0x100000",
        DirFinal : "0x1FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x200000",
        DirFinal : "0x2FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x300000",
        DirFinal : "0x3FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x400000",
        DirFinal : "0x4FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x500000",
        DirFinal : "0x5FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x600000",
        DirFinal : "0x6FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x700000",
        DirFinal : "0x7FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x800000",
        DirFinal : "0x8FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x900000",
        DirFinal : "0x9FFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0xA00000",
        DirFinal : "0xAFFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0xB00000",
        DirFinal : "0xBFFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0xC00000",
        DirFinal : "0xCFFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0xD00000",
        DirFinal : "0xDFFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0xE00000",
        DirFinal : "0xEFFFFF"
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0xF00000",
        DirFinal : "0xFFFFFF"
    }
];

function retornarProceso(idProceso){
    //Esta funcion retorna el objeto completo para obtener los datos necesarios en la interfaz
    let processToInsert = [];
    for(var i = 0; i < idProceso.length; i++){
        for(var j = 0; j < procesosNombre.length; j++){
            if(procesosNombre[j].id == idProceso[i]){
                processToInsert.push(procesosNombre[j]);
            }
        }
    }
    return processToInsert;
}

//Esta funcion hara de algoritmo de primera opcion
function insertarProceso(proceso){

    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso == null && listaProcesos[j].Tamanio >= proceso[i].memoria){
                listaProcesos[j].Proceso = proceso[i].id;
                j = listaProcesos.length;
                console.log('Se insertó el proceso');
            }
        }
    }
    pintado();
    console.log(listaProcesos);
    return listaProcesos;
}

function eliminarProceso(proceso){

    const ctx = canvas.getContext('2d');
    ctx.clearRect(10, 10, 100, 100);

    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso != null && listaProcesos[j].Proceso == proceso[i]){
                listaProcesos[j].Proceso = null;
                j = listaProcesos.length;
                console.log('Se elimino el proceso');
            }
        }
    }
    return listaProcesos;
}

function pru(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 100, 100);
    ctx.strokeRect(0,0,300,200);
}

function pintado(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#f212aa";
    ctx.stroke();
    // ctx.strokeRect(0,0,300,200);
    // ctx.strokeRect(0,0,300,200);


    for (let i = 0; i < listaProcesos.length; i++) {
        ctx.strokeRect(0,(1048575*i/(1048575*16))*700,300,700/16);

        if(listaProcesos[i].Proceso != null){
            let MProceso=procesosNombre.find(function (element){
                return element.id==listaProcesos[i].Proceso;
            }).memoria;
            ctx.fillRect(0, (1048575*i/(1048575*16))*700, 300, (MProceso*700/16)/1048575);
        }

        // ctx.fillRect(10, (listaProcesos[i].Tamanio/(1048575*16))*700, 100, 100);
        
    }
}

//console.log(retornarProceso(3));
// console.log(insertarProceso(retornarProceso([2,3,4,5])));
