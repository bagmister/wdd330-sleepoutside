// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function loadpageSection(key, partialFilePath) {
  let domSelector = null;
  let path = "";
  if (key === 1) {
    domSelector = document.querySelector(".footerForPage");
    path = `${partialFilePath}/footer.html`;
  } else if (key === 0) {
    domSelector = document.querySelector(".headerForPage");
    path = `${partialFilePath}/header.html`;
  } else {
    console.error("No page section to load for key: ", key);
    return Promise.resolve();
  }
  if (!domSelector) {
    console.error(`DOM selector for key ${key} not found.`);
    return Promise.resolve();
  }
  return renderPage(domSelector, path);
}

async function renderPage(domSelector, path) {
  try {
    const htmlContent = await getHtmlContent(path);
    if (htmlContent) {
      domSelector.innerHTML = htmlContent;
    } else {
      console.error(`No content loaded for path: ${path}`);
      domSelector.innerHTML = "<p>Error loading content</p>";
    }
  } catch (error) {
    console.error(`Error rendering page section for path: ${path}`, error);
    domSelector.innerHTML = "<p>Error loading content</p>";
  }
}

async function getHtmlContent(path) {
  try {
    const fileResponse = await fetch(path);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch path: ${path}, Status: ${fileResponse.status}`);
    }
    const content = await fileResponse.text();
    return content;
  } catch (error) {
    console.error("Error fetching content: ", path, error);
    return null;
  }
}

export function alertMessage(message, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if ( ) { // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll)
    window.scrollTo(0, 0);
}