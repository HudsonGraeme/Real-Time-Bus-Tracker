var express = require('express');
var app = express();

var redis = require('redis');
var client = redis.createClient();

const allSections = ['header', 'left', 'article', 'right', 'footer'];

// serve static files from public directory
app.use(express.static('public'));

client.mset(...allSections.flatMap((s) => [s, 0]));
client.mget(allSections, (err, value) =>
  err ? console.error(err) : console.log(value)
);

// Get values for holy grail layout
function data() {
  return new Promise((resolve, reject) => {
    client.mget(allSections, (err, value) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(Object.fromEntries(allSections.map((s, i) => [s, value[i]])));
    });
  });
}

// plus
app.get('/update/:key/:value', function (req, res) {
  const key = req.params.key;
  let value = Number(req.params.value);

  client.get(key, (err, currentValue) => {
    value = Number(currentValue) + value;
    client.set(key, value);

    data().then((data) => {
      console.log(data);
      res.send(data);
    });
  });
});

// get key data
app.get('/data', function (req, res) {
  data().then((data) => {
    console.log(data);
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Running on 3000');
});

process.on('exit', function () {
  client.quit();
});
