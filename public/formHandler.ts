document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('numerologyForm') as HTMLFormElement;

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita recarregar a página

    // Capturar os valores dos inputs
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;

    const name = nameInput.value;
    const dateOfBirth = dateInput.value;

    // Validação simples
    if (!name || !dateOfBirth) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Montar o objeto de dados
    const data = {
      name: name,
      date: dateOfBirth,
    };

    // Enviar para o back-end
    try {
      const response = await fetch('http://localhost:1490/api/numerology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // Armazenar o resultado no localStorage
        localStorage.setItem('numerologyResult', JSON.stringify(result));

        // Redirecionar para a nova página
        window.location.href = 'result.html';
      } else {
        console.error('Erro na requisição:', response.statusText);
        alert('Erro ao gerar o mapa. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de conexão. Verifique sua internet.');
    }
  });
});
