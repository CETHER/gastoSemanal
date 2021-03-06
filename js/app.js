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
  restarGasto(cantidad = 0){
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

  //Inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad){
    const gastosListado = document.querySelector('#gastos');
    //crear el elemento LI
    const li = document.createElement('li');
    li.className = 'list-gorup-item d-flex justify-content-between align-items-center';
    //Insertar el gasto
    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
    `;
    //insertar al HTML
    gastosListado.appendChild(li);
  }
  //Comprueba el presupuesto restante
  presupuestoRestante(gasto) {
    
    const restante = document.querySelector('span#restante');
    //actualizamos el presupuesto restante
    const cantidadRestante = cantidadPresupuesto.restarGasto(gasto);
    restante.innerHTML = cantidadRestante;
    
    //ejecutar función, dentro de la misma clase
    this.comporbarPresupuesto();
  }

  comporbarPresupuesto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;
    // Comprobar el 25%
    const restante = document.querySelector('.restante');
    if ((presupuestoTotal / 4) > presupuestoRestante) {
      restante.classList.remove('alert-success', 'alert-warning');
      restante.classList.add('alert-danger');
    } else if ((presupuestoTotal/2) > presupuestoRestante){
      restante.classList.remove('alert-success');
      restante.classList.add('alert-warning');
    }
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
    interfaz.imprimirMensaje('Correcto', 'correcto');
    interfaz.agregarGastoListado(nombreGasto, cantidadGasto);
    interfaz.presupuestoRestante(cantidadGasto);
  }
})