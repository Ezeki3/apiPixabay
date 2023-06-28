const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

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

  buscarImagenes(terminoBusqueda);

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

function buscarImagenes(termino) {

  terminoFormateado = termino.replace(/\s/g, '+');

  const key = '37891925-110b570b9dd1a6baf8eb82541';
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      mostrarImagenes(resultado.hits)
    })
}

function mostrarImagenes(imagenes) {
  console.log(imagenes);

  while (resultado.firstChild) {
    resultado.removeChild(resultado.lastChild);
  }

  // Iterar sobre el arreglo  de imagenes y construimos el html
  imagenes.forEach(imagen => {

    const {previewURL,likes, views, largeImageURL} = imagen;

    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4">
        <img class=" w-full" src="${previewURL}">
      </div>
    `

  });
}