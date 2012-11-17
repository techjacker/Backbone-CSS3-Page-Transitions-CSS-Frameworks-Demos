agoProjectsBb3dPageTransitions.Views.applicationView = Backbone.View.extend({

	className: 'wrapper container-fluid homepage-bb-CSS3-page-transitions',

	template: 'application.tpl',

	initialize: function () {
		this.renderParams = {};
	},

	loadTemplate: function (vars, name, dir) {
		var self = this;
		vars = vars || {};
		dir = dir || 'scripts/templates/';
		name = name || this.template;
		return $.get(dir + name).pipe(function (tmpl) {
			tmpl = _.template(tmpl);
			self.$el.html(tmpl(vars));
			self.trigger('render');
		});
	},

	// render: function (viewFragment) {
	render: function () {
		document.title = "Backbone Responsive 3d Page Transitions - Project Homepage";
		this.renderParams = Array.prototype.slice.call(arguments),
		dfd = this.loadTemplate({"foo": this.renderParams});
		// dfd = this.loadTemplate({"foo": urlParams});
		return this;
	}


});
