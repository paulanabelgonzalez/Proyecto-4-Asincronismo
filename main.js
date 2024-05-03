const $ = (selector) => document.querySelector(selector);

const ocultar = (ocultar) => ocultar.classList.add("hidden");

const mostrar = (ver) => ver.classList.remove("hidden");

const ocultarYMostrar = (ocultar, ver) => {
	ocultar.classList.add("hidden");
	ver.classList.remove("hidden");
};

$(".btn_intro").addEventListener("click", () => {
	ocultarYMostrar($(".logo_intro"), $(".contenedor_nav"));
	ocultar($(".intro"));
});
