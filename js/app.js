//Variables
const presupuestoUsuario = prompt('Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



//Clases
//Clase de presupuesto
class Presupuesto {
  //Consstructor
  constructor(presupuesto){
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }

  //Método para ir restando del presupuesto el gasto
  presupuestoRestante(cantidad = 0){
    return this.restante -= Number(cantidad);
  }
}

//Clase interfaz
class Interfaz {
  //Métoddo para insertar presupuesto
  insertarPresupuesto(cantidad){
    const presupuestoSpan = document.querySelector('span#total');
    const restanteSpan = document.querySelector('span#restante');
    
    //Insertar al HTML
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    //se crea el nodo div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    
    //insertar en el DOM
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(() => {
      document.querySelector('.primario .alert').remove();
    }, 2000);
  }
}


//Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  if (presupuestoUsuario === null || presupuestoUsuario === '') {
    window.location.reload();
  } else {
    //instancia el presupuesto
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
    
    //Instanciar la clase interfaz
    const interfaz = new Interfaz();

    interfaz.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener('submit', function(e) {
  e.preventDefault();

  //Leer del formulario de Gastos
  const nombreGasto = document.querySelector('#gasto').value;
  const cantidadGasto = document.querySelector('#cantidad').value;

  //Instanciar la interfaz
  const interfaz = new Interfaz();

  //campos no estén vacios
  if (nombreGasto === '' || cantidadGasto === '') {
    interfaz.imprimirMensaje('Hubo un error', 'error');
    
  } else {
    
  }
})