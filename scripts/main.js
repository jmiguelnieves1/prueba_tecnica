const autos = {
    'Chevrolet': ['Sail', 'Camaro'],
    'Fiat': ['Sienna', 'Palio'],
    'Ford': ['Ecosport', 'Explorer'],
    'Hyundai': ['Accent', 'Getz']
}

const colores = ['Rojo', 'Verde', 'Gris', 'Negro'];

localStorage.setItem('autos', JSON.stringify(autos));
localStorage.setItem('colores', JSON.stringify(colores));