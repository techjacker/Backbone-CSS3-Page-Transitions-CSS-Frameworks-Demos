
window.agoProjectsBb3dPageTransitions = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	init: function() {

		// var options = {"wrapElement": ".wrapper"};
		var options = {
			"renderCallback": true,
			// "iScroll": true,
			"iScroll": {
				// "activeDefault": false,
				"positionScroller": true,
				"scrollerClass": "myScrollbarOutside",
				"options": {
					// "momentum" : false,
					"bounce" : false
				}
			},
			"fastClick": window.FastClick,
			"wrapElement": ".wrapper"
		};
		// agoProjectsBb3dPageTransitions.Routers.RouterInstance = new agoProjectsBb3dPageTransitions.Routers.ApplicationRouter(options);
		// Backbone.history.start();


		agoProjectsBb3dPageTransitions.Routers.RouterInstance = new agoProjectsBb3dPageTransitions.Routers.ApplicationRouter(options);
		Backbone.history.start({root: "backbone-responsive-CSS3-page-transitions"});
	}
};

$(document).ready(function(){
	agoProjectsBb3dPageTransitions.init();
});