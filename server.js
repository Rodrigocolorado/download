'const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let progressClients = [];

app.get("/progress", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  progressClients.push(res);

  req.on("close", () => {
    progressClients = progressClients.filter(c => c !== res);
  });
});

function sendProgress(data) {
  progressClients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

app.post("/download", (req, res) => {
  const url = req.body.url;

  const ytdlp = spawn("yt-dlp", [
    "-f", "best",
    "--newline",
    url,
    "-o", "video.%(ext)s"
  ]);

  ytdlp.stdout.on("data", (data) => {
    const text = data.toString();

    // captura % de progresso
    const match = text.match(/(\d+\.\d+)%/);
    if (match) {
      sendProgress({ percent: match[1] });
    }
  });

  ytdlp.on("close", () => {
    sendProgress({ percent: 100, done: true });
  });

  res.json({ status: "Download iniciado" });
});

app.listen(3000, () => console.log("Servidor rodando"));
