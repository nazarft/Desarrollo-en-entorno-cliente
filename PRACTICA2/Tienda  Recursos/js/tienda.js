
// Contenedor donde inyectamos el html de todas las películas
let movieListContainer = document.querySelector('.movies-list');
// Aquí pintamos el contenido del carrito
const cartListContainer = document.querySelector('.cart-list');
// Creamos el modal del carrito cuando lo pulsamos
let modal = document.getElementById("cart-modal");
let closeModal = document.getElementsByClassName("close")[0];
// Este es el div que contiene el icono del carrito donde le damos click para abrirlo
let carritoDiv = document.querySelector('.carrito-div');
// Este es el selector para ordenar la página
let orderSelector = document.getElementById('order-selector');


let criterios = ["Sin ordenar", "Ascendente", "Descendente"];

// Creo el carrito
let carrito = crearCarrito();

// Pinto la página desde movieListContainer pero primero creo la lista de criterios
creaListaCriterios();
pintarArticulos('sin ordenar');

// Muestro el carrito
carritoDiv.addEventListener('click', () => {
    mostrarCarrito(carrito);
});

function creaListaCriterios() {
    orderSelector.innerHTML = '';
    criterios.forEach(criterio => {
        orderSelector.innerHTML += `
            <option value="${criterio}">${criterio}</option>
        `;
    });
    ordenarPagina();


}
function ordenarPagina() {
    orderSelector.addEventListener('change', () => {
        let selectedOrder = orderSelector.value;
        pintarArticulos(selectedOrder);
    });
}
function pintarArticulos(orden) {


    let articulosOrdenados = [...listaArticulos];
    if (orden === criterios[1]) {
        articulosOrdenados.sort((a, b) => a.precio - b.precio);

    } else if (orden === criterios[2]) {
        articulosOrdenados.sort((a, b) => b.precio - a.precio);
    } else if (orden === criterios[0]) {
        articulosOrdenados;
    }

    movieListContainer.innerHTML = '';


    articulosOrdenados.forEach(articulo => {

        let card = document.createElement('div');
        card.className = 'card';

        let title = document.createElement('h2');
        title.textContent = articulo.nombre;
        card.appendChild(title);

        let img = document.createElement('img');
        img.setAttribute('src', `./images/${articulo.codigo}.jpg`);
        card.appendChild(img);

        let genre = document.createElement('p');
        genre.textContent = articulo.genero;
        card.appendChild(genre);

        let actor = document.createElement('p');
        actor.textContent = articulo.actor;
        card.appendChild(actor);

        let price = document.createElement('p');
        price.textContent = `${articulo.precio} $`;
        card.appendChild(price);

        let button = document.createElement('button');
        button.className = 'add-to-cart-btn';
        button.textContent = 'Add to cart';

        button.addEventListener('click', () => {
            carrito.addToCart(articulo);
        });

        card.appendChild(button);


        movieListContainer.appendChild(card);


    });

}

function crearCarrito() {
    return new Carrito();
}

function mostrarCarrito(carrito) {

    let openCartBtn = document.getElementById("open-cart-btn");

    if (openCartBtn) {
        openCartBtn.onclick = function () {
            cartListContainer.innerHTML = ''; // Limpiar contenido previo
            carrito.getArticulos().forEach(articulo => {
                let itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                <h4>${articulo.nombre}</h4>
                <img class= "cart-item-image" src=./images/${articulo.codigo}.jpg></img>
                <p class = "cart-item-precio">Precio: ${articulo.precio} $</p>
                <p>Cantidad: <span id="cantidad-${articulo.codigo}">${articulo.cantidad}</span></p>
                <button class= "decrementar" style= "background-color: red"id="decrementar-${articulo.codigo}"> - </button>
                <button class= "incrementar" style= "background-color: green" id="incrementar-${articulo.codigo}"> + </button>
    
            `;
                let decrementBtn = itemDiv.querySelector(`#decrementar-${articulo.codigo}`);
                decrementBtn.addEventListener('click', () => {
                    if (articulo.cantidad !== 0) {
                        carrito.modificaUnidades(articulo.codigo, -1);
                    } else {
                        itemDiv.innerHTML = '';
                    }
                    document.querySelector(`#cantidad-${articulo.codigo}`).innerHTML = articulo.cantidad;
                });
                let incrementBtn = itemDiv.querySelector(`#incrementar-${articulo.codigo}`);
                incrementBtn.addEventListener('click', () => {
                    carrito.modificaUnidades(articulo.codigo, 1);
                    document.querySelector(`#cantidad-${articulo.codigo}`).innerHTML = articulo.cantidad;
                });
                // let precioInical = 0;
                // precioUnitario.forEach(precio => {
                //     precio = document.querySelector('.cart-item-precio').value;
                //     precioInical += precio;
                // })
                // console.log(precioInical);
                // let precioUnitario = Array.from(document.querySelectorAll('.cart-item-precio'));
                // const price = precioUnitario.reduce((precioInical, p) => precioInical + p.value, 0);
                // console.log(price)



                cartListContainer.appendChild(itemDiv);



            });

            let endButton = document.createElement('div');
            endButton.className = 'end-button-container';
            endButton.innerHTML = `
                <button class= "end-button" style= "background-color: black; color= #eee"> Finalizar compra</button>
                
                `
            cartListContainer.appendChild(endButton);
            modal.style.display = "block";

            endButton.addEventListener('click', (event) => {
                alert('Su compra se ha realizado correctamente');
                if (alert) {
                    modal.style.display = "none";
                }
                carrito.articulos = [];

            })
        };
    }
}
closeModal.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

