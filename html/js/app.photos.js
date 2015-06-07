var app = app || {};

app.photos = (function(w,d,$) {
	
	function initCheckBox() {
		var $photos = $('input.photos');
		$photos.change(function(){
			if ($photos.is(':checked')) {
				app.main.el.map.addLayer(app.main.el.photoPoints);
			} else {
				app.main.el.map.removeLayer(app.main.el.photoPoints);
			}
		});
	}

	return {
		initCheckBox : initCheckBox
	};

})(window,document,jQuery);