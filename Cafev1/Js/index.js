document.querySelector("form").addEventListener("submit", async(e) => {
    e.preventDefault(); // evitamos el comportamiento por defecto, muy importante!

    let contador = 1;

    try {


        const usuario = document.querySelector("#usuario").value;
        const contrasena = document.querySelector("#contrasena").value;

        const requestOptions = {
            method: "POST", // el método de la petición
            headers: {
                // las cabeceras de la petición
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // el cuerpo de la petición (nótese el uso de JSON.stringify)
                client_id: usuario,
                client_secret: contrasena,
                audience: "https://escalab.academy",
                grant_type: "client_credentials"
            }),
            redirect: "follow"
        };

        const response = await fetch(
            "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/oauth/token",
            requestOptions
        );
        const parsed = await response.json();
        const token = parsed.access_token;
        const infoUser = JSON.stringify(atob(token.split('.')[1]));

        localStorage.setItem("at", token);
        localStorage.setItem("infoUser", infoUser);
        location.replace("http://127.0.0.1:5500/Cafev1/html/pedidos.html"); // con esto redireccionamos sin dejar en el historial
    } catch (error) {

        alert("Error al Ingresar");

    }
});


// http://127.0.0.1:5500/Cafev1/html/menuUsuario.html