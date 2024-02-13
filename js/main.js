/**
 * Initializes the page by asynchronously including HTML snippets,
 * highlighting the current navigation link, and hiding navigation
 * links on blank pages.
 */
async function initPage() {
  await includeHTML();
  highlightNavLink();
  changeFrameOnNewTab();
  updateHTML();
}

/**
 * Asynchronously fetches HTML snippets and includes them in the page.
 *
 * It looks for elements with the 'w3-include-html' attribute,
 * fetches the file specified in that attribute, and replaces the innerHTML
 * of the element with the fetched HTML.
 *
 * If the fetch fails, it sets the innerHTML to an error message instead.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");

  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);

    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function goBack() {
  window.history.back();
}

function highlightNavLink() {
  const navLinks = document.querySelectorAll("aside a");
  const currentUrl = window.location.pathname;

  navLinks.forEach((navLink) => {
    const href = navLink.getAttribute("href");
    if (currentUrl == href) {
      navLink.classList.add("visited");
    } else {
      navLink.classList.remove("visited");
    }
  });
}

function changeFrameOnNewTab() {
  const sideNav = document.getElementById("side-nav");
  const headerIcons = document.getElementById("corner-icons");
  const privacyUrl = "/privacy_policy.html";
  const legalNoticeUrl = "/legal_notice.html";
  const currentUrl = window.location.pathname;
  if (currentUrl === privacyUrl || currentUrl === legalNoticeUrl) {
    sideNav.classList.toggle("hidden");
    headerIcons.classList.toggle("hidden");
  }
}

function openExternalLink(url) {
  const currentUrl = window.location.pathname;
  const privacyUrl = "/privacy_policy.html";
  const legalNoticeUrl = "/legal_notice.html";
  if (currentUrl !== privacyUrl && currentUrl !== legalNoticeUrl) {
    window.open(url);
  } else if (currentUrl === privacyUrl) {
    window.location.href = url;
  } else if (currentUrl === legalNoticeUrl) {
    window.location.href = url;
  }
}
