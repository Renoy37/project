// // Function to handle hamburger menu toggle
// function handleHamburger() {
//   console.log("handleHamburger function called");
//   const hamburger = document.querySelector(".hamburger");
//   const listElmsContain = document.querySelector(".list-elms-contain");

//   //showing the hamburger menu with Toggle 'active' class on hamburger and navigation menu
//   hamburger.addEventListener("click", () => {
//     hamburger.classList.toggle("active");
//     listElmsContain.classList.toggle("active");
//   });

//   // Closing the navigation menu when any menu item is clicked
//   document.querySelectorAll(".list-elms").forEach((list) =>
//     list.addEventListener("click", () => {
//       hamburger.classList.remove("active");
//       listElmsContain.classList.remove("active");
//     })
//   );
// }

function handleHamburger() {
  console.log("handleHamburger function called");
  const hamburger = document.querySelector(".hamburger");
  const listElmsContain = document.querySelector(".list-elms-contain");

  //showing the hamburger menu with Toggle 'active' class on hamburger and navigation menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    listElmsContain.classList.toggle("active");
  });

  // Closing the navigation menu when any menu item is clicked
  document.querySelectorAll(".list-elms").forEach((list) =>
    list.addEventListener("click", () => {
      hamburger.classList.remove("active");
      listElmsContain.classList.remove("active");
    })
  );
}

// URL for fetching news data
const url = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

// Function to fetch and display initial news details
function getDetails() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles) {
        // Displaying first 4 articles in the News section of the page
        const newsCategories = document.getElementById("news-categories");
        data.articles.slice(0, 4).forEach((article) => {
          // Creating HTML elements for each article
          const articleContainer = document.createElement("div");
          articleContainer.id = "article-container";
          const titleElm = document.createElement("h3");
          const imageElm = document.createElement("img");
          const descriptionElm = document.createElement("p");

          // giving content to HTML elements
          titleElm.textContent = article.title;
          imageElm.src = article.urlToImage;
          imageElm.alt = article.title;
          descriptionElm.textContent = article.description;

          // Appending the elements to the container
          articleContainer.appendChild(titleElm);
          articleContainer.appendChild(imageElm);
          articleContainer.appendChild(descriptionElm);

          // Appending container to the News section
          newsCategories.appendChild(articleContainer);
        });
      } else {
        console.error("No articles found");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to fetch and display additional news details
function getAdditionalDetails() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles) {
        // Displaying additional articles in the Hot Topics section
        const additionalNewsSection =
          document.getElementById("additional-news");
        data.articles.slice(4, 10).forEach((article) => {
          // Creating HTML elements for each additional article
          const topicsContainer = document.createElement("div");
          topicsContainer.className = "additional-news-container";
          const topicsTitle = document.createElement("h3");
          const topicsImage = document.createElement("img");
          const topicsDescription = document.createElement("p");

          //Giving content to HTML elements
          topicsTitle.textContent = article.title;
          topicsImage.src = article.urlToImage;
          topicsImage.alt = article.title;
          topicsDescription.textContent = article.description;

          // Appending the elements to the container  to display on the page
          topicsContainer.appendChild(topicsTitle);
          topicsContainer.appendChild(topicsImage);
          topicsContainer.appendChild(topicsDescription);

          // Appending the container to the Hot Topics section to display on the page
          additionalNewsSection.appendChild(topicsContainer);
        });
      } else {
        console.error("No additional articles found");
      }
    })
    .catch((error) => console.error("Error fetching additional data:", error));
}

// Function to implement a simple slideshow of news articles
function slideShow() {
  const articleContainer = document.getElementById("articleContainer");
  const prevButtonContainer = document.getElementById("prevButtonContainer");
  const nextButtonContainer = document.getElementById("nextButtonContainer");
  let currentIndex = 0;

  // Function to update content in the slideshow
  function updateContent(data) {
    const firstArticle = data.articles[currentIndex];
    const secondArticle =
      data.articles[(currentIndex + 1) % data.articles.length];

    // Creating HTML containers for the two articles in the slideshow
    const firstContainer = document.createElement("div");
    const secondContainer = document.createElement("div");

    // GIving content to the containers
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

    // Clearing existing any content and appending new content
    articleContainer.innerHTML = "";
    articleContainer.appendChild(firstContainer);
    articleContainer.appendChild(secondContainer);
  }

  // Fetching data and initializing the slideshow
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles && data.articles.length > 0) {
        updateContent(data);

        // Event listeners for navigating the slideshow
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

// Function to handle smooth scrolling for navigation links
function navbarScroll() {
  //binding the section id's to their respective nav class names
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

// Function to scroll to a specific section on the page
function scroller(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Function to post user subscriptions to db.json file
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
