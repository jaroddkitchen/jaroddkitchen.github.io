var tentacleRootX = 200;
var tentacleRootY = 1;

var tentacleNodeSize = 12;
var tentacleFlex = 6;
var tentacleMinLength = 100;
var tentacleFreq = 0.15;
var tentacleAmp = 0.02;
var tentacleVel = 4;
var tentacleAlpha = 1.0;
var tentacleScale = 2;
var numTentacles = 1;

var tentacleInit = false;
var tentacleIsActive = false;

var tentSpawnX = 0;
var tentSpawnY = 0;

"use strict";
function initTentacle()
{
	tentacleInit = true;
	const Tentacle = class {
		constructor() {
			//this.length = tentacleMinLength + Math.round(30 * Math.random());
			this.length = tentacleMinLength
			this.vel = tentacleVel;
			this.amp = tentacleAmp + 0.4 * Math.random();
			this.freq = tentacleFreq + 0.3 * Math.random();
			this.dir = 2 * Math.PI * Math.random();
			this.frame = 0;
			this.free = false;
			this.vDir = 0;
			this.nodes = [];
			for (let i = 0; i < this.length; i++) {
				this.nodes.push(
					new Tentacle.Node(
						this,
						i,
						tentSpawnX,
						tentSpawnY					
					)
				);
			}
		}
		move() {
			const head = this.nodes[0];

/* 			head.x = canvas.width - (canvas.height/10) - tentacleRootX;
			head.y = canvas.height/10; */
			
			//move right
			//tentacleRootX++;
			
			// Change heading at edge 		
			if (head.x > canvas.width) {
				head.x--;
				this.dir += 0.1;
			} else if (head.x < 0) {
				head.x++;
				this.dir += 0.1;
			}
			if (head.y > canvas.height) {
				head.y--;
				this.dir += 0.1;
			} else if (head.y < 0) {
				head.y++;
				this.dir += 0.1;
			}
			
			if (tentacleIsActive){
			// Track Mouse Pointer	
				const dx = pointer.x - head.x;
				const dy = pointer.y - head.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 200) {
					if (this.free) {
						this.dir = Math.atan2(dy, dx);
						this.vel = 1 + dist * 0.05;
						if (dist < 1) {
							this.free = false;
						}
					}
				} else {
					this.vel = tentacleVel;
					this.free = true;
				}
			// Track Exit
			} else {
				const dx = tentSpawnX - head.x;
				const dy = tentSpawnY - head.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				this.dir = Math.atan2(dy, dx);
				this.vel = 1 + dist * 0.05;
				
				//this.remove();

/* 				for (let i = 2; i < this.length; i++) {
					if(nodes.length == 0){
						this.remove();
					}					
					this.nodes[i].remove();
				} */
			}
			
			this.vDir += 0.05 * (Math.random() - Math.random());
			this.dir += this.vDir;
			this.vDir *= 0.9;
			head.x += this.vel * Math.cos(this.dir);
			head.y += this.vel * Math.sin(this.dir);
			this.frame += this.freq;
			const iDir = this.amp * Math.cos(this.frame);
			const iHead = this.nodes[1];
			iHead.x = head.x - this.vel * Math.cos(this.dir + iDir);
			iHead.y = head.y - this.vel * Math.sin(this.dir + iDir);
			for (let i = 2; i < this.length; i++) {
				this.nodes[i].move();
			}
		}
	};
	Tentacle.Node = class {
		constructor(tentacle, i, x, y) {
			this.tentacle = tentacle;
			const s = tentacle.length - i;
			this.prev = i > 0 ? tentacle.nodes[i - 1] : null;
			this.pprev = i > 1 ? tentacle.nodes[i - 2] : null;
			//this.size = (tentacleNodeSize + s * s / tentacle.length) * tentacleScale;
			this.size = tentacleNodeSize + s * s / tentacle.length + tentacleScale;			
			this.x = x;
			this.y = y;
			this.a = 0;
			this.img = document.getElementById("node");
/* 			const h = tentacle.length/4;
			if (i > h){
				var tailfade = (100-i)/10;
				this.img.css("opacity", "0.5");
			} */
/* 			if (i > h){
				this.img = document.getElementById("nodeb");
			} */
		}
		move() {
				const dx = this.x - this.pprev.x;
				const dy = this.y - this.pprev.y;
				this.a = Math.atan2(dy, dx);
				const d = Math.sqrt(dx * dx + dy * dy);
				this.x = this.prev.x + dx * tentacleFlex / d;
				this.y = this.prev.y + dy * tentacleFlex / d;
				ctx.save();
				ctx.globalAlpha = tentacleAlpha;	
				ctx.translate(this.x, this.y);
				ctx.rotate(this.a + 0.4);
				ctx.drawImage(		
					this.img,					
					-this.size * 0.5 * tentacleScale,
					-this.size * 0.5 * tentacleScale,
					this.size * tentacleScale,
					this.size * tentacleScale
				);
				ctx.restore();
		}
	};
	const canvas = {
		init() {
			this.elem = document.createElement("canvas");
			document.body.appendChild(this.elem);
			this.resize();
			window.addEventListener("resize", () => this.resize(), false);
			return this.elem.getContext("2d");
		},
		resize() {
			this.width = this.elem.width = this.elem.offsetWidth;
			this.height = this.elem.height = this.elem.offsetHeight;
			tentSpawnX = this.width*1;
			tentSpawnY = 0;
		}
	};
	const pointer = {
		init(canvas) {
			this.x = -1000;
			this.y = 0;
			["mousemove", "touchstart", "touchmove"].forEach((event, touch) => {
				document.addEventListener(
					event,
					e => {
						if (touch) {
							e.preventDefault();
							this.x = e.targetTouches[0].clientX;
							this.y = e.targetTouches[0].clientY;
						} else {
							this.x = e.clientX;
							this.y = e.clientY;
						}
					},
					false
				);
			});
		}
	};
	const ctx = canvas.init();
	pointer.init(canvas);
	const tentacles = [];
	for (let i = 0; i < numTentacles; i++) tentacles.push(new Tentacle());
	const run = () => {
		requestAnimationFrame(run);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const tentacle of tentacles) {
			//if (tentacleIsActive){
				tentacle.move();
			//}				
		}	
	};
	//if (tentacleIsActive){
	run();
	//}
}