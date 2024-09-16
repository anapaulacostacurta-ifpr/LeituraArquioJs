async function lerCSV(arquivo) {
  try {
    const response = await fetch(arquivo);
    const csvData = await response.text();
    const linhas = csvData.split('\n');
    const dados = [];
    const cabecalho = linhas[0].split(',');

    linhas.slice(1).forEach(linha => {
      const valores = linha.split(',');
      const obj = {};
      cabecalho.forEach((cabecalho, index) => {
        obj[cabecalho] = valores[index];
      });
      dados.push(obj);
    });

    return dados;
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return [];
  }
}

lerCSV('meu_arquivo.csv')
  .then(dados => {
    const tabela = document.createElement('table');
    const corpoTabela = document.createElement('tbody');
    tabela.appendChild(corpoTabela);

    // Crie a linha do cabeçalho (opcional)
    const cabecalho = Object.keys(dados[0]);
    const linhaCabecalho = document.createElement('tr');
    cabecalho.forEach(chave => {
        const th = document.createElement('th');
        th.textContent = chave;
        linhaCabecalho.appendChild(th);
    });
    corpoTabela.appendChild(linhaCabecalho);

    // Crie as linhas de dados
    dados.forEach(obj => {
        const linha = document.createElement('tr');
        Object.values(obj).forEach(valor => {
            const td = document.createElement('td');
            td.textContent = valor;
            linha.appendChild(td);
        });
        corpoTabela.appendChild(linha);
    });

    document.getElementById('container').appendChild(tabela);
  });
