agoProjectsBb3dPageTransitions.Views.foundationView = agoProjectsBb3dPageTransitions.Views.BaseView.extend({

	className: 'wrapper grid grid-pad foundation',

	template: 'foundation.tpl',

	initialize: function () {
	},

	// render on baseView Prototype
	render: function (viewFragment) {
		document.title = "Foundation Demo - Backbone Responsive 3d Page Transitions";
		this.constructor.__super__.render.apply(this, [viewFragment]);
	}
});