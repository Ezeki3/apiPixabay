const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = ()=>{
  formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e){
  e.preventDefault();
  
  const terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda.trim() === ''){
    mostrarAlerta("Debes ingresar un término de búsqueda");
    return;
  }
}

function mostrarAlerta(mensaje){
  console.log(mensaje);
}