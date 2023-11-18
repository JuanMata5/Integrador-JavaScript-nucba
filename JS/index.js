const cartModal = document.getElementById("cartModal");
const menuHamburguer = document.getElementById("menu-button");
const menuList = document.getElementById("menu-list");
const linksSelectButton = document.getElementById('showLinksSelect');
const linksSelectList = document.getElementById('linksSelect');
const linksSelectButtonDesktop = document.getElementById('showLinksSelectDesktop');
const linksSelectListDesktop = document.getElementById('linksSelectDesktop');


const modalCart = document.getElementById("cart-icon")
const wishModal = document.getElementById("wish-icon")
const overlay = document.getElementById("overlay");


const btnPrevNew = document.getElementById("prevBtnNew");
const btnNextNew = document.getElementById("nextBtnNew");
const cardContainerNew = document.getElementById("card-container");




// Función para obtener el carrito desde localStorage
const getCarritoFromLocalStorage = () => {
  const carritoStorage = localStorage.getItem('carrito');
  return carritoStorage ? JSON.parse(carritoStorage) : [];
};

// Función para guardar el carrito en localStorage
const saveCarritoToLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};


const init = () => {
  menuHamburguer.addEventListener("click", toggleMenu);
  linksSelectButton.addEventListener('click', toggleLinksSelect);
  linksSelectButtonDesktop.addEventListener('mouseenter', toggleLinksSelectDesktop);
  linksSelectListDesktop.addEventListener('mouseleave', toggleLinksSelectDesktopLeave);
  document.getElementById("cart-icon").addEventListener("click", toggleCart);
  document.getElementById("closeButton").addEventListener("click", toggleCartClose);
  document.getElementById("wish-icon").addEventListener("click", togglewish);
  document.getElementById("closeWishButton").addEventListener("click", toggleWishClose);
  overlay.addEventListener("click", closeOverlay); 
  btnPrev.addEventListener("click", prevSlide); // Cambiado
  btnNext.addEventListener("click", nextSlide); // Cambiado
  btnPrevNew.addEventListener("click", prevSlideNew); // Cambiado
  btnNextNew.addEventListener("click", nextSlideNew); // Cambiado
  
  carrito = getCarritoFromLocalStorage(); // Obtener el carrito del almacenamiento local
  actualizarCarrito();
  updateCarouselNew();
  updateButtonsNew();
  saveCarritoToLocalStorage(); // Guardar el carrito en el almacenam

  
};

const toggleMenu = () => {
  if (menuList.classList.contains("hidden")) {
    menuList.classList.remove("hidden");
  } else {
    menuList.classList.add("hidden");
  }
};

const toggleLinksSelect = () => {
    linksSelectList.classList.toggle('hidden');
   
}

const toggleLinksSelectDesktop = () => {
    linksSelectListDesktop.classList.toggle('hidden');

}

const toggleLinksSelectDesktopLeave = () => {
    linksSelectListDesktop.classList.add('hidden'); // Oculta el menú cuando el cursor sale de la lista desplegable
    overlay.classList.add('hidden');
  }

  const toggleCart = () => {
    console.log("Toggle Cart");
    cartModal.classList.toggle('hidden', false);
    cartModal.classList.toggle('translate-x-full', false);
    cartModal.classList.toggle('translate-x-0', true);
    overlay.classList.toggle('hidden', false);
};
  
const toggleCartClose = () => {
  console.log("Toggle Cart Close");
  cartModalMobile.classList.toggle('translate-x-0', false);
  cartModalMobile.classList.toggle('translate-x-full', true);
  overlay.classList.toggle('hidden', true);
};


  

const togglewish = () => {
  cartModal.classList.remove('hidden');
  cartModal.classList.remove('translate-x-full');
  cartModal.classList.add('translate-x-0');
  overlay.classList.remove('hidden'); 
}

const toggleWishClose = () => {
  cartModal.classList.remove('translate-x-0');
  cartModal.classList.add('translate-x-full');
  overlay.classList.add('hidden');
}

const closeOverlay = () => {
  cartModal.classList.remove('translate-x-0');
  cartModal.classList.add('translate-x-full');
  overlay.classList.add('hidden'); // Ocultar el fondo oscuro
};






let currentIndex = 0;
const cardContainer = document.getElementById('card-container');
const cardWidth = 300; // Ancho de cada tarjeta en píxeles
const gapWidth = 20; // Espacio entre tarjetas en píxeles;
const totalCards = 10; // Reemplaza con el número total de tarjetas
const cardsPerPage = 5;

let currentIndexNew = 0;
const totalCardsNew = 10; // Reemplaza con el número total de tarjetas en el nuevo carousel
const cardsPerPageNew = 5;



const nextSlideNew = () => {
  currentIndexNew = Math.min(currentIndexNew + cardsPerPageNew, totalCardsNew - cardsPerPageNew);
  updateButtonsNew();
  updateCarouselNew();
}

const prevSlideNew = () => {
  currentIndexNew = Math.max(currentIndexNew - cardsPerPageNew, 0);
  updateButtonsNew();
  updateCarouselNew();
}

const updateButtonsNew = () => {
  if (btnPrevNew) {
    btnPrevNew.classList.toggle("hidden", currentIndexNew === 0);
  }

  if (btnNextNew) {
    btnNextNew.classList.toggle("hidden", currentIndexNew >= totalCardsNew - cardsPerPageNew);
  }
}

const updateCarouselNew = () => {
  const cardContainerNew = document.getElementById('card-container-new');
  const cardWidthNew = document.querySelector('.cardNew').offsetWidth;
  const totalWidthNew = totalCardsNew * (cardWidthNew + gapWidth);
  const translateValueNew = -currentIndexNew * (cardWidthNew + gapWidth) + 'px';

  cardContainerNew.style.width = totalWidthNew + 'px';
  cardContainerNew.style.transform = 'translateX(' + translateValueNew + ')';
}

let carrito = [];

const agregarAlCarrito = (nombreProducto, precioProducto, imagenProducto, cardId) => {
  const producto = {
    id: imagenProducto,
    nombre: nombreProducto,
    precio: precioProducto,
    imagen: imagenProducto,
    cantidad: 1,
    cardId: cardId,
  };

  const img = new Image();
  img.src = imagenProducto;
  img.onload = () => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad++;
      const btnAgregar = document.getElementById(`btnAgregar${cardId}`);
      btnAgregar.innerHTML = `${productoExistente.cantidad}`;
    } else {
      carrito.push(producto);
      const btnAgregar = document.getElementById(`btnAgregar${cardId}`);
      const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
      btnAgregar.textContent = `1${cantidadTotal < 0 ? cantidadTotal : ''}`;
      
    saveCarritoToLocalStorage();
    actualizarCarrito();
    }

    saveCarritoToLocalStorage();
    actualizarCarrito();
  };
};

const actualizarCarrito = () => {
  const carritoContainer = document.getElementById('cartModal');
  carritoContainer.innerHTML = '';
  const listaCarrito = document.createElement('ul');
  listaCarrito.classList.add('carrito-list');
  let totalCarrito = 0;

  if (carrito.length === 0) {
    const mensajeVacio = document.createElement('p');
    mensajeVacio.textContent = 'El carrito está vacío.';
    mensajeVacio.classList.add('mensajeVacio');
    listaCarrito.appendChild(mensajeVacio);

    const seguirComprando = document.createElement('a');
    seguirComprando.textContent = 'Seguir comprando';
    seguirComprando.classList.add('seguirComprando');
    seguirComprando.href = '#carousel-container';
    listaCarrito.appendChild(seguirComprando);
  } else {
    for (let index = 0; index < Math.min(carrito.length, 9); index++) {
      const producto = carrito[index];
      const itemLista = document.createElement('li');
      itemLista.classList.add('carrito-item');

      const imagenProducto = document.createElement('img');
      imagenProducto.src = producto.imagen;
      imagenProducto.alt = producto.nombre;
      imagenProducto.classList.add('carrito-imagen');
      itemLista.appendChild(imagenProducto);

      const textoProducto = document.createElement('span');
      const precioProducto = producto.precio * producto.cantidad;

      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info-container');

      textoProducto.innerHTML = `
        <div>
          <span class="nombreProducto">${producto.nombre}</span>
        </div>
        <div>
          <button class="restarBoton" onclick="restarCantidad(${index})">-</button>
          <span class="cantidad"> ${producto.cantidad}</span>
          <button class="sumarBoton" onclick="sumarCantidad(${index})">+</button>
          <button class="eliminarBoton" onclick="eliminarProducto(${index})">Eliminar</button>
          <span class="precioProducto">$${precioProducto}</span>
        </div>
      `;

      totalCarrito += precioProducto;
      itemLista.appendChild(textoProducto);
      listaCarrito.appendChild(itemLista);
    };

    const precioTotal = document.createElement('p');
    precioTotal.textContent = `TOTAL: $${totalCarrito}`;
    precioTotal.classList.add('total');
    precioTotal.classList.add('precioTotal');
    listaCarrito.appendChild(precioTotal);

    const showCart = document.createElement('a');
    showCart.textContent = 'Ver carrito';
    showCart.classList.add('showCart');
    listaCarrito.appendChild(showCart);

    const buy = document.createElement('a');
    buy.textContent = 'Comprar';
    buy.classList.add('buy');
    listaCarrito.appendChild(buy);
  }

  carritoContainer.appendChild(listaCarrito);
  saveCarritoToLocalStorage();
};


// Función para restar la cantidad de un producto
const restarCantidad = (index) => {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;

    saveCarritoToLocalStorage();
    actualizarCarrito();
    
  }
};

// Función para sumar la cantidad de un producto
const sumarCantidad = (index) => {
  carrito[index].cantidad++;
  saveCarritoToLocalStorage();
  actualizarCarrito();
 
};

// Función para eliminar un producto del carrito
const eliminarProducto = (index) => {
  carrito.splice(index, 1);
  saveCarritoToLocalStorage();
  actualizarCarrito();
};

document.addEventListener('DOMContentLoaded', function () {
  init(); 
  carrito = getCarritoFromLocalStorage();
  updateCarouselNew();
  updateButtonsNew();
  actualizarCarrito();
  saveCarritoToLocalStorage(); 
});

