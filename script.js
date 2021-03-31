var siteNav = {
  open: function (el, control, third) {
    el.setAttribute("aria-expanded", "true");
    el.classList.add("open");
    control.classList.add("open");
    third ? third.setAttribute("aria-expanded", "true") : null;
    third ? third.classList.add("open") : null;
  },
  close: function (el, control, third) {
    el.setAttribute("aria-expanded", "false");
    el.classList.remove("open");
    control.classList.remove("open");
    third ? third.setAttribute("aria-expanded", "false") : null;
    third ? third.classList.remove("open") : null;
  },
  inputColor: function () {
    this.value !== "" ? this.nextElementSibling.classList.add("active") : this.nextElementSibling.classList.remove("active");
  },
  toggleSearch: function () {
    if (siteSearchToggle.classList.contains("open")) {
      siteNav.close(siteSearchToggle, siteSearchToggle.nextElementSibling, siteSearchClose);
    } else {
      siteNav.open(siteSearchToggle, siteSearchToggle.nextElementSibling, siteSearchClose);
    }
  },
  toggleMenu: function (e) {
    var opened = this.classList.contains("open");
    for (var i = 0; i < auxMenus.length; i++) {
      siteNav.close(auxMenus[i], auxMenus[i].nextElementSibling);
    }
    opened ? siteNav.close(this, this.nextElementSibling) : siteNav.open(this, this.nextElementSibling);
    e.preventDefault();
    return false;
  },
  openHam: function () {
    siteNav.open(closeHamBtn, document.getElementById("site-ham-menu"), toggleHamBtn);
    hamBackOverlay.classList.add("open");
    document.querySelector("body").classList.add("ham-open");
    toggleHamBtn.classList.remove("reverse");
  },
  closeHam: function () {
    siteNav.close(closeHamBtn, document.getElementById("site-ham-menu"), toggleHamBtn);
    hamBackOverlay.classList.remove("open");
    document.querySelector("body").classList.remove("ham-open");
    toggleHamBtn.classList.add("reverse");
  },
  toggleHam: function () {
    var opened = this.classList.contains("open");
    opened ? siteNav.closeHam() : siteNav.openHam();
  },
  closeHamClick: function (e) {
    var hamContainer = document.querySelector("#site-nav .ham-menu");
    if (hamContainer.classList.contains("open") && hamBackOverlay.contains(e.target)) {
      siteNav.closeHam();
    }
  },
  changeMenuHeights: function (el, type) {
    var openedHamMenus = document.querySelectorAll("#site-ham-menu li.open");
    var openedSibling = el.parentElement.parentElement.querySelector("li.open > ul");
    var siblingHeight = openedSibling ? openedSibling.offsetHeight : 0;
    for (var i = 0; i < openedHamMenus.length; i++) {
      var openedList = openedHamMenus[i].children[openedHamMenus[i].children.length - 1];
      var listHeight =
        type === "closing" ? -Math.abs(el.nextElementSibling.offsetHeight) : el.nextElementSibling.childElementCount * 40 - siblingHeight;
      var subtractedHeight = openedList.offsetHeight + listHeight;
      openedList.style.height = subtractedHeight + "px";
    }
  },
  closeSubMenus: function (el) {
    var openedHamLists = el.nextElementSibling.getElementsByTagName("ul");
    for (var i = 0; i < openedHamLists.length; i++) {
      siteNav.close(openedHamLists[i].previousElementSibling, openedHamLists[i].parentElement);
      openedHamLists[i].style.height = "0px";
    }
  },
  closeSiblings: function (el) {
    var allOpenedSiblings = el.parentElement.parentElement.querySelectorAll("button.open");
    if (allOpenedSiblings.length > 0) {
      for (var i = 0; i < allOpenedSiblings.length; i++) {
        siteNav.close(allOpenedSiblings[i], allOpenedSiblings[i].parentElement);
        allOpenedSiblings[i].nextElementSibling.style.height = "0px";
      }
    }
  },
  toggleMenusHam: function () {
    if (this.classList.contains("open")) {
      siteNav.changeMenuHeights(this, "closing");
      siteNav.closeSubMenus(this);
      siteNav.close(this, this.parentElement);
      this.nextElementSibling.style.height = "0px";
    } else {
      siteNav.changeMenuHeights(this, "opening");
      siteNav.closeSiblings(this);
      siteNav.open(this, this.parentElement);
      this.nextElementSibling.style.height = this.nextElementSibling.childElementCount * 40 + "px";
    }
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
document.querySelector("#site-nav #as_q").addEventListener("input", siteNav.inputColor);

//aux menus
var auxMenus = document.querySelectorAll("#site-nav .aux-menu > li > a");
for (var i = 0; i < auxMenus.length; i++) {
  auxMenus[i].addEventListener("click", siteNav.toggleMenu);
  auxMenus[i].parentElement.addEventListener("mouseover", function () {
    siteNav.open(this.firstElementChild, this.firstElementChild.nextElementSibling);
  });
  auxMenus[i].parentElement.addEventListener("mouseout", function () {
    siteNav.close(this.firstElementChild, this.firstElementChild.nextElementSibling);
  });
}

//ham menu
var toggleHamBtn = document.querySelector("#site-nav #site-ham-btn");
var closeHamBtn = document.querySelector("#site-nav #site-ham-close");
var toggleHamBtns = document.querySelectorAll("#site-ham-menu ul button");
var hamBackOverlay = document.querySelector(".dark-background-overlay");
document.addEventListener("click", siteNav.closeHamClick);
toggleHamBtn.addEventListener("click", siteNav.toggleHam);
closeHamBtn.addEventListener("click", siteNav.closeHam);
for (var i = 0; i < toggleHamBtns.length; i++) {
  toggleHamBtns[i].addEventListener("click", siteNav.toggleMenusHam);
}
//sticky
document.addEventListener("DOMContentLoaded", siteNav.stickyNav);
document.addEventListener("scroll", siteNav.stickyNav);
window.addEventListener("resize", siteNav.stickyNav);
