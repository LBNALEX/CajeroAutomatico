var cuentas = [
  { id:1,nombre: 'Mali', clave: 'MalimarAu', saldo: 200 },
  { id:2,nombre: 'Gera', clave: 'GerardoOrtiz', saldo: 290 },
  { id:3,nombre: 'Maui', clave: 'Mauiwi', saldo: 67 }
];

 var jsonUsiarios = JSON.stringify(cuentas)
 localStorage.setItem('cuentas',jsonUsiarios  );

const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const btnIniciar = document.getElementById('btnIniciar');
const bienvenido = document.getElementById('bienvenido');
const logo = document.getElementById('logo');
const alertaEspacio = document.getElementById('liveAlertPlaceholder');

var usuarioCuenta = '';
var usuarioSeleccionado = '';

logo.addEventListener('click', (e) => {
  window.location="../../index.html"; 
});

if(usuario)
{
  usuario.addEventListener('change',(e) => {
    usuarioSeleccionado = usuario.selectedIndex;
      let nombre = usuario.options[usuarioSeleccionado].text; 
      bienvenido.innerHTML = `Bienvenido ${nombre}`;
    });
}

if(btnIniciar){
  btnIniciar.addEventListener('click', (e) => {
    validarContra();
  });
}
if(password){
  password.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      validarContra();
    }
  });
}

function validarContra(){
  if(password.value == "")
  {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `   <div>Favor de ingresar una contraseña</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    alertaEspacio.append(wrapper);
  }
  else{
    var allUsers = localStorage.getItem('cuentas');
    var arrUsers =  JSON.parse(allUsers);
    arrUsers.forEach(element => {
      console.log("elemento: "+element.id);
      if(element.id == usuarioSeleccionado){
        if(password.value == element.clave){
          usuarioCuenta = element.nombre;
          console.log(usuarioCuenta);
         localStorage.setItem('nombre',usuarioCuenta);
         localStorage.setItem('saldo',element.saldo);
         localStorage.setItem('id',element.id);
  
          window.location="../../cajero.html"; 

        }
        else{
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>contraseña incorrecta</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertaEspacio.append(wrapper);
        }
      }
    });
  } 
}






