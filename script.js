async function converter() {
  let url = document.getElementById("url").value;
  let result = document.getElementById("result");
  let loader = document.getElementById("loader");

  result.innerHTML = "";
  loader.classList.remove("hidden");

  try {
    const response = await fetch("http://localhost:3000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    loader.classList.add("hidden");

    if (data.error) {
      result.innerHTML = "<p>Erro ao carregar vídeo</p>";
      return;
    }

    let html = `
      <div class="card">
        <img src="${data.thumbnail}">
        <h3>${data.title}</h3>
        <div class="download">
    `;

    data.formats.forEach(f => {
      html += `
        <a href="${f.url}" target="_blank">
          Baixar ${f.quality || "Qualidade"}
        </a>
      `;
    });

    html += `</div></div>`;

    result.innerHTML = html;

  } catch (err) {
    loader.classList.add("hidden");
    result.innerHTML = "<p>Erro no servidor</p>";
  }
}
