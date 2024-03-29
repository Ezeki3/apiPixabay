const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registroPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
  formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda.trim() === '') {
    mostrarAlerta("Debes ingresar un término de búsqueda");
    return;
  }

  buscarImagenes();

}

function mostrarAlerta(mensaje) {

  const existeAlerta = document.querySelector('.bg-red-100');

  if (!existeAlerta) {
    const alerta = document.createElement('P');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
      'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">${mensaje}</span>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove()
    }, 3000);
  }

}

async function buscarImagenes() {

  const termino = document.querySelector('#termino').value;
  terminoFormateado = termino.replace(/\s/g, '+');

  const key = '37891925-110b570b9dd1a6baf8eb82541';
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPagina}&page=${paginaActual}`;

  Spinner()

  // fetch(url)
  //   .then(respuesta => respuesta.json())
  //   .then(resultado => {
  //     totalPaginas = calcularPaginas(resultado.totalHits);
  //     mostrarImagenes(resultado.hits)
  //   })

  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    totalPaginas = calcularPaginas(resultado.totalHits);
    mostrarImagenes(resultado.hits);

  } catch (error) {
    console.log(error);
  }
}

// Generador que va a registrar la cantidad de elementos segun las paginas
function* crearPaginador(total) {

  for (let i = 1; i <= total; i++) {
    yield i;

  }
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registroPagina));
}

function mostrarImagenes(imagenes) {

  if (imagenes.length === 0) {
    mostrarAlerta('SIN RESULTADOS');
  }

  limpiarHtml(resultado);
  limpiarHtml(paginacionDiv);

  // Iterar sobre el arreglo  de imagenes y construimos el html
  imagenes.forEach(imagen => {

    const { previewURL, likes, views, largeImageURL } = imagen;

    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-1">
        <div class="bg-white">
          <img class=" w-full" src="${previewURL}">

          <div class="p-4 ">
            <p class="font-bold">${likes} <span class="font-light"> Me Gusta</span></p>
            <p class="font-bold">${views} <span class="font-light"> Veces Vista</span></p>

            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded
              mt-5 p-1"
              href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
              Ver Imagen
            </a>
          </div>
        </div>
      </div>
    `

  });

  imprimirPaginador();

}

function limpiarHtml(resultado) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.lastChild);
  }
}

function imprimirPaginador() {
  iterador = crearPaginador(totalPaginas);

  while (true) {
    const { value, done } = iterador.next();
    if (done) {
      return;
    }

    // Caso contrario, genera un boton por cada elemento en el generador
    const boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-3', 'rounded');

    boton.onclick = () => {
      paginaActual = value;

      buscarImagenes();
    }
    paginacionDiv.appendChild(boton);

  }
}


function Spinner() {

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}
