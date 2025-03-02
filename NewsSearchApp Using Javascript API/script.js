const apiKey = "f1e3de6da5f64351b7ba2103eb6ecd6b";
const blogContainer = document.getElementById("blog-container");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");

async function fetchNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.articles) {
      return data.articles;
    } else {
      throw new Error("No articles found");
    }
  } catch (error) {
    console.error(error);
    displayError("Failed to load news. Please try again later.");
    return [];
  }
}

async function randomNews() {
  const URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;
  return await fetchNews(URL);
}

async function fetchNewsQuery(query) {
  const URL = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apiKey}`;
  return await fetchNews(URL);
}

searchBtn.addEventListener("click", async () => {
  const query = searchBox.value.trim();
  if (!query) return;

  searchBtn.disabled = true;
  const articles = await fetchNewsQuery(query);
  displayBlogs(articles);
  searchBtn.disabled = false;
});

function displayBlogs(articles) {
  blogContainer.innerHTML = "";

  if (articles.length === 0) {
    displayError("No articles found. Try a different keyword.");
    return;
  }

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage || "https://placehold.co/600x400";
    img.alt = article.title || "No title available";
    const title = document.createElement("h2");
    const shortTitle =
      article.title.length > 45
        ? article.title.slice(0, 45) + "...."
        : article.title || "No title available";
    title.textContent = shortTitle;
    const desc = document.createElement("p");
    desc.textContent = article.description || "No description available";

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(desc);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

function displayError(message) {
  blogContainer.innerHTML = `<p style="color: red; text-align: center;">${message}</p>`;
}

(async () => {
  const articles = await randomNews();
  displayBlogs(articles);
})();
