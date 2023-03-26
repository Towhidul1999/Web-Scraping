const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(express.json());

app.post('/scrape', (req, res) => {
    const url = req.body.url;
    console.log(url);
  
    axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const text = $('h2').text();

        // const text = $('body').html();

        // let text = '';

        // $('h2').each((index, element) => {
        //     text += $(element).text() + '\n';
        // });

        // let list = [];

        // $('.css-content > h2').each(function () {

        // list.push($(this).text().trim());

        // });
        
        // let scrapingData  = list.filter((item) => Boolean(item));
        // console.log(scrapingData);

        res.json(text);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('An error occurred while scraping the page.');
      });

  });
  

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
