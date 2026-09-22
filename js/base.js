//arreglos para listas 

let productos = [];
let carrito = [];


//validar formato email
function esCorreoValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// condicion agregar carrito
function agregarACarrito(id) {
    if (carrito.includes(id)) {
        alert("Producto ya agregado al carrito.");
    }
    else {
        carrito.push(id);
        alert("¡Producto agregado al carrito!");
    }
}

//cargar productos desde JSON
$(document).ready(function () {
    setTimeout(function () {
        $.ajax({
            url: 'https://dummyjson.com/c/6818-d15d-4cfb-b045',
            type: "GET",
            dataType: 'json',
            success: function (response) {
                response.forEach(function (producto) {
                    let precioFormatted = producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

                    $(".cont-tarjetas").append(`
                        <div class="card m-5" style="width: 18rem;">
                            <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.titulo}</h5>
                                <p class="card-text">Precio: ${precioFormatted}</p>
                                <a href="#" class="btn btn-primary" onclick="agregarACarrito(${producto.id})">Agregar al Carrito</a>
                            </div>
                        </div>`);

                });
            },
            error: function () {
                $("#indicador-error").show();
            },
            complete: function () {
                $("#loading").hide();
            }
        });
    }, 2000);

//boton de busqueda

   $("form.buscador").on("submit", function (e) {
    e.preventDefault();

    let busqueda = $(this).find("input").val().trim().toLowerCase();

    if (busqueda === "") {
        alert("Por favor, ingresa un término de búsqueda.");
    } else {
        alert("Buscando: " + busqueda);
    }
});


//enviar formulario de contacto

    $("#contacto-enviar").on("click", function () {
        let nombre = $("#nombre-contacto").val();
        let correo = $("#email-contacto").val();
        let mensaje = $("#mensaje-contacto").val();
        let error = false;


        //manejo de errores
        $("#error-nombre").hide();
        $("#error-correo").hide();
        $("#error-mensaje").hide();

        if (nombre === "") {
            $("#error-nombre").show();
            error = true;
        }
        if (correo === "" || !esCorreoValido(correo)) {
            $("#error-correo").show();
            error = true;
        }
        if (mensaje === "") {
            $("#error-mensaje").show();
            error = true;
        }

        //formulario exitoso
        if (!error) {
            alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
        }

    
    })
});