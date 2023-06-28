// Event listener for the form
document.getElementById('formCalc').addEventListener('submit', calcularIMC);
// Event listener for the reset button
document.getElementById('buttonReset').addEventListener('click', resetAll);

// calcularIMC function receives the "peso" and "altura" values and calculates the BMI
function calcularIMC(event) {
    event.preventDefault();
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const imc = peso / (altura * altura);
    const imcFixed = imc.toFixed(2);
    const imcElement = document.getElementById("imcElement");
    imcElement.innerText = imcFixed;

    classificarIMC(imc);
}

// classificarIMC function receives the BMI value and classifies it
function classificarIMC(imc) {
    let classification = "";
    
    if (imc < 18.5) {
        classification = "você pode estar abaixo do peso ideal";
    } else if (imc < 24.9) {
        classification = "você pode estar no peso ideal";
    } else if (imc < 29.9) {
        classification = "você pode estar em sobrepeso";
    } else if (imc < 34.9) {
        classification = "você pode estar em obesidade grau 1";
    } else if (imc < 39.9) {
        classification = "você pode estar em obesidade grau 2";
    } else {
        classification = "você pode estar em obesidade grau 3";
    }
    
    const imcClassElement = document.getElementById("imcClassElement");
    imcClassElement.innerText = classification;

    decorateClassificationBackground(imc);
}

// decorateClassificationBackground function receives the BMI value and decorates the background of the classification
function decorateClassificationBackground(imc) {
    const classificationBackground = document.getElementById("imcElement");
    
    if (imc < 18.5) {
        classificationBackground.classList.add("notice");
    } else if (imc < 24.9) {
        classificationBackground.classList.add("log");
    } else if (imc < 29.9) {
        classificationBackground.classList.add("notice");
    } else if (imc < 34.9) {
        classificationBackground.classList.add("warning");
    } else if (imc < 39.9) {
        classificationBackground.classList.add("alert");
    } else {
        classificationBackground.classList.add("alert");
    }
    
    calcularPesoIdeal()
}

function calcularPesoIdeal() {
    const altura = document.getElementById("altura").value;
    const elementoSuaAltura = document.getElementById("suaAltura");
    elementoSuaAltura.innerText = altura;

    const pesoIdealMin = 18.5 * (altura * altura);
    const pesoIdealMax = 24.9 * (altura * altura);
    
    const elementoPesoIdealMin = document.getElementById("pesoIdealMin");
    elementoPesoIdealMin.innerText = pesoIdealMin.toFixed(0);
    
    const elementoPesoIdealMax = document.getElementById("pesoIdealMax");
    elementoPesoIdealMax.innerText = pesoIdealMax.toFixed(0);

    toggleResult()
}

// toggleResult displays the "result" <section> and hides the "calc" <section>
function toggleResult() {
    const result = document.getElementById("result");
    result.classList.remove("hidden");
    const calc = document.getElementById("calc");
    calc.classList.add("hidden");
}

// resetAll function resets all the values in the form and returns the "result" and "calc" <section> to its original state
function resetAll() {
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("imcElement").innerText = "";
    document.getElementById("imcClassElement").innerText = "";
    const result = document.getElementById("result");
    result.classList.add("hidden");
    const calc = document.getElementById("calc");
    calc.classList.remove("hidden");
    const classificationBackground = document.getElementById("imcClassElement");
    classificationBackground.classList.remove("notice");
    classificationBackground.classList.remove("log");
    classificationBackground.classList.remove("warning");
    classificationBackground.classList.remove("alert");
}