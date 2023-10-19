const data = [
	{ id: 0, value: 75},
	{ id: 1, value: 20},
	{ id: 2, value: 80},
	{ id: 3, value: 100},
	{ id: 4, value: 70},
];

// 2. 값 편집 : Apply 버튼 이벤트
const $applyEditValue = document.getElementById('applyEditValue');
$applyEditValue.addEventListener('click',(e)=>{ });


// 3. 값 추가 : Add 버튼 이벤트 
const $inputId = document.getElementsByClassName("inputId")[0];
$inputId.addEventListener('input',(e)=>{ inputEvent($inputId, e.target.value) });

const $inputValue = document.getElementsByClassName("inputValue")[0]; 
$inputValue.addEventListener('input',(e)=>{ inputEvent($inputValue, e.target.value) });

const $addBtn = document.getElementsByClassName("addBtn")[0];
$addBtn.addEventListener('click', ()=>{
	data.push({
		id: Number($inputId.value),
		value: Number($inputValue.value)
	});
	setGraph(data);
	inputEvent($inputId,'' );
	inputEvent($inputValue,'' );
});

// 4. 값 고급 편집 : Apply 버튼 이벤트 
/** Apply 버튼 클릭시 입력된 데이터를 적용 */
const $applyEditValueDetail = document.getElementById('applyEditValueDetail');
$applyEditValueDetail.addEventListener('click', () => { });


// 1. 그래프 
/** x축 좌표 그리기 */
const setGraph = (data) => {
	const dataState = [...data];
	const len = document.getElementsByClassName('barBox').length;
	const maxValue = dataState.map(el=>el.value).sort((a,b)=>b-a)[0];
	const yAxisList = [0, maxValue];
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
/** 기본 테이블 그리기 */
// const _setTable = (data) => {
// 	/** 삭제 기능 */
// 	const clickEvent = (e) => {
// 		const target = e.target.parentNode;
// 		target.remove();
// 	};
// 	data.map( (el,i) => {
// 		const $itemWrapper = document.createElement('div');
// 		$itemWrapper.className = `itemWrapper ${i}`;

// 		const $id = document.createElement('div');
// 		$id.className = "id";
// 		$id.innerText = `${el.id}`;

// 		const $value = document.createElement('div');
// 		$value.className = "value";
// 		$value.innerText = `${el.value}`; 

// 		const $deleteBtn = document.createElement('div');
// 		$deleteBtn.className = "deleteBtn";
// 		$deleteBtn.innerText = `삭제`; 

// 		/** 삭제 이벤트 버튼에 추가 */
// 		$deleteBtn.addEventListener('click',(e)=>{ clickEvent(e) });

// 		$itemWrapper.appendChild($id);
// 		$itemWrapper.appendChild($value);
// 		$itemWrapper.appendChild($deleteBtn);

// 		/** 만들어진 요소 html 삽입 */
// 		const $table = document.getElementsByClassName("table")[0];
// 		$table.appendChild($itemWrapper);
// 	});
// };

/** 입력된 데이터를 토대로 테이블 그려주는 함수 */
const DsetTable = (data) => {
	const len = document.getElementsByClassName('itemWrapper').length;
	const $textAreaValue = document.getElementsByClassName('editValueDetail')[0].value;
	
	// id, value 값이 비어있다면 null을 넣어주는 정규표현식
	let dataList;
	if(len){
		dataList = JSON.parse($textAreaValue.replace(/("id"|"value")\s*:\s*(?=,|\n)/g, '$1: null'));
	};
	// value 값이 number 인지 아닌지 판별하는 정규 표현식
	// const regex = /("value"\s*:\s*)([^0-9,\n]+)/g;
	// dataList = dataList.replace(regex,'$10');
	// console.log(dataList);


	for(let i=0; i<len; i++){
		document.getElementsByClassName('itemWrapper')[0].remove();
		data.pop();
	}

	dataList.map(el=>{data.push(el)});

	/** 삭제 기능 */
	// const clickEvent = (e) => {
	// 	const target = e.target.parentNode;
	// 	target.remove();
	// };
	
	// data.map( (el,i) => {
	// 	const $itemWrapper = document.createElement('div');
	// 	$itemWrapper.className = `itemWrapper ${i}`;

	// 	const $id = document.createElement('div');
	// 	$id.className = "id";
	// 	$id.innerText = `${el.id}`;

	// 	const $value = document.createElement('div');
	// 	$value.className = "value";
	// 	$value.innerText = `${el.value}`; 

	// 	const $deleteBtn = document.createElement('div');
	// 	$deleteBtn.className = "deleteBtn";
	// 	$deleteBtn.innerText = `삭제`; 

	// 	/** 삭제 이벤트 Apply 버튼에 추가 */
	// 	$deleteBtn.addEventListener('click',(e)=>{clickEvent(e)});

	// 	$itemWrapper.appendChild($id);
	// 	$itemWrapper.appendChild($value);
	// 	$itemWrapper.appendChild($deleteBtn);

	// 	/** 만들어진 요소 html 삽입 */
	// 	const $table = document.getElementsByClassName("table")[0];
	// 	$table.appendChild($itemWrapper);
	// })
};

const setTable = (data) => {
	const deleteEvent = (e) => {
		const target = e.target.parentNode;
		target.remove();
	};

	data.map( (el,i) => {
		const $itemWrapper = document.createElement('div');
		$itemWrapper.className = `itemWrapper ${i}`;

		const $id = document.createElement('div');
		$id.className = "id";
		$id.innerText = `${el.id}`;

		const $value = document.createElement('input');
		$value.className = "value";
		$value.value = `${el.value}`; 

		const $deleteBtn = document.createElement('div');
		$deleteBtn.className = "deleteBtn";
		$deleteBtn.innerText = `삭제`; 

		/** 삭제 이벤트 Apply 버튼에 추가 */
		$deleteBtn.addEventListener('click',(e)=>{deleteEvent(e)});

		$itemWrapper.appendChild($id);
		$itemWrapper.appendChild($value);
		$itemWrapper.appendChild($deleteBtn);

		/** 만들어진 요소 html 삽입 */
		const $table = document.getElementsByClassName("table")[0];
		$table.appendChild($itemWrapper);
	})
};


// 3. 값 추가 
const inputEvent = ( el, value ) => {
	el.value = value;
};


// 4. 값 고급 편집 
/** 기본 데이터 그리기 */
const _setTextArea = (data) =>{
	const $textArea = document.getElementsByClassName('editValueDetail')[0];
	$textArea.value = JSON.stringify(data,null,'  ');
};

/** 데이터가 바뀌면 4번 항목 수정해주는 함수 */
const DsetTextArea = (data) => {
	const dataList = [];
	const len = document.getElementsByClassName("itemWrapper").length;
	const $idList = document.getElementsByClassName('id');
	const $valueList = document.getElementsByClassName('value');

	for(let i=0; i<len; i++){
		const id = $idList[i].innerText;
		const value = $valueList[i].innerText;

		dataList.push({ id: Number(id), value: Number(value)});
	}
	// const $textArea = document.getElementsByClassName('editValueDetail')[0];
	// $textArea.value = JSON.stringify(dataList,null,'  ');
};

const setTextArea = (data) => {
	const $textArea = document.getElementsByClassName('editValueDetail')[0];
	$textArea.value = JSON.stringify(data,null,'  ');
};


setGraph(data);
setTable(data);
setTextArea(data);
