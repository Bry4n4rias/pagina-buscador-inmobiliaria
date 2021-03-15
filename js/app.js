const carrito = document.querySelector('#carrito');
const listaAptos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  listaAptos.addEventListener('click', agregarCurso);

  carrito.addEventListener('click', eliminarCurso);

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const apto = e.target.parentElement.parentElement;
    leerDatosApto(apto);
  }
}

function leerDatosApto(apto) {
  const infoApto = {
    imagen: apto.querySelector('img').src,
    titulo: apto.querySelector('h4').textContent,
    precio: apto.querySelector('.precio span').textContent,
    id: apto.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  if (articulosCarrito.some((apto) => apto.id === infoCurso.id)) {
    const aptos = articulosCarrito.map((apto) => {
      if (apto.id === infoCurso.id) {
        let cantidad = parseInt(apto.cantidad);
        cantidad++;
        apto.cantidad = cantidad;
        return apto;
      } else {
        return apto;
      }
    });
    articulosCarrito = [...aptos];
  } else {
    articulosCarrito = [...articulosCarrito, infoApto];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar-curso')) {
    const apto = e.target.parentElement.parentElement;
    const cursoId = apto.querySelector('a').getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter((apto) => apto.id !== cursoId);

    carritoHTML();
  }
}

function carritoHTML() {
  vaciarCarrito();

  articulosCarrito.forEach((apto) => {
    const row = document.createElement('tr');
    row.innerHTML = `
               <td>  
                    <img src="${apto.imagen}" width=100>
               </td>
               <td>${apto.titulo}</td>
               <td>${apto.precio}</td>
               <td>${apto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${apto.id}">X</a>
               </td>
          `;
    contenedorCarrito.appendChild(row);
  });

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
