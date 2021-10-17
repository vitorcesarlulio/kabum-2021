/*!
 * AdminLTE v3.0.4 (https://adminlte.io)
 * Copyright 2014-2020 Colorlib <http://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------
   * AdminLTE ControlSidebar.js
   * License MIT
   * --------------------------------------------
   */
  var ControlSidebar = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'ControlSidebar';
    var DATA_KEY = 'lte.controlsidebar';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      COLLAPSED: "collapsed" + EVENT_KEY,
      EXPANDED: "expanded" + EVENT_KEY
    };
    var Selector = {
      CONTROL_SIDEBAR: '.control-sidebar',
      CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
      DATA_TOGGLE: '[data-widget="control-sidebar"]',
      CONTENT: '.content-wrapper',
      HEADER: '.main-header',
      FOOTER: '.main-footer'
    };
    var ClassName = {
      CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',
      CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
      CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',
      LAYOUT_FIXED: 'layout-fixed',
      NAVBAR_FIXED: 'layout-navbar-fixed',
      NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',
      NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',
      NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',
      NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',
      FOOTER_FIXED: 'layout-footer-fixed',
      FOOTER_SM_FIXED: 'layout-sm-footer-fixed',
      FOOTER_MD_FIXED: 'layout-md-footer-fixed',
      FOOTER_LG_FIXED: 'layout-lg-footer-fixed',
      FOOTER_XL_FIXED: 'layout-xl-footer-fixed'
    };
    var Default = {
      controlsidebarSlide: true,
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'l'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var ControlSidebar = /*#__PURE__*/function () {
      function ControlSidebar(element, config) {
        this._element = element;
        this._config = config;

        this._init();
      } // Public


      var _proto = ControlSidebar.prototype;

      _proto.collapse = function collapse() {
        // Show the control sidebar
        if (this._config.controlsidebarSlide) {
          $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
            $(Selector.CONTROL_SIDEBAR).hide();
            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
            $(this).dequeue();
          });
        } else {
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      };

      _proto.show = function show() {
        // Collapse the control sidebar
        if (this._config.controlsidebarSlide) {
          $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
          $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function () {
            $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
              $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
              $(this).dequeue();
            });
            $(this).dequeue();
          });
        } else {
          $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }

        var expandedEvent = $.Event(Event.EXPANDED);
        $(this._element).trigger(expandedEvent);
      };

      _proto.toggle = function toggle() {
        var shouldClose = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE);

        if (shouldClose) {
          // Close the control sidebar
          this.collapse();
        } else {
          // Open the control sidebar
          this.show();
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        this._fixHeight();

        this._fixScrollHeight();

        $(window).resize(function () {
          _this._fixHeight();

          _this._fixScrollHeight();
        });
        $(window).scroll(function () {
          if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {
            _this._fixScrollHeight();
          }
        });
      };

      _proto._fixScrollHeight = function _fixScrollHeight() {
        var heights = {
          scroll: $(document).height(),
          window: $(window).height(),
          header: $(Selector.HEADER).outerHeight(),
          footer: $(Selector.FOOTER).outerHeight()
        };
        var positions = {
          bottom: Math.abs(heights.window + $(window).scrollTop() - heights.scroll),
          top: $(window).scrollTop()
        };
        var navbarFixed = false;
        var footerFixed = false;

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          if ($('body').hasClass(ClassName.NAVBAR_FIXED) || $('body').hasClass(ClassName.NAVBAR_SM_FIXED) || $('body').hasClass(ClassName.NAVBAR_MD_FIXED) || $('body').hasClass(ClassName.NAVBAR_LG_FIXED) || $('body').hasClass(ClassName.NAVBAR_XL_FIXED)) {
            if ($(Selector.HEADER).css("position") === "fixed") {
              navbarFixed = true;
            }
          }

          if ($('body').hasClass(ClassName.FOOTER_FIXED) || $('body').hasClass(ClassName.FOOTER_SM_FIXED) || $('body').hasClass(ClassName.FOOTER_MD_FIXED) || $('body').hasClass(ClassName.FOOTER_LG_FIXED) || $('body').hasClass(ClassName.FOOTER_XL_FIXED)) {
            if ($(Selector.FOOTER).css("position") === "fixed") {
              footerFixed = true;
            }
          }

          if (positions.top === 0 && positions.bottom === 0) {
            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header + heights.footer));
          } else if (positions.bottom <= heights.footer) {
            if (footerFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer - positions.bottom);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.footer - positions.bottom));
            } else {
              $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
            }
          } else if (positions.top <= heights.header) {
            if (navbarFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header - positions.top);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header - positions.top));
            } else {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            }
          } else {
            if (navbarFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('top', 0);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window);
            } else {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            }
          }
        }
      };

      _proto._fixHeight = function _fixHeight() {
        var heights = {
          window: $(window).height(),
          header: $(Selector.HEADER).outerHeight(),
          footer: $(Selector.FOOTER).outerHeight()
        };

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          var sidebarHeight = heights.window - heights.header;

          if ($('body').hasClass(ClassName.FOOTER_FIXED) || $('body').hasClass(ClassName.FOOTER_SM_FIXED) || $('body').hasClass(ClassName.FOOTER_MD_FIXED) || $('body').hasClass(ClassName.FOOTER_LG_FIXED) || $('body').hasClass(ClassName.FOOTER_XL_FIXED)) {
            if ($(Selector.FOOTER).css("position") === "fixed") {
              sidebarHeight = heights.window - heights.header - heights.footer;
            }
          }

          $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', sidebarHeight);

          if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).overlayScrollbars({
              className: this._config.scrollbarTheme,
              sizeAutoCapable: true,
              scrollbars: {
                autoHide: this._config.scrollbarAutoHide,
                clickScrolling: true
              }
            });
          }
        }
      } // Static
      ;

      ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new ControlSidebar(this, _options);
            $(this).data(DATA_KEY, data);
          }

          if (data[operation] === 'undefined') {
            throw new Error(operation + " is not a function");
          }

          data[operation]();
        });
      };

      return ControlSidebar;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      ControlSidebar._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = ControlSidebar._jQueryInterface;
    $.fn[NAME].Constructor = ControlSidebar;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ControlSidebar._jQueryInterface;
    };

    return ControlSidebar;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Layout.js
   * License MIT
   * --------------------------------------------
   */
  var Layout = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Layout';
    var DATA_KEY = 'lte.layout';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      HEADER: '.main-header',
      MAIN_SIDEBAR: '.main-sidebar',
      SIDEBAR: '.main-sidebar .sidebar',
      CONTENT: '.content-wrapper',
      BRAND: '.brand-link',
      CONTENT_HEADER: '.content-header',
      WRAPPER: '.wrapper',
      CONTROL_SIDEBAR: '.control-sidebar',
      CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
      CONTROL_SIDEBAR_BTN: '[data-widget="control-sidebar"]',
      LAYOUT_FIXED: '.layout-fixed',
      FOOTER: '.main-footer',
      PUSHMENU_BTN: '[data-widget="pushmenu"]',
      LOGIN_BOX: '.login-box',
      REGISTER_BOX: '.register-box'
    };
    var ClassName = {
      HOLD: 'hold-transition',
      SIDEBAR: 'main-sidebar',
      CONTENT_FIXED: 'content-fixed',
      SIDEBAR_FOCUSED: 'sidebar-focused',
      LAYOUT_FIXED: 'layout-fixed',
      NAVBAR_FIXED: 'layout-navbar-fixed',
      FOOTER_FIXED: 'layout-footer-fixed',
      LOGIN_PAGE: 'login-page',
      REGISTER_PAGE: 'register-page',
      CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',
      CONTROL_SIDEBAR_OPEN: 'control-sidebar-open'
    };
    var Default = {
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'l',
      panelAutoHeight: true,
      loginRegisterAutoHeight: true
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Layout = /*#__PURE__*/function () {
      function Layout(element, config) {
        this._config = config;
        this._element = element;

        this._init();
      } // Public


      var _proto = Layout.prototype;

      _proto.fixLayoutHeight = function fixLayoutHeight(extra) {
        if (extra === void 0) {
          extra = null;
        }

        var control_sidebar = 0;

        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {
          control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height();
        }

        var heights = {
          window: $(window).height(),
          header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,
          footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,
          sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,
          control_sidebar: control_sidebar
        };

        var max = this._max(heights);

        var offset = this._config.panelAutoHeight;

        if (offset === true) {
          offset = 0;
        }

        if (offset !== false) {
          if (max == heights.control_sidebar) {
            $(Selector.CONTENT).css('min-height', max + offset);
          } else if (max == heights.window) {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header - heights.footer);
          } else {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header);
          }

          if (this._isFooterFixed()) {
            $(Selector.CONTENT).css('min-height', parseFloat($(Selector.CONTENT).css('min-height')) + heights.footer);
          }
        }

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          if (offset !== false) {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header - heights.footer);
          }

          if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $(Selector.SIDEBAR).overlayScrollbars({
              className: this._config.scrollbarTheme,
              sizeAutoCapable: true,
              scrollbars: {
                autoHide: this._config.scrollbarAutoHide,
                clickScrolling: true
              }
            });
          }
        }
      };

      _proto.fixLoginRegisterHeight = function fixLoginRegisterHeight() {
        if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {
          $('body, html').css('height', 'auto');
        } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {
          var box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height();

          if ($('body').css('min-height') !== box_height) {
            $('body').css('min-height', box_height);
          }
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        // Activate layout height watcher
        this.fixLayoutHeight();

        if (this._config.loginRegisterAutoHeight === true) {
          this.fixLoginRegisterHeight();
        } else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {
          setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
        }

        $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', function () {
          _this.fixLayoutHeight();
        });
        $(Selector.PUSHMENU_BTN).on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
          _this.fixLayoutHeight();
        });
        $(Selector.CONTROL_SIDEBAR_BTN).on('collapsed.lte.controlsidebar', function () {
          _this.fixLayoutHeight();
        }).on('expanded.lte.controlsidebar', function () {
          _this.fixLayoutHeight('control_sidebar');
        });
        $(window).resize(function () {
          _this.fixLayoutHeight();
        });
        setTimeout(function () {
          $('body.hold-transition').removeClass('hold-transition');
        }, 50);
      };

      _proto._max = function _max(numbers) {
        // Calculate the maximum number in a list
        var max = 0;
        Object.keys(numbers).forEach(function (key) {
          if (numbers[key] > max) {
            max = numbers[key];
          }
        });
        return max;
      };

      _proto._isFooterFixed = function _isFooterFixed() {
        return $('.main-footer').css('position') === 'fixed';
      } // Static
      ;

      Layout._jQueryInterface = function _jQueryInterface(config) {
        if (config === void 0) {
          config = '';
        }

        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Layout($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init' || config === '') {
            data['_init']();
          } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
            data[config]();
          }
        });
      };

      return Layout;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on('load', function () {
      Layout._jQueryInterface.call($('body'));
    });
    $(Selector.SIDEBAR + ' a').on('focusin', function () {
      $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);
    });
    $(Selector.SIDEBAR + ' a').on('focusout', function () {
      $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Layout._jQueryInterface;
    $.fn[NAME].Constructor = Layout;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Layout._jQueryInterface;
    };

    return Layout;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE PushMenu.js
   * License MIT
   * --------------------------------------------
   */
  var PushMenu = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'PushMenu';
    var DATA_KEY = 'lte.pushmenu';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      COLLAPSED: "collapsed" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY
    };
    var Default = {
      autoCollapseSize: 992,
      enableRemember: false,
      noTransitionAfterReload: true
    };
    var Selector = {
      TOGGLE_BUTTON: '[data-widget="pushmenu"]',
      SIDEBAR_MINI: '.sidebar-mini',
      SIDEBAR_COLLAPSED: '.sidebar-collapse',
      BODY: 'body',
      OVERLAY: '#sidebar-overlay',
      WRAPPER: '.wrapper'
    };
    var ClassName = {
      COLLAPSED: 'sidebar-collapse',
      OPEN: 'sidebar-open',
      CLOSED: 'sidebar-closed'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var PushMenu = /*#__PURE__*/function () {
      function PushMenu(element, options) {
        this._element = element;
        this._options = $.extend({}, Default, options);

        if (!$(Selector.OVERLAY).length) {
          this._addOverlay();
        }

        this._init();
      } // Public


      var _proto = PushMenu.prototype;

      _proto.expand = function expand() {
        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            $(Selector.BODY).addClass(ClassName.OPEN);
          }
        }

        $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED);

        if (this._options.enableRemember) {
          localStorage.setItem("remember" + EVENT_KEY, ClassName.OPEN);
        }

        var shownEvent = $.Event(Event.SHOWN);
        $(this._element).trigger(shownEvent);
      };

      _proto.collapse = function collapse() {
        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED);
          }
        }

        $(Selector.BODY).addClass(ClassName.COLLAPSED);

        if (this._options.enableRemember) {
          localStorage.setItem("remember" + EVENT_KEY, ClassName.COLLAPSED);
        }

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      };

      _proto.toggle = function toggle() {
        if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {
          this.collapse();
        } else {
          this.expand();
        }
      };

      _proto.autoCollapse = function autoCollapse(resize) {
        if (resize === void 0) {
          resize = false;
        }

        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
              this.collapse();
            }
          } else if (resize == true) {
            if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
              $(Selector.BODY).removeClass(ClassName.OPEN);
            } else if ($(Selector.BODY).hasClass(ClassName.CLOSED)) {
              this.expand();
            }
          }
        }
      };

      _proto.remember = function remember() {
        if (this._options.enableRemember) {
          var toggleState = localStorage.getItem("remember" + EVENT_KEY);

          if (toggleState == ClassName.COLLAPSED) {
            if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function () {
                $(this).removeClass('hold-transition');
                $(this).dequeue();
              });
            } else {
              $("body").addClass(ClassName.COLLAPSED);
            }
          } else {
            if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function () {
                $(this).removeClass('hold-transition');
                $(this).dequeue();
              });
            } else {
              $("body").removeClass(ClassName.COLLAPSED);
            }
          }
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        this.remember();
        this.autoCollapse();
        $(window).resize(function () {
          _this.autoCollapse(true);
        });
      };

      _proto._addOverlay = function _addOverlay() {
        var _this2 = this;

        var overlay = $('<div />', {
          id: 'sidebar-overlay'
        });
        overlay.on('click', function () {
          _this2.collapse();
        });
        $(Selector.WRAPPER).append(overlay);
      } // Static
      ;

      PushMenu._jQueryInterface = function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new PushMenu(this, _options);
            $(this).data(DATA_KEY, data);
          }

          if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
            data[operation]();
          }
        });
      };

      return PushMenu;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
      event.preventDefault();
      var button = event.currentTarget;

      if ($(button).data('widget') !== 'pushmenu') {
        button = $(button).closest(Selector.TOGGLE_BUTTON);
      }

      PushMenu._jQueryInterface.call($(button), 'toggle');
    });
    $(window).on('load', function () {
      PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = PushMenu._jQueryInterface;
    $.fn[NAME].Constructor = PushMenu;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return PushMenu._jQueryInterface;
    };

    return PushMenu;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Treeview.js
   * License MIT
   * --------------------------------------------
   */
  var Treeview = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Treeview';
    var DATA_KEY = 'lte.treeview';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      SELECTED: "selected" + EVENT_KEY,
      EXPANDED: "expanded" + EVENT_KEY,
      COLLAPSED: "collapsed" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY
    };
    var Selector = {
      LI: '.nav-item',
      LINK: '.nav-link',
      TREEVIEW_MENU: '.nav-treeview',
      OPEN: '.menu-open',
      DATA_WIDGET: '[data-widget="treeview"]'
    };
    var ClassName = {
      LI: 'nav-item',
      LINK: 'nav-link',
      TREEVIEW_MENU: 'nav-treeview',
      OPEN: 'menu-open',
      SIDEBAR_COLLAPSED: 'sidebar-collapse'
    };
    var Default = {
      trigger: Selector.DATA_WIDGET + " " + Selector.LINK,
      animationSpeed: 300,
      accordion: true,
      expandSidebar: false,
      sidebarButtonSelector: '[data-widget="pushmenu"]'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Treeview = /*#__PURE__*/function () {
      function Treeview(element, config) {
        this._config = config;
        this._element = element;
      } // Public


      var _proto = Treeview.prototype;

      _proto.init = function init() {
        this._setupListeners();
      };

      _proto.expand = function expand(treeviewMenu, parentLi) {
        var _this = this;

        var expandedEvent = $.Event(Event.EXPANDED);

        if (this._config.accordion) {
          var openMenuLi = parentLi.siblings(Selector.OPEN).first();
          var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
          this.collapse(openTreeview, openMenuLi);
        }

        treeviewMenu.stop().slideDown(this._config.animationSpeed, function () {
          parentLi.addClass(ClassName.OPEN);
          $(_this._element).trigger(expandedEvent);
        });

        if (this._config.expandSidebar) {
          this._expandSidebar();
        }
      };

      _proto.collapse = function collapse(treeviewMenu, parentLi) {
        var _this2 = this;

        var collapsedEvent = $.Event(Event.COLLAPSED);
        treeviewMenu.stop().slideUp(this._config.animationSpeed, function () {
          parentLi.removeClass(ClassName.OPEN);
          $(_this2._element).trigger(collapsedEvent);
          treeviewMenu.find(Selector.OPEN + " > " + Selector.TREEVIEW_MENU).slideUp();
          treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
        });
      };

      _proto.toggle = function toggle(event) {
        var $relativeTarget = $(event.currentTarget);
        var $parent = $relativeTarget.parent();
        var treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU);

        if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
          if (!$parent.is(Selector.LI)) {
            treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU);
          }

          if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
            return;
          }
        }

        event.preventDefault();
        var parentLi = $relativeTarget.parents(Selector.LI).first();
        var isOpen = parentLi.hasClass(ClassName.OPEN);

        if (isOpen) {
          this.collapse($(treeviewMenu), parentLi);
        } else {
          this.expand($(treeviewMenu), parentLi);
        }
      } // Private
      ;

      _proto._setupListeners = function _setupListeners() {
        var _this3 = this;

        $(document).on('click', this._config.trigger, function (event) {
          _this3.toggle(event);
        });
      };

      _proto._expandSidebar = function _expandSidebar() {
        if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {
          $(this._config.sidebarButtonSelector).PushMenu('expand');
        }
      } // Static
      ;

      Treeview._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Treeview($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      };

      return Treeview;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_WIDGET).each(function () {
        Treeview._jQueryInterface.call($(this), 'init');
      });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Treeview._jQueryInterface;
    $.fn[NAME].Constructor = Treeview;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Treeview._jQueryInterface;
    };

    return Treeview;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE DirectChat.js
   * License MIT
   * --------------------------------------------
   */
  var DirectChat = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'DirectChat';
    var DATA_KEY = 'lte.directchat';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      TOGGLED: "toggled{EVENT_KEY}"
    };
    var Selector = {
      DATA_TOGGLE: '[data-widget="chat-pane-toggle"]',
      DIRECT_CHAT: '.direct-chat'
    };
    var ClassName = {
      DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var DirectChat = /*#__PURE__*/function () {
      function DirectChat(element, config) {
        this._element = element;
      }

      var _proto = DirectChat.prototype;

      _proto.toggle = function toggle() {
        $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);
        var toggledEvent = $.Event(Event.TOGGLED);
        $(this._element).trigger(toggledEvent);
      } // Static
      ;

      DirectChat._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new DirectChat($(this));
            $(this).data(DATA_KEY, data);
          }

          data[config]();
        });
      };

      return DirectChat;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
      if (event) event.preventDefault();

      DirectChat._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = DirectChat._jQueryInterface;
    $.fn[NAME].Constructor = DirectChat;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DirectChat._jQueryInterface;
    };

    return DirectChat;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE TodoList.js
   * License MIT
   * --------------------------------------------
   */
  var TodoList = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'TodoList';
    var DATA_KEY = 'lte.todolist';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      DATA_TOGGLE: '[data-widget="todo-list"]'
    };
    var ClassName = {
      TODO_LIST_DONE: 'done'
    };
    var Default = {
      onCheck: function onCheck(item) {
        return item;
      },
      onUnCheck: function onUnCheck(item) {
        return item;
      }
    };
    /**
     * Class Definition
     * ====================================================
     */

    var TodoList = /*#__PURE__*/function () {
      function TodoList(element, config) {
        this._config = config;
        this._element = element;

        this._init();
      } // Public


      var _proto = TodoList.prototype;

      _proto.toggle = function toggle(item) {
        item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);

        if (!$(item).prop('checked')) {
          this.unCheck($(item));
          return;
        }

        this.check(item);
      };

      _proto.check = function check(item) {
        this._config.onCheck.call(item);
      };

      _proto.unCheck = function unCheck(item) {
        this._config.onUnCheck.call(item);
      } // Private
      ;

      _proto._init = function _init() {
        var that = this;
        $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE);
        $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', function (event) {
          that.toggle($(event.target));
        });
      } // Static
      ;

      TodoList._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new TodoList($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      };

      return TodoList;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on('load', function () {
      TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = TodoList._jQueryInterface;
    $.fn[NAME].Constructor = TodoList;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TodoList._jQueryInterface;
    };

    return TodoList;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE CardWidget.js
   * License MIT
   * --------------------------------------------
   */
  var CardWidget = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardWidget';
    var DATA_KEY = 'lte.cardwidget';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      EXPANDED: "expanded" + EVENT_KEY,
      COLLAPSED: "collapsed" + EVENT_KEY,
      MAXIMIZED: "maximized" + EVENT_KEY,
      MINIMIZED: "minimized" + EVENT_KEY,
      REMOVED: "removed" + EVENT_KEY
    };
    var ClassName = {
      CARD: 'card',
      COLLAPSED: 'collapsed-card',
      COLLAPSING: 'collapsing-card',
      EXPANDING: 'expanding-card',
      WAS_COLLAPSED: 'was-collapsed',
      MAXIMIZED: 'maximized-card'
    };
    var Selector = {
      DATA_REMOVE: '[data-card-widget="remove"]',
      DATA_COLLAPSE: '[data-card-widget="collapse"]',
      DATA_MAXIMIZE: '[data-card-widget="maximize"]',
      CARD: "." + ClassName.CARD,
      CARD_HEADER: '.card-header',
      CARD_BODY: '.card-body',
      CARD_FOOTER: '.card-footer',
      COLLAPSED: "." + ClassName.COLLAPSED
    };
    var Default = {
      animationSpeed: 'normal',
      collapseTrigger: Selector.DATA_COLLAPSE,
      removeTrigger: Selector.DATA_REMOVE,
      maximizeTrigger: Selector.DATA_MAXIMIZE,
      collapseIcon: 'fa-minus',
      expandIcon: 'fa-plus',
      maximizeIcon: 'fa-expand',
      minimizeIcon: 'fa-compress'
    };

    var CardWidget = /*#__PURE__*/function () {
      function CardWidget(element, settings) {
        this._element = element;
        this._parent = element.parents(Selector.CARD).first();

        if (element.hasClass(ClassName.CARD)) {
          this._parent = element;
        }

        this._settings = $.extend({}, Default, settings);
      }

      var _proto = CardWidget.prototype;

      _proto.collapse = function collapse() {
        var _this = this;

        this._parent.addClass(ClassName.COLLAPSING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
          _this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING);
        });

        this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

        var collapsed = $.Event(Event.COLLAPSED);

        this._element.trigger(collapsed, this._parent);
      };

      _proto.expand = function expand() {
        var _this2 = this;

        this._parent.addClass(ClassName.EXPANDING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
          _this2._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING);
        });

        this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

        var expanded = $.Event(Event.EXPANDED);

        this._element.trigger(expanded, this._parent);
      };

      _proto.remove = function remove() {
        this._parent.slideUp();

        var removed = $.Event(Event.REMOVED);

        this._element.trigger(removed, this._parent);
      };

      _proto.toggle = function toggle() {
        if (this._parent.hasClass(ClassName.COLLAPSED)) {
          this.expand();
          return;
        }

        this.collapse();
      };

      _proto.maximize = function maximize() {
        this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

        this._parent.css({
          'height': this._parent.height(),
          'width': this._parent.width(),
          'transition': 'all .15s'
        }).delay(150).queue(function () {
          $(this).addClass(ClassName.MAXIMIZED);
          $('html').addClass(ClassName.MAXIMIZED);

          if ($(this).hasClass(ClassName.COLLAPSED)) {
            $(this).addClass(ClassName.WAS_COLLAPSED);
          }

          $(this).dequeue();
        });

        var maximized = $.Event(Event.MAXIMIZED);

        this._element.trigger(maximized, this._parent);
      };

      _proto.minimize = function minimize() {
        this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

        this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' + 'width:' + this._parent[0].style.width + ' !important; transition: all .15s;').delay(10).queue(function () {
          $(this).removeClass(ClassName.MAXIMIZED);
          $('html').removeClass(ClassName.MAXIMIZED);
          $(this).css({
            'height': 'inherit',
            'width': 'inherit'
          });

          if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {
            $(this).removeClass(ClassName.WAS_COLLAPSED);
          }

          $(this).dequeue();
        });

        var MINIMIZED = $.Event(Event.MINIMIZED);

        this._element.trigger(MINIMIZED, this._parent);
      };

      _proto.toggleMaximize = function toggleMaximize() {
        if (this._parent.hasClass(ClassName.MAXIMIZED)) {
          this.minimize();
          return;
        }

        this.maximize();
      } // Private
      ;

      _proto._init = function _init(card) {
        var _this3 = this;

        this._parent = card;
        $(this).find(this._settings.collapseTrigger).click(function () {
          _this3.toggle();
        });
        $(this).find(this._settings.maximizeTrigger).click(function () {
          _this3.toggleMaximize();
        });
        $(this).find(this._settings.removeTrigger).click(function () {
          _this3.remove();
        });
      } // Static
      ;

      CardWidget._jQueryInterface = function _jQueryInterface(config) {
        var data = $(this).data(DATA_KEY);

        var _options = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new CardWidget($(this), _options);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
          data[config]();
        } else if (typeof config === 'object') {
          data._init($(this));
        }
      };

      return CardWidget;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'toggle');
    });
    $(document).on('click', Selector.DATA_REMOVE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'remove');
    });
    $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'toggleMaximize');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = CardWidget._jQueryInterface;
    $.fn[NAME].Constructor = CardWidget;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return CardWidget._jQueryInterface;
    };

    return CardWidget;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE CardRefresh.js
   * License MIT
   * --------------------------------------------
   */
  var CardRefresh = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardRefresh';
    var DATA_KEY = 'lte.cardrefresh';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOADED: "loaded" + EVENT_KEY,
      OVERLAY_ADDED: "overlay.added" + EVENT_KEY,
      OVERLAY_REMOVED: "overlay.removed" + EVENT_KEY
    };
    var ClassName = {
      CARD: 'card'
    };
    var Selector = {
      CARD: "." + ClassName.CARD,
      DATA_REFRESH: '[data-card-widget="card-refresh"]'
    };
    var Default = {
      source: '',
      sourceSelector: '',
      params: {},
      trigger: Selector.DATA_REFRESH,
      content: '.card-body',
      loadInContent: true,
      loadOnInit: true,
      responseType: '',
      overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
      onLoadStart: function onLoadStart() {},
      onLoadDone: function onLoadDone(response) {
        return response;
      }
    };

    var CardRefresh = /*#__PURE__*/function () {
      function CardRefresh(element, settings) {
        this._element = element;
        this._parent = element.parents(Selector.CARD).first();
        this._settings = $.extend({}, Default, settings);
        this._overlay = $(this._settings.overlayTemplate);

        if (element.hasClass(ClassName.CARD)) {
          this._parent = element;
        }

        if (this._settings.source === '') {
          throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
        }
      }

      var _proto = CardRefresh.prototype;

      _proto.load = function load() {
        this._addOverlay();

        this._settings.onLoadStart.call($(this));

        $.get(this._settings.source, this._settings.params, function (response) {
          if (this._settings.loadInContent) {
            if (this._settings.sourceSelector != '') {
              response = $(response).find(this._settings.sourceSelector).html();
            }

            this._parent.find(this._settings.content).html(response);
          }

          this._settings.onLoadDone.call($(this), response);

          this._removeOverlay();
        }.bind(this), this._settings.responseType !== '' && this._settings.responseType);
        var loadedEvent = $.Event(Event.LOADED);
        $(this._element).trigger(loadedEvent);
      };

      _proto._addOverlay = function _addOverlay() {
        this._parent.append(this._overlay);

        var overlayAddedEvent = $.Event(Event.OVERLAY_ADDED);
        $(this._element).trigger(overlayAddedEvent);
      };

      _proto._removeOverlay = function _removeOverlay() {
        this._parent.find(this._overlay).remove();

        var overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED);
        $(this._element).trigger(overlayRemovedEvent);
      };

      // Private
      _proto._init = function _init(card) {
        var _this = this;

        $(this).find(this._settings.trigger).on('click', function () {
          _this.load();
        });

        if (this._settings.loadOnInit) {
          this.load();
        }
      } // Static
      ;

      CardRefresh._jQueryInterface = function _jQueryInterface(config) {
        var data = $(this).data(DATA_KEY);

        var _options = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new CardRefresh($(this), _options);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/load/)) {
          data[config]();
        } else {
          data._init($(this));
        }
      };

      return CardRefresh;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.DATA_REFRESH, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardRefresh._jQueryInterface.call($(this), 'load');
    });
    $(document).ready(function () {
      $(Selector.DATA_REFRESH).each(function () {
        CardRefresh._jQueryInterface.call($(this));
      });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = CardRefresh._jQueryInterface;
    $.fn[NAME].Constructor = CardRefresh;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return CardRefresh._jQueryInterface;
    };

    return CardRefresh;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Dropdown.js
   * License MIT
   * --------------------------------------------
   */
  var Dropdown = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Dropdown';
    var DATA_KEY = 'lte.dropdown';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      NAVBAR: '.navbar',
      DROPDOWN_MENU: '.dropdown-menu',
      DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',
      DROPDOWN_TOGGLE: '[data-toggle="dropdown"]'
    };
    var ClassName = {
      DROPDOWN_HOVER: 'dropdown-hover',
      DROPDOWN_RIGHT: 'dropdown-menu-right'
    };
    var Default = {};
    /**
     * Class Definition
     * ====================================================
     */

    var Dropdown = /*#__PURE__*/function () {
      function Dropdown(element, config) {
        this._config = config;
        this._element = element;
      } // Public


      var _proto = Dropdown.prototype;

      _proto.toggleSubmenu = function toggleSubmenu() {
        this._element.siblings().show().toggleClass("show");

        if (!this._element.next().hasClass('show')) {
          this._element.parents('.dropdown-menu').first().find('.show').removeClass("show").hide();
        }

        this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass("show").hide();
        });
      };

      _proto.fixPosition = function fixPosition() {
        var elm = $(Selector.DROPDOWN_MENU_ACTIVE);

        if (elm.length !== 0) {
          if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {
            elm.css('left', 'inherit');
            elm.css('right', 0);
          } else {
            elm.css('left', 0);
            elm.css('right', 'inherit');
          }

          var offset = elm.offset();
          var width = elm.width();
          var windowWidth = $(window).width();
          var visiblePart = windowWidth - offset.left;

          if (offset.left < 0) {
            elm.css('left', 'inherit');
            elm.css('right', offset.left - 5);
          } else {
            if (visiblePart < width) {
              elm.css('left', 'inherit');
              elm.css('right', 0);
            }
          }
        }
      } // Static
      ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _config = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Dropdown($(this), _config);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggleSubmenu' || config == 'fixPosition') {
            data[config]();
          }
        });
      };

      return Dropdown;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($(this), 'toggleSubmenu');
    });
    $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function (event) {
      event.preventDefault();
      setTimeout(function () {
        Dropdown._jQueryInterface.call($(this), 'fixPosition');
      }, 1);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Toasts.js
   * License MIT
   * --------------------------------------------
   */
  var Toasts = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Toasts';
    var DATA_KEY = 'lte.toasts';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      INIT: "init" + EVENT_KEY,
      CREATED: "created" + EVENT_KEY,
      REMOVED: "removed" + EVENT_KEY
    };
    var Selector = {
      BODY: 'toast-body',
      CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',
      CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',
      CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',
      CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft'
    };
    var ClassName = {
      TOP_RIGHT: 'toasts-top-right',
      TOP_LEFT: 'toasts-top-left',
      BOTTOM_RIGHT: 'toasts-bottom-right',
      BOTTOM_LEFT: 'toasts-bottom-left',
      FADE: 'fade'
    };
    var Position = {
      TOP_RIGHT: 'topRight',
      TOP_LEFT: 'topLeft',
      BOTTOM_RIGHT: 'bottomRight',
      BOTTOM_LEFT: 'bottomLeft'
    };
    var Default = {
      position: Position.TOP_RIGHT,
      fixed: true,
      autohide: false,
      autoremove: true,
      delay: 1000,
      fade: true,
      icon: null,
      image: null,
      imageAlt: null,
      imageHeight: '25px',
      title: null,
      subtitle: null,
      close: true,
      body: null,
      class: null
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Toasts = /*#__PURE__*/function () {
      function Toasts(element, config) {
        this._config = config;

        this._prepareContainer();

        var initEvent = $.Event(Event.INIT);
        $('body').trigger(initEvent);
      } // Public


      var _proto = Toasts.prototype;

      _proto.create = function create() {
        var toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
        toast.data('autohide', this._config.autohide);
        toast.data('animation', this._config.fade);

        if (this._config.class) {
          toast.addClass(this._config.class);
        }

        if (this._config.delay && this._config.delay != 500) {
          toast.data('delay', this._config.delay);
        }

        var toast_header = $('<div class="toast-header">');

        if (this._config.image != null) {
          var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

          if (this._config.imageHeight != null) {
            toast_image.height(this._config.imageHeight).width('auto');
          }

          toast_header.append(toast_image);
        }

        if (this._config.icon != null) {
          toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon));
        }

        if (this._config.title != null) {
          toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title));
        }

        if (this._config.subtitle != null) {
          toast_header.append($('<small />').html(this._config.subtitle));
        }

        if (this._config.close == true) {
          var toast_close = $('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

          if (this._config.title == null) {
            toast_close.toggleClass('ml-2 ml-auto');
          }

          toast_header.append(toast_close);
        }

        toast.append(toast_header);

        if (this._config.body != null) {
          toast.append($('<div class="toast-body" />').html(this._config.body));
        }

        $(this._getContainerId()).prepend(toast);
        var createdEvent = $.Event(Event.CREATED);
        $('body').trigger(createdEvent);
        toast.toast('show');

        if (this._config.autoremove) {
          toast.on('hidden.bs.toast', function () {
            $(this).delay(200).remove();
            var removedEvent = $.Event(Event.REMOVED);
            $('body').trigger(removedEvent);
          });
        }
      } // Static
      ;

      _proto._getContainerId = function _getContainerId() {
        if (this._config.position == Position.TOP_RIGHT) {
          return Selector.CONTAINER_TOP_RIGHT;
        } else if (this._config.position == Position.TOP_LEFT) {
          return Selector.CONTAINER_TOP_LEFT;
        } else if (this._config.position == Position.BOTTOM_RIGHT) {
          return Selector.CONTAINER_BOTTOM_RIGHT;
        } else if (this._config.position == Position.BOTTOM_LEFT) {
          return Selector.CONTAINER_BOTTOM_LEFT;
        }
      };

      _proto._prepareContainer = function _prepareContainer() {
        if ($(this._getContainerId()).length === 0) {
          var container = $('<div />').attr('id', this._getContainerId().replace('#', ''));

          if (this._config.position == Position.TOP_RIGHT) {
            container.addClass(ClassName.TOP_RIGHT);
          } else if (this._config.position == Position.TOP_LEFT) {
            container.addClass(ClassName.TOP_LEFT);
          } else if (this._config.position == Position.BOTTOM_RIGHT) {
            container.addClass(ClassName.BOTTOM_RIGHT);
          } else if (this._config.position == Position.BOTTOM_LEFT) {
            container.addClass(ClassName.BOTTOM_LEFT);
          }

          $('body').append(container);
        }

        if (this._config.fixed) {
          $(this._getContainerId()).addClass('fixed');
        } else {
          $(this._getContainerId()).removeClass('fixed');
        }
      } // Static
      ;

      Toasts._jQueryInterface = function _jQueryInterface(option, config) {
        return this.each(function () {
          var _options = $.extend({}, Default, config);

          var toast = new Toasts($(this), _options);

          if (option === 'create') {
            toast[option]();
          }
        });
      };

      return Toasts;
    }();
    /**
     * jQuery API
     * ====================================================
     */


    $.fn[NAME] = Toasts._jQueryInterface;
    $.fn[NAME].Constructor = Toasts;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Toasts._jQueryInterface;
    };

    return Toasts;
  }(jQuery);

  exports.CardRefresh = CardRefresh;
  exports.CardWidget = CardWidget;
  exports.ControlSidebar = ControlSidebar;
  exports.DirectChat = DirectChat;
  exports.Dropdown = Dropdown;
  exports.Layout = Layout;
  exports.PushMenu = PushMenu;
  exports.Toasts = Toasts;
  exports.TodoList = TodoList;
  exports.Treeview = Treeview;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=adminlte.js.map

// Logotipo Kabum PDF
window.logoPDF = "data:image/png;base64,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"