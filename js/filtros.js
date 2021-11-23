import { anuncios ,filtroPrecio} from "./scripts.js"
import CrearTabla from "./scripts.js"

var transacciones = [];
let seleccion = 'Todos';

let select = document.getElementById("selectFiltros");

select.addEventListener('change', () => {
    
    filtroPrecio.value = "N/A";
    seleccion = select.options[select.selectedIndex].text;
    console.log(seleccion);
    if (seleccion === 'Todos') {
        filtroPrecio.value = "N/A";
        divTabla.innerHTML = "";
        divTabla.appendChild(CrearTabla(anuncios));
    }else if(seleccion === 'Permuta'){
        var listaFiltrada = anuncios.filter(anuncio => {
            return anuncio.transaccion === seleccion;
        });
        filtroPrecio.value = "N/A";
        divTabla.innerHTML = "";
        divTabla.appendChild(CrearTabla(listaFiltrada));
    }else {
        var listaFiltrada = anuncios.filter(anuncio => {
            return anuncio.transaccion === seleccion;
        });
        divTabla.innerHTML = "";
        divTabla.appendChild(CrearTabla(listaFiltrada));
        filtroPrecio.value = filtrarPrecio(listaFiltrada);
    }
});

export function llenarSeleccionados() {
    var transacciones = Array.from(filtrarTransaccionesUnicas());
    transacciones.forEach(transaccion => {
        var option = document.createElement("option");
        option.text = transaccion;
        option.value = transaccion;
        select.appendChild(option);
    });
}

export function filtrarTransaccionesUnicas() {
    anuncios.forEach(anuncio => {
        transacciones.push(anuncio.transaccion);
    });
    var transaccionesUnicas = new Set(transacciones);
    return transaccionesUnicas;
}

export function filtrarPrecio(lista) {
    if(lista.length > 0){
        let listaPrecios = lista.map(anuncio => anuncio.precio);
        let sumaPrecios = listaPrecios.reduce((prev, actual) => {
            return (parseInt(prev) + parseInt(actual))
        });
        let promedio = sumaPrecios / listaPrecios.length;
        return "$ "+promedio.toFixed(2);
    }
    else{
        return "N/A";
    }

}

