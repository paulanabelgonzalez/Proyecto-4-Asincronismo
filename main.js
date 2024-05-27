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

// funcion para que al finalizar el video se vea la pagina automaticamente.
const introTerminada = () => {
	$(".video").onended = () => {
		salirDeIntro();
	};
};

introTerminada();

$(".btn_intro").addEventListener("click", salirDeIntro);

$(".hamburguesa").addEventListener("click", () => {
	mostrar($(".contenedor_filtros"));
	$(".hamburguesa").classList.toggle("hidden");
	$(".cerrar_hamburguesa").classList.toggle("hidden");
});

$(".cerrar_hamburguesa").addEventListener("click", () => {
	ocultar($(".contenedor_filtros"));
	$(".cerrar_hamburguesa").classList.toggle("hidden");
	$(".hamburguesa").classList.toggle("hidden");
});

const cambiarIconoHamburguesa = () => {
	$(".hamburguesa").classList.remove("hidden");
	$(".cerrar_hamburguesa").classList.add("hidden");
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
	mostrarYOcultar($(".spinner"), $(".modal_filtro"), $(".contenedor_filtros"));
	deshabilitarBoton($(".spinner"), $(".hamburguesa"));
	deshabilitarBoton($(".spinner"), $(".crear_caballero"));

	setTimeout(() => {
		mostrarYOcultar($(".cards"), $(".spinner"));
		cambiarIconoHamburguesa();

		// para que se borre el nombre en el buscador
		$("#filtro_nombre").value = "";

		habilitarBoton($(".cards"), $(".hamburguesa"));
		habilitarBoton($(".cards"), $(".crear_caballero"));

		// if ($(".cards")) {
		// 	$(".hamburguesa").removeAttribute("disabled");
		// } else {
		// 	$(".hamburguesa").setAttribute("disabled");
		// }

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
	mostrarYOcultar(
		$(".spinner"),
		$(".cards"),
		// $(".crear_caballero"),
		$(".contenedor_filtros")
	);
	cambiarIconoHamburguesa();
	deshabilitarBoton($(".spinner"), $(".hamburguesa"));
	deshabilitarBoton($(".spinner"), $(".crear_caballero"));

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
			<button class="detalle_regresar">X</button>
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
		ocultar(div), getCaballeros(urlBase);
	});
	btn_texto.addEventListener("click", () => {
		ocultar(div), getCaballeros(urlBase);
	});
};

const cerrarForm = (btn, btn_texto) => {
	btn.addEventListener("click", () => $(".form").classList.add("hidden"));
	btn_texto.addEventListener("click", () => $(".form").classList.add("hidden"));
};

$(".crear_caballero").addEventListener("click", () => {
	mostrarYOcultar($(".form_agregar"), $(".cards")); //$(".crear_caballero");
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

$("#filtro_armadura").addEventListener("change", (e) => {
	armadura = e.target.value;
	urlParams.set("armadura", e.target.value);
	ocultar($(".cards"));
	getCaballeros(`${urlBase}/?${urlParams}`);
});

$("#filtro_genero").addEventListener("change", (e) => {
	genero = e.target.value;
	urlParams.set("genero", e.target.value);
	ocultar($(".cards"));
	getCaballeros(`${urlBase}/?${urlParams}`);
});

$("#filtro_saga").addEventListener("change", (e) => {
	saga = e.target.value;
	urlParams.set("saga", e.target.value);
	ocultar($(".cards"));
	getCaballeros(`${urlBase}/?${urlParams}`);
});

const deshabilitarBotonLupa = () => {
	if ($("#filtro_nombre").value === "") {
		$("#filtro_nombre__lupa").setAttribute("disabled", "");
	} else {
		$("#filtro_nombre__lupa").removeAttribute("disabled");
	}
};

// deshabilitarBotonLupa();

$("#filtro_nombre__lupa").addEventListener("click", () => {
	nombre = $("#filtro_nombre").value;
	urlParams.set("nombre", nombre);
	mostrarYOcultar($(".volver_filtro"), $(".cards"), $(".crear_caballero"));
	cambiarIconoHamburguesa();
	getCaballeros(`${urlBase}/?${urlParams}`);
});

$(".volver_filtro").addEventListener("click", () => {
	mostrarYOcultar($(".crear_caballero"), $(".cards"), $(".volver_filtro"));
	getCaballeros(urlBase);
});

$("#filtro_btn__cerrar").addEventListener("click", () => {
	$("#filtro_armadura").value = "";
	$("#filtro_genero").value = "";
	$("#filtro_saga").value = "";
	getCaballeros(urlBase);
});
