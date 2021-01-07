const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT || 3030;

const app = express();
dotenv.config();

if (process.env.NODE_ENV === 'production') app.use(express.static('public'));
else {
    const coreOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(coreOptions));
}

app.use(bodyParser.json({ limit: '5MB' }));


// Routes imports

const pdfRoute = require('./api/pdf/pdf.routes');

// Routes

app.use('/api/pdf', pdfRoute);



app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
// App Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));