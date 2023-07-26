const tiposMadera = ["eucalipto", "pino", "saligna"];
const tamaniosMesa = ["chica", "mediana", "grande"];

const calcularPrecioConIva = (precio) => precio + precio * 0.21;

let carrito = [];

const productos = [
  {
    tipo: "eucalipto",
    tamanio: "chica",
    precio: 35000,
  },
  {
    tipo: "pino",
    tamanio: "chica",
    precio: 15000,
  },
  {
    tipo: "saligna",
    tamanio: "chica",
    precio: 7000,
  },
  {
    tipo: "eucalipto",
    tamanio: "mediana",
    precio: 85000,
  },
  {
    tipo: "pino",
    tamanio: "mediana",
    precio: 50000,
  },
  {
    tipo: "saligna",
    tamanio: "mediana",
    precio: 30000,
  },
  {
    tipo: "eucalipto",
    tamanio: "grande",
    precio: 170000,
  },
  {
    tipo: "pino",
    tamanio: "grande",
    precio: 110000,
  },
  {
    tipo: "saligna",
    tamanio: "grande",
    precio: 70000,
  },
];

const mostrarCarrito = () => {
  const contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerText = "El carrito de compras está vacío.";
  } else {
    let total = 0;

    carrito.forEach((producto, indice) => {
      const elementoProducto = document.createElement("div");
      elementoProducto.classList.add("producto");

      const elementoTipo = document.createElement("p");
      elementoTipo.innerText = `Tipo: ${producto.tipo}`;

      const elementoTamanio = document.createElement("p");
      elementoTamanio.innerText = `Tamaño: ${producto.tamanio}`;

      const elementoPrecio = document.createElement("p");
      elementoPrecio.innerText = `Precio: ${formatearNumero(producto.precio)}`;

      const botonEliminar = document.createElement("button");
      botonEliminar.innerText = "Eliminar";
      botonEliminar.classList.add("btn", "btn-danger", "eliminar-producto-btn");
      botonEliminar.addEventListener("click", () => {
        mostrarAlertaEliminar(indice);
      });

      elementoProducto.appendChild(elementoTipo);
      elementoProducto.appendChild(elementoTamanio);
      elementoProducto.appendChild(elementoPrecio);
      elementoProducto.appendChild(botonEliminar);

      contenedorCarrito.appendChild(elementoProducto);

      total += producto.precio;
    });

    const elementoTotal = document.createElement("p");
    elementoTotal.innerText = `Total: ${formatearNumero(total)}`;

    contenedorCarrito.appendChild(elementoTotal);
  }
};

const mostrarAlertaEliminar = (indice) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "El producto será eliminado del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      eliminarProducto(indice);
      Swal.fire("¡Eliminado!", "El producto ha sido eliminado del carrito.", "success");
    }
  });
};

const realizarPago = () => {
  if (carrito.length === 0) {
    const mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.innerText = "El carrito de compras está vacío.";
  } else {
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    const descripcion = carrito.map((producto) => `${producto.tipo} - ${producto.tamanio}`).join(", ");

    Swal.fire({
      title: "Finalizar compra",
      html: `Total a pagar: ${formatearNumero(total)}<br>Productos: ${descripcion}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pagar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        realizarPagoConFetch(total)
          .then(() => {
            Swal.fire("¡Compra exitosa!", "El pago ha sido procesado correctamente.", "success").then(() => {
              carrito = []; // Reiniciar el carrito vaciándolo
              guardarCarritoEnLocalStorage();
              mostrarCarrito();
            });
          })
          .catch((error) => {
            Swal.fire("Error", `Hubo un problema con el pago: ${error.message}`, "error");
          });
      }
    });
  }
};


const agregarProducto = () => {
  const tipoInput = document.getElementById("tipo-input");
  const tamanioInput = document.getElementById("tamanio-input");
  const mensajeElemento = document.getElementById("mensaje");

  const tipo = tipoInput.value;
  const tamanio = tamanioInput.value;

  if (tiposMadera.includes(tipo) && tamaniosMesa.includes(tamanio)) {
    const producto = productos.find((prod) => prod.tipo === tipo && prod.tamanio === tamanio);

    if (producto) {
      const precio = producto.precio;
      const precioConIva = calcularPrecioConIva(precio);

      carrito.push({
        tipo: producto.tipo,
        tamanio: producto.tamanio,
        precio: precioConIva,
      });

      mensajeElemento.innerText = `La madera de ${tipo} en tamaño ${tamanio} se ha agregado al carrito.`;

      tipoInput.value = "";
      tamanioInput.value = "";

      guardarCarritoEnLocalStorage();
      mostrarCarrito();
    } else {
      mensajeElemento.innerText = "No se encontró el producto especificado en la base de datos.";
    }
  } else {
    mensajeElemento.innerText = "Ingrese un tipo de madera y tamaño válidos.";
  }
};

const eliminarProducto = (indice) => {
  if (indice >= 0 && indice < carrito.length) {
    carrito.splice(indice, 1);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    const mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.innerText = "El producto ha sido eliminado del carrito.";
  } else {
    const mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.innerText = "Opción inválida. Por favor, seleccione un número de producto válido.";
  }
};

const borrarCarrito = () => {
  carrito = [];
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
  const mensajeElemento = document.getElementById("mensaje");
  mensajeElemento.innerText = "El carrito ha sido borrado.";
};

const formatearNumero = (numero) => {
  return numero.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
};

const guardarCarritoEnLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const recuperarCarritoDeLocalStorage = () => {
  const carritoJSON = localStorage.getItem("carrito");
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
};

recuperarCarritoDeLocalStorage();
mostrarCarrito();

const botonAgregar = document.getElementById("agregar-producto-btn");
botonAgregar.addEventListener("click", agregarProducto);

const botonBorrarCarrito = document.getElementById("borrar-carrito-btn");
botonBorrarCarrito.addEventListener("click", borrarCarrito);

const mostrarFormularioPago = () => {
  const formularioPago = document.getElementById("formulario-pago");
  formularioPago.style.display = "flex";
};

const ocultarFormularioPago = () => {
  const formularioPago = document.getElementById("formulario-pago");
  formularioPago.style.display = "none";
};

const mostrarOcultarFormularioPago = () => {
  const formularioPago = document.getElementById("formulario-pago");
  formularioPago.style.display = formularioPago.style.display === "none" ? "flex" : "none";
};

const botonFinalizarCompra = document.getElementById("pagar-btn");
botonFinalizarCompra.addEventListener("click", () => {
  mostrarOcultarFormularioPago();
});


















