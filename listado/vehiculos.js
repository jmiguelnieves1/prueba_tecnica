var N_VEHICULOS = 10;

const urlImage = '../assets/delete.png';

function listarPrimerosVehiculos(n) {
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos'));
    const div = document.getElementById('tabla-vehiculos');
    div.innerHTML = '';
    div.length = 0;

    if(vehiculos.length < n) {
        n = vehiculos.length;
    }
    for(let i = 0; i <= n-1; i++) {
        if(!vehiculos[i]) {
            break;
        }
        agregarNuevoItem(div, vehiculos[i], i);
    }
    const footer = document.getElementById('footer');

    if(vehiculos.length > 0) {
        footer.innerHTML = `<span class="footer">Mostrando registros del 1 al 10 de un total de ${vehiculos.length} registros</span>`;
    } else {
        div.innerHTML = `<span class="footer">No hay vehiculos para mostrar</span>`;
        footer.innerHTML = '';
    }
    
}

function agregarNuevoItem(div, vehiculos, i) {
    const vehiculo = document.createElement('div');
        vehiculo.className = 'item-vehiculos';
        vehiculo.id = i;
        vehiculo.innerHTML = `<span class="w-18">${vehiculos.nombreVendedor}</span>
        <span class="w-12">${vehiculos.rutVendedor}</span>
        <span class="w-12">${vehiculos.patenteVehiculo}</span>
        <span class="w-12">${vehiculos.marcaVehiculo}</span>
        <span class="w-12">${vehiculos.modeloVehiculo}</span>
        <span class="w-12">${vehiculos.colorVehiculo}</span>
        <span class="w-12"><img src=${urlImage} class='logo-delete' alt='Eliminar' onClick='eliminarVehiculo(${i})'/></span>`
        div.insertAdjacentElement("beforeend", vehiculo);
}

function eliminarVehiculo(index) {
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos'));
    vehiculos.splice(index, 1);
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
    listarPrimerosVehiculos(N_VEHICULOS);
}

listarPrimerosVehiculos(N_VEHICULOS);