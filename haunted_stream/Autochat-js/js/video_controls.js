(function ($) {
	$(document).ready(function () {

		// An example of playing with the Video.js javascript API
		// Will start the video and then switch the source 3 seconds latter
		// You can look at the doc there: http://docs.videojs.com/docs/guides/api.html
		videojs('my-video').ready(function () {
			var myPlayer = this;
			myPlayer.src({type: 'video/mp4', src: 'https://video.wixstatic.com/video/bde2cd_00273d71cb9b4edbb78e6231d8f6b103/1080p/mp4/file.mp4'});

			$("#change").on('click', function () {
				myPlayer.src({type: 'video/mp4', src: 'https://video.wixstatic.com/video/bde2cd_f5edd6eb29f64d689a3c9cbaae834870/1080p/mp4/file.mp4'});
			});
		});

	});
})(jQuery);
