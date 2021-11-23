//CHECKBOX
import CrearTabla from "./scripts.js";


export function filtroTablaTitulo(data) {
    let cTitulo = document.getElementById("chkTitulo").checked;
    let cTransaccion = document.getElementById("chkTransaccion").checked;
    let cDescripcion = document.getElementById("chkDescripcion").checked;
    let cPrecio = document.getElementById("chkPrecio").checked;
    let cPuertas = document.getElementById("chkPuertas").checked;
    let cKms = document.getElementById("chkKMs").checked;
    let cPotencia = document.getElementById("chkPotencia").checked;

    const sinTitulo = data.map((a) => {

        if(cTitulo == true){
            delete a.titulo;
        }
        if(cTransaccion == true){
            delete a.transaccion;
        }
        if(cDescripcion == true){
            delete a.descripcion;
        }
        if(cPrecio == true){
            delete a.precio;
        }
        if(cPuertas == true){
            delete a.num_puertas;
        }
        if(cKms == true){
            delete a.num_kmh;
        }
        if(cPotencia == true){
            delete a.potencia;
        }
        
        return a
    });
    divTabla.innerHTML = "";
    divTabla.appendChild(CrearTabla(sinTitulo));
    filtroTransaccion(sinTitulo, document.getElementById("transaccionFil").value);
}

export function filtroTransaccion(data, tipo) {
    if (tipo != "Todos" && tipo != "") {
        const vec = data.filter((elemento) => {
            if (elemento.transaccion === tipo) {
                return true;
            }
        });
        divTabla.innerHTML = "";
        divTabla.appendChild(CrearTabla(vec));
    } else {
        divTabla.innerHTML = "";
        divTabla.appendChild(CrearTabla(data));
    }
}
