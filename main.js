const $ = (selector) => document.querySelector(selector);

const ocultar = (ocultar) => ocultar.classList.add("hidden");

const mostrar = (ver) => ver.classList.remove("hidden");

const ocultarYMostrar = (ver, ...ocultar) => {
	ver.classList.remove("hidden");
	ocultar.forEach((ocultar) => {
		ocultar.classList.add("hidden");
	});
};

const salirDeIntro = () => {
	ocultarYMostrar($(".contenedor_nav"), $(".logo_intro"), $(".intro"));
	getCaballeros(urlBase);
};

const introTerminada = () => {
	$(".video").onended = () => {
		salirDeIntro();
	};
};

introTerminada();

$(".btn_intro").addEventListener("click", salirDeIntro);

const urlBase = "https://662f72bd43b6a7dce30f86c9.mockapi.io/api/caballeros";

const getCaballeros = (url) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => renderCaballeros(data))
		.catch((err) => console.log(err));
};

const renderCaballeros = (caballeros) => {
	mostrar($(".spinner"));

	setTimeout(() => {
		ocultarYMostrar($(".cards"), $(".spinner"));

		caballeros.forEach((personaje) => {
			const { nombre, caballero, armadura, descripcion, avatar, id } =
				personaje;

			$(".cards").innerHTML += `
        <div class="card">
			<div class="card_img">
				<img src="${avatar}" alt="imagen de saori" />
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
		btn.addEventListener("click", () =>
			verCardDetalle(btn.getAttribute("data-id"))
		)
	);
};

const verCardDetalle = (idCaballero) => {
	fetch(`${urlBase}/${idCaballero}`)
		.then((res) => res.json())
		.then((data) => renderDetalle(data))
		.catch((err) => console.log(err));
};

const renderDetalle = (card) => {
	ocultarYMostrar($(".spinner"), $(".cards"));

	setTimeout(() => {
		ocultarYMostrar($(".detalle"), $(".spinner"));

		const { box, caballero, img_armadura, nombre, detalle, id } = card;

		$(".detalle").innerHTML = `
        <div class="card_detalle">
			<button class="detalle_regresar">X</button>
			<div class="detalle_img">
				<img
					class="box"
					src="${box}"
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
					<button class="detalle_btn__eliminar" data-id="${id}">Eliminar</button>
				</div>
			</div>
		</div>
        `;
		cerrar($(".detalle_regresar"));
		cerrar($(".regresar"));
	}, 2700);
};

const cerrar = (btn) => {
	btn.addEventListener("click", () => {
		ocultar($(".detalle")), getCaballeros(urlBase);
	});
};
