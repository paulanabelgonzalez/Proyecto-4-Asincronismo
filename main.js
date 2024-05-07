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
	}, 2700);
};

const getDetalle = (url) => {
	fetch(url)
		.tehen((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
};

const renderDetalle = (cards) => {
	ocultarYMostrar($(".spinner"), $(".cards"));

	cards.forEach((card) => {
		const {} = card;
	});
};
