/**
 * Initializes the page by asynchronously including HTML snippets,
 * highlighting the current navigation link, and hiding navigation
 * links on external pages.
 */
async function initPage() {
  await includeHTML();
  highlightNavLink();
  changeFrameOnNewTab();
  highlightExternalLink();
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
  let includeElements = document.querySelectorAll('[w3-include-html]');

  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute('w3-include-html');
    let resp = await fetch(file);

    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

/**
 * Navigates to the previous page in the browser history.
 */
function goBack() {
  window.history.back();
}

/**
 * Highlights the navigation link corresponding to the
 * current page.
 *
 * Loops through all navigation links and compares their
 * href to the current page URL. If they match, it adds
 * the 'visited' class to highlight the link.
 */
function highlightNavLink() {
  const currentUrl = window.location.pathname;
  const navLinks = getNavLinks();

  navLinks.forEach((navLink) => {
    const href = navLink.getAttribute('href');
    if (currentUrl === href) {
      navLink.classList.add('visited');
    } else {
      navLink.classList.remove('visited');
    }
  });
}

/**
 * Gets the navigation links that should be highlighted
 * based on the current viewport.
 *
 * On mobile, returns the mobile navigation links.
 * On desktop, returns the desktop side navigation links.
 */
function getNavLinks() {
  const desktopLinks = document.querySelectorAll('#side-nav a');
  const mobileLinks = document.querySelectorAll('#mobile-nav a');
  const asideDisplay = getComputedStyle(
    document.querySelector('aside')
  ).display;

  if (asideDisplay === 'none') {
    return mobileLinks;
  } else {
    return desktopLinks;
  }
}

/**
 * Toggles the visibility of the side navigation and header icons
 * when the privacy policy or legal notice pages are loaded.
 * This hides the side nav and header icons on those pages since they are
 * standalone legal pages.
 */
function changeFrameOnNewTab() {
  const sideNav = document.getElementById('side-nav');
  const headerIcons = document.getElementById('corner-icons');
  const quickmenu = document.getElementById('quickmenu');
  const privacyUrl = '/privacy_policy.html';
  const legalNoticeUrl = '/legal_notice.html';
  const currentUrl = window.location.pathname;
  if (currentUrl === privacyUrl || currentUrl === legalNoticeUrl) {
    sideNav.classList.toggle('hidden');
    headerIcons.classList.toggle('hidden');
    quickmenu.classList.toggle('hidden');
  }
}

/**
 * Opens the given URL in a new tab, unless the current page is
 * the privacy policy or legal notice. For those pages, refresh
 * current page instead  of opening a new tab.
 */
function openExternalLink(url) {
  const currentUrl = window.location.pathname;
  const privacyUrl = '/privacy_policy.html';
  const legalNoticeUrl = '/legal_notice.html';

  if (currentUrl !== privacyUrl && currentUrl !== legalNoticeUrl) {
    window.open(url);
  } else if (currentUrl === privacyUrl) {
    window.location.href = url;
  } else if (currentUrl === legalNoticeUrl) {
    window.location.href = url;
  }
}

/**
 * Highlights the given links only on the external tab
 * if the current page URL contains the link text.
 * For example, highlights the "Privacy" link if the
 * current page URL contains "privacy".
 */
function highlightExternalLink() {
  const url = window.location.href;

  const privacyLink = document.getElementById('privacy-link');
  const legalLink = document.getElementById('legal-link');

  if (url.includes('privacy')) {
    privacyLink.classList.add('visited');
  } else if (url.includes('legal')) {
    legalLink.classList.add('visited');
  }
}

/**
 * Toggles the display of the quick menu UI element.
 * If currently hidden, animates it sliding in.
 * If currently shown, animates it sliding away.
 */
function toggleQuickMenu() {
  const quickMenu = document.getElementById('quickmenu');
  if (quickMenu.classList.contains('d-none')) {
    quickMenu.classList.replace('qm-off', 'qm-on');
    setTimeout(() => {
      quickMenu.classList.toggle('d-none');
    }, 125);
  } else {
    quickMenu.classList.replace('qm-on', 'qm-off');
    setTimeout(() => {
      quickMenu.classList.toggle('d-none');
    }, 125);
  }
}

function logoutUser(url) {
  window.location.href = url;
}
