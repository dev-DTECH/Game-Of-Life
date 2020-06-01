let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

let n = 300;
let UNDER_POP = 2;
let OVER_POP = 3;

let WIDTH;
let HEIGHT;
let fps = 10000;

if (window.innerWidth < window.innerHeight)
	WIDTH = HEIGHT = window.innerWidth - 5;
else WIDTH = HEIGHT = window.innerHeight - 5;

canvas.height = WIDTH;
canvas.width = HEIGHT;

let ar = []
let old_ar = [];
let gen = [];

let LastTime = 0;
let simulate = false;

canvas.onmousedown = (e) => {
	ar[Math.round((e.offsetX / WIDTH) * n)][
		Math.round((e.offsetY / HEIGHT) * n)
	] = 			(ar[Math.round((e.offsetX / WIDTH) * n)][
		Math.round((e.offsetY / HEIGHT) * n)
	] == 1)? 0:1;
	canvas.onmousemove = (e) => {
		// console.log(
		// 	Math.round((e.offsetY / HEIGHT) * n),
		// 	Math.round((e.offsetX / WIDTH) * n)
		// );
		ar[Math.round((e.offsetX / WIDTH) * n)][
			Math.round((e.offsetY / HEIGHT) * n)
		] =
			(ar[Math.trunc((e.offsetX / WIDTH) * n)][
				Math.trunc((e.offsetY / HEIGHT) * n)
			] == 1)? 0:1;
	};
};
canvas.onmouseup = () => {
	// canvas.onmousedown={}
	canvas.onmousemove = {};
};
canvas.oncontextmenu = (e) => {
	e.preventDefault();
	// canvas.onmousedown={}
	simulate = !simulate;
};

function start() {
	for (let i = 0; i < n; i++) {
		ar.push([]);
		// old_ar.push([]);
		for (let j = 0; j < n; j++) {
			// ar[i][j] = Math.round(Math.random());
			ar[i][j] = 0;
		}
	}
	ar[12][10] = 1;
	ar[12][11] = 1;
	ar[12][12] = 1;
	ar[13][12] = 1;
	ar[14][11] = 1;

	window.requestAnimationFrame(gameloop);
}
start();
function count(ar, x, y) {
	let c = 0;
	for (let i = x-1; i <= x+1; i++) {
		
		for (let j = y-1; j <= y+1; j++) {
			let x1=i,y1=j

			if(i==-1)x1=n-1
			if(i==n)x1=0
			if(j==-1)y1=n-1
			if(j==n)y1=0

			if(ar[x1][y1]==1) c++
		}
	}
	if(ar[x][y]==1)c--

	// if (i == 0 && j == 0) {
	// 	//checked
	// 	if (ar[1][0] == 1) c++;
	// 	if (ar[0][1] == 1) c++;
	// 	if (ar[1][1] == 1) c++;

	// 	if (ar[0][n - 1] == 1) c++;
	// 	if (ar[n - 1][0] == 1) c++;

	// 	if (ar[n - 1][n - 1] == 1) c++;
	// 	if (ar[n - 1][n - 2] == 1) c++;
	// 	if (ar[n - 2][n - 1] == 1) c++;
	// } else if (i == 0 && j == n - 1) {
	// 	//checked
	// 	if (ar[1][j] == 1) c++;
	// 	if (ar[0][j - 1] == 1) c++;
	// 	if (ar[1][j - 1] == 1) c++;

	// 	if (ar[0][0] == 1) c++;
	// 	if (ar[n - 1][n - 1] == 1) c++;

	// 	if (ar[n - 1][0] == 1) c++;
	// 	if (ar[n - 1][1] == 1) c++;
	// 	if (ar[n - 2][0] == 1) c++;
	// } else if (i == n - 1 && j == 0) {
	// 	//checked
	// 	if (ar[n - 2][0] == 1) c++;
	// 	if (ar[n - 1][1] == 1) c++;
	// 	if (ar[n - 2][1] == 1) c++;

	// 	if (ar[0][0] == 1) c++;
	// 	if (ar[n - 1][n - 1] == 1) c++;

	// 	if (ar[0][n - 1] == 1) c++;
	// 	if (ar[1][n - 1] == 1) c++;
	// 	if (ar[0][n - 2] == 1) c++;
	// } else if (i == n - 1 && j == n - 1) {
	// 	//checked
	// 	if (ar[i][j - 1] == 1) c++;
	// 	if (ar[i - 1][j] == 1) c++;
	// 	if (ar[i - 1][j - 1] == 1) c++;

	// 	if (ar[n - 1][0] == 1) c++;
	// 	if (ar[0][n - 1] == 1) c++;

	// 	if (ar[0][0] == 1) c++;
	// 	if (ar[1][0] == 1) c++;
	// 	if (ar[0][1] == 1) c++;
	// } else if (i == 0) {
	// 	//checked
	// 	if (ar[1][j] == 1) c++;
	// 	if (ar[1][j + 1] == 1) c++;
	// 	if (ar[1][j - 1] == 1) c++;

	// 	if (ar[0][j - 1] == 1) c++;
	// 	if (ar[0][j + 1] == 1) c++;

	// 	if (ar[n - 1][j] == 1) c++;
	// 	if (ar[n - 1][j + 1] == 1) c++;
	// 	if (ar[n - 1][j - 1] == 1) c++;
	// } else if (j == 0) {
	// 	//checked
	// 	if (ar[i][1] == 1) c++;
	// 	if (ar[i - 1][1] == 1) c++;
	// 	if (ar[i + 1][1] == 1) c++;

	// 	if (ar[i + 1][0] == 1) c++;
	// 	if (ar[i - 1][0] == 1) c++;

	// 	if (ar[i][n - 1] == 1) c++;
	// 	if (ar[i - 1][n - 1] == 1) c++;
	// 	if (ar[i + 1][n - 1] == 1) c++;
	// } else if (i == n - 1) {
	// 	//checked
	// 	if (ar[i - 1][j] == 1) c++;
	// 	if (ar[i - 1][j - 1] == 1) c++;
	// 	if (ar[i - 1][j + 1] == 1) c++;

	// 	if (ar[i][j + 1] == 1) c++;
	// 	if (ar[i][j - 1] == 1) c++;

	// 	if (ar[0][j] == 1) c++;
	// 	if (ar[0][j + 1] == 1) c++;
	// 	if (ar[0][j - 1] == 1) c++;
	// } else if (j == n - 1) {
	// 	//checked
	// 	if (ar[i][j - 1] == 1) c++;
	// 	if (ar[i - 1][j - 1] == 1) c++;
	// 	if (ar[i + 1][j - 1] == 1) c++;

	// 	if (ar[i + 1][j] == 1) c++;
	// 	if (ar[i - 1][j] == 1) c++;

	// 	if (ar[i][0] == 1) c++;
	// 	if (ar[i - 1][0] == 1) c++;
	// 	if (ar[i + 1][0] == 1) c++;
	// } else {
	// 	if (ar[i + 1][j] == 1) c++;
	// 	if (ar[i - 1][j] == 1) c++;
	// 	if (ar[i][j + 1] == 1) c++;
	// 	if (ar[i][j - 1] == 1) c++;
	// 	if (ar[i + 1][j - 1] == 1) c++;
	// 	if (ar[i - 1][j - 1] == 1) c++;
	// 	if (ar[i - 1][j + 1] == 1) c++;
	// 	if (ar[i + 1][j + 1] == 1) c++;
	// }
	return c;
}
let k = 0;
old_ar = JSON.parse(JSON.stringify(ar));

pops = [];
let k1 = -1;

function gameloop(TimeStamp) {
	let dt = TimeStamp - LastTime;
	LastTime = TimeStamp;

	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	old_ar = JSON.parse(JSON.stringify(ar));
	// old_ar=ar.copyWithin(old_ar,0,n)
	// for (let i = 0; i < n; i++) {
	// 	for (let j = 0; j < n; j++) {
	// 		old_ar[i][j] = ar[i][j];
	// 		// old_ar[i][j]=(ar[i][j] ==1)? 1: 0
	// 	}
	// }
	// old_ar=ar

	// gen[k] = old_ar;
	// k++;
	// let pop = 0;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			// old_ar[i][j] = (ar[i][j]==1)? 1 : 0;
			let noOfAliveCell = 0;
			if (simulate) noOfAliveCell = count(old_ar, i, j);
			if (noOfAliveCell > 8) console.error("fatality");
			// console.log(n)
			if (old_ar[i][j] == 1) {
				// pop++;
				// console.log(`(${i},${j}) => `+noOfAliveCell);
				ctx.fillRect((i * WIDTH) / n, (j * HEIGHT) / n, WIDTH / n, HEIGHT / n);
				if (simulate)
					if (noOfAliveCell > OVER_POP || noOfAliveCell < UNDER_POP)
						ar[i][j] = 0;
				// else ar[i][j] = 1;
			} else {
				if (simulate) if (noOfAliveCell == OVER_POP) ar[i][j] = 1;
			}
		}
	}
	// if (pop > pops[k1-1]) console.log("pop inc");
	// else
	// console.log("pop dec");
	// pops[k1] = pop;
	// k1++;
	// gameloop();
	setTimeout(gameloop, 1000 / fps);
	// window.requestAnimationFrame(gameloop);
}
