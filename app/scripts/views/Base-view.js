/*global Backbone:false */

// instance vars
agoProjectsBb3dPageTransitions.Views.BaseView = function (options) {
	"use strict";
	this.renderParams = {};
	Backbone.View.apply(this, [options]);
};

_.extend(agoProjectsBb3dPageTransitions.Views.BaseView.prototype, Backbone.View.prototype, {

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

	render: function () {
		this.renderParams = Array.prototype.slice.call(arguments);
		dfd = this.loadTemplate({"foo": this.renderParams});
		return this;
	}
});

agoProjectsBb3dPageTransitions.Views.BaseView.extend = Backbone.View.extend;