const UsuariosContainer = document.querySelector(".Usuarios");
const usuarioContainer = document.querySelector('.buttonUsuario');

function mostrarDatos() {
    const datos = JSON.parse(JSON.parse(localStorage.getItem("infoUser")));

    const usuariosContainer = document.createElement("span");
    usuarioContainer.classList.add("usuarioContainer");
    usuarioContainer.textContent = datos.roles + " " + datos.name;

    usuarioContainer.appendChild(usuariosContainer);

}
mostrarDatos();


const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTWFkb25uYSIsInVzZXIiOiJtYWRvbm5hIiwicm9sZXMiOlsiYWRtaW4iXX0.5l4DWWWWhxarAzv9NIiUfoFYiSe6QpmjT2B1SkQjpV4");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};



fetch("https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users", requestOptions)
    .then(response => response.json())
    .then(result => {
        const data = result;


        data.map(function(usuarios) {
            const usuarioImagen = usuarios.img;
            const usuarioName = usuarios.name;
            const usuarioCumple = new Date(usuarios.birthday).toDateString();
            const usuarioEmail = usuarios.email;
            const usuarioPhone = usuarios.phone;
            const usuarioRole = usuarios.roles;
            const id = usuarios.id;


            const cardContainer = document.createElement("div");
            cardContainer.classList.add("cardContainer");

            const cardImage = document.createElement("img");
            cardImage.src = usuarioImagen;
            cardImage.classList.add("cardImage" + id);


            const cardBody = document.createElement("div");
            cardBody.classList.add("cardBody");

            const usuariosName = document.createElement('h1');
            usuariosName.classList.add('cardtitle');
            usuariosName.textContent = usuarioName;

            const usuariosCumples = document.createElement('p');
            usuariosCumples.classList.add('cardtext');
            usuariosCumples.textContent = usuarioCumple;

            const usuariosEmail = document.createElement('p');
            usuariosEmail.classList.add('cardtext');
            usuariosEmail.textContent = usuarioEmail;

            const usuariosPhones = document.createElement('p');
            usuariosPhones.classList.add('cardtext');
            usuariosPhones.textContent = usuarioPhone;

            const usuariosRole = document.createElement('h3');
            usuariosRole.classList.add('cardtext');
            usuariosRole.textContent = "Role: " + usuarioRole;


            cardContainer.appendChild(cardImage);
            cardContainer.appendChild(cardBody);
            cardBody.appendChild(usuariosName);
            cardBody.appendChild(usuariosCumples);
            cardBody.appendChild(usuariosEmail);
            cardBody.appendChild(usuariosPhones);
            cardBody.appendChild(usuariosRole);
            UsuariosContainer.appendChild(cardContainer);

        });

    })
    .catch(error => console.log('error', error));