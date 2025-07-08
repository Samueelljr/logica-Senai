let passoAtual = 1;
const totalPassos = 7;

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
  if (passoAtual < totalPassos) {
    passoAtual++;
    nextComponent(passoAtual)
  } return
}
