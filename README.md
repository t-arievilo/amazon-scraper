# 📦 Amazon Scraper

Este projeto é um **web scraper da Amazon** desenvolvido com **Bun**, **TypeScript**, **Axios** e **JSDOM** no backend, e uma interface simples em HTML/CSS/JS no frontend. Ele permite extrair informações de produtos da Amazon a partir de uma URL fornecida, retornando os dados de forma estruturada.

---

## ✨ Funcionalidades

- ✅ Recebe a URL de um produto da Amazon
- ✅ Realiza scraping da página com JSDOM
- ✅ Extrai dados como:
  - Título do produto
  - Preço (em diferentes formatos)
  - Link da imagem principal
  - Categoria
- ✅ Retorna os dados em formato JSON
- ✅ Exibe os dados no frontend com layout simples

---

## 🚀 Tecnologias Utilizadas

**Backend:**
- [Bun](https://bun.sh/) – runtime moderno e rápido
- TypeScript – tipagem estática
- Axios – requisições HTTP
- JSDOM – manipulação do DOM em ambiente Node

**Frontend:**
- Vite
- HTML5
- CSS3
- JavaScript

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- [Bun instalado](https://bun.sh/docs/installation)
- Git

### Clone o repositório

```bash
git clone https://github.com/t-arievilo/amazon-scraper.git
cd amazon-scraper
```

### Instale as dependências

```bash
bun install
```

### Inicie o servidor backend

```bash
bun run index.ts
```

Por padrão, o backend roda em `http://localhost:3000`.

### Execute o frontend

Abra um segundo terminal e vá para o diretório `frontend`:

```bash
cd frontend
bun install
bun run dev
```

Acesse `http://localhost:5173` para abrir a interface do projeto.

---

## ⚠️ Possíveis Erros e Como Corrigi-los

### 1. **Erro: "bun: command not found"**

Isso significa que o Bun não está instalado corretamente. Siga o guia oficial:
```bash
curl -fsSL https://bun.sh/install | bash
```
Reinicie o terminal após a instalação.

---

### 2. **CORS ao fazer requisição ao backend**

Certifique-se de que o backend esteja com CORS habilitado para aceitar chamadas do frontend. Uma possível solução temporária é configurar proxy no Vite.

---

### 3. **Erro ao acessar dados da Amazon**

A Amazon pode bloquear requisições automáticas. Dicas para contornar:
- Use headers customizados como `User-Agent`
- Evite fazer muitas requisições em sequência
- Considere usar um proxy em projetos maiores

---

## 📁 Estrutura de Pastas

```
amazon-scraper/
│
├── index.ts            # Código principal de scraping
├── package.json
├── tsconfig.json
├── frontend/           # Interface com Vite
│   ├── index.html
│   ├── main.js
│   └── style.css
```

---

## 💼 Sobre o Autor

Feito por **Thiago Oliveira**, estudante de Análise e Desenvolvimento de Sistemas e entusiasta de desenvolvimento web. Este projeto foi desenvolvido como uma solução prática para testar scraping e integrações frontend/backend modernas.

---

## 📬 Contato

[🔗 LinkedIn](https://www.linkedin.com/in/t-arievilo)  
📧 thiago.math3@gmail.com
