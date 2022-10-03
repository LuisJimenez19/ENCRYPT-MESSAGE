/* info */
const infoShowModal = document.getElementById('info'); /* interactividad */
const infoShowBtn = document.querySelector('#comoFunciona'); 

const modalInfo = document.querySelector('.modal-background'); /* modal a mostrar */
const closeModal = document.querySelectorAll('.close-modal'); /* interactividad cierra modal */

/* modal incomplete */
const modalIncomplet = document.querySelector('.modal-incomplet');

/*modal all  */
const modalAll = document.querySelector('.modal-all-background');
let olMsg = document.querySelector('.modal-all__messages');

/* input mensagge */
const inputMsg = document.querySelector('#input-msg') /* mensaje */
const inputKey = document.querySelector('#input-key') /* clave */
const keyError = document.querySelector('.key-error'); /* error */

/* output respuesta */
const outputMsg = document.querySelector('#output'); /* mensaje de salida */
let btnMode = document.querySelectorAll('.btn-mode');/* botones para elegir el mod */
btnMode = [...btnMode]
const labelMagic = document.querySelector('.label-magic'); /* label que muestra el modo seleccionado */

/*btn ejecutar  */
const btnMagic = document.querySelector('.magic-btn');

/* button copy */
const btnCopy = document.querySelector('.copy-btn'); /* copiar mensaje */
const labelCopy = document.querySelector('.good-copy'); /* mostar que se copio */

/* resetear */
const btnReset = document.querySelector('.reset-btn');


/* muestro modal */

infoShowModal.addEventListener('click', () => {
    displayNone(modalInfo)
})

infoShowBtn.addEventListener('click', () => {
    displayNone(modalInfo)
})

closeModal.forEach((item, index) => {

    item.addEventListener('click', (e) => {
        modalInfo.classList.add('d-none')
        modalIncomplet.classList.add('d-none')
        modalAll.classList.add('d-none')

        olMsg.innerHTML = ''

    })
})



/* tomar clave y mostrar error */
let key; /* variable que contiene la clave */
inputKey.addEventListener('input', (e) => {

    if (inputKey.value > 27 || inputKey.value.lenght > 2 || inputKey.value <= 0) {

        keyError.classList.remove('d-none')
        inputKey.value = inputKey.value.slice(0, 2)


    } else {
        keyError.classList.add('d-none')

    }

    if (e.data == null) {
        keyError.classList.add('d-none')
    }
    key = inputKey.value

})

/* tomar mensaje */
let msg = ''; /* vairable que contiene le mensaje */
inputMsg.addEventListener('input', (e) => {
    msg = inputMsg.value

})


let modo = '';
// Elegir modo
btnMode.forEach(btn => {
    btn.addEventListener('click', () => {
        modo = btn.textContent

        selectMode(btn)
        
        if (btn.textContent == 'Cifrar') {
            labelMagic.innerHTML = `Generar mensaje clave <i class="fa-sharp fa-solid fa-arrow-right"></i>`
            outputMsg.placeholder = 'Mensaje cifrado'
        } else {
            labelMagic.innerHTML = `Obtener mensaje original<i class="fa-sharp fa-solid fa-arrow-right"></i>`
            outputMsg.placeholder = 'Mensaje descifrado'
        }
    })
})

// obtener mensaje
let auxIntentosMsg = 0
btnMagic.addEventListener('click', () => {


    if (modo == '' || msg == '' || key == '') {/* Si no hay rellenado nada */

        auxIntentosMsg += 1;
        
        if (auxIntentosMsg === 3) { /* muestra el metodo de pago */
            // le cambio el texto al modal
            modalIncomplet.firstElementChild.children[1].textContent = 'Que parte de completar todos los campos no entiendes? Ahora tendras que pagar por usar la app'

            let img = document.createElement('img');
            img.className = 'metodo-pago'
            img.src = "https://pbs.twimg.com/media/FIR027qWQAsR6A2.jpg"
            modalIncomplet.classList.remove('d-none')
            setTimeout(() => {
                modalIncomplet.firstElementChild.appendChild(img)/* agrego la imagen */

            }, 3000)


        } else { /* las primeras 3 veces, por si no ha completado los campos */

            // si esta la imagen la borra y muestra solo el mensaje, resetea el aux
            if (modalIncomplet.firstElementChild.children[1].nextElementSibling != null) { /* si no tiene hermoano devuelve null, como ya se agrego la imagen entonces lo elimino */

                modalIncomplet.firstElementChild.children[1].textContent = 'Completa todos los campos'
                modalIncomplet.firstElementChild.removeChild(modalIncomplet.firstElementChild.lastElementChild);
                modalIncomplet.classList.remove('d-none')
                auxIntentosMsg = 0

            } else {/* si no esta la imagen, solo muestra el modal */
                modalIncomplet.firstElementChild.children[1].textContent = 'Completa todos los campos'
                modalIncomplet.classList.remove('d-none')
            }
        }



    } else {/* si estan todos los campos */

        /* itero en todas las claves para porder ver el mensaje */
        if (key == 27) {

            modalAll.classList.remove('d-none')


            for (let i = 1; i <= 26; i++) {
                let msgStrong = getTranslatedMessage(modo, msg, parseInt(i))
                let msgLi = document.createElement('li');
                msgLi.textContent = msgStrong
                olMsg.appendChild(msgLi)
            }

        } else { /* Si esta todo correcto */

            let msgTranslated = getTranslatedMessage(modo, msg, parseInt(key))
            outputMsg.textContent = msgTranslated

        }

    }
})



/* copiar */
btnCopy.addEventListener('click', () => {
    copyToClipboard(outputMsg)
})


/* resetear */
btnReset.addEventListener('click', () => {

    btnMode.forEach(btn => { btn.classList.remove('btn--mode') })
    labelMagic.innerHTML = `Ejecutar <i class="fa-sharp fa-solid fa-arrow-right"></i>`
    modo = ''

    inputMsg.value = ''
    msg = ''

    inputKey.value = ''
    key = ''

    outputMsg.textContent = ''
    outputMsg.placeholder = 'Mensaje'

    auxIntentos = 0
    auxIntentosMsg = 0
})

// --------funciones--------------

// Funcion para agregar o eliminar esta clase
function displayNone(element) {
    element.classList.toggle('d-none')
}

// funcion dar estilo al btn seleccionado
function selectMode(element) {
    btnMode.forEach(btn => {
        btn.classList.remove('btn--mode')
    })
    element.classList.add('btn--mode')
}


/* funcion para copiar al portapapeles */
let auxIntentos = 0
function copyToClipboard(output) {
    if (output.textContent != '') {

        var aux = document.createElement("input");
        aux.value = output.textContent
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

        labelCopy.classList.remove('d-none')
        setTimeout(() => {
            labelCopy.classList.add('d-none')
        }, 500)

    } else {
        auxIntentos += 1
        modalIncomplet.classList.remove('d-none')

        console.warn('No hay mensaje que copiar')
        

        if (auxIntentos == 3) {
            modalIncomplet.firstElementChild.children[1].textContent =
                `que parte de completar los campos no entendes😠, ahora por gracios@ vas a tener que leer esta  letra:
                Estoy intentando hacerme amigo del miedo
                Y reírme a carcajadas cada vez que puedo
                Estoy intentando sonreír a cada niño con el que me cruzo
                Y sumergirme en cada relación con el oficio de un buzo
                Créeme, lo estoy intentando
                Estoy intentando no darle importancia
                Al hecho de que no seas como te había imaginado
                Estoy intentando jugar sin que me importe el resultado
                Y relajarme cuando quiero usar el bater, pero esta ocupado
                Créeme, lo estoy intentando
                Estoy intentando ser consciente
                De que el sol sigue allá arriba
                Estoy intentando controlar mi ira
                No tragar de golpe y así, poco a poco
                Saborear la vida
                Estoy intentando decir la verdad
                Y hacerlo de la manera que menos duela
                Dejar de usar la rueda y gastar más suela
                Estoy intentando no echar la culpa a otros
                Cuando algo sale mal, pisar un suelo más natural
                Y salir de vez en cuando de esta ciudad áspera y artificial
                Estoy intentando aprender a sonreír
                Cuando me demuestran que me equivoco
                A dejar de disimular que soy un loco
                A sentir la energía de cada pequeña cosa que toco
                Créeme, lo estoy intentando
                Estoy intentando dibujar sonrisas en mi barrio
                Intentando decidir si prefiero unos ojos o unos labios
                Estoy intentando memorizar cada sueño cuando me despierto
                Y caminar sin dudar porque cada instante de duda
                Es un instante muerto
                Estoy intentando hablar más con desconocidos
                Y no girar la cabeza cuando alguien me mira demasiado
                Estoy intentando ser neutral y objetivo
                Tomarme la vida con la perspectiva del que no se queja
                Aunque tenga algún motivo
                Estoy intentando escribir y vivir, para volver a escribir
                Y hacer de ese circulo un maravilloso jardín en el que existir
                Estoy intentando callar cuando no sé que decir
                Plantarme y discutir; antes de agachar la cabeza y huir
                Créeme, lo estoy intentando
                Estoy intentando dar de comer a cosas invisibles
                Y a enamorarme de cosas insignificantes
                Y a no dar importancia a esas cosas
                Que nos venden como grandes
                Estoy intentando pensar más en los que me quieren
                Reírme de mis fobias
                Estoy intentando que mi corazón no se acelere
                Si se acercan quienes me odian
                Estoy intentando asumir que el mundo no es justo
                Y que el rencor de otros es lógico
                Y que el amor se marchita si no lo riegas
                Y que la muerte no avisa cuando llega
                Y que quien juega limpio no siempre recibe apoyo
                Estoy intentando dedicar más tiempo a mirar las estrellas
                A beber más agua, a abrazar, a besar
                Y a dar muestras de afecto sin un motivo aparente
                Estoy intentando ser más imperfecto
                Hacer lo incorrecto, ser más imprudente
                Estoy intentando liberar al payaso
                Que encerré en la mazmorra de la vergüenza hace tiempo ya
                A no hacer algo porque lo hagan los demás
                A hablar con los animales y tratarlos como a iguales
                Estoy intentando ser más insensato
                Y así amar, entregarme sin medida
                Ser feliz, aunque sea a ratos
                Y darle un sentido a esto que llaman vida
                No sé si lo conseguiré, pero créeme
                Lo estoy intentando`
            modalIncomplet.classList.remove('d-none')
            auxIntentos = 0

        } else {
            modalIncomplet.firstElementChild.lastElementChild.textContent = 'Completa todos los campos'
            modalIncomplet.classList.remove('d-none')

        }
    }
}
/* expresión regular para comprobar si es una letra */
function isAlpha(ch) {
    let expReg = /^[a-zA-Z()]$/
    return expReg.test(ch)
}

/* Funcion que cifra o descifra el mensaje */
function getTranslatedMessage(modo, mensaje, clave) {
    (modo)
    if (modo == 'Descifrar') {
        (modo)
        clave = -clave
    }
    traduccion = ''

    for (simbol of mensaje) {

        if (isAlpha(simbol)) {
            num = simbol.charCodeAt()

            num += clave


            if (simbol === simbol.toUpperCase()) {
                (simbol === simbol.toUpperCase())
                if (num > 'Z'.charCodeAt()) {
                    num -= 26
                } else if (num < 'A'.charCodeAt()) {
                    num += 26
                }
            } else if (simbol === simbol.toLowerCase()) {

                if (num > 'z'.charCodeAt()) {
                    num -= 26
                } else if (num < 'a'.charCodeAt()) {
                    num += 26
                }
            }
            traduccion += String.fromCharCode(num)

        } else {
            traduccion += simbol
        }

    }

    return traduccion

}    
