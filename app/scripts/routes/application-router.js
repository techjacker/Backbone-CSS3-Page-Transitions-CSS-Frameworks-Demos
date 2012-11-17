agoProjectsBb3dPageTransitions.Routers.ApplicationRouter = backboneResponsiveCSS3Transitions.extend({

	initialize: function (opts) {
		this.options = opts;
		_(this).bindAll('triggerTransition');
		this.on('threeDTrans.pageTransitionComplete', this.pulsate());
	},

	routes: {
		"": "home", // or index.html = (index.html)? or / or just comment out
		"twitter-bootstrap*default": "twitterBootstrap",
		"foundation*default": "foundation",
		"simplegrid*default": "simpleGrid",
		"skeleton*default": "skeleton",
		"*default": "home" // or index.html = (index.html)? or / or just comment out
	},


	home: function (viewFragment) {
		this.triggerTransition(agoProjectsBb3dPageTransitions.Views.applicationView, {"viewFragment": viewFragment});
	},
	twitterBootstrap: function (viewFragment) {
		this.triggerTransition(agoProjectsBb3dPageTransitions.Views.twitterBootstrapView, {"viewFragment": viewFragment});
	},
	foundation: function (viewFragment) {
		this.triggerTransition(agoProjectsBb3dPageTransitions.Views.foundationView, {"viewFragment": viewFragment});
	},
	simpleGrid: function (viewFragment) {
		this.triggerTransition(agoProjectsBb3dPageTransitions.Views.simpleGridView, {"viewFragment": viewFragment});
	},
	skeleton: function (viewFragment) {
		this.triggerTransition(agoProjectsBb3dPageTransitions.Views.skeleton, {"viewFragment": viewFragment});
	},


	// monkey punch prototype method
	triggerTransition: function (ViewClass, opts) {
		// do NOT trigger animation when travelling between homepage and demo page > make it a "default" animation ie just swap the html
		opts = this.detectHomepage(opts);
		this.constructor.__super__.triggerTransition.apply(this, [ViewClass, opts]);

	},

	detectHomepage: function (opts) {
		if (_.isObject(opts)) {
			if (typeof(opts.viewFragment) === "undefined" || opts.viewFragment === "") {
				opts.direction = "default";
			}
		}
		return opts;
	},

	// trigger resize me icon flashing css anmiation
	pulsate: function () {

		var self = this;
		self.pulseCount = 0;

		var triggerPulsate = function () {

			var $resizeMe = $('#resize-me').removeClass('pulse');

			if (++self.pulseCount >= 3) {
				self.off('threeDTrans.pageTransitionComplete', triggerPulsate);
				return false;
			}

			setTimeout(function() {
				$resizeMe.addClass('pulse');
			}, 500);
		};

		return triggerPulsate;
	}
});