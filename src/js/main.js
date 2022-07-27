const bienvenido = document.getElementById('bienvenido');
const logo = document.getElementById('logo');
const movimientoSaldo = document.getElementById('movimientoSaldo');
const consultarSaldo = document.getElementById('consultarSaldo');
const ingresarSaldo = document.getElementById('ingresarSaldo');
const retirarSaldo = document.getElementById('retirarSaldo');
const btnConfirmar = document.getElementById('btnConfirmar');
const alertInfo = document.getElementById('alertInfo');
const numcantidad = document.getElementById('numcantidad');

var tipoOperacion = '';

logo.addEventListener('click', (e) => {
  window.location="../../index.html"; 
});

if(consultarSaldo){
  consultarSaldo.addEventListener('click', (e) => {
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;
    movimientoSaldo.style.opacity = 0;

    let saldo = localStorage.getItem('saldo');
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-info alert-dismissible" role="alert">`,
      `   <div>Tu saldo es de ${saldo} pesos. </div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    alertInfo.append(wrapper);

  });
}

if(ingresarSaldo){
  ingresarSaldo.addEventListener('click', (e) => {
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;
    movimientoSaldo.style.opacity = 1;
    tipoOperacion = 'I';
    
  });
}

if(retirarSaldo){
  retirarSaldo.addEventListener('click', (e) => {
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;
    movimientoSaldo.style.opacity = 1;
    tipoOperacion = 'R';
  });
}

if(btnConfirmar){
  btnConfirmar.addEventListener('click', (e) => {
    e.preventDefault();
    validarSaldo(tipoOperacion);
  });
}


function validarSaldo(){
  let nuevoSaldo = 0;
  var cuentas = localStorage.getItem('cuentas');
  var arrCuentas =  JSON.parse(cuentas);
  console.log(arrCuentas);
  //debugger;
  arrCuentas.forEach(element => {
    if(element.id == localStorage.getItem('id')){
     // debugger;
      console.log(numcantidad.value);
      if(tipoOperacion == 'I'){
        nuevoSaldo = parseInt(element.saldo) + parseInt(numcantidad.value);
        if(nuevoSaldo > 990){
          const wrappererror = document.createElement('div')
          wrappererror.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>No se pueden ingresar $${numcantidad.value} porque da un total de $${nuevoSaldo} <br>
                El saldo en la cuenta no debe ser mayor a $990</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertInfo.append(wrappererror);
        }
        else{
          element.saldo = nuevoSaldo;
          console.log(arrCuentas);
          //localStorage.setItem('cuentas',arrCuentas);

          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-success alert-dismissible" role="alert">`,
            `   Se ingresaron correctamente $${numcantidad.value}, su nuevo saldo es de $${nuevoSaldo}`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertInfo.append(wrapper);
        } 
      }
      else{
        nuevoSaldo = parseInt(element.saldo) - parseInt(numcantidad.value);
        if(nuevoSaldo < 10){
          const wrappererror = document.createElement('div')
          wrappererror.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>No se pueden retirar $${numcantidad.value} porque da un total de $${nuevoSaldo} <br>
                El saldo en la cuenta no debe ser menor a $10</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertInfo.append(wrappererror);
        }
        else{
          element.saldo = nuevoSaldo;
          console.log(arrCuentas);
          //localStorage.setItem('cuentas',arrCuentas);

          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-success alert-dismissible" role="alert">`,
            `   Se retiraron correctamente $${numcantidad.value}, su nuevo saldo es de $${nuevoSaldo}`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertInfo.append(wrapper);
        } 
      }
      
    }
  });
  numcantidad.value ='';
}


