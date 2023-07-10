const tiposMadera = ["eucalipto", "pino", "saligna"];
const tamaniosMesa = ["chica", "mediana", "grande"];

const calcularPrecioConIva = (precio) => {
  return precio + precio * 0.21;
};

// Array de objetos que simula el carrito de compras
const carrito = [];

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

const madera = () => {
  let seguir = true;

  while (seguir) {
    let opcion = prompt(
      "Seleccione una opción:\n1. Agregar un producto al carrito\n2. Ver el carrito de compras\n3. Borrar un producto del carrito\n4. Pagar total\n\nIngrese el número de la opción deseada:"
    );

    switch (opcion) {
      case "1":
        agregarProducto();
        break;
      case "2":
        verCarrito();
        break;
      case "3":
        borrarProducto();
        break;
      case "4":
        marcarPagado();
        break;
      default:
        alert("Opción inválida. Por favor, seleccione una opción válida.");
    }
  }
};

const verCarrito = () => {
  if (carrito.length === 0) {
    alert("El carrito de compras está vacío.");
  } else {
    let mensaje = "Contenido del carrito de compras:\n\n";
    let total = 0;
    carrito.forEach((producto, index) => {
      mensaje += `Producto ${index + 1}:\n`;
      mensaje += `Tipo: ${producto.tipo}\n`;
      mensaje += `Tamaño: ${producto.tamanio}\n`;
      mensaje += `Precio: $${formatNumber(producto.precio)}\n\n`;
      total += producto.precio;
    });
    mensaje += `Total: $${formatNumber(total)}`;
    alert(mensaje);
  }
};

const formatNumber = (number) => {
  return number.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
};

const agregarProducto = () => {
  let tipo = prompt(`¿Qué madera busca entre las siguientes? ${tiposMadera.join(", ")}`);

  if (tiposMadera.includes(tipo)) {
    let tamanio = "";

    while (!tamanio) {
      tamanio = prompt(`Ingrese un tamaño de mesa entre ${tamaniosMesa.join(", ")}`);

      if (tamaniosMesa.includes(tamanio)) {
        const producto = productos.find((p) => p.tipo === tipo && p.tamanio === tamanio);

        if (producto) {
          const precio = producto.precio;
          const precioConIva = calcularPrecioConIva(precio);

          // Agregar el producto al carrito de compras
          carrito.push({
            tipo: producto.tipo,
            tamanio: producto.tamanio,
            precio: precioConIva,
          });

          alert(`La madera de ${tipo} en tamaño ${tamanio} se ha agregado al carrito.`);
        } else {
          alert("No se encontró el producto especificado en la base de datos.");
        }
      } else {
        alert("Ingrese un tamaño válido");
        tamanio = "";
      }
    }
  } else {
    alert("Ingrese un tipo de madera válido");
  }
};

const borrarProducto = () => {
  if (carrito.length === 0) {
    alert("El carrito de compras está vacío.");
  } else {
    let mensaje = "Seleccione el número del producto que desea borrar:\n\n";
    carrito.forEach((producto, index) => {
      mensaje += `${index + 1}. ${producto.tipo} - ${producto.tamanio} - ${formatNumber(producto.precio)}\n`;
    });

    const opcion = prompt(mensaje);
    const index = parseInt(opcion) - 1;

    if (index >= 0 && index < carrito.length) {
      const productoBorrado = carrito.splice(index, 1);
      alert(`El producto ${productoBorrado[0].tipo} - ${productoBorrado[0].tamanio} ha sido eliminado del carrito.`);
    } else {
      alert("Opción inválida. Por favor, seleccione un número de producto válido.");
    }
  }
};

const marcarPagado = () => {
  if (carrito.length === 0) {
    alert("El carrito de compras está vacío.");
  } else {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio;
    });
    alert(`El importe total de ${formatNumber(total)} ha sido pagado.`);
    carrito.length = 0; // Vaciar el carrito
  }
};

madera();
