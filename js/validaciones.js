export function valida(input){
    const tipoInpunt = input.dataset.tipo;
    if (validadores[tipoInpunt]){
        validadores[tipoInpunt](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarErrorMessage(tipoInpunt, input);
    }
}

const errorTipo = ["valueMissing", "typeMismatch", "patternMismatch", "customError"]

const errorMessages = {
    nombre:{
        valueMissing: "Este campo no puede estar vacío"
    },

    email:{
        valueMissing: "Este campo es obligatorio",
        typeMismatch:"Necesita indicar un correo electrónico válido"
    },

    password:{
        valueMissing: "Campo obligatorio",
        patternMismatch: "debe contener al menos 6 caracteres (máximo 12), 1 minúscula, 1 mayúscula y 1 número"
    },

    nacimiento:{
        valueMissing: "Por favor indique su fecha de nacimiento",
        customError: "Debes ser mayor de 18 años"
    },

    numero:{
        valueMissing: "Rellene este campo",
        patternMismatch: "el formato requerido es de 9 números (9XXXXXXXX)"
    },

    direccion:{
        valueMissing: "Campo Obligatorio",
        patternMismatch: "la dirección debe contener entre 10 y 40 caracteres"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarErrorMessage(tipoInpunt, input){
    let mensaje = ""

    errorTipo.forEach( error => {
        if(input.validity[error]){
            mensaje = errorMessages[tipoInpunt][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input){
    const fechaUsuario = new Date(input.value);
    let mensaje = "";

    if(!mayorDeEdad(fechaUsuario)){
        mensaje = "tas chikito, debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaF = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    console.log(diferenciaF);

    return diferenciaF <= fechaActual;
}