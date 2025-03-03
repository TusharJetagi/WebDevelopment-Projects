const button = document.getElementById("generate-meme-btn");
const memeTitle = document.getElementById("meme-title");
const memeImage = document.querySelector("img");
const memeAuthor_name = document.getElementById("author-name");

function updateMemeDetails(url, title, authorName) {
  memeImage.setAttribute("src", url);
  memeTitle.innerHTML = title;
  memeAuthor_name.innerHTML = `Meme By: '${authorName}'`;
}

function generateMeme() {
  fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then((data) => {
      updateMemeDetails(data.url, data.title, data.author);
    });
}

button.addEventListener("click", generateMeme);
generateMeme();
