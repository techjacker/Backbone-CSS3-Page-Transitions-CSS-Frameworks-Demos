agoProjectsBb3dPageTransitions.Views.skeleton = agoProjectsBb3dPageTransitions.Views.BaseView.extend({

	className: 'wrapper skeleton container',

	template: 'skeleton.tpl',

	initialize: function () {
	},

	// render on baseView Prototype
	render: function (viewFragment) {
		document.title = "Skeleton Demo - Backbone Responsive 3d Page Transitions";
		this.constructor.__super__.render.apply(this, [viewFragment]);
	}
});