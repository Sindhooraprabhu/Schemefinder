const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Scheme = require('../models/Scheme');

const scrapeSchemes = async () => {
  try {
    console.log('Starting web scraping...');
    const url = 'https://www.myscheme.gov.in/search';

    await mongoose.connect('mongodb://localhost:27017/govschemes');

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const schemesData = [];
    
    // Select the main container that holds each scheme card
    // Note: The class names can be long and dynamic, so we'll use a more general selector
    $('.flex-col.gap-4').each((i, el) => {
      // Find the h4 tag inside the scheme card for the title
      const name_en = $(el).find('h4').text().trim();
      
      // Find the p tag for the description
      const description_en = $(el).find('p.body-sm-regular').text().trim();
      
      // We can also extract other details if they are available
      const category = $(el).find('div.items-center.gap-1.flex.text-sm.text-gray-600').text().trim();
      const target_audience = ['all']; // Placeholder, you may need to parse this

      if (name_en && description_en) {
        schemesData.push({
          name_en,
          description_en,
          category,
          target_audience,
        });
      }
    });

    if (schemesData.length > 0) {
      await Scheme.deleteMany({});
      await Scheme.insertMany(schemesData);
      console.log(`Successfully scraped and saved ${schemesData.length} schemes.`);
    } else {
      console.log('No schemes found. Check your selectors or the URL.');
    }

  } catch (error) {
    console.error('Scraping failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

scrapeSchemes();