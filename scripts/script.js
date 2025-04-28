// Função para validar CPF
function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

// Função para fechar modais
function fecharModal(modal) {
    modal.style.display = 'none';
}

// Função para carregar locações do LocalStorage
function carregarLocacoes() {
    return JSON.parse(localStorage.getItem('locacoes')) || [];
}

// Função para salvar locações no LocalStorage
function salvarLocacoes(locacoes) {
    localStorage.setItem('locacoes', JSON.stringify(locacoes));
}