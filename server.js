const express = require('express');
const formidable = require("formidable");
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", (req, res, next) => {
  const form = formidable({multiples: true});
  form.parse(req, (err,fields,files) => {
    if(err) {
      next(err);
      return;
    }

    res.json({
      name: files.upfile.name,
      type: files.upfile.type,
      size: files.upfile.size
    });
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
