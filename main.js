/** parameter => (x: x축 수치, y: y추 수치)  그래프 수치를 나열해주는 함수 */
const listingGraphData = ( xList, yList) => {
	// const $x = document.createElement('div');
	// $x.className = "xData";
	// $x.innerText = 3;
	// console.log($x);
	// console.log(document.getElementsByClassName("zero"));
	// document.getElementsByClassName("xDataList")[0].appendChild($x);
	// console.log(document.getElementsByClassName("yDataList"));

	xList.map( el => {
		const $xDataList = 	document.getElementsByClassName("xDataList")[0]
		const $x = document.createElement('div');
		$x.className = "xData";
		$x.innerText = el;
		$xDataList.appendChild($x);
	})
};
const xList = [0,1,2,3,4];
const yList = [0,10,20,30,40,50,60,70,80,90];
listingGraphData(xList,yList);