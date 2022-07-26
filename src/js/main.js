var cuentas = [
  { id:1,nombre: 'Mali', clave: 'MalimarAu', saldo: 200 },
  { id:2,nombre: 'Gera', clave: 'GerardoOrtiz', saldo: 290 },
  { id:3,nombre: 'Maui', clave: 'Mauiwi', saldo: 67 }
];

var jsonUsers = JSON.stringify(cuentas)
localStorage.setItem('cuentas',jsonUsers  );


const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const btnIniciar = document.getElementById('btnIniciar');
const bienvenido = document.getElementById('bienvenido');
const logo = document.getElementById('logo');
const consulta = document.getElementById('consulta');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

var usuarioCuenta = '';
var userSelected = '';

logo.addEventListener('click', (e) => {
  window.location="../../index.html"; 
});

if(usuario)
{
  usuario.addEventListener('change',(e) => {
      userSelected = usuario.selectedIndex;
      let nombre = usuario.options[userSelected].text; 
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

if(consulta){
  consulta.addEventListener('click', (e) => {
    console.log(localStorage.getItem('nombre'));
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;
  });
}

// pagina.addEventListener("load", function(event) {
//   console.log(localStorage.getItem('nombre'));
//   bienvenido.innerHTML = `Bienvenidosss ${localStorage.getItem('nombre')}`;
// });


function validarContra(){
  var allUsers = localStorage.getItem('cuentas');
  var arrUsers =  JSON.parse(allUsers);
  arrUsers.forEach(element => {
    console.log("elemento: "+element.id);
    if(element.id == userSelected){
      if(password.value == element.clave){
        usuarioCuenta = element.nombre;
        console.log(usuarioCuenta);
       localStorage.setItem('nombre',usuarioCuenta)

        window.location="../../cajero.html"; 
        
        console.log(localStorage.getItem('nombre'));
        bienvenido.innerHTML = `Bienvenidosss ${localStorage.getItem('nombre')}`;


      }
      else{
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>contraseña incorrecta</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
        alertPlaceholder.append(wrapper);
      }
    }
  });
}






// let carritoCompras = {}
// let carritoTotal = 0
// const total = document.getElementById('total')
// const tableProducts = document.getElementById('tableProducts')
// const form = document.getElementById('form')
// const reset = document.getElementById('reset')

// reset.addEventListener('click', (e) => {
//     buildProductList(productList)
// })

// form.addEventListener('submit', (event) => {
//   event.preventDefault()
//   //var existe = false;
//   const searchInput = event.target.search.value.toUpperCase()
//   const ProductListFilter = productList.filter((product) => {
//     if (searchInput == product.nombre.toUpperCase()) {
//       //existe = true;
//       return product
//     }
//   })


//   return buildProductList(ProductListFilter)

// //   console.log(ProductListFilter)
// })


// search.addEventListener('keyup', (event) => {
//   event.preventDefault()
//   var existe = false;
//   const searchInput = event.target.value.toUpperCase()

//   const ProductListFilter = productList.filter((product) => {
//     if (searchInput == product.nombre.toUpperCase().substring(0,event.target.value.length)) {
//       existe = true;
//       return product
//     }
//   })
//   if(!existe){
//     alert("El articulo "+ searchInput + " no existe");
//   }
//   return buildProductList(ProductListFilter);
// })
// const comprar = (nombre, precio, id) => {
//   // console.log(nombre,precio, id)
//   alert(
//     `Hola, gracias por comprar el producto ${nombre} por un precio de $ ${precio}`,
//   )

//   // El metodo hasOwnProperty() devuelve un booleano indicando si un objeto tiene una propiedad especificada.
//   if (carritoCompras.hasOwnProperty(id)) {
//     carritoCompras[id].cantidad++
//   } else {
//     carritoCompras[id] = { nombre, precio, id }
//     carritoCompras[id].cantidad = 1
//   }

//   carritoTotal += parseInt(carritoCompras[id].precio)
//   total.innerHTML = `Total: $ ${carritoTotal}`

//   tableProducts.innerHTML = ''

//   for (const key in carritoCompras) {
//     const childElement = document.createElement('tr')
//     childElement.innerHTML = `
//             <td>${carritoCompras[key].nombre}</td>
//             <td>${carritoCompras[key].precio}</td>
//             <td>${carritoCompras[key].cantidad}</td>
//         `
//     tableProducts.appendChild(childElement)
//   }
// }

// const buildProductList = (productList1) => {
//   //select the parent HTML tag
//   var getParentElement = document.getElementById('productList')

//   getParentElement.innerHTML = ''

//   console.log(productList1)

//   //Loop the product list array in order to generate the <section> </section>
//   productList1.forEach((line) => {
//     //creating the section cards
//     const createSection = document.createElement('section')
//     //adding a class
//     createSection.classList.add('product') //<section class="product"> </section>
//     //creating childs into the parent element section
//     createSection.innerHTML = `
//         <img src="${line.imagen}" alt="">
//         <h2>${line.nombre}</h2>
//         <h3>Price: <span>$ ${line.precio} </span> </h3>
//         <p>Quantity: <span>${line.cantidad}</span> </p>
//         <p>Description: <span>${line.descripcion}</span> </p>
//         <p>Ml: <span>${line.ml} </span> </p>
//         <button onclick="comprar('${line.nombre}', '${line.precio}', '${line.id}')">Buy </button>
        
//         `
//     //
//     getParentElement.appendChild(createSection)
//   })
// }

// window.addEventListener('DOMContentLoaded', () => {
//   buildProductList(productList)
// })
