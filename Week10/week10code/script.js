
const topics = [
  "dreams",
  "memory",
  "ocean",
  "light",
  "time",
  "architecture",
  "imagination",
  "nature",
  "technology",
  "art"
];

const result = document.getElementById("result");
const statusText = document.getElementById("status");
const button = document.getElementById("discover");
const countText = document.getElementById("count");

let discoveryCount = 0;

async function discover() {
  button.disabled = true;
  statusText.textContent = "Searching the archive...";
  result.replaceChildren();

  const loading = document.createElement("p");
  loading.className = "placeholder";
  loading.textContent = "Finding something unexpected...";
  result.append(loading);

  try {
    const topic = topics[
      Math.floor(Math.random() * topics.length)
    ];

    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: topic,
      srlimit: "10",
      format: "json",
      origin: "*"
    });

    const url =
      `https://en.wikipedia.org/w/api.php?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const articles = data.query?.search;

    if (!Array.isArray(articles) || articles.length === 0) {
      result.textContent = "No discoveries found this time.";
      statusText.textContent = "The archive is empty.";
      return;
    }

    const article = articles[
      Math.floor(Math.random() * articles.length)
    ];

    const title = document.createElement("h2");
    title.textContent = article.title;

    // Wikipedia search snippets can contain HTML markup.
    // Show a safe plain-text version.
    const snippetHolder = document.createElement("div");
    snippetHolder.innerHTML = article.snippet || "";

    const description = document.createElement("p");
    description.textContent =
      snippetHolder.textContent.trim() ||
      "An interesting article is waiting to be explored.";

    const link = document.createElement("a");
    link.className = "article-link";
    link.href =
      `https://en.wikipedia.org/?curid=${article.pageid}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Explore on Wikipedia ↗";

    result.replaceChildren(title, description, link);

    discoveryCount++;
    countText.textContent =
      String(discoveryCount).padStart(3, "0");

    statusText.textContent =
      `Discovered through Wikipedia · ${topic}`;

  } catch (error) {
    console.error(error);

    result.textContent =
      "This discovery could not be retrieved.";

    statusText.textContent =
      "Something went wrong. Please try again.";

  } finally {
    button.disabled = false;
  }
}

button.addEventListener("click", discover);
