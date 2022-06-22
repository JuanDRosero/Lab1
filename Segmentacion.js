//Text 0.6, Stack:0.1, Heap:0.1, Bss:0.5, data:0.5

procesosNombre = [
{id: 1, name: "SO", memoria: 1048575,color: "#4D9032"},
{id: 2, name: "Notepad", memoria: 890800,
    Stack: 178160, Heap: 89080, Bss:44540, Data: 44540, Text: 534480, Num:0, color: "#836E40"},
{id: 3, name: "Word", memoria: 976896,
    Stack:195379, Heap:97690, Bss: 48845, Data: 48845, Text:586138, Num:0, color: "#4F8340"},
{id: 4, name: "Excel", memoria: 1024000,
    Stack:204800, Heap:102400, Bss:51200, Data: 51200, Text:614400 ,Num:0, color: "#40837C"},
{id: 5, name: "AutoCAD", memoria: 2097152,
    Stack:419430, Heap:209715, Bss:104858, Data:104858, Text: 104858,Num:0, color: "#404B83"},
{id: 6, name: "Calculadora", memoria: 436201,
    Stack:87240, Heap:43620, Bss: 21810, Data: 21810, Text:261721,Num:0, color: "#774083"},
{id: 7, name: "Windows Defender", memoria: 3996608,
    Stack: 799322, Heap:399661, Bss: 199830, Data: 199830, Text:2397965, Num:0, color: "#834078"},
{id: 8, name: "PowerPoint", memoria: 1785608,
    Stack: 357122, Heap:178561,Bss: 89280,Data: 89280,Text: 1071365, Num:0, color: "#22307E"},
{id: 9, name: "Chrome", memoria: 2696608,
    Stack:539322, Heap:269661, Bss:134830, Data:134830, Text: 1617965, Num:0, color: "#588380"}];

//variable que representa la RAM
procesosMemoria= [    
    {
    Proceso:"S.0",
    Tamaño:1048576,
    DirI:0,
    DirFin:1048575,
    DirIH:"0x000000",
    DirFH:"0x0fffff"
    }
];



var tablaSegmentos=[];

//Varuable que rempresenta los espacios vacios
let tablaEspaciosL={
        DirI:1048576,
        DirF:16777215,
        Tam:16777216,
        DirIH:'0x100000',
        DirFH:'0xffffff'
}

//Función para crear una partición
function crearP(NombreP,TamP){
    if(tablaEspaciosL.Tam>=TamP){   //Si hay suficiente espacio para meter el proceso
        procesosMemoria.push(
            {   Proceso:NombreP,
                Tamaño:TamP,
                DirI:tablaEspaciosL.DirI,
                DirF:tablaEspaciosL.DirI+TamP,
                DirIH:'0x'+decToHex(tablaEspaciosL.DirI) ,
                DirFH:'0x'+decToHex(tablaEspaciosL.DirI+TamP)
            });
        tablaEspaciosL.Tam-=TamP;   //Se reduce el espacio libre para hacer part
        tablaEspaciosL.DirI=tablaEspaciosL.DirI+TamP+1; //Se actualiza la dir. Inicial
        tablaEspaciosL.DirIH='0x'+decToHex(tablaEspaciosL.DirI); //Se actualiza la Dir inicial Hexa
        return true;
    }else{
        return false;
    }
}
/*
*   Parametro segmento: S=Stack, H=Heap, B=Base, D=Data, T=Text
*/

//Función insertar
function insertaProceso(proceso){
    let copiaMemoria=copiarMemoria();  //Se crea una copia de seguridad del proceso
    let copiaTablaSeg=copiarSegmentos();   //Se crea una copia de seguridad de la tabla de segmentos
    let copiaEspacios=copiarTablaEspacios(tablaEspaciosL);
    let Proceso=procesosNombre.find(function (element){
        return element.id==proceso;
    }); //Se obtiene el proceso
    //Determinar con que algoritmo se inserta
    let correcto=true;
        switch(document.getElementById("tbl2").value){  
            case "1":     //Primer Ajuste
                   correcto=insertarPrimer(proceso,'Text')&&insertarPrimer(proceso,'Heap') && insertarPrimer(proceso,'Stack') &&
                    insertarPrimer(proceso,'Bss')&&insertarPrimer(proceso,'Data');
                break;
            case "2":      //Mejor Ajuste
                correcto=insertarMejor(Proceso,'Text')&& insertarMejor(Proceso,'Heap')&& insertarMejor(Proceso,'Stack')&&
                 insertarMejor(Proceso,'Bss')&& insertarMejor(Proceso,'Data');
                break;
            case "3":      //PeorAjuste
                    correcto=insertarPeor(proceso,'Text')&& insertarPeor(proceso,'Heap')&& insertarPeor(proceso,'Stack')&&
                    insertarPeor(proceso,'Bss')&& insertarPeor(proceso,'Data');
                break;
            default:
                console.log(selectElement.value);
        }
    if(correcto){
        for(var i=0;i<procesosNombre.length;i++){
            if(procesosNombre[i].id==proceso){
                procesosNombre[i].Num++;
            }
                
        }
    }else{
        //alert("No fue posible insertar el proceso "+Proceso.name);
        console.log("No fue posible insertar el proceso "+Proceso.name)
        procesos=copiaMemoria;
        tablaSegmentos=copiaTablaSeg;
        tablaEspaciosL=copiaEspacios;
    }
    actualizarTabla();
    pintado();
}
//Función insertar Primer ajuste (Segmento)
function insertarPrimer(proceso, segmento){
    let correcto=false;  //varibale para saber si se inserto correctamente
    let memoria;        //Variabe para almacenar la memoria que ocupa el segmento
    let Proceso=procesosNombre.find(function (element){
        return element.id==proceso;
    }); //Se obtiene el proceso
    let NProceso= Proceso.name+" ("+Proceso.Num+") ."+segmento;  //Obtiene el numbre que se va a insertar
    switch(segmento){   //Se obtiene el tamaño del segmento
        case 'Stack':
            memoria=Proceso.Stack;
            break;
        case 'Heap':
            memoria=Proceso.Heap;
            break;
        case 'Bss':
            memoria=Proceso.Bss;
            break;
        case 'Data':
            memoria=Proceso.Data;
            break;
        case 'Text':
            memoria=Proceso.Text;
            break;
    }
    //Se intenta insertar en los huecos de la ram
    for(let i=0;i<procesosMemoria.length;i++){
        if(procesosMemoria[i].Proceso==null){
            if(procesosMemoria[i].Tamaño>=memoria){
                procesosMemoria[i].Proceso=NProceso;
                correcto=true;
                tablaSegmentos.push({ProcesoID:Proceso.id, Segmento:segmento, DirI:procesosMemoria[i].DirIH, 
                    Limite:procesosMemoria[i].Tamaño}); //Inserta el elemeto en la tabla de segmentos
                return correcto;
            }
        }
    }
    //Si no se pudo insertar se crea una nueva partición
    if(!correcto){
        if(crearP(NProceso,memoria)){
            tablaSegmentos.push({ProcesoID:Proceso.id, Segmento:segmento, DirI:procesosMemoria[procesosMemoria.length-1].DirIH, 
                Limite:procesosMemoria[procesosMemoria.length-1].Tamaño}); //Inserta el elemeto en la tabla de segmentos
                return true;
        }else{
            console.log("No fue posible insertar el segmento: "+segmento);
            return false;
        }
    }
}

function insertarPeor(proceso, segmento){
    let correcto=false;  //varibale para saber si se inserto correctamente
    let memoria;        //Variabe para almacenar la memoria que ocupa el segmento
    let Proceso=procesosNombre.find(function (element){
        return element.id==proceso;
    }); //Se obtiene el proceso
    let NProceso= Proceso.name+" ("+Proceso.Num+") ."+segmento;  //Obtiene el numbre que se va a insertar
    switch(segmento){   //Se obtiene el tamaño del segmento
        case 'Stack':
            memoria=Proceso.Stack;
            break;
        case 'Heap':
            memoria=Proceso.Heap;
            break;
        case 'Bss':
            memoria=Proceso.Bss;
            break;
        case 'Data':
            memoria=Proceso.Data;
            break;
        case 'Text':
            memoria=Proceso.Text;
            break;
    }
    let Max=0;
    //Se busca el hueco mas grande
    for(let i=0;i<procesosMemoria.length;i++){
        if(procesosMemoria[i].Proceso==null){
            if(procesosMemoria[i].Tamaño>=memoria){
                if(procesosMemoria[i].Tamaño>procesosMemoria[Max]){
                    Max=i;
                }
            }
        }
    }

    //Se intenta insertar en los huecos de la ram
    if(Max!=0){
        procesosMemoria[Max].name=NProceso;
        correcto=true;
        tablaSegmentos.push({ProcesoID:Proceso.id, Segmento:segmento, DirI:procesosMemoria[Max].DirIH, 
            Limite:procesosMemoria[Max].Tamaño}); //Inserta el elemeto en la tabla de segmentos
        return true;
    }
    //Si no se pudo insertar se crea una nueva partición
    if(!correcto){
        if(crearP(NProceso,memoria)){
            tablaSegmentos.push({ProcesoID:Proceso.id, Segmento:segmento, DirI:procesosMemoria[procesosMemoria.length-1].DirIH, 
                Limite:procesosMemoria[procesosMemoria.length-1].Tamaño}); //Inserta el elemeto en la tabla de segmentos
                return true;
        }else{
            return false;
        }
    }
}

function insertarMejor(proceso, segmento){
    let correcto=false;  //varibale para saber si se inserto correctamente
    let memoria;        //Variabe para almacenar la memoria que ocupa el segmento
    let Proceso=procesosNombre.find(function (element){
        return element.id==proceso;
    }); //Se obtiene el proceso
    let NProceso= Proceso.name+" ("+Proceso.Num+") ."+segmento;  //Obtiene el numbre que se va a insertar
    switch(segmento){   //Se obtiene el tamaño del segmento
        case 'Stack':
            memoria=Proceso.Stack;
            break;
        case 'Heap':
            memoria=Proceso.Heap;
            break;
        case 'Bss':
            memoria=Proceso.Bss;
            break;
        case 'Data':
            memoria=Proceso.Data;
            break;
        case 'Text':
            memoria=Proceso.Text;
            break;
    }
    let Min=16777216;
    //Se busca el hueco mas pequeño
    for(let i=0;i<procesosMemoria.length;i++){
        if(procesosMemoria[i].Proceso==null){
            if(procesosMemoria[i].Tamaño>=memoria){
                if(procesosMemoria[i].Tamaño<procesosMemoria[Min]){
                    Min=i;
                }
            }
        }
    }

    //Se intenta insertar en los huecos de la ram
    if(Min!=16777216){
        procesosMemoria[Min].name=NProceso;
        correcto=true;
        tablaSegmentos.push({ProcesoID:Proceso.id, Segmento:segmento, DirI:procesosMemoria[Min].DirIH, 
            Limite:procesosMemoria[Min].Tamaño}); //Inserta el elemeto en la tabla de segmentos
        return true;
    }
    //Si no se pudo insertar se crea una nueva partición
    if(!correcto){
        if(crearP(NProceso,memoria)){
            tablaSegmentos.push({ProcesoID:Proceso.id, Segmento:segmento, DirI:procesosMemoria[procesosMemoria.length-1].DirIH, 
                Limite:procesosMemoria[procesosMemoria.length-1].Tamaño}); //Inserta el elemeto en la tabla de segmentos
                return true;
        }else{
            return false;
        }
    }
    actualizarTabla();
    pintado();
}
function copiarMemoria(){
    var copia=[];
    for(var i=0;i<procesosMemoria.length;i++)
    {
        copia.push(
            {
                Proceso:procesosMemoria[i].Proceso,
                Tamaño:procesosMemoria[i].Tamaño,
                DirI:procesosMemoria[i].dirI,
                DirFin:procesosMemoria[i].DirFin,
                DirIH:procesosMemoria[i].DirIH,
                DirFH: procesosMemoria[i].DirFH
            }
        );
    }
    return copia;
 }
 function copiarSegmentos(){
    var copia=[];
    for(let i=0;i<tablaSegmentos.length;i++)
    {
        copia.push(
            {
               ProcesoID:tablaSegmentos[i].ProcesoID,
               Segmento:tablaSegmentos[i].Segmento,
               DirI: tablaSegmentos[i].DirI,
               Limite: tablaSegmentos[i].Limite
            }
        );
    }
    return copia;
 }
function copiarTablaEspacios(){
    var copia={
        DirI:tablaEspaciosL.DirI,
        DirF:tablaEspaciosL.DirF,
        Tam:tablaEspaciosL.Tam,
        DirIH: tablaEspaciosL.DirIH,
        DirFH:tablaEspaciosL.DirFH
    }
    return copia;
}



function decToHex(num){
    return num.toString(16);
}
//Función eliminar
function eliminar(proceso){
    let encontrado=false;
    let i=0;
    do{
        if(tablaSegmentos[i].ProcesoID==proceso)
            encontrado=true;
        else
            i++;
    }while(encontrado==false && i<tablaSegmentos.length);   //Encuentra el proceso en la tabla de segmentos
    if(!encontrado){
        //alert("No fue posible eliminar el proceso ya que no se encuentra");
        console.log("No fue posible eliminar el proceso ya que no se encuentra");
    }else{
        let dirI;
        for(let j=0;j<5;j++){
            dirI=tablaSegmentos[i].DirI;
            for(let k=0;k<procesosMemoria.length;k++){
                if(procesosMemoria[k].DirIH==dirI){
                    procesosMemoria[k].Proceso=null;   //Se libera el espacio en memoria
                    i++;
                    break;
                }
            }
        }
        tablaSegmentos.splice((i-5),5);  //Se elimina los segmentos de la tabla
        let Proceso=procesosNombre.find(function (element){
            return element.id==proceso;
        }); //Se obtiene el proceso
    Proceso.num--;
    }
    actualizarTabla();
    pintado();
}

function actualizarTabla(){
    var todo = "<tr><th>Item</th><th>Nombre Proceso</th><th>Tamaño</th><th>Dirección inicial partición</th><th>Dirección final partición</th></tr>"
    const lista = document.getElementById("procEjec");
    lista.innerHTML = todo;

    // for (var i = 0; i < procesosMemoria.length; i++) {
    //     if(procesosMemoria[i].Proceso != null){
    //         var proceso = procesosNombre.find(function (element){
    //             return element.id==procesosMemoria[i].Proceso;
    //         });
    //         lista.innerHTML += "<tr><td>"+proceso.id+"</td><td>"+proceso.name+"</td><td>"+proceso.memoria+"</td><td>"+procesosMemoria[i].DirIH+"</td><td>"+procesosMemoria[i].DirFH+"</td></tr>"    
    //     }
        
    // }  
}

function pintado(){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.clearRect(0, 0, 300, 700);
    // ctx.strokeRect(0,0,300,200);
    // ctx.strokeRect(0,0,300,200);
    let inicio=0;
    console.log(procesosMemoria.length);
    for (let i = 0; i < procesosMemoria.length; i++) {
        ctx.strokeRect(0,inicio,300,(procesosMemoria[i].Tamaño)*(700/(16*1048576)));

        if(procesosMemoria[i].Proceso != null){
            // let MProceso=procesosNombre.find(function (element){
            //     return element.name==procesosMemoria[i].Proceso;
            // }).memoria;
            // let colorPro=procesosNombre.find(function (element){
            //     return element.name==procesosMemoria[i].Proceso;
            // }).color;
            // ctx.fillStyle = colorPro;
            ctx.fillRect(0, inicio, 300, (procesosMemoria[i].Tamaño)*(700/(16*1048576)));
        }

        // ctx.fillRect(10, (listaProcesos[i].Tamanio/(1048575*16))*700, 100, 100);
        inicio+=(procesosMemoria[i].Tamaño)*(700/(16*1048576))   
    }
    console.log(procesosMemoria);
}

window.onload = function(){
    actualizarTabla();
    pintado();
    }



insertaProceso(2);
eliminar(2);
insertaProceso(3);
insertaProceso(2);
eliminar(3);
insertaProceso(5);

console.log(procesosMemoria);
console.log('Tabla de segmentos');
console.log(tablaSegmentos);
// //Función compactar (Solo unir los espacios libres seguidos)
