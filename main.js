const data = [
	{ id: 0, value: 75},
	{ id: 1, value: 20},
	{ id: 2, value: 80},
	{ id: 3, value: 100},
	{ id: 4, value: 70},
];

// 2. 값 편집 : Apply 버튼 이벤트
const $applyEditValue = document.getElementById('applyEditValue');
$applyEditValue.addEventListener('click',(e)=>{ editValueFn(data); });


// 3. 값 추가 : Add 버튼 이벤트 
const $addBtn = document.getElementsByClassName("addBtn")[0];
$addBtn.addEventListener('click', ()=> {
	addDataFn(data);
});

// 4. 값 고급 편집 : Apply 버튼 이벤트 
/** Apply 버튼 클릭시 입력된 데이터를 적용 */
const $applyEditValueDetail = document.getElementById('applyEditValueDetail');
$applyEditValueDetail.addEventListener('click', () => { });


// 1. 그래프 
const drawGraph = (data) => {
	const minValue = 0;
	const maxValue = data.map(el=>el.value).sort((a,b)=>b-a)[0];
	const yAxisList = [minValue, maxValue];

	const len = document.getElementsByClassName('barBox').length;
	
	if(len){
		for(let i=0;i<len;i++){
			const $barBox = document.getElementsByClassName('barBox')[0];
			const $xData = document.getElementsByClassName('xData')[0];
			$barBox.remove();
			$xData.remove();
		};
		const $yData = document.getElementsByClassName('yData');
		yAxisList.map(()=>{
			$yData[0].remove();
		})
	};

	for(let i=0;i<data.length;i++){
		const xAxis = data[i].id;
		const $xDataList = 	document.getElementsByClassName("xDataList")[0];
		const $x = document.createElement('div');
		$x.className = "xData";

		$x.innerText = xAxis;
		$xDataList.appendChild($x);

		const barValue = data[i].value;
		const $yBox = document.getElementsByClassName('yBox')[0];
		const $barBox = document.createElement('div');
		$barBox.className = "barBox";
		const $bar = document.createElement('div');
		$bar.className = "bar";
		$bar.style.height = `${barValue * 6}px`;
		$barBox.appendChild($bar);
		$yBox.appendChild($barBox);
	}
	/** y축 좌표 그리기 */
	yAxisList.map( el => {
		const $yDataList = 	document.getElementsByClassName("yDataList")[0]
		const $y = document.createElement('div');
		$y.className = "yData";
		$y.innerText = el;
		$yDataList.appendChild($y);
	});
};

// 2. 값 편집
/** 입력된 데이터를 토대로 테이블 그려주는 함수 */
const drawTable = (data) => {
	const len = document.getElementsByClassName('itemWrapper').length;

	if(len){
		for(let i=0; i<len; i++){
			document.getElementsByClassName('itemWrapper')[0].remove();
		}
	};

	data.map( (el,i) => {
		const $itemWrapper = document.createElement('div');
		$itemWrapper.className = `itemWrapper ${i}`;

		const $id = document.createElement('div');
		$id.className = `id ${i}`;
		$id.innerText = `${el.id}`;

		const $value = document.createElement('input');
		$value.className = `value ${i}`;
		$value.value = `${el.value}`; 

		const $deleteBtn = document.createElement('div');
		$deleteBtn.className = "deleteBtn";
		$deleteBtn.innerText = `삭제`; 

		/** 삭제 버튼에 이벤트 추가 */
		$deleteBtn.addEventListener('click',(e) => {
			const target = e.target.parentNode;
			target.remove();
		});

		$itemWrapper.appendChild($id);
		$itemWrapper.appendChild($value);
		$itemWrapper.appendChild($deleteBtn);

		/** 만들어진 요소 html 삽입 */
		const $table = document.getElementsByClassName("table")[0];
		$table.appendChild($itemWrapper);
	})
};

const editValueFn = (data) => {
	const len = document.getElementsByClassName('itemWrapper').length;
	for(let i=0; i<len; i++){
		const parent = document.getElementsByClassName('itemWrapper')[i];
	};
}

// 3. 값 추가 
const addDataFn = (data) => {
	const $inputId = document.getElementsByClassName("inputId")[0];
	const $inputValue = document.getElementsByClassName("inputValue")[0]; 

	data.push({
		id: Number($inputId.value),
		value: Number($inputValue.value)
	});
	$inputId.value = '';
	$inputValue.value = '';
	
	drawGraph(data);
	drawTable(data);
	drawTextArea(data);
}

// 4. 값 고급 편집 
/** 입력된 데이터를 토대로 textarea에 데이터를 넣어주는 함수 */
const drawTextArea = (data) => {
	const $textArea = document.getElementsByClassName('editValueDetail')[0];
	$textArea.value = JSON.stringify(data,null,'  ');
};

// const setPage = () => {
	drawGraph(data);
	drawTable(data);
	drawTextArea(data);
// };
