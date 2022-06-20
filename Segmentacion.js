//Text 0.6, Stack:0.1, Heap:0.1, Bss:0.5, data:0.5

let procesosNombre = [
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
procesosLista= [    
    {
    Proceso:"S.0",
    Tamaño:1048576,
    DirI:0,
    DirFin:1048575,
    DirIH:"0x000000",
    DirFH:"0x0fffff"
    }
];



var tablaSegmentos=[
    {
        ProcesoID:0,
        Segmento:"nn",
        DirI:"n",
        Limite:0
    }
];

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
        procesosLista.push(
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
    let copiaProcesos=procesosLista;  //Se crea una copia de seguridad del proceso
    let copiaTablaSeg=tablaSegmentos;   //Se crea una copia de seguridad de la tabla de segmentos
    let Proceso=procesosNombre.find(function (element){
        return element.id==proceso;
    }); //Se obtiene el proceso
    //Determinar con que algoritmo se inserta
        //selectElement= document.getElementById("tbl2");
    let correcto=true;
    /*
    selectElement.addEventListener('change', (event) => {   //Esto esta mal
        switch(selectElement.value){  
            case "1":     //Primer Ajuste
                correcto=insertarPrimer(Proceso,'Text')&&insertarPrimer(Proceso,'Heap') &&insertarPrimer(Proceso,'Stack') &&
                insertarPrimer(Proceso,'Base')&&insertarPrimer(Proceso,'Data');
                if(correcto){
                    Proceso.num++;
                }else{
                    alert("No fue posible insertar el proceso "+Proceso.name);
                    procesos=copiaProcesos;
                    tablaSegmentos=copiaTablaSeg;
                }
                break;
            case "2":      //Mejor Ajuste
                correcto=insertarMejor(Proceso,'Text')&& insertarMejor(Proceso,'Heap')&& insertarMejor(Proceso,'Stack')&&
                 insertarMejor(Proceso,'Base')&& insertarMejor(Proceso,'Data');
                if (correcto){
                    Proceso.num++;
                }else{
                    alert("No fue posible insertar el proceso "+Proceso.name);
                    procesos=copiaProcesos;
                    tablaSegmentos=copiaTablaSeg;
                }
                break;
            case "3":      //PeorAjuste
                    correcto=insertarPeor(Proceso,'Text')&& insertarPeor(Proceso,'Heap')&& insertarPeor(Proceso,'Stack')&&
                    insertarPeor(Proceso,'Base')&& insertarPeor(Proceso,'Data');
                if (correcto){
                    Proceso.num++;
                }else{
                    alert("No fue posible insertar el proceso "+Proceso.name);
                    procesos=copiaProcesos;
                    tablaSegmentos=copiaTablaSeg;
                }
                break;
            default:
                console.log(selectElement.value);
        }
    })
    */
    correcto=insertarPrimer(proceso,'Text')&&insertarPrimer(proceso,'Heap') &&insertarPrimer(proceso,'Stack') &&
    insertarPrimer(proceso,'Base')&&insertarPrimer(proceso,'Data');
    if(correcto){
        Proceso.num++;
    }else{
        //alert("No fue posible insertar el proceso "+Proceso.name);
        console.log("No fue posible insertar el proceso "+Proceso.name)
        procesos=copiaProcesos;
        tablaSegmentos=copiaTablaSeg;
    }
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
    for(let i=0;i<procesosLista.length;i++){
        if(procesosLista[i].Proceso==null){
            if(procesosLista[i].Tamaño>=memoria){
                procesosLista[i].name=NProceso;
                correcto=true;
                tablaSegmentos.push(ProcesoID=Proceso.id, Segmento=segmento, DirI=procesos[i].DirIH, 
                    Limite=procesoLista[i].Tamaño); //Inserta el elemeto en la tabla de segmentos
                return correcto;
            }
        }
    }
    //Si no se pudo insertar se crea una nueva partición
    if(!correcto){
        if(crearP(NProceso,memoria)){
            tablaSegmentos.push(ProcesoID=Proceso.id, Segmento=segmento, DirI=procesosLista[procesosLista.length-1].DirIH, 
                Limite=procesosLista[procesosLista.length-1].Tamaño); //Inserta el elemeto en la tabla de segmentos
                return true;
        }else{
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
    for(let i=0;i<procesos.length;i++){
        if(procesos[i].Proceso==null){
            if(procesos[i].Tamaño>=memoria){
                if(procesos[i].Tamaño>procesos[Max]){
                    Max=i;
                }
            }
        }
    }

    //Se intenta insertar en los huecos de la ram
    if(Max!=0){
        procesos[Max].name=NProceso;
        correcto=true;
        tablaSegmentos.push(ProcesoID=Proceso.id, Segmento=segmento, DirI=procesos[Max].DirIH, 
            Limite=procesos[Max].Tamaño); //Inserta el elemeto en la tabla de segmentos
        return true;
    }
    //Si no se pudo insertar se crea una nueva partición
    if(!correcto){
        if(crearP(NProceso,memoria)){
            tablaSegmentos.push(ProcesoID=Proceso.id, Segmento=segmento, DirI=procesos[procesos.length-1].DirIH, 
                Limite=procesos[procesos.length-1].Tamaño); //Inserta el elemeto en la tabla de segmentos
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
    for(let i=0;i<procesos.length;i++){
        if(procesos[i].Proceso==null){
            if(procesos[i].Tamaño>=memoria){
                if(procesos[i].Tamaño<procesos[Min]){
                    Min=i;
                }
            }
        }
    }

    //Se intenta insertar en los huecos de la ram
    if(Min!=16777216){
        procesos[Min].name=NProceso;
        correcto=true;
        tablaSegmentos.push(ProcesoID=Proceso.id, Segmento=segmento, DirI=procesos[Min].DirIH, 
            Limite=procesos[Min].Tamaño); //Inserta el elemeto en la tabla de segmentos
        return true;
    }
    //Si no se pudo insertar se crea una nueva partición
    if(!correcto){
        if(crearP(NProceso,memoria)){
            tablaSegmentos.push(ProcesoID=Proceso.id, Segmento=segmento, DirI=procesos[procesos.length-1].DirIH, 
                Limite=procesos[procesos.length-1].Tamaño); //Inserta el elemeto en la tabla de segmentos
                return true;
        }else{
            return false;
        }
    }
}




function decToHex(num){
    return num.toString(16);
}
//Función eliminar
function eliminar(Proceso){
    let encontrado=false;
    let i=0;
    do{
        if(tablaSegmentos[i]==Proceso)
            encontrado=true;
        i++;
    }while(encontrado==false && i<tablaSegmentos.length);   //Encuentra el proceso en la tabla de segmentos
    if(i==0){
        alert("No fue posible eliminar el proceso ya que no se encuentra");
    }else{
        let dirI;
        for(let j=0;j<5;j++){
            dirI=tablaSegmentos[i].DirI;
            for(let k=0;k<procesos.length;k++){
                if(procesos[k].DirIH==dirI){
                    procesos[k].Proceso=null;   //Se libera el espacio en memoria
                    i++;
                    break;
                }
            }
        }
        tablaSegmentos[i-5].splice(i,5);  //Se elimina los segmentos de la tabla
            let Proceso=procesosNombre.find(function (element){
        return element.id==Proceso;
    }); //Se obtiene el proceso
    Proceso.num--;
    }
}

insertaProceso(2);
insertaProceso(3);
insertaProceso(2);
insertaProceso(5);
console.log(procesos);
console.log('Tabla de segmentos');
console.log(tablaSegmentos);
//Función compactar (Solo unir los espacios libres seguidos)