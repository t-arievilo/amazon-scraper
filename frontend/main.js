document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search');
  const keywordInput = document.getElementById('keyword');
  const resultsDiv = document.getElementById('results');

  searchBtn.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) return alert('Digite um termo de busca');

    try {
      resultsDiv.innerHTML = '<p>Carregando...</p>';
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
      const products = await response.json();
      
      resultsDiv.innerHTML = products.length ? 
        `<div class="products">${products.map(product => `
          <div class="product">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>⭐ ${product.rating} (${product.reviews} avaliações)</p>
            <p class="price">${product.price}</p>
          </div>
        `).join('')}</div>` : 
        '<p>Nenhum produto encontrado</p>';
    } catch (error) {
      resultsDiv.innerHTML = `<p class="error">Erro ao buscar produtos</p>`;
    }
  });
});
