const livros = [
    { id: 1, titulo: "Dom Quixote", autor: "Miguel de Cervantes" },
    { id: 2, titulo: "1984", autor: "George Orwell" },
    { id: 3, titulo: "A Revolução dos Bichos", autor: "George Orwell" },
    { id: 4, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
    { id: 5, titulo: "Orgulho e Preconceito", autor: "Jane Austen" },
    { id: 6, titulo: "O Hobbit", autor: "J.R.R. Tolkien" },
    { id: 7, titulo: "Moby Dick", autor: "Herman Melville" },
    { id: 8, titulo: "A Metamorfose", autor: "Franz Kafka" },
    { id: 9, titulo: "Grande Sertão: Veredas", autor: "João Guimarães Rosa" },
    { id: 10, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling" }
];


let locacoes = [
    { id: 1, livro: "Harry Potter e a Pedra Filosofal", leitor: "Ana", cpf: "30834974827", data: "23/04/2025", previsao: "24/04/2025", devolvido: true },
    { id: 2, livro: "Harry Potter e a Pedra Filosofal", leitor: "Marcelo", cpf: "30834974800", data: "23/04/2025", previsao: "27/04/2025", devolvido: false },
    { id: 3, livro: "O Pequeno Príncipe", leitor: "Arnaldo", cpf: "308349748141", data: "21/04/2025", previsao: "25/04/2025", devolvido: false },
    { id: 4, livro: "1984", leitor: "Ana", cpf: "30834974827", data: "23/04/2025", previsao: "24/04/2025", devolvido: false }
];
function renderTable(filtro = "") {
    const tabela = document.querySelector("#tabela-locacoes tbody");
    tabela.innerHTML = ""; // Limpa a tabela antes de renderizar

    locacoes
        .filter(loc => {
            const filtroTrim = filtro.trim(); // Só tira espaços

            // Se o filtro estiver vazio, mostra todos os registros
            if (filtroTrim === "") return true;

            // Se o filtro é um número, compara ID
            if (!isNaN(filtroTrim)) {
                return loc.id === Number(filtroTrim);
            }

            // Senão, compara texto (livro, leitor ou cpf)
            const filtroLower = filtroTrim.toLowerCase();
            return (
                loc.livro.toLowerCase().includes(filtroLower) ||
                loc.leitor.toLowerCase().includes(filtroLower) ||
                loc.cpf.includes(filtroLower)
            );
        })
        .forEach(loc => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${loc.id}</td>
                <td>${loc.livro}</td>
                <td>${loc.leitor}</td>
                <td>${loc.cpf}</td>
                <td>${loc.data}</td>
                <td>${loc.previsao}</td>
                <td>
                    ${loc.devolvido ? loc.data : `<button class="devolver" onclick="devolver(${loc.id})">Devolver</button>`}
                </td>
                <td><button class="excluir" onclick="excluir(${loc.id})">Excluir</button></td>
            `;

            tabela.appendChild(tr);
        });
}


function devolver(id) {
    const locacao = locacoes.find(l => l.id === id);
    if (locacao) {
        locacao.devolvido = true;
        locacao.data = new Date().toLocaleDateString('pt-BR');
        renderTable();
    }
}

function excluir(id) {
    locacoes = locacoes.filter(l => l.id !== id);
    renderTable();
}

function filtrar() {
    const input = document.getElementById("filtro").value;
    renderTable(input);
}

function abrirLivros() {
    alert("Lista de livros:\n\n" + livros.map(l => `${l.titulo} - ${l.autor}`).join("\n"));
}

// Inicia carregando a tabela
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});