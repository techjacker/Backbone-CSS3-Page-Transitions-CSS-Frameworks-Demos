agoProjectsBb3dPageTransitions.Views.twitterBootstrapView = agoProjectsBb3dPageTransitions.Views.BaseView.extend({

	// className: 'wrapper container-fluid',
	className: 'wrapper container-fluid twitter-bootstrap',

	template: 'twitter-bootstrap.tpl',

	initialize: function () {
	},

	// render on baseView Prototype
	render: function (viewFragment) {
		document.title = "Twitter Bootstrap Demo - Backbone Responsive 3d Page Transitions";
		this.constructor.__super__.render.apply(this, [viewFragment]);
	}
});