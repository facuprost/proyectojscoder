const tiposMadera = ["eucalipto", "pino", "saligna"];
const tamaniosMesa = ["chica", "mediana", "grande"];

const calcularPrecioConIva = (precio) => {
  return precio + precio * 0.21;
};

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
  const carritoElement = document.getElementById("carrito");
  carritoElement.innerHTML = ""; // Limpiar el contenido anterior del carrito

  if (carrito.length === 0) {
    carritoElement.innerText = "El carrito de compras está vacío.";
  } else {
    let total = 0;

    carrito.forEach((producto, index) => {
      const productoElement = document.createElement("div");
      productoElement.classList.add("producto");

      const tipoElement = document.createElement("p");
      tipoElement.innerText = `Tipo: ${producto.tipo}`;

      const tamanioElement = document.createElement("p");
      tamanioElement.innerText = `Tamaño: ${producto.tamanio}`;

      const precioElement = document.createElement("p");
      precioElement.innerText = `Precio: ${formatNumber(producto.precio)}`;

      total += producto.precio;

      productoElement.appendChild(tipoElement);
      productoElement.appendChild(tamanioElement);
      productoElement.appendChild(precioElement);

      carritoElement.appendChild(productoElement);
    });

    const totalElement = document.createElement("p");
    totalElement.innerText = `Total: ${formatNumber(total)}`;

    carritoElement.appendChild(totalElement);
  }
};

const agregarProducto = () => {
  const tipoInput = document.getElementById("tipo-input");
  const tamanioInput = document.getElementById("tamanio-input");
  const mensajeElement = document.getElementById("mensaje");

  const tipo = tipoInput.value;
  const tamanio = tamanioInput.value;

  if (tiposMadera.includes(tipo) && tamaniosMesa.includes(tamanio)) {
    const producto = productos.find((p) => p.tipo === tipo && p.tamanio === tamanio);

    if (producto) {
      const precio = producto.precio;
      const precioConIva = calcularPrecioConIva(precio);

      carrito.push({
        tipo: producto.tipo,
        tamanio: producto.tamanio,
        precio: precioConIva,
      });

      mensajeElement.innerText = `La madera de ${tipo} en tamaño ${tamanio} se ha agregado al carrito.`;

      tipoInput.value = "";
      tamanioInput.value = "";

      guardarCarritoEnLocalStorage();
      mostrarCarrito(); // Mostrar el carrito actualizado
    } else {
      mensajeElement.innerText = "No se encontró el producto especificado en la base de datos.";
    }
  } else {
    mensajeElement.innerText = "Ingrese un tipo de madera y tamaño válidos.";
  }
};

const borrarProducto = (index) => {
  if (index >= 0 && index < carrito.length) {
    const productoBorrado = carrito.splice(index, 1);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    const mensajeElement = document.getElementById("mensaje");
    mensajeElement.innerText = `El producto ${productoBorrado[0].tipo} - ${productoBorrado[0].tamanio} ha sido eliminado del carrito.`;
  } else {
    const mensajeElement = document.getElementById("mensaje");
    mensajeElement.innerText = "Opción inválida. Por favor, seleccione un número de producto válido.";
  }
};

const borrarCarrito = () => {
  carrito = [];
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
  const mensajeElement = document.getElementById("mensaje");
  mensajeElement.innerText = "El carrito ha sido borrado.";
};

const marcarPagado = () => {
  if (carrito.length === 0) {
    const mensajeElement = document.getElementById("mensaje");
    mensajeElement.innerText = "El carrito de compras está vacío.";
  } else {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio;
    });
    const mensajeElement = document.getElementById("mensaje");
    mensajeElement.innerText = `El importe total de ${formatNumber(total)} ha sido pagado.`;
    carrito = []; // Vaciar el carrito
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  }
};

const formatNumber = (number) => {
  return number.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
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

const agregarBtn = document.getElementById("agregar-producto-btn");
agregarBtn.addEventListener("click", agregarProducto);

const borrarCarritoBtn = document.getElementById("borrar-carrito-btn");
borrarCarritoBtn.addEventListener("click", borrarCarrito);

const pagarBtn = document.getElementById("pagar-btn");
pagarBtn.addEventListener("click", marcarPagado);









