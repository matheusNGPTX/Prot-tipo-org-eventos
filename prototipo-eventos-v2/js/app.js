const usuarios = [
  { email: "admin@eventos.com", senha: "123", tipo: "admin" },
  { email: "user@eventos.com", senha: "123", tipo: "user" }
];

let eventos = [];
let inscricoes = [];

// Funções de persistência
function salvarEventos() {
  localStorage.setItem("eventos", JSON.stringify(eventos));
}

function carregarEventos() {
  const dados = localStorage.getItem("eventos");
  if (dados) eventos = JSON.parse(dados);
}

function salvarInscricoes() {
  localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
}

function carregarInscricoes() {
  const dados = localStorage.getItem("inscricoes");
  if (dados) inscricoes = JSON.parse(dados);
}

// Login
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    if (usuario.tipo === "admin") {
      window.location.href = "eventos.html";
    } else {
      window.location.href = "inscricoes.html";
    }
  } else {
    document.getElementById("msg").innerText = "Credenciais inválidas!";
  }
});

// Criar eventos (admin)
document.getElementById("eventoForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const data = document.getElementById("data").value;
  const local = document.getElementById("local").value;
  eventos.push({ id: eventos.length+1, titulo, data, local });
  salvarEventos();
  listarEventos();
});

function listarEventos() {
  const lista = document.getElementById("listaEventos");
  if (lista) {
    lista.innerHTML = "";
    eventos.forEach(ev => {
      const li = document.createElement("li");
      li.innerText = ev.titulo + " - " + ev.data + " - " + ev.local;
      lista.appendChild(li);
    });
  }
  const disponiveis = document.getElementById("eventosDisponiveis");
  if (disponiveis) {
    disponiveis.innerHTML = "";
    eventos.forEach(ev => {
      const li = document.createElement("li");
      li.innerHTML = ev.titulo + " - " + ev.data + " - " + ev.local +
        " <button onclick='inscrever("+ev.id+")'>Inscrever-se</button>";
      disponiveis.appendChild(li);
    });
  }
}

function inscrever(eventoId) {
  const ev = eventos.find(e => e.id === eventoId);
  if (ev) {
    inscricoes.push(ev);
    salvarInscricoes();
    listarInscricoes();
  }
}

function listarInscricoes() {
  const lista = document.getElementById("minhasInscricoes");
  if (lista) {
    lista.innerHTML = "";
    inscricoes.forEach(ev => {
      const li = document.createElement("li");
      li.innerText = ev.titulo + " - " + ev.data + " - " + ev.local;
      lista.appendChild(li);
    });
  }
}

// Inicializa dados e listagens
carregarEventos();
carregarInscricoes();
listarEventos();
listarInscricoes();