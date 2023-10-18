/** parameter => (xList: x축 수치, yList: y축 수치)  그래프 수치를 나열해주는 함수 (배열 타입 입력)*/
const listingGraphData = ( xList, yList) => {
	xList.map( el => {
		const $xDataList = 	document.getElementsByClassName("xDataList")[0]
		const $x = document.createElement('div');
		$x.className = "xData";
		$x.innerText = el;
		$xDataList.appendChild($x);
	})

	yList.map( el => {
		const $yDataList = 	document.getElementsByClassName("yDataList")[0]
		const $y = document.createElement('div');
		$y.className = "yData";
		$y.innerText = el;
		$yDataList.appendChild($y);
	})
};
const xList = [0,1,2,3,4];
const yList = [10,20,30,40,50,60,70,80,90,100];

listingGraphData(xList,yList);