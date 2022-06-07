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

let disponible = 15728640;

listaProcesos = [
    {
        Proceso : 1,
        Tamanio : 1048575,
        DirInicial : 0, 
        DirFinal : 1048576,
        DirInicialH : "00000",
        DirFinalH : "0ffff"
    }
];

function decToHex(num){
    return num.toString(16);
}

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

function insertarProceso(proceso){
    
    //Objeto de procesos 
    var objetos = retornarProceso(proceso);    
    for(var i = 0; i < objetos.length; i++){
        console.log("Disponible: " + disponible);
        if(disponible > 0 && disponible >= objetos[i].memoria){
            disponible -= objetos[i].memoria;
            listaProcesos.push({
                Proceso: objetos[i].id,
                Tamanio: objetos[i].memoria,
                DirInicial: null,
                DirFinal: null,
                DirInicialH : null,
                DirFinalH : null
            });
            // console.log("Disponible: " + disponible);
        }else{
            i = objetos.length;
            console.log("No se pueden agregar más procesos, memoria insuficiente");
        }
    }
    //Se inicia en 1 ya que el SO es la posicion 0
    for(var i = 1; i < listaProcesos.length; i++){
        //Calculo de la memoria en decimal 
        if(listaProcesos[i].DirInicial == null && listaProcesos[i].DirFinal == null){
            listaProcesos[i].DirInicial = listaProcesos[i - 1].DirFinal;
            listaProcesos[i].DirFinal = listaProcesos[i].DirInicial + listaProcesos[i].Tamanio;
        }
        //Calculo de la memoria en hexadecimal 
        if(listaProcesos[i].DirInicialH == null && listaProcesos[i].DirFinalH == null){
            listaProcesos[i].DirInicialH = "0x"+decToHex(listaProcesos[i].DirInicial);
            listaProcesos[i].DirFinalH = "0x"+decToHex(listaProcesos[i].DirFinal);
        }
    }
    pintado();
}

function insertarPrimerAjuste(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso == null && proceso[i].memoria < listaProcesos[j].Tamanio){
                listaProcesos[j].Proceso = proceso[i].id;
                j = listaProcesos.length;
                console.log("Se inserto el proceso");
            }
        }
    }
    return listaProcesos;
}

function insertarPeorAjuste(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = listaProcesos.length; j > 0; j--){
            if(listaProcesos[j].Proceso == null && listaProcesos[j].Tamanio > proceso[i].memoria){
                listaProcesos[j].Proceso = proceso[i].id;
                j = 0;
                console.log("Se inserto el proceso");
            }
        }
    }
    return listaProcesos;
}

function insertarMejorAjuste(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso == null && listaProcesos[j].Tamanio == proceso[i].memoria){
                listaProcesos[j].Proceso = proceso[i].id;
                j = listaProcesos.length;
                console.log("Se inserto el proceso");
            }
        }
    }
    return listaProcesos;
}

function eliminarProceso(proceso){
    for(var i = 0; i < proceso.length; i++){
        for(var j = 0; j < listaProcesos.length; j++){
            if(listaProcesos[j].Proceso == proceso[i]){
                listaProcesos[j].Proceso = null;
                disponible += listaProcesos[j].Tamanio;
                j = listaProcesos.length;
            }
        }
    }
    pintado();
}

function compactarMemoria(){
    for(var x = listaProcesos.length-1; x >=0; x--){
        if(listaProcesos[x].Proceso==null){    
            let desplazamiento=listaProcesos[x].Tamanio;    //Obtiene la memoria que hay que dezplazar
            for(var j=listaProcesos.length-1;j>x;j--){
                listaProcesos[j].DirInicial-=(desplazamiento);
                listaProcesos[j].DirFinal-=(desplazamiento);
                listaProcesos[j].DirInicialH = "0x"+decToHex(listaProcesos[j].DirInicial);
                listaProcesos[j].DirFinalH = "0x"+decToHex(listaProcesos[j].DirFinal);
            }
            listaProcesos.splice(x,1);  //Elimina el espacio
            disponible+=desplazamiento;
        }
    }
    pintado();
    alert("Se termino el proceso de compactación");
}

function pintado(){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.clearRect(0, 0, 300, 700);
    // ctx.strokeRect(0,0,300,200);
    // ctx.strokeRect(0,0,300,200);
    let inicio=0;
    console.log(listaProcesos.length);
    for (let i = 0; i < listaProcesos.length; i++) {
        ctx.strokeRect(0,inicio,300,(listaProcesos[i].Tamanio)*(700/(16*1048576)));

        if(listaProcesos[i].Proceso != null){
            let MProceso=procesosNombre.find(function (element){
                return element.id==listaProcesos[i].Proceso;
            }).memoria;
            ctx.fillRect(0, inicio, 300, (MProceso*(listaProcesos[i].Tamanio)*(700/(16*1048576)))/listaProcesos[i].Tamanio);
        }

        // ctx.fillRect(10, (listaProcesos[i].Tamanio/(1048575*16))*700, 100, 100);
        inicio+=(listaProcesos[i].Tamanio)*(700/(16*1048576))   
    }
    console.log(listaProcesos);
}

//insertarProceso([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);

// insertarProceso([2,2,4,6,4,2]);

//console.log(listaProcesos);
/*
console.log("---------------------------");
eliminarProceso([4]);
console.log(listaProcesos);
console.log("-------------COMPACTANDO MEMORIA WE--------------");

compactarMemoria();
console.log(listaProcesos);
*/

