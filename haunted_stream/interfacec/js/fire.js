// window.onload = window.onresize = function() {
	// $('#frontbuffer').width = window.innerWidth;
	// $('#frontbuffer').height = window.innerHeight;
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;
  // $('#frontbuffer').width = $('#frontbuffer').offsetWidth;
  // $('#frontbuffer').height = $('#frontbuffer').offsetHeight;
// } 

 
            var CJS_TICKER_FPS =27;
            var FIRE_WIDTH =  320;
            var FIRE_HEIGHT = 168; 
    
            var palette = [];

            // Palette based framebuffer. Coordinate system origin upper-left.
            var firePixels = [];
            
            var rgbs = [
                0x07,0x07,0x07,
                0x1F,0x07,0x07,
                0x2F,0x0F,0x07,
                0x47,0x0F,0x07,
                0x57,0x17,0x07,
                0x67,0x1F,0x07,
                0x77,0x1F,0x07,
                0x8F,0x27,0x07,
                0x9F,0x2F,0x07,
                0xAF,0x3F,0x07,
                0xBF,0x47,0x07,
                0xC7,0x47,0x07,
                0xDF,0x4F,0x07,
                0xDF,0x57,0x07,
                0xDF,0x57,0x07,
                0xD7,0x5F,0x07,
                0xD7,0x5F,0x07,
                0xD7,0x67,0x0F,
                0xCF,0x6F,0x0F,
                0xCF,0x77,0x0F,
                0xCF,0x7F,0x0F,
                0xCF,0x87,0x17,
                0xC7,0x87,0x17,
                0xC7,0x8F,0x17,
                0xC7,0x97,0x1F,
                0xBF,0x9F,0x1F,
                0xBF,0x9F,0x1F,
                0xBF,0xA7,0x27,
                0xBF,0xA7,0x27,
                0xBF,0xAF,0x2F,
                0xB7,0xAF,0x2F,
                0xB7,0xB7,0x2F,
                0xB7,0xB7,0x37,
                0xCF,0xCF,0x6F,
                0xDF,0xDF,0x9F,
                0xEF,0xEF,0xC7,
                0xFF,0xFF,0xFF
            ];

             // Populate pallete.
            for(var i = 0; i < rgbs.length / 3; i++) {
                palette[i] = {
                    r : rgbs[i * 3 + 0], 
                    g : rgbs[i * 3 + 1], 
                    b : rgbs[i * 3 + 2] 
                }
            }


            y_scrolling = 440;
            function setup() {
                // Set whole screen to 0 (color: 0x07,0x07,0x07)
                for(var i = 0; i < FIRE_WIDTH*FIRE_HEIGHT; i++) {
                    firePixels[i] = 0;
                }
                
                // Set bottom line to 37 (color white: 0xFF,0xFF,0xFF)
                for(var i = 0; i < FIRE_WIDTH; i++) {
                    firePixels[(FIRE_HEIGHT-1)*FIRE_WIDTH + i] = 36;
                }
                y_scrolling = 440;
            }

            function startFire() {
                stage = new createjs.Stage("backbuffer");
                createjs.Ticker.addEventListener("tick", hostFrame);
                createjs.Ticker.setFPS(CJS_TICKER_FPS);
                container = new createjs.Container();
                stage.addChild(container);		
                setup();
            }
            
			// var flametime = 0;
			// if (flametime < 255){
				// flametime++;
				// console.log(flametime);
			// }


            /***********************************************/
            /**************** MEAT STARTS HERE *************/			
			
            function spreadFire(src) {
                var pixel = firePixels[src];
                if(pixel == 0) {
                    firePixels[src - FIRE_WIDTH] = 0;
                } else {
                    var randIdx = Math.round(Math.random() * 3.0);// & 3;
                    var dst = src - randIdx + 1;
                    firePixels[dst - FIRE_WIDTH ] = pixel - (randIdx & 1);
                }				
            }
            
            function doFire() {
                for(x=0 ; x < FIRE_WIDTH; x++) {
                    for (y = 1; y < FIRE_HEIGHT; y++) {
                        spreadFire(y * FIRE_WIDTH + x);
                    }
                }
            }
            /***********************************************/
            /*************** MEAT ENDS HERE ****************/
            /***********************************************/

            y_scrolling = 540;
            function hostFrame() {

                // Update palette buffer
                doFire();
                
                canvas = document.getElementById('backbuffer')	
                color = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
                
                // Convert palette buffer to RGB and write it to ouput.
                for(var y = 0; y < canvas.height; y++) {
                    for(var x = 0; x < canvas.width; x++) {
                        var index = firePixels[y * canvas.width + x];
                        var pixel = palette[index];

                        color.data[((canvas.width * y) + x) * 4 + 0] = pixel.r;
                        color.data[((canvas.width * y) + x) * 4 + 1] = pixel.g;
                        color.data[((canvas.width * y) + x) * 4 + 2] = pixel.b;
                        if (pixel.r == 0x07 && pixel.g == 0x07 && pixel.b == 0x07) {
                            color.data[((canvas.width * y) + x) * 4 + 3] = 0;
                        } else 
                            // Black pixels need to be transparent to show DOOM logo
                            color.data[((canvas.width * y) + x) * 4 + 3] = 255;
                    }
                }
                
                canvas.getContext("2d").putImageData(color, 0, 0);
				//canvas.getContext("2d").fillStyle = 'transparent';
				
                var frontbuffer = document.getElementById('frontbuffer');
                frontbuffer.getContext("2d").fillStyle = 'transparent';
                frontbuffer.getContext("2d").fillRect(0, 0, frontbuffer.width, frontbuffer.height);
                frontbuffer.getContext("2d").imageSmoothingEnabled = false;
                //frontbuffer.getContext("2d").drawImage(document.getElementById('doom'), 50, y_scrolling,  (frontbuffer.width - 100) , frontbuffer.height/2);
                frontbuffer.getContext("2d").drawImage(canvas,0,0, frontbuffer.width, frontbuffer.height);
                if (y_scrolling != 70)
                    y_scrolling-=2;
                else {
                  // Stop fire
                  for(var y = 167; y > 160; y--) {  
                    for(var x = 0; x < canvas.width; x++) {
                      if (firePixels[y * canvas.width + x] > 0)
                        firePixels[y * canvas.width + x]-= Math.round(Math.random()) & 3;
                      else {
						$('.fx-canvas').fadeOut();  
                        // Stop animation altogether
                        //createjs.Ticker.setFPS(0);
                      }
                    }
                  }  
                }   
                // Swap buffer
                stage.update();
            }