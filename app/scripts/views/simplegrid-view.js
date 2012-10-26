agoProjectsBb3dPageTransitions.Views.simpleGridView = agoProjectsBb3dPageTransitions.Views.BaseView.extend({

	className: 'wrapper simplegrid grid grid-pad',

	template: 'simplegrid.tpl',

	initialize: function () {
	},

	// render on baseView Prototype
	render: function (viewFragment) {
		document.title = "Simplegrid Demo - Backbone Responsive 3d Page Transitions";
		this.constructor.__super__.render.apply(this, [viewFragment]);
	}
});