import AnuncioAuto from "./anuncio.js";
import {llenarSeleccionados } from "./filtros.js";
import { filtroTablaTitulo } from "./checkbox.js";
import { filtroTransaccion } from "./checkbox.js";

export let filtroPrecio = document.getElementById("promedio");
export let anuncios = [];
let idSeleccionado = "";

window.addEventListener("DOMContentLoaded", () => {

  LimpiarFormulario(document.forms[0]);

  TraerTodoFetch();

  document.forms[0].addEventListener("submit", handlerSubmit);

  document.addEventListener("click", handlerClick);

  llenarSeleccionados();

  filtroPrecio.value = "N/A";

  document.getElementById("transaccionFil").addEventListener('change', filtro1);

  document.getElementById("chkTitulo").addEventListener('change', chkCheckbox);
  document.getElementById("chkTransaccion").addEventListener('change', chkCheckbox);
  document.getElementById("chkDescripcion").addEventListener('change', chkCheckbox);
  document.getElementById("chkPrecio").addEventListener('change', chkCheckbox);
  document.getElementById("chkPuertas").addEventListener('change', chkCheckbox);
  document.getElementById("chkKMs").addEventListener('change', chkCheckbox);
  document.getElementById("chkPotencia").addEventListener('change', chkCheckbox);
});

function chkCheckbox(e){
  if(anuncios === undefined){
      document.getElementById("chkTitulo").checked = false;
      document.getElementById("chkTransaccion").checked = false;
      document.getElementById("chkDescripcion").checked = false;
      document.getElementById("chkPrecio").checked = false;
      document.getElementById("chkPuertas").checked = false;
      document.getElementById("chkKMs").checked = false;
      document.getElementById("chkPotencia").checked = false;
  }else{
      console.log("filtrado =>",anuncios);
      let stringAux = JSON.stringify(anuncios);
      let copia = JSON.parse(stringAux);
      filtroTablaTitulo(copia);
  }

}

function filtro1() {
  if(anuncios === undefined){
      document.getElementById("transaccionFil").value ="";
  }else{
      var tipo = document.getElementById("transaccionFil").value;
      if(anuncios!= "" && tipo != ""){
          filtroTransaccion(anuncios , tipo);
      }
  }
}

function handlerLoadList(e){
  RenderizarLista(CrearTabla(anuncios), document.getElementById("divTabla"));
}

function RenderizarLista(lista, contenedor){

  while (contenedor.hasChildNodes()){
    contenedor.removeChild(contenedor.firstChild);
  }

  if (lista) {
    contenedor.appendChild(lista);
  }
}

export default function CrearTabla(items){

  const Tabla = document.createElement("table");

  Tabla.append(CrearThead(items[0]));

  Tabla.appendChild(CrearTbody(items));

  return Tabla;
}

function CrearThead(item){
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for(const key in item){
      if (key !== "id"){
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);  
      }    
  }
  thead.appendChild(tr);
  return thead;
}

function CrearTbody(items){
  const tbody = document.createElement("tbody");
  items.forEach(item=>{
      const tr = document.createElement("tr");
      
      for(const key in item){
          if (key == "id"){
              tr.setAttribute("data-id",item[key]);
          }else{
              const td = document.createElement("td");
              td.textContent = item[key];
              tr.appendChild(td);
          }
      }
      tbody.appendChild(tr);
  });
  return tbody;
}

function handlerClick(e){

  if(e.target.matches("td")){
    let id = e.target.parentNode.dataset.id;
    idSeleccionado = id;
    console.log("ID del auto seleccionado: " + id);
    CargarFormulario(idSeleccionado);
    
  }else if (e.target.matches("#btnEliminar")){
      let id = document.forms[0].id.value;

      if (confirm("Esta seguro de querer eliminar?")){
          AgregarSpinner();
          setTimeout(()=>{
              EliminarFetch(id);
            
              EliminarSpinner();
          },2000);
          
      }
      LimpiarFormulario(document.forms[0]);
  }
}

function handlerSubmit(e) {
  e.preventDefault();
  let frm = e.target;

  if(document.getElementById("btnSubmit").value == "Modificar"){
    const anuncioEditado = new AnuncioAuto(
        parseInt(frm.id.value),
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.num_puertas.value,
        frm.num_kmh.value,
        frm.potencia.value

    );
    
    if (confirm("Esta seguro de querer modificar?")){
        AgregarSpinner();
        setTimeout(()=>{
            ModificarAjax(anuncioEditado);
            EliminarSpinner();
        },2000);
    }

}else if(document.getElementById("btnSubmit").value = "Guardar"){

    console.log("Generando peticion");

    const nuevoAnuncio = new AnuncioAuto(
        Date.now(),
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.num_puertas.value,
        frm.num_kmh.value,
        frm.potencia.value
    );

        AgregarSpinner();
        setTimeout(()=>{
            AltaAjax(nuevoAnuncio);
            EliminarSpinner();
        },2000);

    }
    LimpiarFormulario(e.target);
}

function AgregarSpinner(){
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./img/spinner.gif");
  spinner.setAttribute("alt", "Imagen spinner");
  document.getElementById("spinner-container").appendChild(spinner);
}

function EliminarSpinner(){
  document.getElementById("spinner-container").innerHTML="";
}

function CargarFormulario(id){

  let Anuncio = null;

  const frm = document.forms[0];
  
  Anuncio = anuncios.filter(p => p.id == id)[0];

  frm.id.value = Anuncio.id;
  frm.titulo.value= Anuncio.titulo;
  frm.transaccion.value= Anuncio.transaccion;
  frm.descripcion.value= Anuncio.descripcion;
  frm.precio.value= Anuncio.precio;
  frm.num_puertas.value= Anuncio.num_puertas;
  frm.num_kmh.value= Anuncio.num_kmh;
  frm.potencia.value= Anuncio.potencia;

  document.getElementById("btnSubmit").value = "Modificar";
  document.getElementById("btnEliminar").classList.remove("oculto");
}

function LimpiarFormulario(frm){
  frm.reset();
  document.getElementById("btnEliminar").classList.add("oculto");
  document.getElementById("btnSubmit").value = "Guardar";

  document.forms[0].id.value = "" ;
}

//GET
export function TraerTodoAjax() {
  AgregarSpinner();

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        anuncios = JSON.parse(xhr.responseText);
        console.log(anuncios);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";

        console.error(`Error: ${xhr.status} : ${statusText}`);
      }

      EliminarSpinner();
      let Promedio = document.querySelector("#promedio");
      let sum = anuncios.reduce(function (total, currentValue) {
        return total + parseInt(currentValue.precio, 10);
      }, 0);
      Promedio.value = sum / anuncios.length;

      if (anuncios.length > 0) {
        handlerLoadList(anuncios);
      }
    }
  };
  xhr.open("GET", "http://localhost:3000/anuncios");
  xhr.send();
}

function TraerTodoFetch() {
  AgregarSpinner();
  fetch("http://localhost:3000/anuncios")
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data) => {
      anuncios = data;
      if (anuncios.length > 0) {
        handlerLoadList(anuncios);
      }
      console.log(anuncios);
    })
    .catch((err) => {
      console.error(`Error: ${err.status} : ${err.statusText}`);
    })
    .finally(() => {
      EliminarSpinner();
    });
}

//POST
function AltaAjax(nuevoAnuncio) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        anuncios = JSON.parse(xhr.responseText);
        anuncios.push(nuevoAnuncio);
        if (anuncios.length > 0) {
          handlerLoadList(anuncios);
        }
        console.log(anuncios);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
    }
  };
  xhr.open("POST", "http://localhost:3000/anuncios", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(nuevoAnuncio));
}

//PUT
function ModificarAjax(AnuncioEditado) {
  let id = AnuncioEditado.id;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        anuncios = JSON.parse(xhr.responseText);
        console.log(anuncios);
        anuncios.splice(index, 1, AnuncioEditado);

        handlerLoadList(anuncios);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
      EliminarSpinner();
    }
  };

  xhr.open("PUT", `http://localhost:3000/anuncios/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(AnuncioEditado));
}

//DELETE
function EliminarAjax(id) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        anuncios = JSON.parse(xhr.responseText);
        console.log(anuncios);
        handlerLoadList();
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }

      EliminarSpinner();
    }
  };

  xhr.open("DELETE", `http://localhost:3000/anuncios/${id}`);
  xhr.send();
}

function EliminarFetch(id) {
  fetch(`http://localhost:3000/anuncios/${id}`, { method: "DELETE" })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data) => {
      anuncios = data;
      handlerLoadList();
      console.log(anuncios);
    })
    .catch((err) => {
      console.error(`Error: ${err.status} : ${err.statusText}`);
    })
    .finally(() => {
      EliminarSpinner();
    });
}