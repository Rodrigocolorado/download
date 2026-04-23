async function converter() {
  let url = document.getElementById("url").value;
  let result = document.getElementById("result");

  result.innerHTML = "Carregando...";

  const response = await fetch("http://localhost:3000/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  });

  const data = await response.json();

  if (data.error) {
    result.innerHTML = "Erro!";
    return;
  }

  result.innerHTML = `
    <h3>${data.title}</h3>
    <img src="${data.thumbnail}" width="200">
  `;

  data.formats.forEach(f => {
    result.innerHTML += `
      <a href="${f.url}" target="_blank">
        <div class="download-btn">
          Baixar ${f.quality || "Qualidade"}
        </div>
      </a>
    `;
  });
}
