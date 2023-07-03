let seguir = true;

const madera = () => {
  while (seguir) {
    let tipo = prompt("¿Qué madera busca entre las siguientes? Eucalipto, pino y saligna");
    switch (tipo) {
      case "eucalipto":
        console.log(
          "La madera de eucalipto suele ser la mejor en mesas que se utilizan para cocina"
        );
        precioPorMedidaGeneral(tipo);
        seguir = false;
        break;
      case "pino":
        console.log(
          "Este tipo de madera es la mejor opción para una mesa de comedor o como escritorio"
        );
        precioPorMedidaGeneral(tipo);
        seguir = false;
        break;
      case "saligna":
        console.log(
          "Esta madera será la más económica y resistente para mesas de exterior"
        );
        precioPorMedidaGeneral(tipo);
        seguir = false;
        break;
      default:
        console.log("Ingrese un tipo de madera válido");
        seguir = true;
    }
  }
};

const precioPorMedidaGeneral = (tipo) => {
  let tamanio = "";
  while (!tamanio) {
    tamanio = prompt("Ingrese un tamaño de mesa entre chica, mediana y grande");
    switch (tamanio) {
      case "chica":
        if (tipo === "eucalipto") {
          console.log("El valor de esta mesa es de $35000");
        } else if (tipo === "pino") {
          console.log("El valor de esta mesa es de $15000");
        } else if (tipo === "saligna") {
          console.log("El valor de esta mesa es de $7000");
        }
        break;
      case "mediana":
        if (tipo === "eucalipto") {
          console.log("El valor de esta mesa es de $85000");
        } else if (tipo === "pino") {
          console.log("El valor de esta mesa es de $50000");
        } else if (tipo === "saligna") {
          console.log("El valor de esta mesa es de $30000");
        }
        break;
      case "grande":
        if (tipo === "eucalipto") {
          console.log("El valor de esta mesa es de $170000");
        } else if (tipo === "pino") {
          console.log("El valor de esta mesa es de $110000");
        } else if (tipo === "saligna") {
          console.log("El valor de esta mesa es de $70000");
        }
        break;
      default:
        console.log("Ingrese un tamaño válido");
        tamanio = "";
    }
  }
};

madera();