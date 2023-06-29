// Event listener for the form
document.getElementById('formCalc').addEventListener('submit', calcularIMC);
// Event listener for the reset button
document.getElementById('buttonReset').addEventListener('click', resetAll);

// calcularIMC function receives the "peso" and "altura" values and calculates the BMI
function calcularIMC(event) {
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;

    if(peso === NaN || altura === NaN) {
        alert("Por favor, preencha todos os campos");
        return resetAll();
    }

    event.preventDefault();

    let imc;
    if (document.getElementById("imc1").checked) {
        imc = peso / Math.pow(altura, 2);
    } else if (document.getElementById("imc2").checked) {
        imc = (1.3 * peso) / Math.pow(altura, 2.5);
    }

    const imcFixed = imc.toFixed(2);
    const imcElement = document.getElementById("imcElement");
    imcElement.innerText = imcFixed;

    classificarIMC(imc);
}

// classificarIMC function receives the BMI value and classifies it
function classificarIMC(imc) {
    const imcClassElement = document.getElementById("imcClassElement");
    const imcClassLibrary = {
        subpeso : "você pode estar abaixo do peso ideal",
        pesoIdeal : "você pode estar no peso ideal",
        sobrepeso : "você pode estar em sobrepeso",
        obesidade1 : "você pode estar em obesidade grau 1",
        obesidade2 : "você pode estar em obesidade grau 2",
        obesidade3 : "você pode estar em obesidade grau 3"
    }
    
    if (imc < 18.5) {
        imcClassElement.innerText = imcClassLibrary.subpeso;
    } else if (imc < 24.9) {
        imcClassElement.innerText = imcClassLibrary.pesoIdeal;
    } else if (imc < 29.9) {
        imcClassElement.innerText = imcClassLibrary.sobrepeso;
    } else if (imc < 34.9) {
        imcClassElement.innerText = imcClassLibrary.obesidade1;
    } else if (imc < 39.9) {
        imcClassElement.innerText = imcClassLibrary.obesidade2;
    } else {
        imcClassElement.innerText = imcClassLibrary.obesidade3;
    }
    
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

// calcularPesoIdeal function receives the "altura" value and calculates the ideal BMI
function calcularPesoIdeal() {
    const altura = document.getElementById("altura").value;
    const elementoSuaAltura = document.getElementById("suaAltura");
    elementoSuaAltura.innerText = altura;

    let pesoIdealMin, pesoIdealMax;
    if (document.getElementById("imc1").checked) {
        pesoIdealMin = 18.5 * Math.pow(altura, 2);
        pesoIdealMax = 25 * Math.pow(altura, 2);
    } else if (document.getElementById("imc2").checked) {
        pesoIdealMin = (18.5 / 1.3) * Math.pow(altura, 2.5);
        pesoIdealMax = (25 / 1.3) * Math.pow(altura, 2.5);
    }        

    const elementoPesoIdealMin = document.getElementById("pesoIdealMin");
    elementoPesoIdealMin.innerText = Math.floor(pesoIdealMin);
    
    const elementoPesoIdealMax = document.getElementById("pesoIdealMax");
    elementoPesoIdealMax.innerText = Math.floor(pesoIdealMax);

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