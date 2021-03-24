var siteNav = {
  open: function (el, control, third) {
    el.setAttribute("aria-expanded", "true");
    el.classList.add("open");
    control.classList.add("open");
    third ? third.setAttribute("aria-expanded", "true") : null;
  },
  close: function (el, control, third) {
    el.setAttribute("aria-expanded", "false");
    el.classList.remove("open");
    control.classList.remove("open");
    third ? third.setAttribute("aria-expanded", "false") : null;
  },
  inputColor: function () {
    this.value !== ""
      ? this.nextElementSibling.classList.add("active")
      : this.nextElementSibling.classList.remove("active");
  },
  toggleSearch: function () {
    if (
      !siteSearchToggle.classList.contains("open") &&
      this.id === "search-toggle-nav"
    ) {
      siteNav.open(
        siteSearchToggle,
        siteSearchToggle.nextElementSibling,
        siteSearchClose
      );
    } else {
      siteNav.close(
        siteSearchToggle,
        siteSearchToggle.nextElementSibling,
        siteSearchClose
      );
    }
  },
  toggleMenu: function (e) {
    var opened = this.classList.contains("open");
    for (var i = 0; i < auxMenus.length; i++) {
      siteNav.close(auxMenus[i], auxMenus[i].nextElementSibling);
    }
    opened
      ? siteNav.close(this, this.nextElementSibling)
      : siteNav.open(this, this.nextElementSibling);
    e.preventDefault();
    return false;
  },
  openHam: function () {
    siteNav.open(this, this.parentElement.nextElementSibling, closeHamBtn);
    document.querySelector(".dark-background-overlay").classList.add("open");
  },
  closeHam: function () {
    siteNav.close(this, this.parentElement, openHamBtn);
    document.querySelector(".dark-background-overlay").classList.remove("open");
  },
  stickyNav: function () {
    if (window.innerWidth >= 900 && window.scrollY >= 140) {
      document.querySelector("#site-nav .main-nav").classList.add("fixed");
    } else {
      document.querySelector("#site-nav .main-nav").classList.remove("fixed");
    }
  },
};

//search
var siteSearchToggle = document.querySelector("#site-nav #search-toggle-nav");
var siteSearchClose = document.querySelector("#site-nav #search-close-nav");
siteSearchToggle.addEventListener("click", siteNav.toggleSearch);
siteSearchClose.addEventListener("click", siteNav.toggleSearch);
document
  .querySelector("#site-nav #as_q")
  .addEventListener("input", siteNav.inputColor);

//aux menus
var auxMenus = document.querySelectorAll("#site-nav .aux-menu > li > a");
for (var i = 0; i < auxMenus.length; i++) {
  auxMenus[i].addEventListener("click", siteNav.toggleMenu);
  auxMenus[i].parentElement.addEventListener("mouseover", function () {
    siteNav.open(
      this.firstElementChild,
      this.firstElementChild.nextElementSibling
    );
  });
  auxMenus[i].parentElement.addEventListener("mouseout", function () {
    siteNav.close(
      this.firstElementChild,
      this.firstElementChild.nextElementSibling
    );
  });
}

//ham menu
var openHamBtn = document.querySelector("#site-nav #site-ham-btn");
var closeHamBtn = document.querySelector("#site-nav #site-ham-close");
openHamBtn.addEventListener("click", siteNav.openHam);
closeHamBtn.addEventListener("click", siteNav.closeHam);

//sticky
document.addEventListener("DOMContentLoaded", siteNav.stickyNav);
document.addEventListener('scroll', siteNav.stickyNav)
window.addEventListener("resize", siteNav.stickyNav);
