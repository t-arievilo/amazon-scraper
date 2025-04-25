import express, { Request, Response, Application } from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app: Application = express();
const PORT = 3000;

app.use(cors());

interface Product {
  title: string;
  rating: string;
  reviews: string;
  image: string;
  price: string;
}

async function scrapeAmazon(keyword: string): Promise<Product[]> {
  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'pt-BR,pt;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
  };

  try {
    const { data } = await axios.get(url, { 
      headers,
      timeout: 10000
    });

    const dom = new JSDOM(data);
    const products = Array.from(dom.window.document.querySelectorAll('.s-result-item[data-component-type="s-search-result"]'));

    return products.map((product: Element) => {
      // Novo seletor para título pois a amazon mudou a estrutura
      const titleElement = product.querySelector('a h2 span, h2 a span')
                          
      
      // Seletor atualizado para avaliação
      const ratingElement = product.querySelector('.a-icon-alt') || 
                           product.querySelector('.a-size-base .a-color-base');

      // Seletor atualizado para reviews
      const reviewsElement = product.querySelector('.a-size-base.s-underline-text') || 
                            product.querySelector('.a-size-base:not(.a-color-base)');

      // Seletor para preço
      const priceElement = product.querySelector('.a-price .a-offscreen') || 
                          product.querySelector('.a-price-fraction');

      return {
        title: titleElement?.textContent?.trim() || 'Título não encontrado',
        rating: ratingElement?.textContent?.replace('de 5 estrelas', '').trim() || 'Sem avaliação',
        reviews: reviewsElement?.textContent?.replace(/\D/g, '') || '0',
        image: product.querySelector('.s-image')?.getAttribute('src') || '',
        price: priceElement?.textContent?.trim() || 'Preço indisponível'
      };
    }).filter(item => !item.title.includes('Título não encontrado'));

  } catch (error) {
    console.error('Erro no scraping:', error);
    throw error;
  }
}

app.get('/api/scrape', async (req: Request, res: Response): Promise<void> => {
  try {
    const keyword = req.query.keyword as string;
    if (!keyword) {
      res.status(400).json({ error: 'Keyword é obrigatória' });
    }

    const data = await scrapeAmazon(keyword);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});