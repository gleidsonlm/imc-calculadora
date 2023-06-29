// Event listener for the form
document.getElementById('formCalc').addEventListener('submit', CalculateBMI);
// Event listener for the reset button
document.getElementById('buttonReset').addEventListener('click', resetAll);

// CalculateBMI function receives the "weight" and "height" values and calculates the BMI
function CalculateBMI(event) {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    if(weight === NaN || height === NaN) {
        alert("Por favor, preencha todos os campos");
        return resetAll();
    }

    event.preventDefault();

    let bmi;
    if (document.getElementById("bmi1").checked) {
        bmi = weight / Math.pow(height, 2);
    } else if (document.getElementById("bmi2").checked) {
        bmi = (1.3 * weight) / Math.pow(height, 2.5);
    }

    const bmiFixed = bmi.toFixed(2);
    const bmiElement = document.getElementById("bmiElement");
    bmiElement.innerText = bmiFixed;

    ClassifyBmi(bmi);
}

// ClassifyBmi function receives the BMI value and classifies it
function ClassifyBmi(bmi) {
    const bmiClassificationElement = document.getElementById("bmiClassificationElement");
    const bmiClassification = {
        underweight : {
            min: 0,
            max: 18.5,
            message: "você pode estar abaixo do peso ideal"
        },
        idealweight : {
            min: 18.5,
            max: 24.9,
            message: "você pode estar no peso ideal"
        },
        overweight : {
            min: 25,
            max: 29.9,
            message: "você pode estar em sobrepeso"
        },
        obesity1 : {
            min: 30,
            max: 34.9,
            message: "você pode estar em obesidade grau 1"
        },
        obesity2 : {
            min: 35,
            max: 39.9,
            message: "você pode estar em obesidade grau 2"
        },
        obesity3 : {
            min: 40,
            max: 40,
            message: "você pode estar em obesidade grau 3"
        }
    }
    
    if (bmi < bmiClassification.underweight.max) {
        bmiClassificationElement.innerText = bmiClassification.underweight.message;
    } else if (bmi < bmiClassification.idealweight.max) {
        bmiClassificationElement.innerText = bmiClassification.idealweight.message;
    } else if (bmi < bmiClassification.overweight.max) {
        bmiClassificationElement.innerText = bmiClassification.overweight.message;
    } else if (bmi < bmiClassification.obesity1.max) {
        bmiClassificationElement.innerText = bmiClassification.obesity1.message;
    } else if (bmi < bmiClassification.obesity2.max) {
        bmiClassificationElement.innerText = bmiClassification.obesity2.message;
    } else {
        bmiClassificationElement.innerText = bmiClassification.obesity3.message;
    }
    
    decorateClassificationBackground(bmi);
}

// decorateClassificationBackground function receives the BMI value and decorates the background of the classification
function decorateClassificationBackground(bmi) {
    const classificationBackground = document.getElementById("bmiElement");
    
    if (bmi < 18.5) {
        classificationBackground.classList.add("notice");
    } else if (bmi < 24.9) {
        classificationBackground.classList.add("log");
    } else if (bmi < 29.9) {
        classificationBackground.classList.add("notice");
    } else if (bmi < 34.9) {
        classificationBackground.classList.add("warning");
    } else if (bmi < 39.9) {
        classificationBackground.classList.add("alert");
    } else {
        classificationBackground.classList.add("alert");
    }
    
    calcularPesoIdeal()
}

// calcularPesoIdeal function receives the "height" value and calculates the ideal BMI
function calcularPesoIdeal() {
    const height = document.getElementById("height").value;
    const heightElement = document.getElementById("heightElement");
    heightElement.innerText = height;

    let idealWeightMin, idealWeightMax;
    if (document.getElementById("bmi1").checked) {
        idealWeightMin = 18.5 * Math.pow(height, 2);
        idealWeightMax = 25 * Math.pow(height, 2);
    } else if (document.getElementById("bmi2").checked) {
        idealWeightMin = (18.5 / 1.3) * Math.pow(height, 2.5);
        idealWeightMax = (25 / 1.3) * Math.pow(height, 2.5);
    }        

    const minIdealWeightElement = document.getElementById("idealWeightMin");
    minIdealWeightElement.innerText = Math.floor(idealWeightMin);
    
    const maxIdealWeightElement = document.getElementById("idealWeightMax");
    maxIdealWeightElement.innerText = Math.floor(idealWeightMax);

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
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("bmiElement").innerText = "";
    document.getElementById("bmiClassificationElement").innerText = "";
    const result = document.getElementById("result");
    result.classList.add("hidden");
    const calc = document.getElementById("calc");
    calc.classList.remove("hidden");
    const classificationBackground = document.getElementById("bmiClassificationElement");
    classificationBackground.classList.remove("notice");
    classificationBackground.classList.remove("log");
    classificationBackground.classList.remove("warning");
    classificationBackground.classList.remove("alert");
}
