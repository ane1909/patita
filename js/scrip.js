const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaproductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    productos.addEventListener('click', comprarproductos);
    carrito.addEventListener('click', eliminarproductos);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarproductos(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const productos = e.target.parentElement.parentElement;
        leerDatosproductos(productos);
    }
}

function leerDatosproductos(productos) {
    const infoproductos = {
        imagen: productos.querySelector('img').src,
        titulo: productos.querySelector('h4').textContent,
        precio: productos.querySelector('.precio span').textContent,
        id: productos.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoproductos);
}

function insertarCarrito(productos) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${productos.imagen}" width=100>
        </td>
        <td>${productos.titulo}</td>
        <td>${productos.precio}</td>
        <td>
            <a href="#" class="borrar-productos" data-id="${cafe.id}">X</a>
        </td>
    `;
    listaproductos.appendChild(row);
    guardarproductosLocalStorage(cafe);
}


function eliminarproductos(e) {
    e.preventDefault();

    let productos,
    productosId;
    if(e.target.classList.contains('borrar-productos')){
        e.target.parentElement.parentElement.remove();
        productos = e.target.parentElement.parentElement;
        productosId = productos.querySelector('a').getAttribute('data-id');
    }
    eliminarproductosLocalStorage(productosId);
}

function vaciarCarrito() {
    while(listaproductos.firstChild){
        listaproductos.removeChild(listaproductos.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

function guardarproductosLocalStorage(productos) {
    let productos;
    productos = obtenerproductosLocalStorage();
    productos.push(productos);
    localStorage.setItem('productos', JSON.stringify(productos))
}

function obtenerproductosLocalStorage() {
    let productosLS;

    if(localStorage.getItem('productos') === null){
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}

function leerLocalStorage() {
    let productosLS;

    productosLS = obtenerproductosLocalStorage();

    productosLS.forEach(function(productos){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${productos.imagen}" width=100> 
            </td>
            <td>${productos.titulo}</td>
            <td>${productos.precio}</td>
            <td>
                <a href="#" class="borrar-productos" data-id="${productos.id}">X</a>
            </td>
        `;
        listaproductos.appendChild(row);
    });

}

function eliminarproductosLocalStorage(cafe) {
    let productosLS;

    productosLS = obtenerproductosLocalStorage();

    productosLS.forEach(function(productosLS, index){
        if(productosLS.id === productos) {
            productosLS.splice(index, 1)
        }
    });

    localStorage.setItem('productos', JSON.stringify(productosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}