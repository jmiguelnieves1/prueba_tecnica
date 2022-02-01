function validarRut(rut) {
    var valor = rut.replace('-','');
    
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();

    if(cuerpo.length < 7) { return false; }
    
    suma = 0;
    multiplo = 2;
    
    for(i=1;i<=cuerpo.length;i++) {
        index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    
    dvEsperado = 11 - (suma % 11);
    
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    if(dvEsperado != dv) { return false; }
    return true;
}

function cargarMarcas() {
    $selectMarcas = document.getElementById('marcaVehiculo');
    const opcion = document.createElement('option');
        opcion.value = '';
        opcion.text = '';
        opcion.hidden = true;
    $selectMarcas.appendChild(opcion);
    for(const marca of Object.keys(autos)) {
        const opcionMarca = document.createElement('option');
        opcionMarca.value = marca;
        opcionMarca.text = marca;
        $selectMarcas.appendChild(opcionMarca);
    }
}

function cargarColores() {
    $selectColores = document.getElementById('colorVehiculo');
    const opcion = document.createElement('option');
        opcion.value = '';
        opcion.text = '';
        opcion.hidden = true;
    $selectColores.appendChild(opcion);
    for(const color of colores) {
        const opcionColor = document.createElement('option');
        opcionColor.value = color;
        opcionColor.text = color;
        $selectColores.appendChild(opcionColor);
    }
}

function cargarModelos(opcion) {
    $selectModelo = document.getElementById('modeloVehiculo');
    $selectModelo.length = 0;
    for(const modelo of autos[opcion.value]) {
        const opcionModelo = document.createElement('option');
        opcionModelo.value = modelo;
        opcionModelo.text = modelo;
        $selectModelo.appendChild(opcionModelo);
    }
}

function cargoNuevoVehiculo() {
    limpiarMensajesDeError();
    const nombreVendedor = document.getElementById('nombreVendedor').value;
    const rutVendedor = document.getElementById('rutVendedor').value;
    const patenteVehiculo = document.getElementById('patenteVehiculo').value;
    const marcaVehiculo = document.getElementById('marcaVehiculo').value;
    const modeloVehiculo = document.getElementById('modeloVehiculo').value;
    const colorVehiculo = document.getElementById('colorVehiculo').value;

    let isError = false;
    //Validamos que los datos esten completos
    if(nombreVendedor.length < 3) {
        mostrarErrorPorId('errorNombreVendedor', 'Este campo es requerido y debe contener minimo 3 caracteres.');
        isError = true;
    }
    if(!validarRut(rutVendedor)) {
        mostrarErrorPorId('errorRutVendedor', 'Rut invalido');
        isError = true;
    }
    if(patenteVehiculo.length !== 6) {
        mostrarErrorPorId('errorPatenteVehiculo', 'Patente de vehiculo invalida, solo 6 digitos');
        isError = true;
    }
    if(marcaVehiculo.length < 1) {
        mostrarErrorPorId('errorMarcaVehiculo', 'Debes seleccionar una marca');
        isError = true;
    }
    if(modeloVehiculo.length < 1) {
        mostrarErrorPorId('errorModeloVehiculo', 'Debes seleccionar un modelo');
        isError = true;
    }
    if(colorVehiculo.length < 1) {
        mostrarErrorPorId('errorColorVehiculo', 'Debes seleccionar un color');
        isError = true;
    }

    if(isError) {
        return;
    }

    const nuevoVehiculo = {
        nombreVendedor, rutVendedor, patenteVehiculo, marcaVehiculo, modeloVehiculo, colorVehiculo
    };
    let vehiculosCargados = JSON.parse(localStorage.getItem('vehiculos'));
    if(vehiculosCargados) {
        vehiculosCargados = [nuevoVehiculo, ...vehiculosCargados];
        localStorage.setItem('vehiculos', JSON.stringify(vehiculosCargados))
    } else {
        localStorage.setItem('vehiculos', `[${JSON.stringify(nuevoVehiculo)}]`);
    }
    limpiarFormulario();
    alert('Vehiculo cargado correctamente');
}

function mostrarErrorPorId(id, mensaje) {
    document.getElementById(id).innerHTML = mensaje;
}

function limpiarFormulario() {
    document.getElementById('nombreVendedor').value = '';
    document.getElementById('rutVendedor').value = '';
    document.getElementById('patenteVehiculo').value = '';
    document.getElementById('marcaVehiculo').value = '';
    document.getElementById('modeloVehiculo').value = '';
    document.getElementById('colorVehiculo').value = '';
}

function limpiarMensajesDeError() {
    document.getElementById('errorNombreVendedor').innerHTML = '';
    document.getElementById('errorRutVendedor').innerHTML = '';
    document.getElementById('errorPatenteVehiculo').innerHTML = '';
    document.getElementById('errorMarcaVehiculo').innerHTML = '';
    document.getElementById('errorModeloVehiculo').innerHTML = '';
    document.getElementById('errorColorVehiculo').innerHTML = '';
}

cargarMarcas();
cargarColores();