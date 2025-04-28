// Dados dos livros
const livros = [
    {
        id: 1,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        ano: 1899,
        imagem: "https://www.moderna.com.br/data/files/7D/F7/21/2F/18ABD410B9C29BD438A808A8/Capa_Dom_Casmurro-1.jpg"
    },
    {
        id: 2,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        ano: 1943,
        imagem: "https://s5.static.brasilescola.uol.com.br/be/2023/09/capa-do-livro-o-pequeno-principe-de-antoine-de-saint-exupery-publicado-pela-faro-editorial.jpg"
    },
    {
        id: 3,
        titulo: "1984",
        autor: "George Orwell",
        ano: 1949,
        imagem: "https://cdl-static.s3-sa-east-1.amazonaws.com/covers/200/9788535932966/1984-edicao-especial.jpg"
    },
    {
        id: 4,
        titulo: "A Revolução dos Bichos",
        autor: "George Orwell",
        ano: 1945,
        imagem: "https://s3.static.brasilescola.uol.com.br/be/2025/03/capa-do-livro-a-revolucao-dos-bichos-de-george-orwell-publicado-pela-editora-principis.jpg"
    },
    {
        id: 5,
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        ano: 1937,
        imagem: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg"
    },
    {
        id: 6,
        titulo: "O Senhor dos Anéis",
        autor: "J.R.R. Tolkien",
        ano: 1954,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_833133-MLU74993414208_032024-O.webp"
    },
    {
        id: 7,
        titulo: "Orgulho e Preconceito",
        autor: "Jane Austen",
        ano: 1813,
        imagem: "https://s3.static.brasilescola.uol.com.br/be/2024/01/capa-do-livro-orgulho-e-preconceito-de-jane-austen-publicado-pela-editora-antofagica.jpg"
    },
    {
        id: 8,
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        ano: 1997,
        imagem: "https://imagens.disal.com.br/produtos/normal/1169793.jpg"
    },
    {
        id: 9,
        titulo: "O Código Da Vinci",
        autor: "Dan Brown",
        ano: 2003,
        imagem: "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg"
    },
    {
        id: 10,
        titulo: "A Menina que Roubava Livros",
        autor: "Markus Zusak",
        ano: 2005,
        imagem: "https://images.tcdn.com.br/img/img_prod/1149500/180_a_menina_que_roubava_livros_991869_1_e4957470d7e3a423463305c90ed5a82b.jpg"
    }
];

// Inicializar localStorage
if (!localStorage.getItem('locacoes')) {
    localStorage.setItem('locacoes', JSON.stringify([]));
}

// Carregar livros na tela
function carregarLivros() {
    const container = document.getElementById('livros-container');
    if (!container) return;

    container.innerHTML = '';
    livros.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <button onclick="abrirModalDetalhes(${livro.id})">Ver Detalhes</button>
        `;
        container.appendChild(card);
    });
}

// Abrir modal de detalhes
function abrirModalDetalhes(idLivro) {
    const livro = livros.find(l => l.id === idLivro);
    if (!livro) return;

    document.getElementById('modal-titulo').innerText = livro.titulo;
    document.getElementById('modal-body').innerHTML = `
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
    `;
    document.getElementById('modal-imagem').src = livro.imagem;

    document.getElementById('livro-id').value = livro.id;
    document.getElementById('livro-titulo').value = livro.titulo;

    document.getElementById('modal-detalhes').style.display = 'block';
}

// Fechar modais
document.querySelectorAll('.close').forEach(btn => {
    btn.onclick = () => {
        document.getElementById('modal-detalhes').style.display = 'none';
        document.getElementById('modal-locacao').style.display = 'none';
    };
});

// Botão locar
const btnLocar = document.getElementById('btn-locar');
if (btnLocar) {
    btnLocar.onclick = () => {
        document.getElementById('modal-detalhes').style.display = 'none';
        document.getElementById('modal-locacao').style.display = 'block';
    };
}

// Registrar locação
const formLocacao = document.getElementById('form-locacao');
if (formLocacao) {
    formLocacao.addEventListener('submit', function(e) {
        e.preventDefault();

        const locacoes = JSON.parse(localStorage.getItem('locacoes'));
        const novaLocacao = {
            livro: document.getElementById('livro-titulo').value,
            locatario: document.getElementById('locatario').value,
            cpf: document.getElementById('cpf').value,
            dataLocacao: document.getElementById('data-locacao').value,
            dataDevolucao: document.getElementById('data-devolucao').value
        };
        locacoes.push(novaLocacao);
        localStorage.setItem('locacoes', JSON.stringify(locacoes));

        alert('Locação registrada com sucesso!');
        document.getElementById('modal-locacao').style.display = 'none';
        this.reset();
    });
}

// Carregar locações
function carregarLocacoes() {
    const tabela = document.querySelector('#tabela-locacoes tbody');
    if (!tabela) return;

    tabela.innerHTML = '';
    const locacoes = JSON.parse(localStorage.getItem('locacoes'));
    locacoes.forEach(locacao => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${locacao.livro}</td>
            <td>${locacao.locatario}</td>
            <td>${locacao.cpf}</td>
            <td>${locacao.dataLocacao}</td>
            <td>${locacao.dataDevolucao}</td>
        `;
        tabela.appendChild(linha);
    });
}

// Carregamento inicial
document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
    carregarLocacoes();
});