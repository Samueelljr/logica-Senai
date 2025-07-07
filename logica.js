// const redirectCalculationHouseofWork = () => {
//     window.location.replace(Calculo.html)
// }

// function enviar () {
//     document.getElementById('meu-formulario').addEventListener('submit', function(e) {
//         e.preventDefault();
//         window.location.href = 'calculo.html'
//     })
// }

function nextComponent() {
  document.getElementById("form").addEventListener("click", function (event) {
    event.preventDefault();
    const comp1 = document.getElementById("component1");
    const comp2 = document.getElementById("component2");
    const comp3 = document.getElementById("component3");

    if (comp1.classList.contains("active")) {
      comp1.classList.remove("active");
      comp1.classList.add("disable");
      comp2.classList.add("active");
    }
  });
}

function cal() {
  const inputValue1 = document.getElementById("distanciaKm");
  const value1 = inputValue1.value;
  const inputValue2 = document.getElementById("consumoMedio");
  const value2 = inputValue2.value;
  const resultado = value1 + value2;
  return resultado;
}
