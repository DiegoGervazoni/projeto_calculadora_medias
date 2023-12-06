const form = document.getElementById("form-atividade");
const imgAprovado =
  '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado =
  '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
let linhas = "";
const atividades = [];
const notas = [];
const spanAprovado = '<span class=" resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class=" resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  adicionarLinha();
  atualizaTabela();
  atualizaMediaFinal();
  calculoMediaFinal();
});

function adicionarLinha() {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");
  
  let nomeAtividade = inputNomeAtividade.value.trim();

  if (atividades.includes(nomeAtividade)) {
    alert(`A atividade ${nomeAtividade} já foi adicionada!`);
  } else if (nomeAtividade === ''){
    alert('O nome da atividade não pode ser vazio!')
  } else {
    atividades.push(nomeAtividade.trim()); // trim() remove espaços em branco do início e do fim da string
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = "<tr>";
    linha += `<td>${nomeAtividade}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // if ternário
    linha += "</tr>";

    linhas += linha;
  }

  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
}

function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML += linhas;
  linhas = "";
}

function atualizaMediaFinal() {
  const mediaFinal = calculoMediaFinal();

  document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2);
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculoMediaFinal() {
  let somaDasNotas = 0;

  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }

  return somaDasNotas / notas.length;
}
