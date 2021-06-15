// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const request = require('request');

const handler = async (event) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://api.hubapi.com/contacts/v1/contact/',
      qs: { hapikey: '7d49448c-d24a-433d-86a3-c9af20e7e394' },
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        properties: [{ property: 'email', value: 'testingapis@hubspot.com' }],
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
    });
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
