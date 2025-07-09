let passoAtual = 1;
const totalPassos = 8;

function nextComponent(passo) {
  for (let i = 1; i <= totalPassos; i++) {
    const componente = document.getElementById(`component${i}`);
    if (componente) {
      componente.classList.remove('active');
      componente.classList.add('component');
    }
  }
  const componenteAtivo = document.getElementById(`component${passo}`);
  if (componenteAtivo) {
    componenteAtivo.classList.remove('component');
    componenteAtivo.classList.add('active');
  }
}
function next() {

  const currentComponent = document.querySelector('.active');
  const currentId = currentComponent?.id;

  // Validação apenas na etapa correta
  if (currentId === 'component1') {
    const distkm = parseFloat(document.getElementById("distanciaKm").value);
    if (isNaN(distkm) || distkm <= 0) {
      alert("Preencha a distância corretamente.");
      return;
    }
  }

  if (currentId === 'component2') {
    const consumoMedio = parseFloat(document.getElementById("consumoMedio").value);
    if (isNaN(consumoMedio) || consumoMedio <= 0) {
      alert("Preencha o consumo médio corretamente.");
      return;
    }
  }

  if (currentId === 'component3') {
    const quantPostos = parseFloat(document.getElementById("quantPostos").value);
    if (isNaN(quantPostos) || quantPostos <= 0) {
      alert("Informe quantos postos foram pesquisados.");
      return;
    }
  }


  if (passoAtual < totalPassos) {
    passoAtual++;
    nextComponent(passoAtual)
  }
  const nameBtn = document.getElementById("btnNext");
  const inputQntPts = document.getElementById("quantPostos")
  
  if (inputQntPts.value) {
    nameBtn.innerText = "Finalizar"
  }
}

// Função que vai gerar o número de postos
function numberPostos() {
  const numberPostos = parseInt(document.getElementById('quantPostos').value);
  const container = document.getElementById('component4');
  const template = document.getElementById('templatePosto');

  if (isNaN(numberPostos) || numberPostos <= 0) {
    alert("Por favor, digite um número válido maior que 0.");
    return;
  }

  // Limpa todos os filhos, menos o template
  container.querySelectorAll('div:not(#templatePosto)').forEach(el => el.remove());

  for (let i = 1; i <= numberPostos; i++) {
    const clone = template.cloneNode(true);
    clone.style.display = 'block';
    clone.id = `posto${i}`;

    // Atualiza o conteúdo do h4 e input
    const h4 = clone.querySelector('h4');
    const input = clone.querySelector('input');

    h4.textContent = `Digite o valor encontrado (em R$) no posto ${i}.`;
    input.id = `valorPosto${i}`;
    input.value = "";

    container.appendChild(clone);
  }
}

// Função que irá fazer os calculos
function cal() {
  const distkm = parseFloat(document.getElementById("distanciaKm").value);
  const consumoMedio = parseFloat(document.getElementById("consumoMedio").value);
  const quantPostos = parseFloat(document.getElementById("quantPostos").value);

  if (isNaN(distkm) || isNaN(consumoMedio) || isNaN(quantPostos)) {
    alert("Preencha todos os campos corretamente.");
    return
  }

  const necessaryCons = distkm / consumoMedio;

  let values = [];
  for (let i = 1; i <= quantPostos; i++) {
    const input = document.getElementById(`valorPosto${i}`);
    if (input && input.value !== '') {
      const value = parseFloat(input.value);
      if(!isNaN(value)) {
        values.push(value);
      }
    }
  }

  if (values.length === 0) {
    alert("Informe ao menos um valor de posto.")
    return;
  }
  const templatePosto = document.getElementById('templatePosto');
  if (templatePosto.style.display = 'none') {
    templatePosto.style.display = 'block'
  }

  const minValue = Math.min(...values);
  const medValue = values.reduce((acc, val) => acc + val, 0) / values.length;
  const dialyGst = necessaryCons * minValue;

  document.getElementById('component4').style.display = 'none';

  const resultDiv = document.getElementById('templateResult');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
  <h3>Resultado:</h3>
    <p><strong>Consumo necessário:</strong> ${necessaryCons.toFixed(2)} L</p>
    <p><strong>Menor valor pesquisado:</strong> R$ ${minValue.toFixed(2)}</p>
    <p><strong>Média dos valores:</strong> R$ ${medValue.toFixed(2)}</p>
    <p><strong>Gasto diário estimado:</strong> R$ ${dialyGst.toFixed(2)}</p>
  `;
}
