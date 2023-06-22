let seguir = true;
 

const madera = () => {

    while (seguir) {

        let tipo = prompt("¿Qué madera busca?");

        switch (tipo) {

            case "eucalipto":

                console.log("la madera de eucalipto suele ser la mejor en mesas que se utilizan para cocina");

                precioPorMedida("eucalipto")

                seguir = false;

                break;

            case "pino":

                console.log("Este tipo de madera es la mejor opcion para una mesa de comedor o como escritorio");

                precioPorMedida1("pino")


                seguir = false;

                break;

            case "saligna":

                console.log("Esta madera sera la mas economica y resistente para mesas de exterior");

                precioPorMedida2("saligna")

                seguir = false;

                break;

            default:

                console.log("Ingrese un tipo de madera válido");

                seguir = true;

        }

    }

}

 

const precioPorMedida = (tipo) => {

    let tamanio = prompt("ingrese un tamaño de mesa");

    while (tipo == "eucalipto") {

        if (tamanio == "chica") {

            console.log("El valor de esta mesa es de $35000")


            break;

        } else if (tamanio == "mediana") {

            console.log("El valor de esta mesa es de $85000");


            break;

        }

        else if (tamanio == "grande") {

            console.log("El valor de esta mesa es de $170000");

  

            break;

        } else {

            console.log("coloque un tamaño valido");


        }

    }

}

const precioPorMedida1 = (tipo) => {

    let tamanio = prompt("ingrese un tamaño de mesa");

    while (tipo == "pino") {

        if (tamanio == "chica") {

            console.log("El valor de esta mesa es de $15000")

            break;

        } else if (tamanio == "mediana") {

            console.log("El valor de esta mesa es de $50000");

            break;

        }

        else if (tamanio == "grande") {

            console.log("El valor de esta mesa es de $110000");

            break;

        } else {

            console.log("coloque un tamaño valido");

            break;

        }

    }

}

const precioPorMedida2 = (tipo) => {

    let tamanio = prompt("ingrese un tamaño de mesa");

    while (tipo == "saligna") {

        if (tamanio == "chica") {

            console.log("El valor de esta mesa es de $7000")

            break;

        } else if (tamanio == "mediana") {

            console.log("El valor de esta mesa es de $30000");

            break;

        }

        else if (tamanio == "grande") {

            console.log("El valor de esta mesa es de $70000");

            break;

        } else {

            console.log("coloque un tamaño valido");

            break;

        }

    }

}

madera();