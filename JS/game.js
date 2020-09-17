
let filas;
let columnas;
let epoca;
let vivos;
const blanco = '#7FFFD4';
const negro = '#000000';

//Tamaño de alto y ancho de c/celula, 5 pixels
const tileX = tileY = 10;
let tablero = [];

//Variables de entorno
let lienzo = document.querySelector('canvas');
let context = lienzo.getContext( '2d' );
let btnSiguiente = document.querySelector('#siguiente');
let btnReinicio = document.querySelector('#reinicio');
let epocaHTML = document.querySelector('#epoca');
let vivosHTML = document.querySelector('#individuos');

const inicializar = () => {

    //Tamaño total de nuestro tablero para indicar
    lienzo.width = 600;
    lienzo.height = 400;

    filas = lienzo.height / tileY;
    columnas = lienzo.width / tileX;
    tablero = crearTablero( filas, columnas );
    dibujar( tablero );

    epoca = 1;
    vivos = contarVivos( tablero );

    epocaHTML.innerHTML = `<h3>Generación: ${ epoca }</h3>`;
    vivosHTML.innerHTML = `<h3>Población: ${ vivos }</h3>`;

    console.log({'filas':filas, 'cols':columnas});


}

const crearTablero = (c, f) => {
    arreglo = [];

    for(let i=0; i < c; i++) {
        arreglo[i]= new Array(f);
    }
    for(let j = 0; j < f; j++) {
        for(let i = 0; i < c; i++) {
          // arreglo[i][j] = Math.floor(Math.random() * 2);
          arreglo[i][j] = 0;
        }  
    }
    //TODO: Borrar este ciclo
    //prueba

    arreglo[19][28]=arreglo[19][29]=arreglo[20][29]=arreglo[20][30]=arreglo[21][29]=1;
    return arreglo;
}

const dibujar = ( Array ) => {
    let color;

    for(let j=0; j < columnas; j++) {
        for(let i=0;i < filas; i++) {
            if( Array[i][j] === 1) {
                color = blanco;
            } else {
                color = negro;
            }

            context.fillStyle = color;
            context.fillRect(j*tileX, i*tileY, tileX, tileY);
        }
    }
}

const creaArray = (c, f) => {
    let arreglo = [];
    for(let i=0; i < f; i++) {
        arreglo[i]= new Array(f);
    }
    for(let j = 0; j < f; j++) {
        for(let i = 0; i < c; i++) {
          // arreglo[i][j] = Math.floor(Math.random() * 2);
          arreglo[j][i] = 0;
        }  
    }

    return arreglo;


}

const sumaVecinos = ( Array, x, y ) => {
    let xVecino, yVecino;
    let cont = 0;

    for(let j = -1; j < 2; j++) {
        
        for(let i = -1; i < 2; i++) {
            
            xVecino = i + x;
            yVecino = j + y;
                        
            if( xVecino !== x || yVecino !== y){
             if( xVecino >= 0 && xVecino < columnas){
                 if( yVecino >= 0 && yVecino < filas){
                    if( Array[yVecino][xVecino] === 1){
                         cont++;
                     }
                             
                 }
             } 
            }
        }
    }
    return cont;
}

const procesar = ( Array ) => {
    
    let nuevoTablero = creaArray(columnas, filas);
    let suma = 0;
    
    for( let j = 0; j < filas; j++ ) {
        for( let i=0; i < columnas; i++ ){
            
            suma = sumaVecinos( Array, i, j);
            
             if( suma < 2 || suma > 3){
                 nuevoTablero[j][i] = 0;
             }
             if( suma === 3 ) {
                 nuevoTablero[j][i] = 1;
             }

             if( suma === 2) {
                 nuevoTablero[j][i] = Array[j][i];
             }

        }
    }
    
    return ( nuevoTablero );
    
}

//Funcion para contar individuos vivos por época
const contarVivos = ( Array ) => {
    const reducer = (acumulador, valorActual ) => acumulador + valorActual;
    let suma = 0;
    for( let i = 0; i < Array.length; i++ ) {
        suma += Array[i].reduce( reducer );
    }

    return suma;
}


const borrarLienzo = () => {
    lienzo.width = lienzo.width;
    lienzo.height = lienzo.height;
}

inicializar();



/*------------------ Eventos -----------------------*/

// Epoca siguiente
btnSiguiente.addEventListener('click', () => {
    tablero = procesar( tablero );
    borrarLienzo();
    epoca++;
    epocaHTML.innerHTML = `<h3>Generacion: ${ epoca }</h3>`;
    vivos = contarVivos( tablero );
    vivosHTML.innerHTML = `<h3>Poblacion: ${ vivos }</h3>`;
    setTimeout( () => {
        dibujar( tablero );
    },50);
});

// Reinicio del juego
btnReinicio.addEventListener('click', () => {
    console.log("se reinicia el juego");
    borrarLienzo();
    inicializar();
    tablero = crearTablero( filas, columnas );
    dibujar( tablero );
   
})



