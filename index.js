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
	palabraEscondida.style.display = "none";
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
	// console.log(letras);
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
	// console.log(palabraArray);
}

//FUNCION CAMBIAR LETRA: va mostrando las letras que se van acertando
function completarLetras(positions, letra) {
	if (positions.length > 1) {
		var palabraNueva = palabraArray;
		// console.log("hay mas de 1 ");
		for (var i = 0; i < palabraArray.length; i++) {
			for (var j = 0; j < positions.length; j++) {
				if (i == positions[j]) {
					palabraNueva[i] = letra.toUpperCase();
				}
			}
			palabraEscondida.textContent = palabraNueva.join("   ");
			barritas.style.display = "none";
		}
	} else {
		// console.log("hay 1");
		palabraArray[positions[0]] = letra.toUpperCase();
		palabraEscondida.textContent = palabraArray.join("    ");
		barritas.style.display = "none";
	}
}

//COMPRUEBA SI LA LETRA ESTA EN LA PALABRA Y UTILIZA LA FUNCION PARA SABER SI ESTA EN EL ARRAY ERRORES
function comprobarLetra(letra) {
	// console.log("tu letra", letra);
	var respuesta = "";
	var posicion = [];

	for (let index = 0; index < palabraSecreta.length; index++) {
		if (palabraSecreta[index] == letra) {
			respuesta = "esta";
			posicion.push(index);
		}
	}
	if (respuesta == "esta") {
		// console.log(posicion);
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
			// console.log("YA PROBASTE ESA LETRA");
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
				// console.log(palabraSecreta);
			}
		}
	}
}

//COMPRUEBA SI LA LETRA YA ESTA EN LOS ERRORES
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

const letrasPermitidas = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"ñ",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

(function index() {
	document.addEventListener("keypress", (e) => {
		if (juegoIniciado) {
			const key = e.key;
			if (letrasPermitidas.includes(key.toLowerCase())) {
				const letraPresionada = e.key.toLowerCase();
				comprobarLetra(letraPresionada);
			} else {
				alert("Caracter no permitido");
			}
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

//TECLADO EN PANTALLA
var keyboardOn = false;
const keyboard = document.querySelector(".teclado-gral");
const buttonOpenKeyboard = document.querySelector(".button-teclado");

buttonOpenKeyboard.addEventListener("click", () => {
	if (juegoIniciado) {
		if (keyboardOn == false) {
			keyboard.style.display = "flex";
			keyboardOn = true;
		} else {
			keyboard.style.display = "none";
			keyboardOn = false;
		}
	} else {
		alert("Primero inicia el juego para activar el teclado virtual");
	}
});

const letraA = document.querySelector(".A");
const letraB = document.querySelector(".B");
const letraC = document.querySelector(".C");
const letraD = document.querySelector(".D");
const letraE = document.querySelector(".E");
const letraF = document.querySelector(".F");
const letraG = document.querySelector(".G");
const letraH = document.querySelector(".H");
const letraI = document.querySelector(".I");
const letraJ = document.querySelector(".J");
const letraK = document.querySelector(".K");
const letraL = document.querySelector(".L");
const letraM = document.querySelector(".M");
const letraN = document.querySelector(".N");
const letraÑ = document.querySelector(".Ñ");
const letraO = document.querySelector(".O");
const letraP = document.querySelector(".P");
const letraQ = document.querySelector(".Q");
const letraR = document.querySelector(".R");
const letraS = document.querySelector(".S");
const letraT = document.querySelector(".T");
const letraU = document.querySelector(".U");
const letraV = document.querySelector(".V");
const letraW = document.querySelector(".W");
const letraX = document.querySelector(".X");
const letraY = document.querySelector(".Y");
const letraZ = document.querySelector(".Z");

letraA.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "a" });
	document.dispatchEvent(presionarTecla);
});

letraB.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "b" });
	document.dispatchEvent(presionarTecla);
});

letraC.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "c" });
	document.dispatchEvent(presionarTecla);
});

letraD.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "d" });
	document.dispatchEvent(presionarTecla);
});

letraE.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "e" });
	document.dispatchEvent(presionarTecla);
});

letraF.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "f" });
	document.dispatchEvent(presionarTecla);
});

letraG.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "g" });
	document.dispatchEvent(presionarTecla);
});

letraH.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "h" });
	document.dispatchEvent(presionarTecla);
});

letraI.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "i" });
	document.dispatchEvent(presionarTecla);
});

letraJ.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "j" });
	document.dispatchEvent(presionarTecla);
});

letraK.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "k" });
	document.dispatchEvent(presionarTecla);
});

letraL.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "l" });
	document.dispatchEvent(presionarTecla);
});

letraM.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "m" });
	document.dispatchEvent(presionarTecla);
});

letraN.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "n" });
	document.dispatchEvent(presionarTecla);
});

letraÑ.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "ñ" });
	document.dispatchEvent(presionarTecla);
});

letraO.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "o" });
	document.dispatchEvent(presionarTecla);
});

letraP.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "p" });
	document.dispatchEvent(presionarTecla);
});

letraQ.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "q" });
	document.dispatchEvent(presionarTecla);
});

letraR.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "r" });
	document.dispatchEvent(presionarTecla);
});

letraS.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "s" });
	document.dispatchEvent(presionarTecla);
});

letraT.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "t" });
	document.dispatchEvent(presionarTecla);
});

letraU.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "u" });
	document.dispatchEvent(presionarTecla);
});

letraV.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "v" });
	document.dispatchEvent(presionarTecla);
});

letraW.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "w" });
	document.dispatchEvent(presionarTecla);
});

letraX.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "x" });
	document.dispatchEvent(presionarTecla);
});

letraY.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "y" });
	document.dispatchEvent(presionarTecla);
});

letraZ.addEventListener("click", (e) => {
	let presionarTecla = new KeyboardEvent("keypress", { key: "z" });
	document.dispatchEvent(presionarTecla);
});

// letraM.addEventListener("click", (e) => {
// 	let presionarTecla = new KeyboardEvent("keypress", { key: "m" });
// 	document.dispatchEvent(presionarTecla);
// });
