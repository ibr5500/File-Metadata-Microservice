var express = require('express');
var cors = require('cors');
const multer = require('multer');

require('dotenv').config()
// const mongoose = require('mongoose');
// const AWS = require('aws-sdk');

// const s3 = new AWS.S3({

// });

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err);
//   }
// };
// connectToDatabase();

const storage = multer.memoryStorage();
const upload = multer({ storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   contentType: String,
//   size: Number,
//   uploadDate: Date,
// });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size
  });
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
