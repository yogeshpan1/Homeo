'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// -------------------- SIDEBAR --------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// -------------------- TESTIMONIALS / MODAL --------------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

if (testimonialsItem.length && modalImg && modalTitle && modalText && modalContainer && overlay) {
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar) {
        modalImg.src = avatar.src || "";
        modalImg.alt = avatar.alt || "";
      }
      if (title) modalTitle.innerHTML = title ? title.innerHTML : "";
      if (text) modalText.innerHTML = text ? text.innerHTML : "";

      testimonialsModalFunc();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);
}


// -------------------- CUSTOM SELECT / FILTER (portfolio) --------------------
// Guard: only run if these exist (portfolio removed => these are null)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // note: HTML uses "selecct" in original
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select && selectValue) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  if (selectItems.length) {
    selectItems.forEach(si => {
      si.addEventListener("click", function () {
        const selectedValue = (this.innerText || "").toLowerCase();
        selectValue.innerText = this.innerText || "";
        elementToggleFunc(select);
        if (typeof filterFunc === "function") filterFunc(selectedValue);
      });
    });
  }
}

const filterFunc = function (selectedValue) {
  if (!filterItems.length) return;
  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === (item.dataset.category || "").toLowerCase()) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
}

if (filterBtn.length && selectValue) {
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = (this.innerText || "").toLowerCase();
      selectValue.innerText = this.innerText || "";
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}


// -------------------- CONTACT FORM --------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length && formBtn) {
  formInputs.forEach(inp => {
    inp.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}


// -------------------- PAGE NAVIGATION --------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length && pages.length) {

  const clearActive = () => {
    navigationLinks.forEach(b => b.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));
  };

  const showPageByName = (name) => {
    const page = Array.from(pages).find(p => p.dataset.page === name);
    if (page) {
      page.classList.add("active");
      return true;
    }
    return false;
  };

  navigationLinks.forEach(btn => {
    btn.addEventListener("click", function () {
      clearActive();
      btn.classList.add("active");

      const name = (btn.textContent || "").trim().toLowerCase();
      const matched = name && showPageByName(name);

      // fallback: if no page matched by name, try index fallback
      if (!matched) {
        const idx = Array.from(navigationLinks).indexOf(btn);
        const fallbackPage = pages[idx] || pages[0];
        fallbackPage.classList.add("active");
      }

      // optional: scroll main-content top
      const mainContent = document.querySelector('.main-content');
      if (mainContent) mainContent.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  });

  // initial sync: if HTML already has an active page, ensure nav matches it.
  const activePage = Array.from(pages).find(p => p.classList.contains('active'));
  if (activePage) {
    const name = activePage.dataset.page;
    const navMatch = Array.from(navigationLinks).find(b => (b.textContent || '').trim().toLowerCase() === name);
    if (navMatch) navMatch.classList.add('active');
    else navigationLinks[0].classList.add('active');
  } else {
    // none active: activate first matching by name or fallback to first
    let activated = false;
    for (const b of navigationLinks) {
      const nm = (b.textContent || '').trim().toLowerCase();
      if (nm && showPageByName(nm)) { b.classList.add('active'); activated = true; break; }
    }
    if (!activated) {
      navigationLinks[0].classList.add('active');
      pages[0].classList.add('active');
    }
  }

}
