let numero = "5511978234307"; // profissional (com 55)

let produtos = [];

// BUSCAR PRODUTOS
fetch("https://sheetdb.io/api/v1/ew798pm69vlwl")
.then(res => res.json())
.then(data => {
  produtos = Array.isArray(data) ? data : [];
  mostrar("todos");
  setTimeout(destacarProduto, 500);
})
.catch(() => {
  document.getElementById("lista").innerHTML =
  "<p style='color:red;text-align:center'>Erro ao carregar 😢</p>";
});

// MOSTRAR PRODUTOS
function mostrar(tipo){

  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  produtos.forEach((p, i) => {

    if (!p.nome) return;

    let disponivel =
      (p.disponivel || "").toLowerCase().trim() === "sim";

    if (tipo === "disponiveis" && !disponivel) return;

    let id = "produto-" + i;

    lista.innerHTML += `
      <div class="produto" id="${id}">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>${p.preco}</p>

        ${
          disponivel
          ? `
            <button onclick="pedir('${p.nome}','${id}')">
              Pedir
            </button>
          `
          : `
            <div class="indisponivel-box">
              <p>❌ Não temos hoje</p>

              <button onclick="mostrar('disponiveis')">
                📅 Ver catálogo do dia
              </button>

              <button onclick="agendar('${p.nome}')">
                💖 Agendar produto
              </button>
            </div>
          `
        }
      </div>
    `;

  });
}

// WHATSAPP (COM LINK BONITO)
function pedir(nome, id){

  let link =
    window.location.origin +
    window.location.pathname +
    "#" + id;

  let msg =
    "Olá! Gostaria de pedir o seguinte produto:\n\n" +
    nome +
    "\n\nLink do produto:\n" +
    link;

  window.open(
    "https://wa.me/" + numero +
    "?text=" + encodeURIComponent(msg)
  );
}

// AGENDAR
function agendar(nome){

  let msg =
    "Olá! Gostaria de agendar o produto:\n\n" +
    nome;

  window.open(
    "https://wa.me/" + numero +
    "?text=" + encodeURIComponent(msg)
  );
}

// DESTACAR PRODUTO
function destacarProduto(){

  let hash = window.location.hash;
  if (!hash) return;

  let el = document.querySelector(hash);
  if (!el) return;

  el.classList.add("destaque");

  el.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

window.addEventListener("load", destacarProduto);