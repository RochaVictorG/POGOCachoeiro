
// FOOTER
const mensagem = '© 2024 POGO Cachoeiro | Desenvolvido por: João Victor G. Rocha';
document.getElementById('footer').innerHTML = mensagem;




// Elementos do DOM
const form = document.getElementById('trainer-form');
const trainerList = document.getElementById('trainer-list');

// Dados dos treinadores
let trainers = [];

// Função para salvar os dados no localStorage
function saveTrainers() {
  localStorage.setItem('trainers', JSON.stringify(trainers));
}

// Função para carregar os dados do localStorage
function loadTrainers() {
  const savedTrainers = localStorage.getItem('trainers');
  if (savedTrainers) {
    trainers = JSON.parse(savedTrainers);
    renderTrainers();
  }
}

// Função para renderizar os treinadores
function renderTrainers() {
  trainerList.innerHTML = '<h2>Lista de Treinadores</h2>';
  trainers.forEach(trainer => {
    const card = document.createElement('div');
    card.className = 'trainer-card';

    const teamImage = {
      team1: 'https://via.placeholder.com/100?text=Valor',
      team2: 'https://via.placeholder.com/100?text=Time+2',
      team3: 'https://via.placeholder.com/100?text=Time+3',
    }[trainer.team];

    card.innerHTML = `
      <img src="${teamImage}" alt="${trainer.team}">
      <p><strong>Nome:</strong> ${trainer.name}</p>
      <p><strong>Código:</strong> ${trainer.code}</p>
      <p><strong>Time:</strong> ${trainer.team}</p>
    `;

    trainerList.appendChild(card);
  });
}

// Evento de envio do formulário
form.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const code = document.getElementById('code').value.trim();
  const team = document.getElementById('team').value;

  trainers.push({ name, code, team });
  saveTrainers();
  renderTrainers();

  form.reset();
});

// Carregar os dados ao inicializar a página
loadTrainers();

// Função para renderizar os treinadores (atualizada para incluir o botão de exclusão)
function renderTrainers() {
    trainerList.innerHTML = '<h2>Lista de Treinadores</h2>';
    trainers.forEach((trainer, index) => {
      const card = document.createElement('div');
      card.className = 'trainer-card';
  
      const teamImage = {
        team1: 'https://via.placeholder.com/100?text=Valor',
        team2: 'https://via.placeholder.com/100?text=Time+2',
        team3: 'https://via.placeholder.com/100?text=Time+3',
      }[trainer.team];
  
      card.innerHTML = `
        <img src="${teamImage}" alt="${trainer.team}">
        <p><strong>Nome:</strong> ${trainer.name}</p>
        <p><strong>Código:</strong> ${trainer.code}</p>
        <p><strong>Time:</strong> ${trainer.team}</p>
        <button class="delete-button" data-index="${index}">Excluir</button>
      `;
  
      trainerList.appendChild(card);
    });
  
    // Adicionar evento aos botões de exclusão
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteTrainer);
    });
  }
  
  // Função para excluir um treinador
  function deleteTrainer(event) {
    const index = event.target.getAttribute('data-index');
    trainers.splice(index, 1); // Remove o treinador da lista
    saveTrainers(); // Atualiza o localStorage
    renderTrainers(); // Atualiza a exibição
  }

  // Defina uma senha de administrador
const ADMIN_PASSWORD = "12345";

// Função para solicitar confirmação com senha antes de excluir
function deleteTrainer(event) {
  const index = event.target.getAttribute('data-index');

  // Solicitar a senha
  const enteredPassword = prompt("Digite a senha de administrador para confirmar a exclusão:");

  // Verificar a senha
  if (enteredPassword === ADMIN_PASSWORD) {
    trainers.splice(index, 1); // Remove o treinador da lista
    saveTrainers(); // Atualiza o localStorage
    renderTrainers(); // Atualiza a exibição
    alert("Treinador excluído com sucesso!");
  } else {
    alert("Senha incorreta. A exclusão não foi realizada.");
  }
}



// Função para criar um QR Code
function generateQRCode(text, container) {
    QRCode.toDataURL(text, { width: 100, margin: 2 }, (err, url) => {
      if (err) return console.error(err);
      const qrImage = document.createElement('img');
      qrImage.src = url;
      qrImage.className = 'qr-code';
      container.prepend(qrImage); // Adiciona o QR Code no topo do cartão
    });
  }
  
  // Função para renderizar os treinadores (atualizada)
  function renderTrainers() {
    trainerList.innerHTML = '<h2>Lista de Treinadores</h2>';
    trainers.forEach((trainer) => {
      const card = document.createElement('div');
      card.className = 'trainer-card';
  
      const teamImage = {
        team1: 'https://via.placeholder.com/100?text=Time+1',
        team2: 'https://via.placeholder.com/100?text=Time+2',
        team3: 'https://via.placeholder.com/100?text=Time+3',
      }[trainer.team];
  
      card.innerHTML = `
        <p><strong>Nome:</strong> ${trainer.name}</p>
        <p><strong>Código:</strong> ${trainer.code}</p>
        <p><strong>Time:</strong> ${trainer.team}</p>
        <img src="${teamImage}" alt="${trainer.team}" class="team-image">
      `;
  
      trainerList.appendChild(card);
  
      // Gera o QR Code do código do treinador
      generateQRCode(trainer.code, card);
    });
  }