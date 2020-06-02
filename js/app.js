//Variables
const presupuestoUsuario = prompt('Cuál es tu presupuesto semanal?');
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
