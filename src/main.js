function handleHamburger() {
  console.log("handleHamburger function called");
  const hamburger = document.querySelector(".hamburger");
  const listElmsContain = document.querySelector(".list-elms-contain");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    listElmsContain.classList.toggle("active");
  });

  document.querySelectorAll(".list-elms").forEach((list) =>
    list.addEventListener("click", () => {
      hamburger.classList.remove("active");
      listElmsContain.classList.remove("active");
    })
  );
}

const url = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

function getDetails() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles) {
        const newsCategories = document.getElementById("news-categories");

        data.articles.slice(0, 4).forEach((article) => {
          const articleContainer = document.createElement("div");
          articleContainer.id = "article-container";

          const titleElm = document.createElement("h3");
          const imageElm = document.createElement("img");
          const descriptionElm = document.createElement("p");

          titleElm.textContent = article.title;
          imageElm.src = article.urlToImage;
          imageElm.alt = article.title;
          descriptionElm.textContent = article.description;

          articleContainer.appendChild(titleElm);
          articleContainer.appendChild(imageElm);
          articleContainer.appendChild(descriptionElm);

          newsCategories.appendChild(articleContainer);
        });
      } else {
        console.error("No articles found");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getAdditionalDetails() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles) {
        const additionalNewsSection =
          document.getElementById("additional-news");

        data.articles.slice(4, 10).forEach((article) => {
          const topicsContainer = document.createElement("div");
          topicsContainer.className = "additional-news-container";

          const topicsTitle = document.createElement("h3");
          const topicsImage = document.createElement("img");
          const topicsDescription = document.createElement("p");

          topicsTitle.textContent = article.title;
          topicsImage.src = article.urlToImage;
          topicsImage.alt = article.title;
          topicsDescription.textContent = article.description;

          topicsContainer.appendChild(topicsTitle);
          topicsContainer.appendChild(topicsImage);
          topicsContainer.appendChild(topicsDescription);

          additionalNewsSection.appendChild(topicsContainer);
        });
      } else {
        console.error("No additional articles found");
      }
    })
    .catch((error) => console.error("Error fetching additional data:", error));
}

function slideShow() {
  const articleContainer = document.getElementById("articleContainer");
  const prevButtonContainer = document.getElementById("prevButtonContainer");
  const nextButtonContainer = document.getElementById("nextButtonContainer");
  let currentIndex = 0;

  function updateContent(data) {
    const firstArticle = data.articles[currentIndex];
    const secondArticle =
      data.articles[(currentIndex + 1) % data.articles.length];

    const firstContainer = document.createElement("div");
    const secondContainer = document.createElement("div");

    firstContainer.innerHTML = `
        <div class="cardy">
          <h3 class="cardy-title">${firstArticle.title}</h3>
          <img class="cardy-image" src="${firstArticle.urlToImage}" alt="${firstArticle.title}">
          <p class="cardy-description">${firstArticle.description}</p>
        </div>
      `;

    secondContainer.innerHTML = `
        <div class="cardy">
          <h3 class="cardy-title">${secondArticle.title}</h3>
          <img class="cardy-image" src="${secondArticle.urlToImage}" alt="${secondArticle.title}">
          <p class="cardy-description">${secondArticle.description}</p>
        </div>
      `;

    articleContainer.innerHTML = "";
    articleContainer.appendChild(firstContainer);
    articleContainer.appendChild(secondContainer);
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles && data.articles.length > 0) {
        updateContent(data);

        prevButtonContainer.addEventListener("click", () => {
          currentIndex =
            (currentIndex - 1 + data.articles.length) % data.articles.length;
          updateContent(data);
        });

        nextButtonContainer.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % data.articles.length;
          updateContent(data);
        });
      } else {
        console.error("No articles found");
      }
    });
}

function navbarScroll() {
  const homeLink = document.querySelector(".home-link");
  homeLink.addEventListener("click", scroller.bind(null, "news-reports"));

  const trendingLink = document.querySelector(".trending-link");
  trendingLink.addEventListener(
    "click",
    scroller.bind(null, "trending-section")
  );

  const browseLink = document.querySelector(".browse-link");
  browseLink.addEventListener("click", scroller.bind(null, "browse"));

  const subscribeLink = document.querySelector(".subscribe-link");
  subscribeLink.addEventListener("click", scroller.bind(null, "subscribe"));
}

function scroller(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function subscribers() {
  const subscribeButton = document.querySelector(".subscribe-button");

  subscribeButton.addEventListener("click", function (event) {
    event.preventDefault();

    const emailInput = document.querySelector(".subscription-input");
    const userEmail = emailInput.value;

    console.log(userEmail);

    const apiUrl = "http://localhost:3000/subscribers";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const subscribeForm = document.querySelector(".subscription-form");
        subscribeForm.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getDetails();
  getAdditionalDetails();
  slideShow();
  navbarScroll();
  subscribers();
  handleHamburger();
});
