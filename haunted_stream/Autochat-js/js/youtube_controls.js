(function ($) {
	$(document).ready(function () {

		// An example of playing with the Video.js javascript API
		// Will start the video and then switch the source 3 seconds latter
		// You can look at the doc there: http://docs.videojs.com/docs/guides/api.html
		videojs('my-video').ready(function () {
			var myPlayer = this;
			myPlayer.src({type: 'video/youtube', src: 'https://www.youtube.com/watch?v=ADDekHANNY8'});

			$("#change").on('click', function () {
				myPlayer.src({type: 'video/youtube', src: 'https://www.youtube.com/watch?v=RjUhFIfSTIg'});
			});
		});

	});
})(jQuery);
