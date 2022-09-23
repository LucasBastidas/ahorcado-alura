const palabras = ["casa", "perro", "playa", "monitor", "castillo"];
var palabraSecreta = "";
var letrasDivididas = [];
var juegoIniciado = false;
var palabraCambiando = "";
var palabraArray = [];
var errores = [];
var letrasQueNoestan = [];
function agregarPalabra(palabra, callback) {
	palabras.push(palabra);
	callback();
}
const title = document.querySelector(".title");
const palabraEscondida = document.querySelector(".palabra-escondida");
const barritas = document.querySelector(".letras-cont");
const addWordFormCont = document.querySelector(".form-cont");
var erroresContador = document.querySelector(".errores");

//BOTONES
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");
const addWordButton = document.querySelector(".add-word-button");
const desistirButton = document.querySelector(".desistir-button");
const cancelFormButton = document.querySelector(".cancel-button");

//ADDWORD FORM
const addWordForm = document.querySelector(".form");

startButton.addEventListener("click", () => {
	const dado = Math.round(Math.random() * (palabras.length - 1));
	// barritas.textContent = palabras[dado];
	const palabraSorteada = palabras[dado];
	palabraSecreta = palabraSorteada;
	mostrarPalabraSecreta(palabraSorteada);
	juegoIniciado = true;
	document.querySelector(".ahorcado1").style.display = "block";
	document.querySelector(".buttons").style["margin-top"] = "100px";
	startButton.style.display = "none";
	addWordButton.style.display = "none";
	restartButton.style.display = "block";
	desistirButton.style.display = "block";
	title.style.display = "none";
});

restartButton.addEventListener("click", () => {
	window.location.reload();
});

desistirButton.addEventListener("click", () => {
	document.querySelector(".resultado").textContent =
		palabraSecreta.toUpperCase();
	juegoIniciado = false;
	barritas.style.display = "none";
	restartButton.textContent = "Volver a jugar";
	restartButton.style.display = "block";
	desistirButton.style.display = "none";
});

addWordButton.addEventListener("click", () => {
	addWordFormCont.style.display = "flex";
});

cancelFormButton.addEventListener("click", () => {
	addWordFormCont.style.display = "none";
});

addWordForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const newWord = e.target.word.value;
	if (newWord.length > 3 && newWord.length < 8) {
		palabras.push(newWord);
		addWordFormCont.style.display = "none";
	}
});

function mostrarPalabraSecreta(palabra) {
	palabraCompleta = palabra;
	const letras = palabra.split("");
	letrasDivididas = letras;
	console.log(letras);
	var palabraSecreta = [];
	for (let index = 0; index < letras.length; index++) {
		palabraSecreta.push("_");
	}
	barritas.textContent = palabraSecreta.join(" ");
	// for (let index = 0; index < array.length; index++) {
	// 	const element = array[index];
	// }
	palabraCambiando = palabraSecreta.join(" ");
	crearPalabraVacía(palabra);
}

function crearPalabraVacía(array) {
	for (let index = 0; index < array.length; index++) {
		palabraArray.push("_");
	}
	console.log(palabraArray);
}

//FUNCION CAMBIAR LETRA
function completarLetras(positions, letra) {
	if (positions.length > 1) {
		var palabraNueva = palabraArray;
		console.log("hay mas de 1 ");
		console.log("holaaa");
		for (var i = 0; i < palabraArray.length; i++) {
			for (var j = 0; j < positions.length; j++) {
				if (i == positions[j]) {
					palabraNueva[i] = letra;
				}
			}
			palabraEscondida.textContent = palabraNueva.join("   ");
			barritas.style.display = "none";
		}
	} else {
		console.log("hay 1");
		palabraArray[positions[0]] = letra;
		palabraEscondida.textContent = palabraArray.join("    ");
		barritas.style.display = "none";
	}
}

function comprobarLetra(letra) {
	console.log("tu letra", letra);
	var respuesta = "";
	var posicion = [];

	for (let index = 0; index < palabraSecreta.length; index++) {
		if (palabraSecreta[index] == letra) {
			respuesta = "esta";
			posicion.push(index);
		}
	}
	if (respuesta == "esta") {
		console.log(posicion);
		completarLetras(posicion, letra);
		if (comprobarVictoria()) {
			juegoIniciado = false;
			restartButton.textContent = "Volver a jugar";
			restartButton.style.display = "block";
			desistirButton.style.display = "none";
			alert("GANASTE");
		}
	} else {
		if (comprobarSiEstaEnError(letra)) {
			console.log("YA PROBASTE ESA LETRA");
		} else {
			errores.push(letra);
			if (errores.length == 6) {
				erroresContador.textContent = ("errores:", errores);
				elegirImagenAhorcado();
				palabraEscondida.style.display = "none";
				barritas.style.display = "none";
				document.querySelector(".resultado").textContent = palabraSecreta;
				juegoIniciado = false;
				restartButton.textContent = "Volver a jugar";
				restartButton.style.display = "block";
				desistirButton.style.display = "none";
				alert("Perdiste. Volver a jugar");
			} else {
				erroresContador.textContent = ("errores:", errores);
				elegirImagenAhorcado();
				console.log(palabraSecreta);
			}
		}
	}
}

function comprobarSiEstaEnError(letra) {
	for (let i = 0; i < errores.length; i++) {
		if (errores[i] == letra) {
			return true;
			break;
		} else {
			return false;
		}
	}
}

(function index() {
	document.addEventListener("keypress", (e) => {
		if (juegoIniciado) {
			const letraPresionada = e.key.toLowerCase();
			comprobarLetra(letraPresionada);
		}
	});
	if (errores.length == 2) {
		alert("PERDISTE");
	}
})();

//SELECCIONAR LAS IMAGENES DEL AHORCADO
const seisVidas = document.querySelector(".ahorcado1");
const cincoVidas = document.querySelector(".ahorcado2");
const cuatroVidas = document.querySelector(".ahorcado3");
const tresVidas = document.querySelector(".ahorcado4");
const dosVidas = document.querySelector(".ahorcado5");
const unaVida = document.querySelector(".ahorcado6");
const cerVidas = document.querySelector(".ahorcado7");

function elegirImagenAhorcado() {
	if (errores.length == 0) {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"block");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"none");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"none");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"none");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"none");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"none");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"none");
	} else if (errores.length == 1) {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"none");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"block");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"none");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"none");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"none");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"none");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"none");
	} else if (errores.length == 2) {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"none");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"none");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"block");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"none");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"none");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"none");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"none");
	} else if (errores.length == 3) {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"none");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"none");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"none");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"block");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"none");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"none");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"none");
	} else if (errores.length == 4) {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"none");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"none");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"none");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"none");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"block");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"none");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"none");
	} else if (errores.length == 5) {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"none");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"none");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"none");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"none");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"none");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"block");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"none");
	} else {
		const seisVidas = (document.querySelector(".ahorcado1").style.display =
			"none");
		const cincoVidas = (document.querySelector(".ahorcado2").style.display =
			"none");
		const cuatroVidas = (document.querySelector(".ahorcado3").style.display =
			"none");
		const tresVidas = (document.querySelector(".ahorcado4").style.display =
			"none");
		const dosVidas = (document.querySelector(".ahorcado5").style.display =
			"none");
		const unaVida = (document.querySelector(".ahorcado6").style.display =
			"none");
		const cerVidas = (document.querySelector(".ahorcado7").style.display =
			"block");
	}
}

function comprobarVictoria() {
	for (let i = 0; i < palabraArray.length; i++) {
		var ganaste = true;
		if (palabraArray[i] == "_") {
			ganaste = false;
			break;
		}
	}
	return ganaste;
}
