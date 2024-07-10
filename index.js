const { JSDOM } = require("jsdom");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/rate', async (req, res) => {
  const response = await fetch("https://devisesquare.com/#EUR");
  const html = await response.text();
  const dom = new JSDOM(html);

  const document = dom.window.document;
  const rates = document.querySelectorAll(".sell h1");
  const rate = rates[1].textContent;

  res.json({ rate });
});

app.get('/api/text', async (req, res) => {
  const response = await fetch("https://devisesquare.com/#EUR");
  const text = await response.text();
  res.send(text);
});

app.listen(3000, () => console.log('Listening on port 3000'));
