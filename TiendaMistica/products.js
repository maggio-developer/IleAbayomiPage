const URL =  "https://script.google.com/macros/s/AKfycbw7Uo9PxcIP407uy5CjU7kpEXwR2bY1vk_od9U8yxonCBgNchGFHuQg79efReMb2gx8/exec"
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMY1OEy2HAi0ObwumzEeAWlagHsqS7eXG06yzzFXDRVvyD6y--5uM5BVIFSH2MF-p47z_rc24uMFla/pub?output=csv";

export async function getActivos() {
  try {
    // Usamos la URL del Apps Script (la que termina en /exec)
    const res = await fetch(URL); 
    
    if (!res.ok) throw new Error("Error en la red");

    const productos = await res.json();

    // Como tu función getProducts() en Apps Script ya filtra 
    // los activos (if activo === true), aquí solo retornamos la lista.
    return productos;
    
  } catch (error) {
    console.error("Error cargando productos:", error);
    return "error";
  }
}

export async function agregarProducto(password, nombre, precio, imagen, descripcion) {
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            password: password,
            action: "add",
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            imagen: imagen
        })
    });

    const resultado = await response.json();

    if (resultado.status === "error") {
        console.error("No se agregó:", resultado.message);
        alert(resultado.message); // Avisa al usuario que el nombre está repetido
        return "error"
    }else {
        console.log("Producto agregado con éxito, ID:", resultado.id)
        alert("Producto agregado con éxito");
    }
}

export async function eliminarProducto(password, nombreAEliminar) {
    const res = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            password: password,
            action: "delete",
            nombre: nombreAEliminar
        })
    });
    const resultado = await res.json();
    if (resultado.status === "error") {
        console.error("No se eliminó: ", resultado.message);
        alert(resultado.message); // Avisa al usuario que el nombre está repetido
        return "error"
    }else {
        console.log("Producto eliminado con éxito. ", resultado.message)
        alert("Producto eliminado con éxito");
    }
    return resultado;
}

export async function modificarProducto(password, nombreOriginal, datosNuevos) {
    const res = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            password: password,
            action: "edit",
            nombreOriginal: nombreOriginal,
            ...datosNuevos // Esto expande nuevoNombre, precio, etc.
        })
    });
    const resultado = await res.json();
        if (resultado.status === "error") {
        console.error("No se editó: ", resultado.message);
        alert(resultado.message); // Avisa al usuario que el nombre está repetido
        return "error"
    }else {
        console.log("Producto editado con éxito. ", resultado.message)
        alert("Producto editado con éxito");
    }
    return resultado;
}

        export  function crearProducto(nombre, img, precio, descripcion){
                let products_flex = document.getElementById("products-cage");

                let product_div = document.createElement("div");
                product_div.classList.add("product");
                product_div.nombre = nombre;
                product_div.img = img;
                product_div.precio = precio;
                product_div.descripcion = descripcion;
                products_flex.appendChild(product_div);

                let d = document.createElement("div");
                d.style = "padding: 0;"
                product_div.appendChild(d);
                
                let image = document.createElement("img");
                image.alt = "Imágen de " + nombre + ": " + descripcion;
                image.src = img;
                image.loading = "lazy";
                d.appendChild(image);

                let divText = document.createElement("div");
                product_div.appendChild(divText);

                let title = document.createElement("h3");
                title.classList.add("price");
                title.textContent = nombre + " $" + precio;
                divText.appendChild(title);

                let button = document.createElement("a");
                button.textContent = "Consultar";
                button.href = "https://wa.me/598091077947?text=Hola%20quiero%20consultar%20por%20el%20producto%20"+nombre+",%20lo%20vi%20en%20la%20página%20de%20Tienda%20Mística%20Jalú.";
                button.classList.add("consultar");
                divText.appendChild(button);

                let description = document.createElement("p");
                description.textContent = descripcion;
                description.classList.add("descripcion");
                if (description.textContent != "" || description.textContent != " "){
                    divText.appendChild(description);
                };
            };

async function test() {
  productos = await getActivos();
  console.log("Productos actualizados:", productos);
  await agregarProducto("1234", "manzana", "100", "https://via.placeholder.com/150", "descripcion vacia");

  await eliminarProducto("1234", "manzana");

  await agregarProducto("1234", "manzana", "100", "https://via.placeholder.com/150", "descripcion vacia");

  // Ahora cargamos los datos después de que terminó el post
  productos = await getActivos();
  console.log("Productos actualizados:", productos);
}

//test();
