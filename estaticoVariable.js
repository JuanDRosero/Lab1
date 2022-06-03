
//NO OLVIDAR INICIALIZAR EL ARREGLO SEGÚN EL ALGORITMO QUE SE QUIERE USAR
//Las direcciones son el valor*1024

let Pnombres= new Map();
let Pmemoria = new Map();
//Diccionario de Nombres
Pnombre.set(1,"Sistema Operativo");
Pnombre.set(2,"Notepad");
Pnombre.set(3,"Word");
Pnombre.set(4,"Excel");
Pnombre.set(5,"AutoCAD");
Pnombre.set(6,"Calculadora");
Pnombre.set(7,"Windows Defender");
Pnombre.set(8,"PowerPoint");
Pnombre.set(9,"Chrome");

//Diccionario de memoria a usar (En kib)
Pmemoria.set(1,1024)
Pmemoria.set(2,219.38);
Pmemoria.set(3,279.99);
Pmemoria.set(4,301.90);
Pmemoria.set(5,425.98);
Pmemoria.set(6,204.95);
Pmemoria.set(7,3902.94);
Pmemoria.set(8,1743.76);
Pmemoria.set(9,2633.41);

//variable que representa la RAM
let procesos=[];

//Funcion que ordena la ram en particiones de objetos mejor Ajuste (de pequeño a grande) (1,256,256,512,512,512,1024,1024,1024,2048,496,496)
function IniciarMejor(){
    procesos=
    [
        {
            "Proceso":1,
            "Tamaño":1024,
            "DirIn":"0x000000",
            "DirFin":"0x0FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":256,
            "DirIn":"0x100000",
            "DirFin":"0x13FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":256,
            "DirIn":"0x140000",
            "DirFin":"0x17FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":512,
            "DirIn":"0x180000",
            "DirFin":"0x1FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":512,
            "DirIn":"0x200000",
            "DirFin":"0x27FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":512,
            "DirIn":"0x280000",
            "DirFin":"0x2FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1024,
            "DirIn":"0x300000",
            "DirFin":"0x3FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1024,
            "DirIn":"0x400000",
            "DirFin":"0x4FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1024,
            "DirIn":"0x500000",
            "DirFin":"0x5FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":2048,
            "DirIn":"0x600000",
            "DirFin":"0x7FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4096,
            "DirIn":"0x800000",
            "DirFin":"0xBFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4096,
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
            "Tamaño":1024,
            "DirIn":"0x000000",
            "DirFin":"0x0FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4096,
            "DirIn":"0x100000",
            "DirFin":"0x4FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":4096,
            "DirIn":"0x500000",
            "DirFin":"0x8FFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":2048,
            "DirIn":"0x900000",
            "DirFin":"0xAFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1024,
            "DirIn":"0xB00000",
            "DirFin":"0xBFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1024,
            "DirIn":"0xC00000",
            "DirFin":"0xCFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":1024,
            "DirIn":"0xD00000",
            "DirFin":"0xDFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":512,
            "DirIn":"0xE0000",
            "DirFin":"0xE7FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":512,
            "DirIn":"0xE80000",
            "DirFin":"0xEFFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":512,
            "DirIn":"0xF00000",
            "DirFin":"0xF7FFFF"
        },
        {
            "Proceso":null,
            "Tamaño":256,
            "DirIn":"0xF80000",
            "DirFin":"0xFBFFFF"
        },
        {
            "Proceso":null,
            "Tamaño":256,
            "DirIn":"0xFC0000",
            "DirFin":"0xFFFFFF"
        },
    ]
}

function Insertar(numeroP){
    //hay que revisar primero si está iniciada la memoria en el mejor proceso o peor proceso respectivamente
    let MProceso=Pmemoria.get(numeroP);
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
        alert("No fue posible eliminar el proceso por que no se encntró");
    }
}

