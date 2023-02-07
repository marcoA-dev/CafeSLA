const entradasContainer = document.querySelector('.entradas');
const ensaladasContainer = document.querySelector('.ensaladas');
const sandwichsContainer = document.querySelector('.sandwichs');
const fondosContainer = document.querySelector('.fondos');
const agregadosContainer = document.querySelector('.agregados');
const postresContainer = document.querySelector('.postres');
const jugosBebidasContainer = document.querySelector('.jugos-bebidas');
const verMasEntradas = document.querySelector('#verMasEntradas');
const verMasEnsaladas = document.querySelector("#verMasEnsaladas");
const verMasSandwichs = document.querySelector("#verMasSandwichs");
const verMasFondos = document.querySelector("#verMasFondos");
const verMasAgregados = document.querySelector("#verMasAgregados");
const verMasPostres = document.querySelector("#verMasPostres");
const verMasJugosBebidas = document.querySelector("#verMasJugosBebidas");
const usuarioContainer = document.querySelector('.buttonUsuario');
const ocultar = "Ocultar";
const mostrar = "Mostrar";
const apiUrl = (`https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/menus`);

function mostrarDatos() {
    const datos = JSON.parse(JSON.parse(localStorage.getItem("infoUser")));
    const id = datos.id;
    console.log(id);


    const usuariosContainer = document.createElement("span");
    usuarioContainer.classList.add("usuarioContainer");
    usuarioContainer.textContent = datos.roles + " " + datos.name;
    usuarioContainer.appendChild(usuariosContainer);

    if (id == '1') {
        const userAdmin = document.querySelector('#usuario');
        userAdmin.classList.remove('user');
    }


}
mostrarDatos();


// uso de FETCH para obtener datos desde la API

function fetchMenu() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            // Creacion de constantes desde la data obtenida por fetch
            const menu = data;
            const entradas = menu.entradas;
            const ensaladas = menu.ensaladas;
            const sandwichs = menu.sandwichs;
            const fondos = menu.fondo;
            const agregados = menu.agregados;
            const postres = menu.postres;
            const jugosBebidas = menu['jugos-bebidas'];

            // Funcion para Mapar los array obteniendo cada dato dentro de los objetos

            entradas.map(function(entradas) {
                const entradaImagen = entradas.img;
                const entradaName = entradas.name;
                const entradaPrice = entradas.price;
                const entradaDescripcion = entradas.description;
                const id = entradas.id;

                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);


                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = entradaImagen;
                imagenCard.classList.add('cardimg');

                const entradasName = document.createElement('h1');
                entradasName.classList.add('cardtitle');
                entradasName.textContent = entradaName;

                const entradasDescrip = document.createElement('p');
                entradasDescrip.classList.add('cardtext');
                entradasDescrip.textContent = entradaDescripcion;

                const entradasPrice = document.createElement('p');
                entradasPrice.classList.add('cardPrice');
                entradasPrice.textContent = entradaPrice;



                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                bodyCard.appendChild(entradasName);
                bodyCard.appendChild(entradasDescrip);
                bodyCard.appendChild(entradasPrice);
                entradasContainer.appendChild(cardContainer);
                entradasContainer.appendChild(verMasEntradas);
            });

            // FUNCION PARA QUITAR Y ANADIR CLASE SEGUN CLICK EN BOTON


            const card2 = document.querySelector('.card2');
            verMasEntradas.addEventListener('click', function() {
                if (card2.classList.contains('card2')) {
                    card2.classList.remove('card2');
                    verMasEntradas.innerHTML = ocultar;
                } else {
                    card2.classList.add('card2');
                    verMasEntradas.innerHTML = mostrar;
                }
            });

            // ENSALADAS.


            ensaladas.map(function(ensaladas) {
                const ensaladaName = ensaladas.name;
                const ensaladaImagen = ensaladas.img;
                const ensaladaPrice = ensaladas.price;
                const ensaladaDescripcion = ensaladas.description;
                const id = ensaladas.id;


                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);

                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = ensaladaImagen;
                imagenCard.classList.add('cardimg');

                const ensaladasName = document.createElement('h1');
                ensaladasName.classList.add('cardtitle');
                ensaladasName.textContent = ensaladaName;

                const ensaladasDescrip = document.createElement('p');
                ensaladasDescrip.classList.add('cardtext');
                ensaladasDescrip.textContent = ensaladaDescripcion;

                const ensaladasPrice = document.createElement('p');
                ensaladasPrice.classList.add('cardtext');
                ensaladasPrice.textContent = ensaladaPrice;


                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                bodyCard.appendChild(ensaladasName);
                bodyCard.appendChild(ensaladasDescrip);
                bodyCard.appendChild(ensaladasPrice);
                ensaladasContainer.appendChild(cardContainer);
                ensaladasContainer.appendChild(verMasEnsaladas);
            });

            const card6 = document.querySelector('.card6');
            verMasEnsaladas.addEventListener('click', function() {
                if (card6.classList.contains('card6')) {
                    card6.classList.remove('card6');
                    verMasEnsaladas.innerHTML = ocultar;
                } else {
                    card6.classList.add('card6');
                    verMasEnsaladas.innerHTML = mostrar;
                }
            });

            // FIN ENSALADAS
            // INICIO SANDWICHS

            sandwichs.map(function(sandwichs) {
                const sandwichName = sandwichs.name;
                const sandwichImagen = sandwichs.img;
                const sandwichPrice = sandwichs.price;
                const sandwichDescripcion = sandwichs.description;
                const id = sandwichs.id;


                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);

                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = sandwichImagen;
                imagenCard.classList.add('cardimg');

                const sandwichsName = document.createElement('h1');
                sandwichsName.classList.add('cardtitle');
                sandwichsName.textContent = sandwichName;

                const sandwichsDescrip = document.createElement('p');
                sandwichsDescrip.classList.add('cardtext');
                sandwichsDescrip.textContent = sandwichDescripcion;

                const sandwichsPrice = document.createElement('p');
                sandwichsPrice.classList.add('cardtext');
                sandwichsPrice.textContent = sandwichPrice;


                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                bodyCard.appendChild(sandwichsName);
                bodyCard.appendChild(sandwichsDescrip);
                bodyCard.appendChild(sandwichsPrice);
                sandwichsContainer.appendChild(cardContainer);
                sandwichsContainer.appendChild(verMasSandwichs);
            });

            const card10 = document.querySelector('.card10');
            verMasSandwichs.addEventListener('click', function() {
                if (card10.classList.contains('card10')) {
                    card10.classList.remove('card10');
                    verMasSandwichs.innerHTML = ocultar;
                } else {
                    card10.classList.add('card10');
                    verMasSandwichs.innerHTML = mostrar;
                }
            });


            // FIN SANDWICHS
            // INICIO FONDOS

            fondos.map(function(fondos) {
                const fondoName = fondos.name;
                const fondoImagen = fondos.img;
                const fondoPrice = fondos.price;
                const fondoDescripcion = fondos.description;
                const id = fondos.id;


                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);

                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = fondoImagen;
                imagenCard.classList.add('cardimg');

                const fondosName = document.createElement('h1');
                fondosName.classList.add('cardtitle');
                fondosName.textContent = fondoName;

                const fondosDescrip = document.createElement('p');
                fondosDescrip.classList.add('cardtext');
                fondosDescrip.textContent = fondoDescripcion;

                const fondosPrice = document.createElement('p');
                fondosPrice.classList.add('cardtext');
                fondosPrice.textContent = fondoPrice;


                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                bodyCard.appendChild(fondosName);
                bodyCard.appendChild(fondosDescrip);
                bodyCard.appendChild(fondosPrice);
                fondosContainer.appendChild(cardContainer);
                fondosContainer.appendChild(verMasFondos);
            });

            const card14 = document.querySelector('.card14');
            const card15 = document.querySelector('.card15');
            const card16 = document.querySelector('.card16');
            const card17 = document.querySelector('.card17');
            verMasFondos.addEventListener('click', function() {
                if (card14.classList.contains('card14') && card15.classList.contains('card15') && card16.classList.contains('card16') && card17.classList.contains('card17')) {
                    card14.classList.remove('card14');
                    card15.classList.remove('card15');
                    card16.classList.remove('card16');
                    card17.classList.remove('card17');
                    verMasFondos.innerHTML = ocultar;
                } else {
                    card14.classList.add('card14');
                    card15.classList.add('card15');
                    card16.classList.add('card16');
                    card17.classList.add('card17');
                    verMasFondos.innerHTML = mostrar;
                }
            });

            // FIN FONDOS
            // INICIO AGREGADOS

            agregados.map(function(agregados) {

                const agregadoImage = agregados.img;
                const agregadoName = agregados.name;
                const agregadoPrice = agregados.price;
                const agregadoDescrip = agregados.description;
                const id = agregados.id;

                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);

                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = agregadoImage;
                imagenCard.classList.add('cardimg');

                const agregadosName = document.createElement('h1');
                agregadosName.classList.add('cardtitle');
                agregadosName.textContent = agregadoName;

                const agregadosDescrip = document.createElement('p');
                agregadosDescrip.classList.add('cardtext');
                agregadosDescrip.textContent = agregadoDescrip;

                const agregadosPrice = document.createElement('p');
                agregadosPrice.classList.add('cardtext');
                agregadosPrice.textContent = agregadoPrice;


                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                bodyCard.appendChild(agregadosName);
                bodyCard.appendChild(agregadosDescrip);
                bodyCard.appendChild(agregadosPrice);
                agregadosContainer.appendChild(cardContainer);
                agregadosContainer.appendChild(verMasAgregados);

            });

            const card21 = document.querySelector('.card21');
            const card22 = document.querySelector('.card22');
            verMasAgregados.addEventListener('click', function() {
                if (card21.classList.contains('card21') && card22.classList.contains('card22')) {
                    card21.classList.remove('card21');
                    card22.classList.remove('card22');
                    verMasAgregados.innerHTML = ocultar;
                } else {
                    card21.classList.add('card21');
                    card22.classList.add('card22');
                    verMasAgregados.innerHTML = mostrar;
                }
            });

            // FIN AGREGADOS
            // INICIO POSTRES

            postres.map(function(postres) {

                const postreImage = postres.img;
                const postreName = postres.name;
                const postrePrice = postres.price;
                const postreDescrip = postres.description;
                const id = postres.id;


                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);

                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = postreImage;
                imagenCard.classList.add('cardimg');

                const postresName = document.createElement('h1');
                postresName.classList.add('cardtitle');
                postresName.textContent = postreName;

                const postresDescrip = document.createElement('p');
                postresDescrip.classList.add('cardtext');
                postresDescrip.textContent = postreDescrip;

                const postresPrice = document.createElement('p');
                postresPrice.classList.add('cardtext');
                postresPrice.textContent = postrePrice;

                bodyCard.appendChild(postresName);
                bodyCard.appendChild(postresDescrip);
                bodyCard.appendChild(postresPrice);
                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                postresContainer.appendChild(cardContainer);
                postresContainer.appendChild(verMasPostres);

            });

            const card26 = document.querySelector('.card26');
            verMasPostres.addEventListener('click', function() {
                if (card26.classList.contains('card26')) {
                    card26.classList.remove('card26');
                    verMasPostres.innerHTML = ocultar;
                } else {
                    card26.classList.add('card26');
                    verMasPostres.innerHTML = mostrar;
                }
            });

            // FIN POSTRES
            // INICIO JUGOS Y BEBIDAS

            jugosBebidas.map(function(jugosBebidas) {

                const jugosBebidaImagen = jugosBebidas.img;
                const jugosBebidaName = jugosBebidas.name;
                const jugosBebidaPrice = jugosBebidas.price;
                const jugosBebidaDescrip = jugosBebidas.description;
                const id = jugosBebidas.id;

                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');
                cardContainer.classList.add("card" + id);

                const bodyCard = document.createElement('div');
                bodyCard.classList.add('cardbody');

                const imagenCard = document.createElement('img');
                imagenCard.src = jugosBebidaImagen;
                imagenCard.classList.add('cardimg');

                const jugosBebidasName = document.createElement('h1');
                jugosBebidasName.classList.add('cardtitle');
                jugosBebidasName.textContent = jugosBebidaName;

                const jugosBebidasDescrip = document.createElement('p');
                jugosBebidasDescrip.classList.add('cardtext');
                jugosBebidasDescrip.textContent = jugosBebidaDescrip;

                const jugosBebidasPrice = document.createElement('p');
                jugosBebidasPrice.classList.add('cardtext');
                jugosBebidasPrice.textContent = jugosBebidaPrice;


                cardContainer.appendChild(imagenCard);
                cardContainer.appendChild(bodyCard);
                bodyCard.appendChild(jugosBebidasName);
                bodyCard.appendChild(jugosBebidasDescrip);
                bodyCard.appendChild(jugosBebidasPrice);
                jugosBebidasContainer.appendChild(cardContainer);
                jugosBebidasContainer.appendChild(verMasJugosBebidas);

            });

            const card30 = document.querySelector('.card30');
            verMasJugosBebidas.addEventListener('click', function() {
                if (card30.classList.contains('card30')) {
                    card30.classList.remove('card30');
                    verMasJugosBebidas.innerHTML = ocultar;
                } else {
                    card30.classList.add('card30');
                    verMasJugosBebidas.innerHTML = mostrar;
                }
            });
            // FIN JUGOS Y BEBIDAS

        });
}

fetchMenu();