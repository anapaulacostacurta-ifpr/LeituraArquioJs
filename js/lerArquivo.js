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
