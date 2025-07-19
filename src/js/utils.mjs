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
  let domSelector = "";
  let path = "";
  if (key === 1) {
    domSelector = document.querySelector(".footerForPage")
    path = partialFilePath + "/footer.html";

  }
  else if (key === 0) {
    domSelector = document.querySelector(".headerForPage")
    path = partialFilePath + "/header.html";
  } else {
    console.log("No page section to load for key: ", key)
    return;
  }
  return renderPage(domSelector, path)
}

async function renderPage(domSelector, path) {
  const htmlContent = await getHtmlContent(path);
  if (htmlContent) {
    domSelector.innerHTML = htmlContent;
  }
}

async function getHtmlContent(path) {
  try {
    const fileResponse = await fetch(path);
    if (!fileResponse.ok) {
      console.log("Failed to fetch path:", path);
    }
    const content = await fileResponse.text();
    return content;
  } catch (error) {
    console.log("No path found for: ", path, error);
    return null;
  }
}
