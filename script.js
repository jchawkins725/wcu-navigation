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
    siteNav.open(
      this,
      this.parentElement.parentElement.nextElementSibling,
      closeHamBtn
    );
    document.querySelector(".dark-background-overlay").classList.add("open");
    document.querySelector("body").classList.add("ham-open");
  },
  closeHam: function () {
    siteNav.close(
      closeHamBtn,
      document.getElementById("site-ham-menu"),
      openHamBtn
    );
    document.querySelector(".dark-background-overlay").classList.remove("open");
    document.querySelector("body").classList.remove("ham-open");
  },
  closeHamClick: function (e) {
    var hamContainer = document.querySelector("#site-nav .ham-menu");
    if (
      hamContainer.classList.contains("open") &&
      !hamContainer.contains(e.target) &&
      !openHamBtn.contains(e.target)
    ) {
      siteNav.closeHam();
    }
  },
  toggleMenusHam: function () {
    if (this.classList.contains("open")) {
      var openedHamMenus = document.querySelectorAll("#site-ham-menu li.open");
      var childHeight = this.nextElementSibling.childElementCount * 40;
      var openedHamLists = this.nextElementSibling.getElementsByTagName("ul");
      for (var i = 0; i < openedHamMenus.length; i++) {
        var subtractedHeight = this.nextElementSibling.offsetHeight;
        var openedList =
          openedHamMenus[i].children[openedHamMenus[i].children.length - 1];
        openedList.style.height =
          openedList.offsetHeight - subtractedHeight + "px";
      }
      siteNav.close(this, this.parentElement);
      this.nextElementSibling.style.height = "0px";
      for (var i = 0; i < openedHamLists.length; i++) {
        siteNav.close(
          openedHamLists[i].previousElementSibling,
          openedHamLists[i].parentElement
        );
        openedHamLists[i].style.height = "0px";
      }
    } else {
      var allOpenedLists = document.querySelectorAll("#site-ham-menu li.open");
      var allOpenedSiblings = this.parentElement.parentElement.querySelectorAll("button.open");
      var clickedList = this.parentElement.parentElement.querySelector("li.open > ul");
      var subtractedHeight = clickedList ? clickedList.offsetHeight : 0;
      var addedHeight = this.nextElementSibling.childElementCount * 40;
      if (allOpenedSiblings.length > 0) {
        for (var i=0; i<allOpenedLists.length; i++) {
          var openedList = allOpenedLists[i].children[allOpenedLists[i].children.length - 1];
          var testing = openedList.offsetHeight - subtractedHeight + addedHeight
          openedList.style.height = testing + "px";
        }
        for (var i=0; i<allOpenedSiblings.length; i++) {
          siteNav.close(allOpenedSiblings[i], allOpenedSiblings[i].parentElement)
          allOpenedSiblings[i].nextElementSibling.style.height = "0px";
        }
      } else {
        for (var i=0; i<allOpenedLists.length; i++) {
          var openedList = allOpenedLists[i].children[allOpenedLists[i].children.length - 1];
          var testing = openedList.offsetHeight  + addedHeight
          openedList.style.height = testing + "px";
        }
      }
      siteNav.open(this, this.parentElement);
      this.nextElementSibling.style.height = addedHeight + "px";
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
var toggleHamBtns = document.querySelectorAll("#site-ham-menu ul button");
document.addEventListener("click", siteNav.closeHamClick);
openHamBtn.addEventListener("click", siteNav.openHam);
closeHamBtn.addEventListener("click", siteNav.closeHam);
for (var i = 0; i < toggleHamBtns.length; i++) {
  toggleHamBtns[i].addEventListener("click", siteNav.toggleMenusHam);
}
//sticky
document.addEventListener("DOMContentLoaded", siteNav.stickyNav);
document.addEventListener("scroll", siteNav.stickyNav);
window.addEventListener("resize", siteNav.stickyNav);
