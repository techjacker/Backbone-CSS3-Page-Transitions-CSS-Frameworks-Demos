
window.agoProjectsBb3dPageTransitions = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	init: function() {

		var options = {"wrapElement": ".wrapper"};

		new agoProjectsBb3dPageTransitions.Routers.ApplicationRouter(options);
		Backbone.history.start({root: "backbone-responsive-3d-page-transitions"});
	}
};

$(document).ready(function(){
	agoProjectsBb3dPageTransitions.init();
});