const bienvenido = document.getElementById('bienvenido');
const logo = document.getElementById('logo');
const movimientoSaldo = document.getElementById('movimientoSaldo');
const consultarSaldo = document.getElementById('consultarSaldo');
const ingresarSaldo = document.getElementById('ingresarSaldo');
const retirarSaldo = document.getElementById('retirarSaldo');
const btnConfirmar = document.getElementById('btnConfirmar');
const alertaInfo = document.getElementById('alertaInfo');
const numcantidad = document.getElementById('numcantidad');

var tipoOperacion = '';

logo.addEventListener('click', (e) => {
  localStorage.removeItem('saldo');
  localStorage.removeItem('id');
  localStorage.removeItem('nombre');
  localStorage.removeItem('cuentas');
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
    alertaInfo.append(wrapper);

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
    console.log(numcantidad.value);
    if(numcantidad.value == ""){
      const wrappererror = document.createElement('div')
          wrappererror.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>Favor de ingresar una cantidad</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaInfo.append(wrappererror);
    }
    else if(numcantidad.value < 1){
      const wrappererror = document.createElement('div')
          wrappererror.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>Debe ingresar una cantidad mayor a 0</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaInfo.append(wrappererror);
    }
    else{
      validarSaldo(tipoOperacion);
    }
    
  });
}


function validarSaldo(){
  let nuevoSaldo = 0;
  let saldo = localStorage.getItem('saldo');

      console.log(numcantidad.value);
      if(tipoOperacion == 'I'){
        nuevoSaldo = parseInt(saldo) + parseInt(numcantidad.value);
        if(nuevoSaldo > 990){
          const wrappererror = document.createElement('div')
          wrappererror.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>No se pueden ingresar $${numcantidad.value} porque da un total de $${nuevoSaldo} <br>
                El saldo en la cuenta no debe ser mayor a $990</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaInfo.append(wrappererror);
        }
        else{
          localStorage.setItem('saldo',nuevoSaldo);

          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-success alert-dismissible" role="alert">`,
            `   Se ingresaron correctamente $${numcantidad.value}, su nuevo saldo es de $${nuevoSaldo}`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaInfo.append(wrapper);
        } 
      }
      else{
        nuevoSaldo = parseInt(saldo) - parseInt(numcantidad.value);
        if(nuevoSaldo < 10){
          const wrappererror = document.createElement('div')
          wrappererror.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>No se pueden retirar $${numcantidad.value} porque da un total de $${nuevoSaldo} <br>
                El saldo en la cuenta no debe ser menor a $10</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaInfo.append(wrappererror);
        }
        else{
          localStorage.setItem('saldo',nuevoSaldo);

          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-success alert-dismissible" role="alert">`,
            `   Se retiraron correctamente $${numcantidad.value}, su nuevo saldo es de $${nuevoSaldo}`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaInfo.append(wrapper);
        } 
      }
      
  numcantidad.value ='';
}


