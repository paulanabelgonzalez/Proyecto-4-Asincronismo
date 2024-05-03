const $ = (selector) => document.querySelector(selector);

const ocultar = (ocultar) => ocultar.classList.add("hidden");

const mostrar = (ver) => ver.classList.remove("hidden");

const ocultarYMostrar = (ocultar, ver) => {
	ocultar.classList.add("hidden");
	ver.classList.remove("hidden");
};

const salirDeIntro = () => {
	ocultarYMostrar($(".logo_intro"), $(".contenedor_nav"));
	ocultar($(".intro"));
};

const introTerminada = () => {
	$(".video").onended = () => {
		salirDeIntro();
	};
};

introTerminada();

$(".btn_intro").addEventListener("click", salirDeIntro);
