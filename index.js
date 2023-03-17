const express = require("express");
const request = require("request");
const fs = require("fs");
const tiktok = require("tiktok-video-downloader");
const app = express();
const https = require("https");
const path = require("path");
const port = 6969;

app.use(express.static("src"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/pages/index.html");
});

app.get("/styles", function (req, res) {
  res.sendFile(__dirname + "/src/styles/*");
});

app.get("/scripts", function (req, res) {
  res.sendFile(__dirname + "/src/scripts/*");
});

app.get("/getVideo", function (req, res) {
  var urlId = req.query.url.toString();
  function downloadVideo(videoURL) {
    request.get({ uri: videoURL, encoding: null }, (err, response, body) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      var fileName = "video.mp4";
      var filepath = path.join(__dirname, fileName);
      fs.writeFile(filepath, body, (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        res.setHeader("Content-Type", response.headers["content-type"]);
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="video.mp4"'
        );
        res.sendFile(filepath); // send the file to the client
      });
    });
  }
  async function getUrl() {
    tiktok.getInfo(urlId).then((result) => {
      downloadVideo(result.video.url.no_wm.toString());
    });
  }
  getUrl();
});

app.get("/handleTurl", function (req, res) {
  var url = req.query.url.toString();
  https
    .get(url, (response) => {
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        const finalUrl = response.headers.location;
        res.send(finalUrl.toString());
      }
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });
});


app.listen(port, () => {
  console.log(`App running on ${port}`);
});
