const $ = (selector) => document.querySelector(selector);

const ocultar = (ocultar) => ocultar.classList.add("hidden");

const mostrar = (ver) => ver.classList.remove("hidden");

const mostrarYOcultar = (ver, ...ocultar) => {
	ver.classList.remove("hidden");
	ocultar.forEach((ocultar) => {
		ocultar.classList.add("hidden");
	});
};

const salirDeIntro = () => {
	mostrarYOcultar($(".contenedor_nav"), $(".logo_intro"), $(".intro"));
	getCaballeros(urlBase);
};

const ocultarFiltros = (seccion) => {
	if (seccion) {
		$(".contenedor_filtros").style.display = "none";
	}
};
ocultarFiltros($(".intro"));

const mostrarFiltros = (contenedor) => {
	if (contenedor && window.innerWidth >= 970) {
		$(".contenedor_filtros").style.display = "block";
	}
};

// funcion para que al finalizar el video se vea la pagina automaticamente.
const introTerminada = () => {
	$(".video").onended = () => {
		salirDeIntro();
	};
};

introTerminada();

$(".btn_intro").addEventListener("click", salirDeIntro);

$(".hamburguesa").addEventListener("click", () => {
	$(".contenedor_filtros").style.display = "block";
	$(".hamburguesa").style.display = "none";
	$(".cerrar_hamburguesa").style.display = "block";
});

$(".cerrar_hamburguesa").addEventListener("click", () => {
	$(".contenedor_filtros").style.display = "none";
	$(".cerrar_hamburguesa").style.display = "none";
	$(".hamburguesa").style.display = "block";
});

const cambiarIconoHamburguesa = () => {
	if (window.innerWidth <= 970) {
		$(".hamburguesa").style.display = "block";
		$(".cerrar_hamburguesa").style.display = "none";
	}
};

const deshabilitarBoton = (contenedor, btn) => {
	if (contenedor) {
		btn.setAttribute("disabled", "");
	} else {
		btn.removeAttribute("disabled");
	}
};

const habilitarBoton = (contenedor, btn) => {
	if (contenedor) {
		btn.removeAttribute("disabled");
	} else {
		btn.setAttribute("disabled");
	}
};

const urlBase = "https://662f72bd43b6a7dce30f86c9.mockapi.io/api/caballeros";

const getCaballeros = (url) => {
	fetch(url)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			if (data) {
				renderCaballeros(data);
			} else {
				mostrarYOcultar($(".modal_filtro"), $(".cards"));
			}
		})
		.catch((err) => console.log(err));
};

const renderCaballeros = (caballeros) => {
	mostrarYOcultar($(".spinner"), $(".modal_filtro"));
	deshabilitarBoton($(".spinner"), $(".hamburguesa"));
	deshabilitarBoton($(".spinner"), $(".crear_caballero"));
	ocultarFiltros($(".spinner"));
	$("main").style.background = `#ede9e2`;

	setTimeout(() => {
		mostrarYOcultar($(".cards"), $(".spinner"));
		mostrarFiltros($(".cards"));
		$("main").style.background = `url("/assets/fondo.jpg")`;

		$("#filtro_nombre").value = "";

		habilitarBoton($(".cards"), $(".hamburguesa"));
		habilitarBoton($(".cards"), $(".crear_caballero"));

		$(".contenedor_cards").innerHTML = "";

		caballeros.forEach((personaje) => {
			const { nombre, caballero, armadura, descripcion, avatar, id } =
				personaje;

			$(".contenedor_cards").innerHTML += `
        <div class="card">
			<div class="card_img">
				<img src="${avatar}" alt="imagen de ${nombre}" />
			</div>
			<div class="card_info">
				<div class="info">
					<h2 class="nombre">${nombre}</h2>
					<h3 class="caballero">${caballero}</h3>
					<p class="armadura">${armadura}</p>
					<p class="descripcion">${descripcion}</p>
				</div>
				<div class="card_btn">
					<button class="btn_detalle" data-id="${id}">Ver Detalle</button>
				</div>
			</div>
		</div>
        `;
		});
		eventoABotonesDetalle(document.querySelectorAll(".btn_detalle"));
	}, 2700);
};

const eventoABotonesDetalle = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", () => {
			verCardDetalle(btn.getAttribute("data-id"));
			$("#modal_aceptar__eliminar").setAttribute(
				"data-id",
				btn.getAttribute("data-id")
			);
		})
	);
};

const verCardDetalle = (caballero) => {
	fetch(`${urlBase}/${caballero}`)
		.then((res) => res.json())
		.then((data) => renderDetalle(data))
		.catch((err) => console.log(err));
};

const renderDetalle = (card) => {
	mostrarYOcultar($(".spinner"), $(".cards"));
	deshabilitarBoton($(".spinner"), $(".hamburguesa"));
	deshabilitarBoton($(".spinner"), $(".crear_caballero"));
	ocultarFiltros($(".spinner"));
	cambiarIconoHamburguesa();
	$("main").style.background = `#ede9e2`;

	setTimeout(() => {
		mostrarYOcultar($(".detalle"), $(".spinner"));
		deshabilitarBoton($(".detalle"), $(".hamburguesa"));

		const {
			box,
			logo,
			caballero,
			img_armadura,
			nombre,
			detalle,
			id,
			armadura,
			genero,
			descripcion,
			saga,
		} = card;

		$(".detalle").innerHTML = `
        <div class="card_detalle">
        <div class="contenedor_detalle__regresar">
			<button class="detalle_regresar">X</button>
            </div>
			<div class="detalle_img">
				<img
					class="box"
					src="${box ? box : logo}"
					alt="caja de pandora de ${caballero}"
				/>
				<img
				    class="img_armadura"
					src="${img_armadura}"
					alt="armadura de ${caballero}"
				/>
			</div>
			<div class="detalle_contenedor">
				<div class="detalle_info">
					<div class="detalle_btn__regresar hidden">
						<button class="regresar"><< Regresar</button>
					</div>
					<h2 class="detalle_nombre">${nombre}</h2>
					<p class="detalle_texto">${detalle}</p>
				</div>
				<div class="detalle_btns">
					<button class="detalle_btn__editar" data-id="${id}">Editar</button>
					<button class="detalle_btn__eliminar">Eliminar</button>
				</div>
			</div>
		</div> 
       <div class="form  contenedor_form hidden">
	        <form id="form">
			    <div class="form contenedor_regresar">
				    <button type="button" class="btn_regresar">X</button>
				    <button type="button" class="regresar_texto hidden"><< Cerrar</button>
			    </div>
			    <div class="formulario">
				    <label for="form_nombre">Nombre</label>
				    <input
					    type="text"
					    name="form_nombre"
					    id="form_nombre"
				        value="${nombre}"
				    />
			    </div>
			    <div class="formulario">
				    <label for="form_armadura">Armadura</label>
				    <input
					    type="text"
					    name="form_armadura"
					    id="form_armadura"
					    value="${armadura}"
				    />
			    </div>
			    <div class="formulario">
				    <label for="form_caballero">Caballero</label>
				    <input
					    type="text"
					    name="form_caballero"
					    id="form_caballero"
					    value="${caballero}"
				    />
			    </div>
			    <div class="formulario">
				    <label for="form_genero">Género</label>
				    <input
				        type="text"
					    name="form_genero"
					    id="form_genero"
					    value="${genero}"
				    />
			    </div>
			    <div class="formulario">
				    <label for="form_descripcion">Descripción</label>
				    <textarea
					    name="form_descripcion"
					    id="form_descripcion"
				    >${descripcion}</textarea>
			    </div>
			    <div class="formulario">
				    <label for="form_detalle">Detalle</label>
				    <textarea
					    name="form_detalle"
					    id="form_detalle"
				    >${detalle}</textarea>
			    </div>
			    <div class="formulario">
				    <label for="form_saga">Saga</label>
				    <input
					    type="text"
					    name="form_saga"
					    id="form_saga"
					    value="${saga}"
				    />
			    </div>
			    <div class="formulario_btn">
				    <button type="submit" class="form_btn_submit">Editar</button>
			    </div>
		    </form>
        </div> `;

		$(".detalle_btn__editar").addEventListener("click", () =>
			mostrar($(".form"))
		);

		cerrarForm($(".btn_regresar"), $(".regresar_texto"));

		regresarContenedorAnterior(
			$(".detalle_regresar"),
			$(".regresar"),
			$(".detalle")
		);

		const confirmarEditar = (card) => {
			const caballeroEditado = {
				...card,
				nombre: $("#form_nombre").value,
				armadura: $("#form_armadura").value,
				caballero: $("#form_caballero").value,
				genero: $("#form_genero").value,
				descripcion: $("#form_descripcion").value,
				detalle: $("#form_detalle").value,
				saga: $("#form_saga").value,
			};

			fetch(`${urlBase}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(caballeroEditado),
			})
				.then((res) => {
					verCardDetalle(id);
				})
				.catch((err) => console.log(err));
		};

		$("form").addEventListener("submit", (e) => {
			e.preventDefault();
			confirmarEditar(card);
			ocultar($(".detalle"));
			ocultar($("form"));
		});

		$(".detalle_btn__eliminar").addEventListener("click", () =>
			mostrarYOcultar($(".contenedor_modal"), $(".detalle"))
		);
	}, 2700);
};

const regresarContenedorAnterior = (btn, btn_texto, div) => {
	btn.addEventListener("click", () => {
		cambiarIconoHamburguesa();
		ocultar(div);
		getCaballeros(urlBase);
	});
	btn_texto.addEventListener("click", () => {
		ocultar(div);
		getCaballeros(urlBase);
	});
};

const borrarParams = () => {
	urlParams.set("armadura", "");
	urlParams.set("genero", "");
	urlParams.set("saga", "");
	urlParams.set("nombre", "");
	$("#filtro_armadura").value = "";
	$("#filtro_genero").value = "";
	$("#filtro_saga").value = "";
};

const cerrarForm = (btn, btn_texto) => {
	btn.addEventListener("click", () => {
		$(".form").classList.add("hidden");
		borrarParams();
	});
	btn_texto.addEventListener("click", () => {
		$(".form").classList.add("hidden");
		borrarParams();
	});
};

$(".crear_caballero").addEventListener("click", () => {
	ocultarFiltros($(".form_agregar"));
	mostrarYOcultar($(".form_agregar"), $(".cards"));
	deshabilitarBoton($(".form_agregar"), $(".hamburguesa"));
});

regresarContenedorAnterior(
	$(".agregar_btn_cerrar"),
	$(".agregar_texto_cerrar"),
	$(".form_agregar")
);

const agregarCaballero = () => {
	const caballeroNuevo = {
		nombre: $("#form_agregar__nombre").value,
		armadura: $("#form_agregar__armadura").value,
		caballero: $("#form_agregar__caballero").value,
		genero: $("#form_agregar__genero").value,
		avatar: $("#form_agregar__avatar").value,
		logo: $("#form_agregar__logo").value,
		descripcion: $("#form_agregar__descripcion").value,
		detalle: $("#form_agregar__detalle").value,
		box: $("#form_agregar__box").value,
		img_armadura: $("#form_agregar__img_armadura").value,
		saga: $("#form_agregar__saga").value,
	};

	fetch(`${urlBase}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(caballeroNuevo),
	})
		.then((res) => res.json())
		.then((data) => {
			$("#form_agregar__id").reset();
			ocultar($(".form_agregar"));
			getCaballeros(urlBase);
		})
		.catch((err) => console.log(err));
};

$("#form_agregar__id").addEventListener("submit", (e) => {
	e.preventDefault();
	agregarCaballero();
});

$("#modal_btn__cerrar").addEventListener("click", () =>
	mostrarYOcultar($(".detalle"), $(".contenedor_modal"))
);

$("#modal_aceptar__eliminar").addEventListener("click", () => {
	fetch(`${urlBase}/${$("#modal_aceptar__eliminar").getAttribute("data-id")}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			ocultar($(".contenedor_modal"));
			getCaballeros(urlBase);
		})
		.catch((err) => console.log(err));
});

const urlParams = new URLSearchParams(urlBase.search);

const filtros = (select, nombre, filtro) => {
	select.addEventListener("change", (e) => {
		cambiarIconoHamburguesa();
		nombre = e.target.value;
		urlParams.set(filtro, e.target.value);
		ocultar($(".cards"));
		getCaballeros(`${urlBase}/?${urlParams}`);
	});
};

filtros($("#filtro_armadura"), "armadura", "armadura");
filtros($("#filtro_genero"), "genero", "genero");
filtros($("#filtro_saga"), "saga", "saga");

// $("#filtro_armadura").addEventListener("change", (e) => {
// 	armadura = e.target.value;
// 	urlParams.set("armadura", armadura);
// 	ocultar($(".cards"));
// 	getCaballeros(`${urlBase}/?${urlParams}`);
// });

// $("#filtro_genero").addEventListener("change", (e) => {
// 	genero = e.target.value;
// 	urlParams.set("genero", e.target.value);
// 	ocultar($(".cards"));
// 	getCaballeros(`${urlBase}/?${urlParams}`);
// });

// $("#filtro_saga").addEventListener("change", (e) => {
// 	saga = e.target.value;
// 	urlParams.set("saga", e.target.value);
// 	ocultar($(".cards"));
// 	getCaballeros(`${urlBase}/?${urlParams}`);
// });

const habilitarBuscador = () => {
	nombre = $("#filtro_nombre").value;
	validar = 0;

	if (nombre === "") {
		validar++;
	}
	if (validar === 0) {
		$("#filtro_nombre__lupa").disabled = false;
	} else {
		$("#filtro_nombre__lupa").disabled = true;
	}
};

$("#filtro_nombre").addEventListener("keyup", habilitarBuscador);

$("#filtro_nombre__lupa").addEventListener("click", () => {
	if ($("#filtro_nombre").value !== "") {
		cambiarIconoHamburguesa();
		nombre = $("#filtro_nombre").value;
		urlParams.set("nombre", nombre);
		mostrarYOcultar($(".volver_filtro"), $(".cards"));
		getCaballeros(`${urlBase}/?${urlParams}`);
	}
});

$(".volver_filtro").addEventListener("click", () => {
	urlParams.set("nombre", "");
	mostrarYOcultar($(".crear_caballero"), $(".cards"), $(".volver_filtro"));
	getCaballeros(urlBase);
});

$("#filtro_btn__cerrar").addEventListener("click", () => {
	borrarParams();
	// urlParams.set("armadura", "");
	// urlParams.set("genero", "");
	// urlParams.set("saga", "");
	// $("#filtro_armadura").value = "";
	// $("#filtro_genero").value = "";
	// $("#filtro_saga").value = "";
	console.log(urlBase);
	getCaballeros(urlBase);
});
