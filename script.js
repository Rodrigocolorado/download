function converter() {
  let url = document.getElementById("url").value;

  if (!url) {
    alert("Cole um link primeiro!");
    return;
  }

  let result = document.getElementById("result");

  // Simulação de processamento
  result.innerHTML = "<p>Processando...</p>";

  setTimeout(() => {
    result.innerHTML = `
      <h3>Escolha o formato:</h3>

      <div class="download-btn">Baixar MP4 720p</div>
      <div class="download-btn">Baixar MP4 1080p</div>
      <div class="download-btn">Baixar MP3 320kbps</div>
    `;
  }, 1500);
}
