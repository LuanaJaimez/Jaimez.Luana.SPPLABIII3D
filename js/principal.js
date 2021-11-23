let anuncios = [];

window.addEventListener("DOMContentLoaded", () => {

	ObtenerTodos((datos) => {
        anuncios = datos;
        crearArticulo(anuncios);
    });	
});

//GET
const ObtenerTodos = (callback) => {

	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const datos = JSON.parse(xhr.responseText);
                callback(datos);
            } else {
                const statusText = xhr.statusText || "Ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
        } else {
        }
	};
	xhr.open("GET", "http://localhost:3000/anuncios");
	xhr.send();
};


const crearArticulo = (data) => {

	const div = document.getElementById("divArticulos");
    data.forEach(element => {

		const div1 = "<div class='row'>";
		const div2 = "<div class='colArt' style='width: 80%; margin: auto auto;'>";
		const div3 = "<div class='card bg-light' style='width: 15px;'>"
		const div4 = " <div class='bodyArt'>"

		const titulo = "<p class='card-title'>" + element.titulo + "</p>" + "<i class='fas fa-car-side'></i>";
		const descripcion = "<p class='card-text'>" + element.descripcion + "</p>";
        const precio = "<p>Precio: " + element.precio + "$</p>";
		const puertas = "<p><i class='fas fa-door-open' aria-hidden='true'></i> Puertas: " + element.num_puertas + "</p>";
		const km = "<p> <i class='fa fa-tachometer' aria-hidden='true'></i>Km: " + element.num_kmh + "</p>";
		const potencia = "<p>  <i class='fas fa-bolt' aria-hidden='true'></i>Potencia: " + element.potencia + "</p>";
		const cerrarDiv = "</div></div></div></div>";
        
		div.innerHTML += div1 + div2 + div3 + div4 + titulo + descripcion + precio + puertas + km + potencia + cerrarDiv;
    });
	return div;
}
