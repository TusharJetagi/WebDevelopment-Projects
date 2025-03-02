const accessKey = "MBikqbavv2Db0Zur93dlQTyN6Yl17-nbshlIjW2WU_A";

const formEle = document.querySelector("form");
const searchBox = document.getElementById("search-box");
const searchResultsContainer = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");

let userEnteredData = "";
let page_no = 1;

function clearResults() {
  searchResultsContainer.innerHTML = "";
}

async function searchImages() {
  userEnteredData = searchBox.value.trim();

  if (!userEnteredData) {
    alert("Please enter a search term.");
    return;
  }

  if (page_no === 1) {
    clearResults(); // Clear previous results for a new search
  }

  const url = `https://api.unsplash.com/search/photos?page=${page_no}&query=${userEnteredData}&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description || "View Image";

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsContainer.appendChild(imageWrapper);
    });

    page_no++;
    if (page_no > 1) {
      showMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    alert("Failed to fetch images. Please try again later.");
  }
}

formEle.addEventListener("submit", (e) => {
  e.preventDefault();

  page_no = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
