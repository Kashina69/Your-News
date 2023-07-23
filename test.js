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
let checkedCategory = localStorage.getItem("checkedCategory") || [];
const categoryBox = document.getElementById("category");
const url =
  "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=05a456637e42448394a28c7e4e4d9b28";
const content = document.getElementById("content");
const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
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
});

// API CALL
  async function getNews() {
    try {
      const response = await fetch(url);
      const newsData = await response.json();
      newsArticles = newsData.articles;

      for (let index = 0; index < newsArticles.length; index++) {
        var newsArticle = newsArticles[index];
        if (
          [
            newsArticle.content,
            newsArticle.description,
            newsArticle.publishedAt,
            newsArticle.title,
            newsArticle.urlToImage,
          ].some((value) => value === null)
        ) {
        }
        if (
          !newsArticle.urlToImage.includes(".jpg") &&
          !newsArticle.urlToImage.includes(".jpeg") &&
          !newsArticle.urlToImage.includes(".jpeg") &&
          !newsArticle.urlToImage.includes(".png") &&
          !newsArticle.urlToImage.includes(".svg") &&
          !newsArticle.urlToImage.includes(".webp")
        ) {
        } else {
          var html = `
            <div class="card" style="width:100%;">
          <img src="${newsArticle.urlToImage}" class="card-img-top" alt="...">
          <div class="card-body">
          <h4 class="card-text">${newsArticle.title.replace(
            newsArticle.source.name,
            ""
          )}</h4>
            <p class="card-text">${newsArticle.description}</p>
            <p class="card-text text-muted">${newsArticle.publishedAt}</p>
            <a href="${
              newsArticle.url
            }"alt="https://source.unsplash.com/random" target="_blank" class="card-link ">more...</a>
          </div>
        </div>
            `;
          content.innerHTML += html;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  getNews();


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
};
