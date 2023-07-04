const tiposMadera = ["eucalipto", "pino", "saligna"];
const tamaniosMesa = ["chica", "mediana", "grande"];

const calcularPrecioConIva = (precio) => {
  return precio + (precio * 0.21);
};

const madera = () => {
  let seguir = true;

  while (seguir) {
    let tipo = prompt(`¿Qué madera busca entre las siguientes? ${tiposMadera.join(", ")}`);

    if (tiposMadera.includes(tipo)) {
      let tamanio = "";

      while (!tamanio) {
        tamanio = prompt(`Ingrese un tamaño de mesa entre ${tamaniosMesa.join(", ")}`);

        if (tamaniosMesa.includes(tamanio)) {
          const mesa = new Mesa(tipo, tamanio);
          alert(mesa.obtenerDescripcion());
          const precio = mesa.obtenerPrecio();
          const precioConIva = calcularPrecioConIva(precio);
          alert("El valor de esta mesa es de $" + precioConIva);
          seguir = false;
        } else {
          alert("Ingrese un tamaño válido");
          tamanio = "";
        }
      }
    } else {
      alert("Ingrese un tipo de madera válido");
      seguir = true;
    }
  }
};

class Mesa {
  constructor(tipo, tamanio) {
    this.tipo = tipo;
    this.tamanio = tamanio;
  }

  obtenerPrecio() {
    switch (this.tamanio) {
      case "chica":
        if (this.tipo === "eucalipto") {
          return 35000;
        } else if (this.tipo === "pino") {
          return 15000;
        } else if (this.tipo === "saligna") {
          return 7000;
        }
        break;
      case "mediana":
        if (this.tipo === "eucalipto") {
          return 85000;
        } else if (this.tipo === "pino") {
          return 50000;
        } else if (this.tipo === "saligna") {
          return 30000;
        }
        break;
      case "grande":
        if (this.tipo === "eucalipto") {
          return 170000;
        } else if (this.tipo === "pino") {
          return 110000;
        } else if (this.tipo === "saligna") {
          return 70000;
        }
        break;
      default:
        return 0;
    }
  }

  obtenerDescripcion() {
    switch (this.tipo) {
      case "eucalipto":
        return "La madera de eucalipto suele ser la mejor en mesas que se utilizan para cocina";
      case "pino":
        return "Este tipo de madera es la mejor opción para una mesa de comedor o como escritorio";
      case "saligna":
        return "Esta madera será la más económica y resistente para mesas de exterior";
      default:
        return "";
    }
  }
}

madera();