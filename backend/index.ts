import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

async function scrapeAmazon(keyword: string) {
  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  try {
    const { data } = await axios.get(url, { headers });
    const dom = new JSDOM(data);
    const products = Array.from(dom.window.document.querySelectorAll('[data-component-type="s-search-result"]'));

    return products.map(product => ({
      title: product.querySelector('h2 a span')?.textContent?.trim() || 'Sem título',
      rating: product.querySelector('.a-icon-alt')?.textContent?.replace('de 5 estrelas', '').trim() || 'Sem avaliação',
      reviews: product.querySelector('.a-size-base')?.textContent?.replace(/\D/g, '') || '0',
      image: product.querySelector('.s-image')?.getAttribute('src') || '',
      price: product.querySelector('.a-price .a-offscreen')?.textContent?.trim() || 'Preço indisponível'
    }));
  } catch (error) {
    console.error('Erro no scraping:', error);
    throw error;
  }
}

app.get('/api/scrape', async (req, res) => {
  try {
    const keyword = req.query.keyword as string;
    if (!keyword) return res.status(400).json({ error: 'Keyword é obrigatória' });
    
    const data = await scrapeAmazon(keyword);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});