const newsCategoryList = [
  "general",
  "world",
  "nation",
  "technology",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
];

// -----------------------------------DARK MODE SWITCH ------------------------------------

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

// -----------------------------------API REQUEST ----------------------------------------

var Language = "en";
var oldLanguage = "";
var categoryNumber = 0;

async function getNews() {
  if (Language === "en") {
    API = `https://gnews.io/api/v4/top-headlines?category=${newsCategoryList[categoryNumber]}&lang=en&country=in&max=10&apikey=6d726128dc6a19b125450b5404dfba9c`;
  } else {
    API = `https://gnews.io/api/v4/top-headlines?category=${newsCategoryList[categoryNumber]}&lang=hi&country=in&max=10&apikey=6d726128dc6a19b125450b5404dfba9c`;
  }

  try {
    const response = await fetch(API);
    const newsData = await response.json();
    newsArticles = newsData.articles;
console.log("category" + categoryNumber);
    for (let index = 0; index < newsArticles.length; index++) {
      var newsArticle = newsArticles[index];
      var html = `
            <div class="card p-2">
          <img src="${
            newsArticle.image === undefined ||
            newsArticle.image === null ||
            newsArticle.image === ""
              ? "https://source.unsplash.com/featured/300x203"
              : newsArticle.image
          }" class="card-img-top" >

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
      if (oldLanguage === null) {
        content.innerHTML += html;
      } else {
        content.innerHTML = html;
        categoryNumber = 0;
      }
      oldLanguage = null;
      
    }
  } catch (error) {
    console.error(error);
  }
  if (categoryNumber !== 8 ) {
    categoryNumber++
  }
  else categoryNumber = 0
}

getNews();

// ------------------------------------------------INFINITE SCROLL------------------------------------------
index = 0
// Infinity scroll
window.addEventListener("scroll", handleScroll);
function handleScroll() {
  const content = document.getElementById("content");
  const contentHeight = content.offsetHeight;
  const yOffset = window.pageYOffset;
  const windowSize = window.innerHeight;
  const triggerAt = 70;

  if (yOffset + windowSize >= contentHeight - triggerAt) {
    ;
    getNews();
    index++;
    console.log("index at infinity scroll " + index);
    
  }
}

// ---------------------------------------------- CATEGORY OPTION ADDER -------------------------------------------------

const categoryBox = document.getElementById("category");
for (let index = 0; index < newsCategoryList.length; index++) {
  let categoryHtml = `<div class="form-check m-2">
    <input class="form-check-input" type="checkbox" value="" id="${newsCategoryList[index]}">
    <label class="form-check-label" for="${newsCategoryList[index]}">
    ${newsCategoryList[index]}
    </label>
    </div>`;
  categoryBox.innerHTML += categoryHtml;
}

// ---------------------------------------------------FILTER AND WHAT FIND NEWS-----------------------------------------------

findNews = () => {
  content.innerHTML = ""
  for (let index = 0; index < categoryBox.children.length; index++) {
    if (categoryBox.children[index].children[0].checked) {
      categoryNumber = index
      getNews();
    }
  }
};

// ---------------------------------------Change Language --------------------------------------

langChangeButton = document.getElementById("langChangeButton");

changeLanguage = () => {
  if (Language === "en") {
    oldLanguage = Language;
    Language = "hi";
  } else {
    oldLanguage = Language;
    Language = "en";
  }
  console.log(Language);
  getNews();
};



