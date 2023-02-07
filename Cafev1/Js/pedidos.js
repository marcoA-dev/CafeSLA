const apiTables = ('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/tables');
const apiUsers = ('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users');
const apiOrder = ('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders');
const apiMenu = ('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/menus');
const dataContainer = document.querySelector('.container');
const usuarioContainer = document.querySelector('.buttonUsuario');
const nombreMesero = document.querySelector('.nombreMesero');
const mesasContainer = document.querySelector('#mesasDisponibles');
const ordenesContainer = document.querySelector('.pedidos');
const infoPedidos = document.querySelector('.infoPedidos');
const nombreMesa = document.querySelector(".numeroMesa");
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};



function permisoUsuario() {

    const datos = JSON.parse(JSON.parse(localStorage.getItem("infoUser")));
    const id = datos.name;


    const usuariosContainer = document.createElement("span");
    usuarioContainer.classList.add("usuarioContainer");
    usuarioContainer.textContent = datos.roles + " " + datos.name;
    usuarioContainer.appendChild(usuariosContainer);

    if (id == 'Madonna') {
        const userAdmin = document.querySelector('#usuario');
        userAdmin.classList.remove('user');
    }



}

permisoUsuario();





const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTWFkb25uYSIsInVzZXIiOiJtYWRvbm5hIiwicm9sZXMiOlsiYWRtaW4iXX0.5l4DWWWWhxarAzv9NIiUfoFYiSe6QpmjT2B1SkQjpV4");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

function fetchOrdenes() {
    fetch(apiOrder, requestOptions)
        .then(response => response.json())
        .then(result => {

            result.map((ordenes) => {
                const orden = ordenes.order;
                const fecha = new Date(ordenes.created_at);
                const idOrden = ordenes.id;
                const table = ordenes.table;
                const waiter = ordenes.waiter;

                const infoContainer = document.createElement("div");
                infoContainer.classList.add("info-container");

                const meseroContainer = document.createElement("div");
                meseroContainer.classList.add("mesero-container");

                const infoMeseroContainer = document.createElement("div");
                infoMeseroContainer.classList.add("info-mesero-container");

                const ordenContainer = document.createElement("div");
                ordenContainer.classList.add("orden-container");


                const ordenId = document.createElement("p");
                ordenId.classList.add("orden-id");
                ordenId.textContent = idOrden;

                const ordenFecha = document.createElement("p");
                ordenFecha.classList.add("orden-fecha");
                ordenFecha.textContent = fecha;

                const ordenTable = document.createElement("p");
                ordenTable.classList.add("orden-table");
                ordenTable.textContent = "Mesa:  " + table;

                const ordenWaiter = document.createElement("p");
                ordenWaiter.classList.add("waiter" + waiter);
                ordenWaiter.textContent = "waiter:  " + waiter;



                infoContainer.appendChild(ordenId);
                infoContainer.appendChild(ordenFecha);
                infoContainer.appendChild(ordenTable);
                infoContainer.appendChild(ordenWaiter);
                infoMeseroContainer.appendChild(infoContainer);
                infoMeseroContainer.appendChild(meseroContainer);
                ordenesContainer.appendChild(infoMeseroContainer);

                // imprimo users para obtener la informacion segun el mesero
                fetch(apiUsers, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        data.map((meseros) => {

                            if (meseros.id === waiter) {

                                const cardContainer = document.createElement('card');
                                cardContainer.classList.add('mesero-container');

                                const cardBody = document.createElement('div');
                                cardBody.classList.add('card-body');


                                const meserosName = document.createElement('h3');
                                meserosName.textContent = meseros.name;

                                const meserosImg = document.createElement('img');
                                meserosImg.classList.add("mesero" + meseros.id);
                                meserosImg.src = meseros.img;

                                cardBody.appendChild(meserosName);
                                cardContainer.appendChild(meserosImg);
                                cardContainer.appendChild(cardBody);
                                meseroContainer.appendChild(cardContainer);

                            }

                        });
                    })
                    .catch(error => console.log('error', error));

                // function map para obtener datos dentro de ordenes
                orden.map((ordenInfo) => {
                    const product = ordenInfo.product;
                    const quantity = ordenInfo.quantity;

                    const cardContainer = document.createElement("card");
                    cardContainer.classList.add("product-card");

                    const productImg = document.createElement("img");
                    productImg.src = product.img;

                    const bodyCard = document.createElement("div");
                    bodyCard.classList.add("product-body");

                    const productContainer = document.createElement("p");
                    productContainer.classList.add("product-container");



                    bodyCard.appendChild(productContainer);
                    cardContainer.appendChild(productImg);
                    cardContainer.appendChild(bodyCard);
                    ordenContainer.appendChild(cardContainer);
                    ordenesContainer.appendChild(ordenContainer);

                    fetch(apiMenu, requestOptions)
                        .then(response => response.json())
                        .then(res => {
                            const entradas = res.entradas;
                            const ensaladas = res.ensaladas;
                            const sandwichs = res.sandwichs;
                            const fondos = res.fondo;
                            const agregados = res.agregados;
                            const postres = res.postres;
                            const jugosBebidas = res['jugos-bebidas'];

                            entradas.map((menu) => {
                                const entradasId = menu.id;
                                const entradasImg = menu.img;

                                if (entradasId === product) {
                                    productContainer.textContent = menu.name + " cantidad:" + quantity;
                                    productImg.classList.add("img" + entradasId);
                                    productImg.src = entradasImg;


                                }
                            });

                            ensaladas.map((menu) => {
                                const ensaladasId = menu.id;
                                const ensaladasImg = menu.img;

                                if (ensaladasId === product) {
                                    productContainer.textContent = menu.name + " cantidad:" + quantity;
                                    productImg.classList.add("img" + ensaladasId);
                                    productImg.src = ensaladasImg;
                                }
                            });

                            sandwichs.map((menu) => {
                                const sandwichsId = menu.id;
                                const sandwichsImg = menu.img;

                                if (sandwichsId === product) {
                                    productContainer.textContent = menu.name + " cantidad:" + quantity;
                                    productImg.classList.add("img" + sandwichsId);
                                    productImg.src = sandwichsImg;
                                }
                            });

                            jugosBebidas.map((menu) => {
                                const jugosBebidasId = menu.id;
                                const jugosBebidasImg = menu.img;

                                if (jugosBebidasId === product) {
                                    productContainer.textContent = menu.name + " cantidad:" + quantity;
                                    productImg.classList.add("img" + jugosBebidasId);
                                    productImg.src = jugosBebidasImg;
                                }
                            });


                        });

                });


            });

        })
        .catch(error => console.log('error', error));


}

fetchOrdenes();




const mesasHeaders = new Headers();
mesasHeaders.append("Accept", "application/json");
mesasHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTWFkb25uYSIsInVzZXIiOiJtYWRvbm5hIiwicm9sZXMiOlsiYWRtaW4iXX0.5l4DWWWWhxarAzv9NIiUfoFYiSe6QpmjT2B1SkQjpV4");

const request = {
    method: 'GET',
    headers: mesasHeaders,
    redirect: 'follow'
};



fetch(apiTables, request)
    .then(response => response.json())
    .then(result => {

        const datos = JSON.parse(JSON.parse(localStorage.getItem("infoUser")));

        const nombreContainer = document.createElement('p');
        nombreContainer.textContent = 'Mesero: ' + datos.name;
        const fechaPedido = document.createElement('date');
        fechaPedido.textContent = new Date().toDateString();

        nombreMesero.appendChild(nombreContainer);
        nombreMesero.appendChild(fechaPedido);

        result.map(function(mesas) {
            const mesasName = mesas.name;
            if (mesas.available === true) {

                const mesaName = document.createElement("option");
                mesaName.textContent = mesasName + " Disponible ";

                mesasContainer.appendChild(mesaName);
            }

        });
    }).catch(error => console.log('error', error));





function fetchMenu() {
    fetch(apiMenu)
        .then(response => response.json())
        .then(result => {
            const entradas = result.entradas;
            const ensaladas = result.ensaladas;
            const sandwichs = result.sandwichs;
            const fondos = result.fondo;
            const agregados = result.agregados;
            const postres = result.postres;
            const jugosBebidas = result['jugos-bebidas'];

            cards.addEventListener('click', e => {
                addCarrito(e);
            });

            items.addEventListener('click', e => {
                btnAccion(e);
            });



            entradas.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });


            ensaladas.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });


            sandwichs.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });

            fondos.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });

            agregados.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });

            postres.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });
            jugosBebidas.forEach(producto => {
                templateCard.querySelector('h5').textContent = producto.name;
                templateCard.querySelector('p').textContent = producto.price;
                templateCard.querySelector('.descrip').textContent = producto.description;
                templateCard.querySelector('img').setAttribute("src", producto.img);
                templateCard.querySelector('.btn-dark').dataset.id = producto.id;

                const clone = templateCard.cloneNode(true);
                fragment.appendChild(clone);
            });
            cards.appendChild(fragment);

            const addCarrito = e => {
                if (e.target.classList.contains('btn-dark')) {
                    setCarrito(e.target.parentElement);
                }
                e.stopPropagation();
            };

            const setCarrito = objeto => {
                const producto = {
                    id: objeto.querySelector('.btn-dark').dataset.id,
                    name: objeto.querySelector('h5').textContent,
                    precio: objeto.querySelector('p').textContent,
                    cantidad: 1
                };
                if (carrito.hasOwnProperty(producto.id)) {
                    producto.cantidad = carrito[producto.id].cantidad + 1;
                }

                carrito[producto.id] = {...producto };
                pintarCarrito();
            };

            const pintarCarrito = () => {
                items.innerHTML = '';
                Object.values(carrito).forEach(producto => {
                    templateCarrito.querySelector("th").textContent = producto.id;
                    templateCarrito.querySelectorAll("td")[0].textContent = producto.name;
                    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
                    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
                    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
                    templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio;

                    const clone = templateCarrito.cloneNode(true);
                    fragment.appendChild(clone);
                });
                items.appendChild(fragment);

                pintarFooter();
            };
            const pintarFooter = () => {
                footer.innerHTML = '';
                if (Object.keys(carrito).length === 0) {
                    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;

                    return;
                }
                const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
                const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
                console.log(nPrecio);

                templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
                templateFooter.querySelector('span').textContent = nPrecio;

                const clone = templateFooter.cloneNode(true);
                fragment.appendChild(clone);
                footer.appendChild(fragment);

                const btnVaciar = document.getElementById('vaciar-carrito');
                btnVaciar.addEventListener('click', () => {
                    carrito = {};
                    pintarCarrito();
                });

            };

            const btnAccion = e => {
                //  Accion de aumentar
                if (e.target.classList.contains('btn-info')) {
                    // console.log(carrito[e.target.dataset.id]);
                    const producto = carrito[e.target.dataset.id];
                    producto.cantidad++;
                    carrito[e.target.dataset.id] = {...producto };
                    pintarCarrito();
                }
                if (e.target.classList.contains('btn-danger')) {
                    const producto = carrito[e.target.dataset.id];
                    producto.cantidad--;
                    if (producto.cantidad === 0) {

                        delete carrito[e.target.dataset.id];
                    }
                    pintarCarrito();
                }
                e.stopPropagation();

            };
        });
}

fetchMenu();