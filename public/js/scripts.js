// js pour texte titre page d'accueil

$(document).ready(function () {
  var mouseX, mouseY;
  var ww = $(window).width();
  var wh = $(window).height();
  var traX, traY;
  $(document).mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = ((4 * mouseX) / 570) + 40;
    traY = ((4 * mouseY) / 570) + 50;
    $(".title").css({
      "background-position": traX + "%" + traY + "%"
    });
  });
});

// js pour sidenav axentix

"use strict";
class AxentixComponent {
  sync() {
    Axentix.createEvent(this.el, "component.sync"), this._removeListeners(), this._setupListeners()
  }
  reset() {
    Axentix.createEvent(this.el, "component.reset"), this._removeListeners(), this._setup()
  }
}
class Axentix {
  constructor(e, t) {
    this.component = e[0].toUpperCase() + e.slice(1).toLowerCase(), this.isAll = !("all" !== e), this.options = this.isAll ? {} : t, this._init()
  }
  _init() {
    var e = {
        Collapsible: document.querySelectorAll(".collapsible:not(.no-axentix-init)"),
        Sidenav: document.querySelectorAll(".sidenav:not(.no-axentix-init)"),
        Modal: document.querySelectorAll(".modal:not(.no-axentix-init)"),
        Dropdown: document.querySelectorAll(".dropdown:not(.no-axentix-init)"),
        Tab: document.querySelectorAll(".tab:not(.no-axentix-init)"),
        Fab: document.querySelectorAll(".fab:not(i):not(.no-axentix-init)"),
        Caroulix: document.querySelectorAll(".caroulix:not(.no-axentix-init)")
      },
      t = e.hasOwnProperty(this.component);
    if (t) {
      var i = this._detectIds(e[this.component]);
      this._instanciate(i, this.component)
    } else this.isAll && Object.keys(e).map(t => {
      var i = this._detectIds(e[t]);
      0 < i.length ? this._instanciate(i, t) : ""
    })
  }
  _detectIds(e) {
    var t = [];
    return e.forEach(e => {
      t.push("#" + e.id)
    }), t
  }
  _instanciate(e, t) {
    e.map(e => {
      var i = Axentix[t],
        o = [e, this.options];
      try {
        new i(...o)
      } catch (e) {
        console.error("Axentix : Unable to load " + t)
      }
    })
  }
}
Axentix.instances = [], Axentix.DataDetection = (() => {
  var e = ["Caroulix", "Collapsible", "Dropdown", "Fab", "Modal", "Sidenav", "Tab", "Tooltip"],
    t = e => e.replace(/[\w]([A-Z])/g, e => e[0] + "-" + e[1]).toLowerCase(),
    i = function (e) {
      var i = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : "",
        o = t(e);
      return i ? i + "-" + o : o
    },
    o = function t(o, n, s) {
      var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : "";
      return Object.keys(o).reduce((l, r) => {
        if ("object" == typeof o[r] && null !== o[r]) {
          var d = r[0].toUpperCase() + r.slice(1).toLowerCase();
          e.includes(d) && "Collapsible" !== n && "Sidenav" !== d ? o[r] = Axentix[d].getDefaultOptions() : "";
          var c = a ? a + "-" + r : r,
            p = t(o[r], n, s, c);
          0 === Object.keys(p).length && o.constructor === Object ? "" : l[r] = p
        } else if (null !== o[r]) {
          var m = "data-" + n.toLowerCase() + "-" + i(r, a);
          if (s.hasAttribute(m)) {
            var v = s.getAttribute(m);
            l[r] = "boolean" == typeof o[r] ? "true" === v : "number" == typeof o[r] ? +v : v
          }
        }
        return l
      }, {})
    },
    n = (e, t) => {
      var i = Axentix[e].getDefaultOptions();
      return o(i, e, t)
    };
  return {
    setup: () => {
      var t = document.querySelectorAll("[data-ax]");
      t.forEach(t => {
        var i = t.dataset.ax;
        if (i = i[0].toUpperCase() + i.slice(1).toLowerCase(), !e.includes(i)) return void console.error("Error: This component doesn't exist.", t);
        var o = n(i, t);
        try {
          new Axentix[i]("#".concat(t.id), o, !0)
        } catch (e) {
          console.error("Axentix Data: Unable to load " + i)
        }
      })
    },
    setupAll: () => {
      new Axentix("all")
    },
    formatOptions: n
  }
})(), document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.dataset.axentix ? Axentix.DataDetection.setupAll() : "", Axentix.DataDetection.setup()
}), (() => {
  Axentix.Caroulix = class Caroulix extends AxentixComponent {
    static getDefaultOptions() {
      return {
        fixedHeight: !0,
        height: "",
        animationDuration: 500,
        animationType: "slide",
        indicators: {
          enabled: !1,
          isFlat: !1,
          customClasses: ""
        },
        autoplay: {
          enabled: !0,
          interval: 5e3,
          side: "right"
        }
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Caroulix", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "caroulix.setup");
      ["slide"].includes(this.options.animationType) ? "" : this.options.animationType = "slide";
      ["right", "left"].includes(this.options.autoplay.side) ? "" : this.options.autoplay.side = "right", this.currentItemIndex = 0, this.isAnimated = !1, this.animFunction = "_animation" + this.options.animationType.charAt(0).toUpperCase() + this.options.animationType.substring(1), this._getChildrens(), this.options.indicators.enabled ? this._enableIndicators() : "", this._getActiveElementIndex(), this._setupListeners(), this.el.classList.add("anim-" + this.options.animationType)
    }
    _setupListeners() {
      this.windowResizeRef = this._handleResizeEvent.bind(this), window.addEventListener("resize", this.windowResizeRef), this.arrowPrev && this.arrowNext && (this.arrowPrevRef = this.prev.bind(this, 1), this.arrowNextRef = this.next.bind(this, 1), this.arrowPrev.addEventListener("click", this.arrowPrevRef), this.arrowNext.addEventListener("click", this.arrowNextRef))
    }
    _removeListeners() {
      window.removeEventListener("resize", this.windowResizeRef), this.windowResizeRef = void 0, this.arrowPrev && this.arrowNext && (this.arrowPrev.removeEventListener("click", this.arrowPrevRef), this.arrowNext.removeEventListener("click", this.arrowNextRef), this.arrowPrevRef = void 0, this.arrowNextRef = void 0)
    }
    _handleResizeEvent() {
      this.updateHeight()
    }
    _getChildrens() {
      this.childrens = Array.from(this.el.children).reduce((e, t) => (t.classList.contains("caroulix-item") ? e.push(t) : "", t.classList.contains("caroulix-prev") ? this.arrowPrev = t : "", t.classList.contains("caroulix-next") ? this.arrowNext = t : "", e), [])
    }
    _getActiveElementIndex() {
      this.childrens.map((e, t) => {
        e.classList.contains("active") && (this.currentItemIndex = t)
      });
      var e = this.childrens[this.currentItemIndex];
      e.classList.contains("active") ? "" : e.classList.add("active"), this.options.indicators.enabled ? this.indicators.children[this.currentItemIndex].classList.add("active") : "", this._waitUntilLoad(e)
    }
    _waitUntilLoad(e) {
      var t = !1;
      if (this.options.fixedHeight) this.totalLoadChild = 0, this.totalLoadedChild = 0, this.childrens.map(e => {
        var i = e.querySelector("img, video");
        i && (t = !0, this.totalLoadChild++, i.complete ? this._initWhenLoaded(i, !0) : (i.loadRef = this._initWhenLoaded.bind(this, i), i.addEventListener("load", i.loadRef)))
      });
      else {
        var i = e.querySelector("img, video");
        i && (t = !0, i.complete ? this._initWhenLoaded(i, !0) : (i.loadRef = this._initWhenLoaded.bind(this, i), i.addEventListener("load", i.loadRef)))
      }
      t || (this.updateHeight(), this.options.autoplay.enabled ? this.play() : "")
    }
    _initWhenLoaded(e, t) {
      this.options.fixedHeight ? (!t && (e.removeEventListener("load", e.loadRef), e.loadRef = void 0), this.totalLoadedChild++, this.totalLoadedChild === this.totalLoadChild && (this.updateHeight(), this.totalLoadedChild = void 0, this.totalLoadChild = void 0, this.options.autoplay.enabled ? this.play() : "")) : (this.updateHeight(), e.removeEventListener("load", e.loadRef), e.loadRef = void 0, this.options.autoplay.enabled ? this.play() : "")
    }
    _setMaxHeight() {
      if (this.options.height) return void(this.el.style.height = this.options.height);
      var e = this.childrens.map(e => e.offsetHeight);
      this.maxHeight = Math.max(...e), this.el.style.height = this.maxHeight + "px"
    }
    _setDynamicHeight() {
      var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : this.currentItemIndex,
        t = this.childrens[e].offsetHeight;
      this.el.style.height = t + "px"
    }
    _enableIndicators() {
      this.indicators = document.createElement("ul"), this.indicators.classList.add("caroulix-indicators"), this.options.indicators.isFlat ? this.indicators.classList.add("caroulix-flat") : "", this.options.indicators.customClasses ? this.indicators.className = this.indicators.className + " " + this.options.indicators.customClasses : "";
      for (var e, t = 0; t < this.childrens.length; t++) e = document.createElement("li"), e.triggerRef = this._handleIndicatorClick.bind(this, t), e.addEventListener("click", e.triggerRef), this.indicators.appendChild(e);
      this.el.appendChild(this.indicators)
    }
    _animationSlide(e, t) {
      var i = this.childrens[e],
        o = this.childrens[this.currentItemIndex],
        n = "",
        s = "";
      "right" === t ? (n = "100%", s = "-100%") : (n = "-100%", s = "100%"), i.style.transform = "translateX(".concat(n, ")"), i.classList.add("active"), setTimeout(() => {
        i.style.transitionDuration = this.options.animationDuration + "ms", i.style.transform = "", o.style.transitionDuration = this.options.animationDuration + "ms", o.style.transform = "translateX(".concat(s, ")")
      }, 50), setTimeout(() => {
        i.removeAttribute("style"), o.classList.remove("active"), o.removeAttribute("style"), this.currentItemIndex = e, this.isAnimated = !1, this.options.autoplay.enabled ? this.play() : ""
      }, this.options.animationDuration + 50)
    }
    _handleIndicatorClick(t, i) {
      i.preventDefault();
      t === this.currentItemIndex || this.goTo(t)
    }
    _getPreviousItemIndex(e) {
      for (var t = 0, o = this.currentItemIndex, n = 0; n < e; n++) 0 < o ? (t = o - 1, o--) : (o = this.childrens.length - 1, t = o);
      return t
    }
    _getNextItemIndex(e) {
      for (var t = 0, o = this.currentItemIndex, n = 0; n < e; n++) o < this.childrens.length - 1 ? (t = o + 1, o++) : (o = 0, t = o);
      return t
    }
    updateHeight(e) {
      this.options.fixedHeight ? this._setMaxHeight() : this._setDynamicHeight(e)
    }
    goTo(e, t) {
      this.isAnimated || e === this.currentItemIndex || (t ? "" : e > this.currentItemIndex ? t = "right" : t = "left", this.options.autoplay.enabled && this.autoTimeout ? this.stop() : "", Axentix.createEvent(this.el, "caroulix.slide", {
        side: t,
        nextElement: this.childrens[e],
        currentElement: this.childrens[this.currentItemIndex]
      }), this.isAnimated = !0, this.options.indicators.enabled && (Array.from(this.indicators.children).map(e => {
        e.removeAttribute("class")
      }), this.indicators.children[e].classList.add("active")), this.options.fixedHeight ? "" : this.updateHeight(e), this[this.animFunction](e, t))
    }
    prev() {
      var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 1;
      if (!this.isAnimated) {
        Axentix.createEvent(this.el, "caroulix.prev", {
          step: e
        });
        var t = this._getPreviousItemIndex(e);
        this.goTo(t, "left")
      }
    }
    next() {
      var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 1;
      if (!this.isAnimated) {
        Axentix.createEvent(this.el, "caroulix.next", {
          step: e
        });
        var t = this._getNextItemIndex(e);
        this.goTo(t, "right")
      }
    }
    play() {
      this.autoTimeout = setTimeout(() => {
        "right" === this.options.autoplay.side ? this.next() : this.prev()
      }, this.options.autoplay.interval)
    }
    stop() {
      clearTimeout(this.autoTimeout), this.autoTimeout = !1
    }
  }
})(), (() => {
  Axentix.Collapsible = class Collapsible extends AxentixComponent {
    static getDefaultOptions() {
      return {
        animationDuration: 300,
        sidenav: {
          activeClass: !0,
          activeWhenOpen: !0,
          autoCloseOtherCollapsible: !0
        }
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Collapsible", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "collapsible.setup"), this.el.Collapsible = this, this.collapsibleTriggers = document.querySelectorAll(".collapsible-trigger"), this.isInitialStart = !0, this.isActive = !!this.el.classList.contains("active"), this.isAnimated = !1, this.isInSidenav = !1, this.childIsActive = !1, this._setupListeners(), this.el.style.transitionDuration = this.options.animationDuration + "ms", this._detectSidenav(), this._detectChild(), this.options.sidenav.activeClass ? this._addActiveInSidenav() : "", this.isActive ? this.open() : "", this.isInitialStart = !1
    }
    _setupListeners() {
      this.listenerRef = this._onClickTrigger.bind(this), this.collapsibleTriggers.forEach(e => {
        e.dataset.target === this.el.id && e.addEventListener("click", this.listenerRef)
      }), this.resizeRef = this._handleResize.bind(this), window.addEventListener("resize", this.resizeRef)
    }
    _removeListeners() {
      this.collapsibleTriggers.forEach(e => {
        e.dataset.target === this.el.id && e.removeEventListener("click", this.listenerRef)
      }), this.listenerRef = void 0, window.removeEventListener("resize", this.resizeRef), this.resizeRef = void 0
    }
    _handleResize() {
      this.isActive && !this.isInSidenav ? this.el.style.maxHeight = this.el.scrollHeight + "px" : ""
    }
    _detectSidenav() {
      var e = this.el.closest(".sidenav");
      e && (this.isInSidenav = !0, this.sidenavId = e.id), this.sidenavCollapsibles = document.querySelectorAll("#" + this.sidenavId + " .collapsible")
    }
    _detectChild() {
      for (var e of this.el.children)
        if (e.classList.contains("active")) {
          this.childIsActive = !0;
          break
        }
    }
    _addActiveInSidenav() {
      if (this.childIsActive && this.isInSidenav) {
        var e = document.querySelectorAll(".sidenav .collapsible-trigger");
        e.forEach(e => {
          e.dataset.target === this.el.id && e.classList.add("active")
        }), this.el.classList.add("active"), this.open(), this.isActive = !0
      }
    }
    _addActiveToTrigger(e) {
      var t = document.querySelectorAll(".sidenav .collapsible-trigger");
      t.forEach(t => {
        t.dataset.target === this.el.id && (e ? t.classList.add("active") : t.classList.remove("active"))
      })
    }
    _autoCloseOtherCollapsible() {
      !this.isInitialStart && this.isInSidenav && this.sidenavCollapsibles.forEach(e => {
        e.id !== this.el.id && e.Collapsible.close()
      })
    }
    _applyOverflow() {
      this.el.style.overflow = "hidden", setTimeout(() => {
        this.el.style.overflow = ""
      }, this.options.animationDuration)
    }
    _onClickTrigger(t) {
      t.preventDefault();
      this.isAnimated || (this.isActive ? this.close() : this.open())
    }
    open() {
      this.isActive || (Axentix.createEvent(this.el, "collapsible.open"), this.isActive = !0, this.isAnimated = !0, this.el.style.display = "block", this._applyOverflow(), this.el.style.maxHeight = this.el.scrollHeight + "px", this.options.sidenav.activeWhenOpen ? this._addActiveToTrigger(!0) : "", this.options.sidenav.autoCloseOtherCollapsible ? this._autoCloseOtherCollapsible() : "", setTimeout(() => {
        this.isAnimated = !1
      }, this.options.animationDuration))
    }
    close() {
      this.isActive && (Axentix.createEvent(this.el, "collapsible.close"), this.isAnimated = !0, this.el.style.maxHeight = "", this._applyOverflow(), this.options.sidenav.activeWhenOpen ? this._addActiveToTrigger(!1) : "", setTimeout(() => {
        this.el.style.display = "", this.isAnimated = !1, this.isActive = !1
      }, this.options.animationDuration))
    }
  }
})(), (() => {
  Axentix.Dropdown = class Dropdown extends AxentixComponent {
    static getDefaultOptions() {
      return {
        animationDuration: 300,
        animationType: "none",
        hover: !1
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Dropdown", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "dropdown.setup"), this.dropdownContent = document.querySelector("#" + this.el.id + " .dropdown-content"), this.dropdownTrigger = document.querySelector("#" + this.el.id + " .dropdown-trigger"), this.isAnimated = !1, this.isActive = !!this.el.classList.contains("active"), this.options.hover ? this.el.classList.add("active-hover") : this._setupListeners(), this._setupAnimation()
    }
    _setupListeners() {
      this.options.hover || (this.listenerRef = this._onClickTrigger.bind(this), this.dropdownTrigger.addEventListener("click", this.listenerRef), this.documentClickRef = this._onDocumentClick.bind(this), document.addEventListener("click", this.documentClickRef, !0))
    }
    _removeListeners() {
      this.options.hover || (this.dropdownTrigger.removeEventListener("click", this.listenerRef), this.listenerRef = void 0, document.removeEventListener("click", this.documentClickRef, !0), this.documentClickRef = void 0)
    }
    _setupAnimation() {
      this.options.animationType = this.options.animationType.toLowerCase(), ["none", "fade"].includes(this.options.animationType) ? "" : this.options.animationType = "none", "none" === this.options.animationType || this.options.hover || (this.options.hover ? this.el.style.animationDuration = this.options.animationDuration + "ms" : this.el.style.transitionDuration = this.options.animationDuration + "ms", this.el.classList.add("anim-" + this.options.animationType))
    }
    _onDocumentClick(t) {
      t.target.matches(".dropdown-trigger") || this.isAnimated || !this.isActive || this.close()
    }
    _onClickTrigger(t) {
      t.preventDefault();
      this.isAnimated || (this.isActive ? this.close() : this.open())
    }
    open() {
      this.isActive || (Axentix.createEvent(this.el, "dropdown.open"), this.dropdownContent.style.display = "flex", setTimeout(() => {
        this.el.classList.add("active"), this.isActive = !0
      }, 10), "none" === this.options.animationType ? Axentix.createEvent(this.el, "dropdown.opened") : (this.isAnimated = !0, setTimeout(() => {
        this.isAnimated = !1, Axentix.createEvent(this.el, "dropdown.opened")
      }, this.options.animationDuration)))
    }
    close() {
      this.isActive && (Axentix.createEvent(this.el, "dropdown.close"), this.el.classList.remove("active"), "none" === this.options.animationType ? (this.dropdownContent.style.display = "", this.isAnimated = !1, this.isActive = !1, Axentix.createEvent(this.el, "dropdown.closed")) : (this.isAnimated = !0, setTimeout(() => {
        this.dropdownContent.style.display = "", this.isAnimated = !1, this.isActive = !1, Axentix.createEvent(this.el, "dropdown.closed")
      }, this.options.animationDuration)))
    }
  }
})(), (() => {
  Axentix.Fab = class Fab extends AxentixComponent {
    static getDefaultOptions() {
      return {
        animationDuration: 300,
        hover: !0,
        direction: "top",
        position: "bottom-right",
        offsetX: "1rem",
        offsetY: "1.5rem"
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Fab", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "fab.setup"), this.isAnimated = !1, this.isActive = !1, this.trigger = document.querySelector("#" + this.el.id + " .fab-trigger"), this.fabMenu = document.querySelector("#" + this.el.id + " .fab-menu"), this._verifOptions(), this._setupListeners(), this.el.style.transitionDuration = this.options.animationDuration + "ms", this._setProperties()
    }
    _verifOptions() {
      ["right", "left", "top", "bottom"].includes(this.options.direction) ? "" : this.options.direction = "top";
      ["top-right", "top-left", "bottom-right", "bottom-left"].includes(this.options.position) ? "" : this.options.position = "bottom-right"
    }
    _setupListeners() {
      this.options.hover ? (this.openRef = this.open.bind(this), this.closeRef = this.close.bind(this), this.el.addEventListener("mouseenter", this.openRef), this.el.addEventListener("mouseleave", this.closeRef)) : (this.listenerRef = this._onClickTrigger.bind(this), this.el.addEventListener("click", this.listenerRef)), this.documentClickRef = this._handleDocumentClick.bind(this), document.addEventListener("click", this.documentClickRef, !0)
    }
    _removeListeners() {
      this.options.hover ? (this.el.removeEventListener("mouseenter", this.openRef), this.el.removeEventListener("mouseleave", this.closeRef), this.openRef = void 0, this.closeRef = void 0) : (this.el.removeEventListener("click", this.listenerRef), this.listenerRef = void 0), document.removeEventListener("click", this.documentClickRef, !0), this.documentClickRef = void 0
    }
    _setProperties() {
      "top" === this.options.position.split("-")[0] ? this.el.style.top = this.options.offsetY : this.el.style.bottom = this.options.offsetY, "right" === this.options.position.split("-")[1] ? this.el.style.right = this.options.offsetX : this.el.style.left = this.options.offsetX, "top" === this.options.direction || "bottom" === this.options.direction ? "" : this.el.classList.add("fab-dir-x"), this._setMenuPosition()
    }
    _setMenuPosition() {
      if ("top" === this.options.direction || "bottom" === this.options.direction) {
        var e = this.trigger.clientHeight;
        "top" === this.options.direction ? this.fabMenu.style.bottom = e + "px" : this.fabMenu.style.top = e + "px"
      } else {
        var t = this.trigger.clientWidth;
        "right" === this.options.direction ? this.fabMenu.style.left = t + "px" : this.fabMenu.style.right = t + "px"
      }
    }
    _handleDocumentClick(t) {
      var e = this.el.contains(t.target);
      !e && this.isActive ? this.close() : ""
    }
    _onClickTrigger(t) {
      t.preventDefault();
      this.isAnimated || (this.isActive ? this.close() : this.open())
    }
    open() {
      this.isActive || (Axentix.createEvent(this.el, "fab.open"), this.isAnimated = !0, this.isActive = !0, this.el.classList.add("active"), setTimeout(() => {
        this.isAnimated = !1
      }, this.options.animationDuration))
    }
    close() {
      this.isActive && (Axentix.createEvent(this.el, "fab.close"), this.isAnimated = !0, this.isActive = !1, this.el.classList.remove("active"), setTimeout(() => {
        this.isAnimated = !1
      }, this.options.animationDuration))
    }
  }
})(), Axentix.Forms = (() => {
  var e = !0,
    t = e => {
      e.forEach(e => o(e))
    },
    i = i => e ? void(e = !1) : void setTimeout(() => {
      t(i)
    }, 10),
    o = e => {
      var t = e.parentElement.classList.contains("active"),
        i = 0 < e.value.length || "SELECT" !== e.tagName && 0 < e.placeholder.length || "SELECT" === e.tagName || e.matches("[type=\"date\"]") || e.matches("[type=\"month\"]") || e.matches("[type=\"week\"]") || e.matches("[type=\"time\"]"),
        o = document.activeElement === e,
        s = e.hasAttribute("disabled") || e.hasAttribute("readonly");
      e.firstInit ? (n(e, t, i, o), e.firstInit = !1, e.isInit = !0) : s ? "" : n(e, t, i, o)
    },
    n = (e, t, i, o) => {
      var n = "textarea" === e.type;
      !t && (i || o) ? e.parentElement.classList.add("active") : t && !(i || o) && e.parentElement.classList.remove("active"), n ? "" : s(e), o && !n ? e.parentElement.classList.add("is-focused") : e.parentElement.classList.remove("is-focused"), o && n ? e.parentElement.classList.add("is-txtarea-focused") : e.parentElement.classList.remove("is-txtarea-focused")
    },
    s = e => {
      var t = window.getComputedStyle(e.parentElement),
        i = parseFloat(e.clientHeight),
        o = parseFloat(t.paddingTop),
        n = parseFloat(t.borderTopWidth);
      e.parentElement.style.setProperty("--form-material-position", o + n + i + "px")
    },
    a = (t, i) => {
      t.forEach(e => {
        e === i.target ? o(e) : ""
      })
    },
    l = (t, o) => {
      "FORM" === o.target.tagName && o.target.classList.contains("form-material") && i(t)
    },
    r = e => {
      e.forEach(e => e.firstInit = !0), t(e);
      var o = a.bind(null, e);
      document.addEventListener("focus", o, !0), document.addEventListener("blur", o, !0);
      var n = i.bind(null, e);
      window.addEventListener("pageshow", n);
      var s = l.bind(null, e);
      document.addEventListener("reset", s)
    };
  Axentix.updateInputs = function () {
    var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : document.querySelectorAll(".form-material .form-field:not(.form-default) .form-control"),
      i = Array.from(e).filter(e => !e.isInit),
      o = Array.from(e).filter(e => e.isInit);
    0 < i.length ? r(i) : "", 0 < o.length ? t(o) : ""
  }
})(), document.addEventListener("DOMContentLoaded", () => Axentix.updateInputs()), (() => {
  Axentix.Modal = class Modal extends AxentixComponent {
    static getDefaultOptions() {
      return {
        overlay: !0,
        bodyScrolling: !1,
        animationDuration: 400
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Modal", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "modal.setup"), this.modalTriggers = document.querySelectorAll(".modal-trigger"), this.isActive = !!this.el.classList.contains("active"), this.isAnimated = !1, this._setupListeners(), this.options.overlay ? this._createOverlay() : "", this.el.style.transitionDuration = this.options.animationDuration + "ms"
    }
    _setupListeners() {
      this.listenerRef = this._onClickTrigger.bind(this), this.modalTriggers.forEach(e => {
        e.dataset.target === this.el.id && e.addEventListener("click", this.listenerRef)
      })
    }
    _removeListeners() {
      this.modalTriggers.forEach(e => {
        e.dataset.target === this.el.id && e.removeEventListener("click", this.listenerRef)
      }), this.listenerRef = void 0
    }
    _createOverlay() {
      this.isActive && this.options.overlay ? (this.overlayElement = document.querySelector(".modal-overlay[data-target=\"" + this.el.id + "\"]"), this.overlayElement ? "" : this.overlayElement = document.createElement("div")) : this.overlayElement = document.createElement("div"), this.overlayElement.classList.add("modal-overlay"), this.overlayElement.style.transitionDuration = this.options.animationDuration + "ms", this.overlayElement.dataset.target = this.el.id
    }
    _toggleBodyScroll(e) {
      this.options.bodyScrolling || (e ? document.body.style.overflow = "" : document.body.style.overflow = "hidden")
    }
    _setZIndex() {
      var e = document.querySelectorAll(".modal.active").length + 1;
      this.options.overlay ? this.overlayElement.style.zIndex = 800 + 6 * e : "", this.el.style.zIndex = 800 + 10 * e
    }
    _onClickTrigger(t) {
      t.preventDefault();
      this.isAnimated || (this.isActive ? this.close() : this.open())
    }
    open() {
      this.isActive || (Axentix.createEvent(this.el, "modal.open"), this.isActive = !0, this.isAnimated = !0, this._setZIndex(), this.el.style.display = "block", this.overlay(!0), this._toggleBodyScroll(!1), setTimeout(() => {
        this.el.classList.add("active")
      }, 50), setTimeout(() => {
        this.isAnimated = !1, Axentix.createEvent(this.el, "modal.opened")
      }, this.options.animationDuration))
    }
    close() {
      this.isActive && (Axentix.createEvent(this.el, "modal.close"), this.isAnimated = !0, this.el.classList.remove("active"), this.overlay(!1), setTimeout(() => {
        this.el.style.display = "", this.isAnimated = !1, this.isActive = !1, this._toggleBodyScroll(!0), Axentix.createEvent(this.el, "modal.closed")
      }, this.options.animationDuration))
    }
    overlay(e) {
      this.options.overlay && (e ? (this.overlayElement.addEventListener("click", this.listenerRef), document.body.appendChild(this.overlayElement), setTimeout(() => {
        this.overlayElement.classList.add("active")
      }, 50)) : (this.overlayElement.classList.remove("active"), setTimeout(() => {
        this.overlayElement.removeEventListener("click", this.listenerRef), document.body.removeChild(this.overlayElement)
      }, this.options.animationDuration)))
    }
  }
})(), (() => {
  Axentix.Sidenav = class Sidenav extends AxentixComponent {
    static getDefaultOptions() {
      return {
        overlay: !0,
        bodyScrolling: !1,
        animationDuration: 300
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Sidenav", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "sidenav.setup"), this.sidenavTriggers = document.querySelectorAll(".sidenav-trigger"), this.isActive = !1, this.isFixed = this.el.classList.contains("fixed"), this.isLarge = this.el.classList.contains("large"), this.layoutEl = document.querySelector(".layout"), this._setupListeners(), this.options.overlay ? this._createOverlay() : "", this.el.classList.contains("large") && this.layoutEl ? this.layoutEl.classList.add("sidenav-large") : this.layoutEl.classList.remove("sidenav-large"), this._handleRightSidenav(), this.el.style.transitionDuration = this.options.animationDuration + "ms"
    }
    _setupListeners() {
      this.listenerRef = this._onClickTrigger.bind(this), this.sidenavTriggers.forEach(e => {
        e.dataset.target === this.el.id && e.addEventListener("click", this.listenerRef)
      }), this.windowResizeRef = this.close.bind(this), window.addEventListener("resize", this.windowResizeRef)
    }
    _removeListeners() {
      this.sidenavTriggers.forEach(e => {
        e.dataset.target === this.el.id && e.removeEventListener("click", this.listenerRef)
      }), this.listenerRef = void 0, window.removeEventListener("resize", this.windowResizeRef), this.windowResizeRef = void 0
    }
    _handleRightSidenav() {
      var e = document.querySelectorAll(".sidenav"),
        t = Array.from(e).some(e => e.classList.contains("right-aligned"));
      t && this.layoutEl && !this.layoutEl.classList.contains("sidenav-right") ? this.layoutEl.classList.add("sidenav-right") : !t && this.layoutEl && this.layoutEl.classList.contains("sidenav-right") && this.layoutEl.classList.remove("sidenav-right")
    }
    _createOverlay() {
      this.overlayElement = document.createElement("div"), this.overlayElement.classList.add("sidenav-overlay"), this.overlayElement.dataset.target = this.el.id
    }
    _toggleBodyScroll(e) {
      this.options.bodyScrolling || (e ? document.body.style.overflow = "" : document.body.style.overflow = "hidden")
    }
    _onClickTrigger(t) {
      t.preventDefault();
      this.isFixed && 960 <= window.innerWidth || (this.isActive ? this.close() : this.open())
    }
    open() {
      this.isActive || (Axentix.createEvent(this.el, "sidenav.open"), this.isActive = !0, this.el.classList.add("active"), this.overlay(!0), this._toggleBodyScroll(!1), setTimeout(() => {
        Axentix.createEvent(this.el, "sidenav.opened")
      }, this.options.animationDuration))
    }
    close() {
      this.isActive && (Axentix.createEvent(this.el, "sidenav.close"), this.el.classList.remove("active"), this.overlay(!1), setTimeout(() => {
        this._toggleBodyScroll(!0), this.isActive = !1, Axentix.createEvent(this.el, "sidenav.closed")
      }, this.options.animationDuration))
    }
    overlay(e) {
      this.options.overlay && (e ? (this.overlayElement.addEventListener("click", this.listenerRef), document.body.appendChild(this.overlayElement)) : (this.overlayElement.removeEventListener("click", this.listenerRef), document.body.removeChild(this.overlayElement)))
    }
  }
})(), (() => {
  Axentix.Tab = class Tab extends AxentixComponent {
    static getDefaultOptions() {
      return {
        animationDuration: 300,
        animationType: "none",
        disableActiveBar: !1,
        caroulix: {}
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.caroulixOptions = {
        animationDuration: 300,
        autoplay: {
          enabled: !1
        }
      }, this.el = document.querySelector(e), this.elQuery = e, this.options = Axentix.getComponentOptions("Tab", t, this.el, i), this._setup()
    }
    _setup() {
      Axentix.createEvent(this.el, "tab.setup");
      ["none", "slide"].includes(this.options.animationType) ? "" : this.options.animationType = "none", this.isAnimated = !1, this.resizeEventDelay = 0, this.tabArrow = document.querySelector(this.elQuery + " .tab-arrow"), this.tabLinks = document.querySelectorAll(this.elQuery + " .tab-menu .tab-link"), this.tabMenu = document.querySelector(this.elQuery + " .tab-menu"), this.currentItemIndex = 0, this._getItems(), this.tabArrow && (this._toggleArrowMode(), this.leftArrow = document.querySelector(this.elQuery + " .tab-arrow .tab-prev"), this.rightArrow = document.querySelector(this.elQuery + " .tab-arrow .tab-next")), this._setupListeners(), this.el.style.transitionDuration = this.options.animationDuration + "ms", "slide" === this.options.animationType ? this._enableSlideAnimation() : this.updateActiveElement()
    }
    _setupListeners() {
      this.tabLinks.forEach(e => {
        e.listenerRef = this._onClickItem.bind(this, e), e.addEventListener("click", e.listenerRef)
      }), this.resizeTabListener = this._handleResizeEvent.bind(this), window.addEventListener("resize", this.resizeTabListener), this.tabArrow && (this.arrowListener = this._toggleArrowMode.bind(this), window.addEventListener("resize", this.arrowListener), this.scrollLeftListener = this._scrollLeft.bind(this), this.scrollRightLstener = this._scrollRight.bind(this), this.leftArrow.addEventListener("click", this.scrollLeftListener), this.rightArrow.addEventListener("click", this.scrollRightLstener))
    }
    _removeListeners() {
      this.tabLinks.forEach(e => {
        e.removeEventListener("click", e.listenerRef), e.listenerRef = void 0
      }), window.removeEventListener("resize", this.resizeTabListener), this.resizeTabListener = void 0, this.tabArrow && (window.removeEventListener("resize", this.arrowListener), this.arrowListener = void 0, this.leftArrow.removeEventListener("click", this.scrollLeftListener), this.rightArrow.removeEventListener("click", this.scrollRightLstener), this.scrollLeftListener = void 0, this.scrollRightLstener = void 0)
    }
    _handleResizeEvent() {
      this.updateActiveElement();
      for (var e = 100; 500 > e; e += 100) setTimeout(() => {
        this.updateActiveElement()
      }, e)
    }
    _getItems() {
      this.tabItems = Array.from(this.el.children).reduce((e, t) => (t.classList.contains("tab-menu") || t.classList.contains("tab-arrow") ? "" : e.push(t), e), [])
    }
    _hideContent() {
      this.tabItems.map(e => e.style.display = "none")
    }
    _enableSlideAnimation() {
      this.tabItems.map(e => e.classList.add("caroulix-item")), this.tabCaroulix = Axentix.wrap(this.tabItems), this.tabCaroulix.classList.add("caroulix");
      var e = Math.random().toString().split(".")[1];
      this.tabCaroulix.id = "tab-caroulix-" + e, this.tabCaroulixInit = !0, this.options.caroulix = Axentix.extend(this.caroulixOptions, this.options.caroulix), 300 === this.options.animationDuration ? "" : this.options.caroulix.animationDuration = this.options.animationDuration, this.updateActiveElement()
    }
    _setActiveElement(e) {
      var t = Math.ceil,
        i = Math.floor;
      if (this.tabLinks.forEach(e => e.classList.remove("active")), !this.options.disableActiveBar) {
        var o = e.getBoundingClientRect(),
          n = o.left,
          s = this.tabMenu.getBoundingClientRect().left,
          a = n - s + this.tabMenu.scrollLeft,
          l = o.width,
          r = this.tabMenu.clientWidth - a - l;
        this.tabMenu.style.setProperty("--tab-bar-left-offset", i(a) + "px"), this.tabMenu.style.setProperty("--tab-bar-right-offset", t(r) + "px")
      }
      e.classList.add("active")
    }
    _toggleArrowMode() {
      var e = Array.from(this.tabLinks).reduce((e, t) => (e += t.clientWidth, e), 0),
        t = this.tabArrow.clientWidth;
      e > t ? this.tabArrow.classList.contains("tab-arrow-show") ? "" : this.tabArrow.classList.add("tab-arrow-show") : this.tabArrow.classList.contains("tab-arrow-show") ? this.tabArrow.classList.remove("tab-arrow-show") : "", this.updateActiveElement()
    }
    _scrollLeft(t) {
      t.preventDefault(), this.tabMenu.scrollLeft -= 40
    }
    _scrollRight(t) {
      t.preventDefault(), this.tabMenu.scrollLeft += 40
    }
    _onClickItem(t, i) {
      if (i.preventDefault(), !(this.isAnimated || t.classList.contains("active"))) {
        var e = t.children[0].getAttribute("href");
        this.select(e.split("#")[1])
      }
    }
    _getPreviousItemIndex(e) {
      for (var t = 0, o = this.currentItemIndex, n = 0; n < e; n++) 0 < o ? (t = o - 1, o--) : (o = this.tabLinks.length - 1, t = o);
      return t
    }
    _getNextItemIndex(e) {
      for (var t = 0, o = this.currentItemIndex, n = 0; n < e; n++) o < this.tabLinks.length - 1 ? (t = o + 1, o++) : (o = 0, t = o);
      return t
    }
    select(e) {
      if (!this.isAnimated) {
        this.isAnimated = !0;
        var t = this.el.querySelector(".tab-menu a[href=\"#" + e + "\"]");
        if (this.currentItemIndex = Array.from(this.tabLinks).findIndex(e => e.children[0] === t), Axentix.createEvent(t, "tab.select", {
            currentIndex: this.currentItemIndex
          }), this._setActiveElement(t.parentElement), this.tabCaroulixInit) return this.tabItems.map(t => t.id === e ? t.classList.add("active") : ""), this.caroulixInstance = new Axentix.Caroulix("#" + this.tabCaroulix.id, this.options.caroulix, this.el, !0), this.tabCaroulixInit = !1, void(this.isAnimated = !1);
        if ("slide" === this.options.animationType) {
          var i = this.tabItems.findIndex(t => t.id === e);
          this.caroulixInstance.goTo(i), setTimeout(() => {
            this.isAnimated = !1
          }, this.options.animationDuration)
        } else this._hideContent(), this.tabItems.map(t => t.id === e ? t.style.display = "block" : ""), this.isAnimated = !1
      }
    }
    updateActiveElement() {
      var e;
      this.tabLinks.forEach((t, i) => {
        t.classList.contains("active") ? (e = t, this.currentItemIndex = i) : ""
      }), e ? "" : (e = this.tabLinks.item(0), this.currentItemIndex = 0);
      var t = e.children[0].getAttribute("href");
      this.tabSelected = t, this.select(t.split("#")[1])
    }
    prev() {
      var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 1;
      if (!this.isAnimated) {
        var t = this._getPreviousItemIndex(e);
        this.currentItemIndex = t, Axentix.createEvent(this.el, "tab.prev", {
          step: e
        });
        var i = this.tabLinks[t].children[0].getAttribute("href");
        this.select(i.split("#")[1])
      }
    }
    next() {
      var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 1;
      if (!this.isAnimated) {
        var t = this._getNextItemIndex(e);
        this.currentItemIndex = t, Axentix.createEvent(this.el, "tab.next", {
          step: e
        });
        var i = this.tabLinks[t].children[0].getAttribute("href");
        this.select(i.split("#")[1])
      }
    }
  }
})(), (() => {
  Axentix.Toast = class Toast {
    static getDefaultOptions() {
      return {
        animationDuration: 400,
        duration: 4e3,
        classes: "",
        position: "right",
        direction: "top",
        mobileDirection: "bottom",
        isClosable: !1
      }
    }
    constructor(e, t) {
      if (Axentix.toastInstanceExist) return void console.error("Don't try to create multiple toast instances");
      Axentix.toastInstanceExist = !0;
      Axentix.instances.push(this), this.content = e, this.options = Axentix.getComponentOptions("Toast", t, "", !0), this.options.position = this.options.position.toLowerCase(), this.options.direction = this.options.direction.toLowerCase(), this.options.mobileDirection = this.options.mobileDirection.toLowerCase(), this.toasters = {}
    }
    _createToaster() {
      var e = document.createElement("div");
      ["right", "left"].includes(this.options.position) ? "" : this.options.position = "right";
      var t = ["bottom", "top"];
      t.includes(this.options.direction) ? "" : this.options.direction = "top", t.includes(this.options.mobileDirection) ? "" : this.options.mobileDirection = "bottom", e.className = "toaster toaster-" + this.options.position + " toast-" + this.options.direction + " toaster-mobile-" + this.options.mobileDirection, this.toasters[this.options.position] = e, document.body.appendChild(e)
    }
    _removeToaster() {
      for (var e in this.toasters) {
        var t = this.toasters[e];
        0 >= t.childElementCount && (t.remove(), delete this.toasters[e])
      }
    }
    _fadeInToast(e) {
      setTimeout(() => {
        Axentix.createEvent(e, "toast.show"), e.classList.add("toast-animated"), setTimeout(() => {
          Axentix.createEvent(e, "toast.shown")
        }, this.options.animationDuration)
      }, 50)
    }
    _fadeOutToast(e) {
      setTimeout(() => {
        Axentix.createEvent(e, "toast.hide"), this._hide(e)
      }, this.options.duration + this.options.animationDuration)
    }
    _animOut(e) {
      e.style.transitionTimingFunction = "cubic-bezier(0.445, 0.05, 0.55, 0.95)", e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.margin = 0, e.style.height = 0
    }
    _createToast() {
      var e = document.createElement("div");
      if (e.className = "toast shadow-1 " + this.options.classes, e.innerHTML = this.content, e.style.transitionDuration = this.options.animationDuration + "ms", this.options.isClosable) {
        var t = document.createElement("i");
        t.className = "toast-trigger fas fa-times", t.listenerRef = this._hide.bind(this, e, t), t.addEventListener("click", t.listenerRef), e.appendChild(t)
      }
      this._fadeInToast(e), this.toasters[this.options.position].appendChild(e), this._fadeOutToast(e);
      var i = e.clientHeight;
      e.style.height = i + "px"
    }
    _hide(t, i, o) {
      if (!t.isAnimated) {
        var e = 1;
        o && (o.preventDefault(), e = 0, this.options.isClosable ? i.removeEventListener("click", i.listenerRef) : ""), t.style.opacity = 0, t.isAnimated = !0;
        var n = e * this.options.animationDuration + this.options.animationDuration;
        setTimeout(() => {
          this._animOut(t)
        }, n / 2), setTimeout(() => {
          t.remove(), Axentix.createEvent(t, "toast.remove"), this._removeToaster()
        }, 1.45 * n)
      }
    }
    show() {
      Object.keys(this.toasters).includes(this.options.position) || this._createToaster(), this._createToast()
    }
    change(e, t) {
      this.content = e, this.options = Axentix.extend(this.options, t)
    }
  }
})(), (() => {
  Axentix.Tooltip = class Tooltip extends AxentixComponent {
    static getDefaultOptions() {
      return {
        content: "",
        animationDelay: 0,
        offset: "10px",
        animationDuration: 200,
        classes: "grey dark-4 light-shadow-2 p-2",
        position: "top"
      }
    }
    constructor(e, t, i) {
      super(), Axentix.instances.push(this), this.el = document.querySelector(e), this.options = Axentix.getComponentOptions("Tooltip", t, this.el, i), this._setup()
    }
    _setup() {
      if (!this.options.content) return console.error("Tooltip #" + this.el.id + " : empty content.");
      Axentix.createEvent(this.el, "tooltip.setup"), this.options.position = this.options.position.toLowerCase();
      var e = document.querySelectorAll(".tooltip");
      e.forEach(e => {
        e.dataset.tooltipId ? e.dataset.tooltipId === this.el.id ? this.tooltip = e : "" : ""
      }), this.tooltip ? "" : this.tooltip = document.createElement("div"), this.tooltip.dataset.tooltipId === this.el.id ? "" : this.tooltip.dataset.tooltipId = this.el.id, this._setProperties(), document.body.appendChild(this.tooltip), this.positionList = ["right", "left", "top", "bottom"], this.positionList.includes(this.options.position) ? "" : this.options.position = "top", this._setupListeners(), this.updatePosition()
    }
    _setupListeners() {
      this.listenerEnterRef = this._onHover.bind(this), this.listenerLeaveRef = this._onHoverOut.bind(this), this.el.addEventListener("mouseenter", this.listenerEnterRef), this.el.addEventListener("mouseleave", this.listenerLeaveRef)
    }
    _removeListeners() {
      this.el.removeEventListener("mouseenter", this.listenerEnterRef), this.el.removeEventListener("mouseleave", this.listenerLeaveRef), this.listenerEnterRef = void 0, this.listenerLeaveRef = void 0
    }
    _setProperties() {
      this.tooltip.style.transform = "translate(0)", this.tooltip.style.opacity = 0, this.tooltip.className = "tooltip " + this.options.classes, this.tooltip.style.transitionDuration = this.options.animationDuration + "ms", this.tooltip.innerHTML = this.options.content
    }
    _setBasicPosition() {
      "top" == this.options.position || "bottom" == this.options.position ? "top" == this.options.position ? this.tooltip.style.top = this.elRect.top + "px" : this.tooltip.style.top = this.elRect.top + this.elRect.height + "px" : ("left" == this.options.position || "right" == this.options.position) && ("right" == this.options.position ? this.tooltip.style.left = this.elRect.left + this.elRect.width + "px" : "")
    }
    _manualTransform() {
      "top" == this.options.position || "bottom" == this.options.position ? this.tooltip.style.left = this.elRect.left + this.elRect.width / 2 - this.tooltipRect.width / 2 + "px" : ("left" == this.options.position || "right" == this.options.position) && (this.tooltip.style.top = this.elRect.top + this.elRect.height / 2 - this.tooltipRect.height / 2 + "px"), "top" == this.options.position ? this.tooltip.style.top = this.tooltipRect.top - this.tooltipRect.height + "px" : "left" == this.options.position && (this.tooltip.style.left = this.elRect.left - this.tooltipRect.width + "px");
      var e = window.scrollY,
        t = parseFloat(this.tooltip.style.top);
      this.tooltip.style.top = "top" === this.options.position ? 2 * e + t + "px" : e + t + "px"
    }
    _onHover(t) {
      t.preventDefault(), this.show()
    }
    _onHoverOut(t) {
      t.preventDefault(), this.hide()
    }
    updatePosition() {
      this.elRect = this.el.getBoundingClientRect(), this._setBasicPosition(), this.tooltipRect = this.tooltip.getBoundingClientRect(), this._manualTransform()
    }
    show() {
      this.updatePosition(), setTimeout(() => {
        Axentix.createEvent(this.el, "tooltip.show"), "top" == this.options.position ? this.tooltip.style.transform = "translateY(-".concat(this.options.offset, ")") : "right" == this.options.position ? this.tooltip.style.transform = "translateX(".concat(this.options.offset, ")") : "bottom" == this.options.position ? this.tooltip.style.transform = "translateY(".concat(this.options.offset, ")") : "left" == this.options.position ? this.tooltip.style.transform = "translateX(-".concat(this.options.offset, ")") : "", this.tooltip.style.opacity = 1
      }, this.options.animationDelay)
    }
    hide() {
      Axentix.createEvent(this.el, "tooltip.hide"), this.tooltip.style.transform = "translate(0)", this.tooltip.style.opacity = 0
    }
    change() {
      var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};
      this.options = Axentix.getComponentOptions("Tooltip", e, this.el, !0), this.positionList.includes(this.options.position) ? "" : this.options.position = "top", this._setProperties(), this.updatePosition()
    }
  }
})(), Axentix.extend = function () {
  for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
  return t.reduce((e, t) => {
    for (var i in t) e[i] = "object" == typeof t[i] && null !== t[i] ? Axentix.extend(e[i], t[i]) : t[i];
    return e
  }, {})
}, Axentix.getComponentOptions = (e, t, i, o) => Axentix.extend(Axentix[e].getDefaultOptions(), o ? {} : Axentix.DataDetection.formatOptions(e, i), t), Axentix.wrap = function (e) {
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document.createElement("div"),
    i = e[0].parentElement;
  return e.forEach(e => t.appendChild(e)), i.appendChild(t), t
}, Axentix.createEvent = (e, t, i) => {
  var o = new CustomEvent("ax." + t, {
    detail: i || {},
    bubbles: !0
  });
  e.dispatchEvent(o)
}, Axentix.isTouchEnabled = () => "ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints, Axentix.getInstance = e => Axentix.instances.filter(t => "#" + t.el.id === e)[0], Axentix.getAllInstances = () => Axentix.instances, Axentix.sync = e => {
  Axentix.getInstance(e).sync()
}, Axentix.syncAll = () => {
  Axentix.instances.map(e => e.sync())
}, Axentix.reset = e => {
  Axentix.getInstance(e).reset()
}, Axentix.resetAll = () => {
  Axentix.instances.map(e => e.reset())
};