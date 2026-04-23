const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "URL inválida" });
  }

  // Comando yt-dlp
  const command = `yt-dlp -j ${url}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao processar vídeo" });
    }

    const data = JSON.parse(stdout);

    res.json({
      title: data.title,
      thumbnail: data.thumbnail,
      formats: data.formats.slice(0, 5).map(f => ({
        quality: f.format_note,
        url: f.url
      }))
    });
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
