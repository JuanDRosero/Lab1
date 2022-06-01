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
        DirFinal : "0x0FFFFF",
        memDisponible : 0
    },
    {
        Proceso : null,
        Tamanio : 262144,
        DirInicial: "0x100000",
        DirFinal : "0x13FFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 262144,
        DirInicial : "0x140000",
        DirFinal : "0x17FFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 524288,
        DirInicial : "0x180000",
        DirFinal : "0x1FFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 524288,
        DirInicial : "0x200000",
        DirFinal : "0x27FFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 524288,
        DirInicial : "0x280000",
        DirFinal : "0x2FFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x300000",
        DirFinal : "0x3FFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x400000",
        DirFinal : "0x4FFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 1048575,
        DirInicial : "0x500000",
        DirFinal : "0x5FFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 2097150,
        DirInicial : "0x600000",
        DirFinal : "0x7FFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 4194300,
        DirInicial : "0x800000",
        DirFinal : "0xBFFFFF",
        memDisponible: null
    },
    {
        Proceso : null,
        Tamanio : 4194300,
        DirInicial : "0xC00000",
        DirFinal : "0xFFFFFF",
        memDisponible: null
    }
];

//Funcion para agregar n procesos a la memoria 
function insertar(procesos){
    var processToInsert = [];
    for(var i = 0; i < procesos.length; i++){
        for(var j = 0; j < procesosNombre.length; j++){
            if(procesosNombre[j].id == procesos[i]){
                processToInsert.push(procesosNombre[j]);
            }
        }
    }
    return processToInsert;
}

//Algoritmo del primer ajuste
function insertarPrimerAjuste(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso == null && listaProcesos[j].Tamanio >= proceso[i].memoria){
                listaProcesos[j].Proceso = proceso[i].id;
                listaProcesos[j].memDisponible = listaProcesos[j].Tamanio - proceso[i].memoria;
                j = listaProcesos.length;
                console.log("Se inserto el proceso.")
            }
        }
    }
    return listaProcesos;
}

//Algoritmo peor ajuste 
function insertarPeorAjuste(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = listaProcesos.length - 1; j >= 0; j--){
            if(listaProcesos[j].Proceso == null && listaProcesos[j].Tamanio >= proceso[i].memoria){
                listaProcesos[j].Proceso = proceso[i].id;
                listaProcesos[j].memDisponible = listaProcesos[j].Tamanio - proceso[i].memoria;
                j = -1;
                console.log("Se inserto el proceso.")
            }
        }
    }
    return listaProcesos;
}

function eliminarProceso(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso == proceso[i].id){
                listaProcesos[j].Proceso = null;
                listaProcesos[j].memDisponible = null;
                j = listaProcesos.length;
                console.log("Se elimino el proceso.")
            }
        }
    }
    return listaProcesos;
}

//Función para revisar el espacio de memoria sobrante 
function memoriaSobrante(procesos){
    var memoriaDisponible = 15728640;
    for(var i = 0; i < listaProcesos.length; i++){
        if(listaProcesos[i].memDisponible != null){
            memoriaDisponible -= listaProcesos[i].memDisponible;
        }
    }
    return memoriaDisponible;
}
/*
console.log("Memoria disponible inicial: ");
console.log(memoriaSobrante(listaProcesos));
console.log("Insertar los procesos: ")
insertarPrimerAjuste(insertar([2,8,5,3]));
//console.log(listaProcesos);
console.log("Memoria disponible despues de insertar procesos: ");
console.log(memoriaSobrante(listaProcesos));*/
/*
console.log("Peor ajuste");
insertarPeorAjuste(insertar([2,8,5,3]));
//console.log(listaProcesos);
console.log(memoriaSobrante(listaProcesos));
console.log(listaProcesos)*/
