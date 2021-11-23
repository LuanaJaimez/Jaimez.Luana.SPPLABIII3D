export const crearArticulo = (data)=>{

    const $divArticulos  = document.getElementById("divArticulos");

    data.forEach((element, index) => {
        
        const $articulo = document.createElement("article");
        $articulo.classList.add("articulo");

        const $titulo = document.createElement("h3");
        $titulo.classList.add("texto");
        $titulo.textContent = element.titulo;
        $articulo.appendChild($titulo);

        const $descripcion = document.createElement("p");
        $descripcion.classList.add("texto");
        $descripcion.textContent = element.descripcion;
        $articulo.appendChild($descripcion);

        const $precio = document.createElement("p");
        $precio.classList.add("precio");
        $precio.textContent = "$" + element.precio;
        $articulo.appendChild($precio);

        const $ul = document.createElement("ul");
        const $liP = document.createElement("li");
        const $imgP = document.createElement("img");
        $imgP.setAttribute("src", "./img/puertas.png");
        $imgP.setAttribute("width", "20px");
        $imgP.setAttribute("alt", "num_puertas");
        $imgP.classList.add("iconos");
        $liP.appendChild($imgP);

        const $span1 = document.createElement("span");
        $span1.classList.add("iconos");
        $span1.textContent = element.num_puertas;
        $liP.appendChild($span1);
        $ul.appendChild($liP);

        const $liK = document.createElement("li");
        const $imgK = document.createElement("img");
        $imgK.setAttribute("src", "./img/kms.png");
        $imgK.setAttribute("width", "20px");
        $imgK.setAttribute("alt", "num_kmh");
        $imgK.classList.add("iconos");
        $liK.appendChild($imgK);

        const $span2 = document.createElement("span");
        $span2.classList.add("iconos");
        $span2.textContent = element.num_kmh;
        $liK.appendChild($span2);
        $ul.appendChild($liK);

        const $liPo = document.createElement("li");
        const $imgPo = document.createElement("img");
        $imgPo.setAttribute("src", "./img/potencia.png");
        $imgPo.setAttribute("width", "20px");
        $imgPo.setAttribute("alt", "potencia");
        $imgPo.classList.add("iconos");
        $liPo.appendChild($imgPo);

        const $span3 = document.createElement("span");
        $span3.classList.add("iconos");
        $span3.textContent = element.potencia;
        $liPo.appendChild($span3);
        $ul.appendChild($liPo);

        $articulo.appendChild($ul);

        $divArticulos.appendChild($articulo);

    });
}