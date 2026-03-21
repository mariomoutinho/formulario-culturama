document.addEventListener('DOMContentLoaded', () => {
  configurarCalculoIdade();
  configurarMascaraTelefone();
  configurarCorFavorita();
});

function configurarCalculoIdade() {
  const dataNascInput = document.getElementById('nascimento');
  const idadeInput = document.getElementById('idade');

  if (!dataNascInput || !idadeInput) return;

  function calcularIdade() {
    const dataNasc = dataNascInput.value;
    if (!dataNasc) return;

    const hoje = new Date();
    const nasc = new Date(dataNasc);

    if (isNaN(nasc.getTime())) return;

    let idade = hoje.getFullYear() - nasc.getFullYear();
    const diferencaMes = hoje.getMonth() - nasc.getMonth();

    if (
      diferencaMes < 0 ||
      (diferencaMes === 0 && hoje.getDate() < nasc.getDate())
    ) {
      idade--;
    }

    idadeInput.value = idade;
    idadeInput.dispatchEvent(new Event('input', { bubbles: true }));
    idadeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  dataNascInput.addEventListener('change', calcularIdade);
  dataNascInput.addEventListener('input', calcularIdade);
}

function configurarMascaraTelefone() {
  const telefoneInput = document.getElementById('telefone');

  if (!telefoneInput) return;

  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length === 0) {
      e.target.value = '';
      return;
    }

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 2) {
      e.target.value = `(${value}`;
    } else if (value.length <= 7) {
      const ddd = value.slice(0, 2);
      const parte1 = value.slice(2);
      e.target.value = `(${ddd}) ${parte1}`;
    } else {
      const ddd = value.slice(0, 2);
      const parte1 = value.slice(2, value.length - 4);
      const parte2 = value.slice(-4);
      e.target.value = `(${ddd}) ${parte1}-${parte2}`;
    }
  });
}

function configurarCorFavorita() {
  const inputCor = document.getElementById('corFavorita');
  const previewCor = document.getElementById('previewCor');
  const codigoCor = document.getElementById('codigoCor');

  if (!inputCor || !previewCor || !codigoCor) return;

  function atualizarCor() {
    const cor = inputCor.value;
    previewCor.style.backgroundColor = cor;
    codigoCor.textContent = cor;
  }

  inputCor.addEventListener('input', atualizarCor);
  inputCor.addEventListener('change', atualizarCor);

  atualizarCor();
}