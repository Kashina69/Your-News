// constents
const categoryList = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
  "Everything",
  "India",
  "Global",
];

var darkModeSwitch = () => {
  document.body.classList.toggle("dark-mode");
  for (
    let index = 0;
    index < document.getElementsByClassName("card").length;
    index++
  ) {
    document.getElementsByClassName("card")[index].classList.toggle("bg-dark");
    document
      .getElementsByClassName("card")
      [index].classList.toggle("text-white");
  }
};

let checkedCategory =
  localStorage.getItem("checkedCategory") ||
  localStorage.setItem("checkedCategory", JSON.stringify([]));
const categoryBox = document.getElementById("category");
const url =
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=05a456637e42448394a28c7e4e4d9b28";
const content = document.getElementById("content");
const checkbox = document.getElementById("checkbox");

async function getNews(url) {
  try {
    const response = await fetch(url);
    const newsData = await response.json();
    newsArticles = newsData.articles;
    console.log(newsData);

    for (let index = 0; index < newsArticles.length; index++) {
      var newsArticle = newsArticles[index];

      var html = `
            <div class="card p-2">
          <img src="${
            newsArticle.urlToImage === undefined ||
            newsArticle.urlToImage === null ||
            newsArticle.urlToImage === ""
              ? "https://source.unsplash.com/featured/300x203"
              : newsArticle.urlToImage
          }" class="card-img-top" alt="..urlToImage
          <div class="card-body">
          <h4 class="card-text">${newsArticle.title.replace(
            newsArticle.source.name,
            ""
          )}</h4>
            <p class="card-text p-2">${newsArticle.description}</p>
            <p class="card-text text-muted">${newsArticle.publishedAt}</p>
            <a href="${
              newsArticle.url
            }"target="_blank" class="card-link ">more...</a>
          </div>
        </div>
            `;
      content.innerHTML += html;
    }
  } catch (error) {
    console.error(error);
  }
}

getNews(url);

// Infinity scroll
window.addEventListener("scroll", handleScroll);
let scrollNo = 0;
function handleScroll() {
  const content = document.getElementById("content");
  const contentHeight = content.offsetHeight;
  const yOffset = window.pageYOffset;
  const windowSize = window.innerHeight;
  const triggerAt = 100;

  if (yOffset + windowSize >= contentHeight - triggerAt) {
    getNews(
      `https://newsapi.org/v2/everything?country=in&category=${categoryList[scollNo]}&apiKey=05a456637e42448394a28c7e4e4d9b28`
    );
    if (scrollNo < 6) {
      scrollNo++;
    } else {
      scrollNo = 0;
    }
  }
}

// add checkbox List

for (let index = 0; index < categoryList.length; index++) {
  let categoryHtml = `<div class="form-check m-2">
  <input class="form-check-input" type="checkbox" value="" id="${
    categoryList[index]
  }"
  ${
    JSON.parse(localStorage.getItem("checkedCategory")).includes(
      categoryList[index]
    )
      ? "checked"
      : ""
  } >
  <label class="form-check-label" for="${categoryList[index]}">
  ${categoryList[index]}
  </label>
  </div>`;
  categoryBox.innerHTML += categoryHtml;
}

// find news

findNews = () => {
  var checkedCategory = [];
  for (let index = 0; index < categoryBox.children.length; index++) {
    if (categoryBox.children[index].children[0].checked) {
      checkedCategory.push(categoryBox.children[index].children[1].innerText);
    }
  }
  localStorage.setItem("checkedCategory", JSON.stringify(checkedCategory));
  getNews();
};
