const API_URL = 'http://localhost:3000/pranchas';

const form = document.getElementById('formPrancha');
const lista = document.getElementById('listaPranchas');

// Função para listar pranchas
async function listarPranchas() {
  try {
    const res = await axios.get(API_URL);
    lista.innerHTML = '';

    res.data.forEach(prancha => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td><input type="text" value="${prancha.nome}" id="nome-${prancha.id}"></td>
        <td><input type="text" value="${prancha.modelo}" id="modelo-${prancha.id}"></td>
        <td><input type="text" value="${prancha.tamanho}" id="tamanho-${prancha.id}"></td>
        <td><input type="text" value="${prancha.tipo}" id="tipo-${prancha.id}"></td>
        <td><input type="number" value="${prancha.preco}" id="preco-${prancha.id}"></td>
        <td>${prancha.status}</td>
        <td>
          <button onclick="atualizarPrancha(${prancha.id})">Atualizar</button>
          <button onclick="deletarPrancha(${prancha.id})">Deletar</button>
        </td>
      `;

      lista.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

// Criar prancha
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const novaPrancha = {
    nome: document.getElementById('nome').value,
    modelo: document.getElementById('modelo').value,
    tamanho: document.getElementById('tamanho').value,
    tipo: document.getElementById('tipo').value,
    preco: parseFloat(document.getElementById('preco').value)
  };

  try {
    await axios.post(API_URL, novaPrancha);
    form.reset();
    listarPranchas();
  } catch (error) {
    console.error(error);
  }
});

// Deletar prancha
async function deletarPrancha(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    listarPranchas();
  } catch (error) {
    console.error(error);
  }
}

// Atualizar prancha
async function atualizarPrancha(id) {
  try {
    const pranchaAtualizada = {
      nome: document.getElementById(`nome-${id}`).value,
      modelo: document.getElementById(`modelo-${id}`).value,
      tamanho: document.getElementById(`tamanho-${id}`).value,
      tipo: document.getElementById(`tipo-${id}`).value,
      preco: parseFloat(document.getElementById(`preco-${id}`).value)
    };

    await axios.put(`${API_URL}/${id}`, pranchaAtualizada);
    listarPranchas();
  } catch (error) {
    console.error(error);
  }
}

// Inicializa lista
listarPranchas();