/*!
 * backbone.responsiveCSS3transitionsiScrollPlugin v0.1.0
 * git://github.com/techjacker/Backbone-Responsive-CSS3-Page-Transitions-iScroll-Plugin
 *
 * Demos: http://projects.andrewgriffithsonline.com/#backbone-responsive-CSS3-page-transitions
 * Documentation: https://github.com/techjacker/Backbone-Responsive-CSS3-Page-Transitions-iScroll-Plugin
 *
 * Copyright 2012, Andrew Griffiths
 * Released under a MIT license
 *
 * Date: 2012-11-16
 */

/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */


(function (root, factory) {

	"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['backbone', 'backboneResponsiveCSS3Transitions', 'iscroll'], factory);
	} else {
		// Overwrite Base Router Class Reference so don't have to alter code
		// (instead just add extra option parameter upon initialisation to activate iScroll functionality)
		root.backboneResponsiveCSS3Transitions = factory(root.Backbone, root.backboneResponsiveCSS3Transitions);
	}
}(this, function (Backbone, backboneTrans) {

		"use strict";
		var x = 0;
		var iScrollRouter = function (options) {

			if (options) {

				if (options.iScroll !== undefined && window.iScroll !== undefined) {


					if (_.isObject(options.iScroll)) {
						this.iScrollOptions = (_.isObject(options.iScroll.options)) ? options.iScroll.options : null;
						this.iScrollClass = (_.isString(options.iScroll.scrollerClass)) ? options.iScroll.scrollerClass : false;
						this.iScrollDefault = options.iScroll.activeDefault;
						this.positionScroller = options.iScroll.positionScroller;
					}

					this.iScrollActivePrev = this.iScrollActive = (this.iScrollDefault === false) ? false : true;
					this.iScrollActive && $('body').addClass('iscroll-body');

					this.on('threeDTransiScroll.toggleiScroll', function (argument) {
						this.toggleiScrollActive();
					});
				}
				_(this).bindAll('toggleiScrollActive', 'positionScrollerSetUp', 'addScrollerPositioningCss', 'hideScrollbar', 'hideScrollbarSledgehammer', 'showScrollbarSledgehammer', 'initializeiScroll', 'initializeiScrollFn', 'addiScrollWrappers', 'destroyiScroll', 'setPagePreAnimationStyles');
			}

			backboneTrans.apply(this, [options]);
		};

		_.extend(iScrollRouter.prototype, backboneTrans.prototype, {

			toggleiScrollActive: function (toggleParameter) {

				if (toggleParameter !== false) {
					this.iScrollActive = !this.iScrollActive;
				}

				if (this.iScrollActive === false) {
					if (this.newView && this.newView.iScroll) {
						$(this.newView.iScroll.vScrollbarWrapper).addClass('op-zero');
						$(window).off('.threeDTransiScroll');
						this.destroyiScroll(this.newView);
					}

				} else if (toggleParameter !== false) {
					this.addiScrollWrappers();
					this.initializeiScroll();
				}
				this.iScrollActivePrev = this.iScrollActive;
				$('body').toggleClass('iscroll-body');
			},






			showScrollbarSledgehammer: function () {
				this.newView.$el.css({
					'overflow' : 'visible'
				}).removeClass('hideSiblings');
			},



			addScrollerPositioningCss: function () {

				var wrapperOuterWidth = this.newView.$el.outerWidth(true),
					mainOuterWidth = this.newView.$el.children('#scroll-main').outerWidth(true),
					widthDif = (wrapperOuterWidth - mainOuterWidth),
					rightCSS;

				widthDif = widthDif && (widthDif / 2) || this.newView.el.offsetLeft;
				rightCSS = (-widthDif) + 2;

				this.newView && this.newView.iScroll && $(this.newView.iScroll.vScrollbarWrapper).css({
					'right' : rightCSS
				});
				this.showScrollbarSledgehammer();
			},
			positionScrollerSetUp: function () {
				if (this.positionScroller) {
					this.addScrollerPositioningCss();
					$(window).on('resize.threeDTransiScroll', _.debounce(this.hideScrollbarSledgehammer, 300, true));
					$(window).on('resize.threeDTransiScroll', _.debounce(this.addScrollerPositioningCss, 300));
				} else {
					this.showScrollbarSledgehammer();
				}
			},


			addiScrollWrappers: function () {
				if (this.iScrollActive) {
					if (this.newView.$el.attr("id") !== "iscroll-wrapper") {
						this.newView.$el.attr("id", "iscroll-wrapper");
						this.newView.$el.wrapInner('<div id="scroll-main" />');
					}
				}
			},
			initializeiScrollFn: function () {
				var self = this;
				if (this.iScrollActive) {
					// initialize iScroll and position at top of new page
					this.hideScrollbarSledgehammer();
					setTimeout(function () {
						self.newView.iScroll = new iScroll('iscroll-wrapper', self.iScrollOptions);
						self.newView.iScroll.scrollTo(0, 0, 0);
						// add scroller custom classes + position if spocified in router init opts
						self.iScrollClass && $(self.newView.iScroll.vScrollbarWrapper).addClass(self.iScrollClass);
						setTimeout(self.positionScrollerSetUp, 100);
					}, 100);

				}
			},
			initializeiScroll: function () {
				this.prevView && this.prevView.iScroll && this.destroyiScroll(this.prevView);
				if (this.iScrollActive) {
					setTimeout(this.initializeiScrollFn, 50);
				}
			},


			hideScrollbar: function () {
				if (this.iScrollActive && this.prevView && this.prevView.iScroll) {
					$(this.prevView.iScroll.vScrollbarWrapper).addClass('op-zero');
					this.prevView.$el.css('overflow', 'hidden');
				}
			},
			hideScrollbarSledgehammer: function () {
				this.newView.$el.addClass('hideSiblings');
			},
			destroyiScroll: function (View) {

				if (View.iScroll) {
					View.iScroll && View.iScroll.destroy();
					View.iScroll = null;
				}
			},

			////////////////////////
			// overloaded methods //
			////////////////////////
			insertNewPageDefault: function () {
				this.addiScrollWrappers();
				backboneTrans.prototype.insertNewPageDefault.call(this);
				this.initializeiScroll();
			},


			setPagePreAnimationStyles: function () {
				backboneTrans.prototype.setPagePreAnimationStyles.call(this);
				this.hideScrollbar();
				this.addiScrollWrappers();
			},

			enableLinks: function (view) {
				backboneTrans.prototype.enableLinks.apply(this, [view]);
				this.initializeiScroll();
			},

			unbindViewRenderCallback: function (View) {
				backboneTrans.prototype.unbindViewRenderCallback.apply(this, [View]);
				this.destroyiScroll(View);
			},

			triggerTransition: function (ViewClass, opts) {

				if (opts && opts.iScrollActive !== undefined) {
					this.iScrollActive = opts.iScrollActive;
					if (this.iScrollActivePrev !== this.iScrollActive) {
						// toggle changes the value so need to pass false as the argument
						this.toggleiScrollActive(false);
					}
				}

				backboneTrans.prototype.triggerTransition.apply(this, [ViewClass, opts]);
			}


		});

		iScrollRouter.extend = backboneTrans.extend;

		return iScrollRouter;
	}));