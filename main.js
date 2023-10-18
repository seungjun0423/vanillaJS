
const xList = [ 0, 1, 2, 3, 4, ];
const yList = [ 0, 100, ];

const data = [
	{ id: 0, value: 75},
	{ id: 1, value: 20},
	{ id: 2, value: 80},
	{ id: 3, value: 100},
	{ id: 4, value: 70},
];

// 1. 그래프 
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


// 2. 값 편집
data.map( (el,i) => {
	const $itemWrapper = document.createElement('div');
	$itemWrapper.className = `itemWrapper ${i}`;

	const $id = document.createElement('div');
	$id.className = "id";
	$id.innerText = `${el.id}`;

	const $value = document.createElement('div');
	$value.className = "value";
	$value.innerText = `${el.value}`; 

	const $deleteBtn = document.createElement('div');
	$deleteBtn.className = "deleteBtn";
	$deleteBtn.innerText = `삭제`; 

	/** 삭제 기능 */
	const clickEvent = (e) => {
		const target = e.target.parentNode;
		target.remove();
	};

	/** 삭제 이벤트 버튼에 추가 */
	$deleteBtn.addEventListener('click',(e)=>{ clickEvent(e) });

	$itemWrapper.appendChild($id);
	$itemWrapper.appendChild($value);
	$itemWrapper.appendChild($deleteBtn);

	/** 만들어진 요소 html 삽입 */
	const $table = document.getElementsByClassName("table")[0];
	$table.appendChild($itemWrapper);
});

/** 2. 값 편집 항목 테이블 구현 및 삭제 함수 */
const setTable = ( data ) => {

	const $len = document.getElementsByClassName('itemWrapper').length;
	for(let i=0; i<$len; i++){
		document.getElementsByClassName('itemWrapper')[0].remove();
	}

	/** 삭제 기능 */
	const clickEvent = (e) => {
		const target = e.target.parentNode;
		target.remove();
	};
	
	data.map( (el,i) => {
		const $itemWrapper = document.createElement('div');
		$itemWrapper.className = `itemWrapper ${i}`;

		const $id = document.createElement('div');
		$id.className = "id";
		$id.innerText = `${el.id}`;

		const $value = document.createElement('div');
		$value.className = "value";
		$value.innerText = `${el.value}`; 

		const $deleteBtn = document.createElement('div');
		$deleteBtn.className = "deleteBtn";
		$deleteBtn.innerText = `삭제`; 

		/** 삭제 이벤트 버튼에 추가 */
		$deleteBtn.addEventListener('click',(e)=>{clickEvent(e)});

		$itemWrapper.appendChild($id);
		$itemWrapper.appendChild($value);
		$itemWrapper.appendChild($deleteBtn);

		/** 만들어진 요소 html 삽입 */
		const $table = document.getElementsByClassName("table")[0];
		$table.appendChild($itemWrapper);
	})
};

const $applyEditValue = document.getElementById('applyEditValue');
const $value = document.getElementsByClassName("itemWrapper");
$applyEditValue.addEventListener('click',()=>{console.log($value)})


// 3. 값 추가 
const addData = (id, value) => {

	const inputEvent = ( type, e ) => {
		const obj = {id: null, value: null};
		if(type === "id"){

		}
		
	};
	const $inputId = document.getElementsByClassName("inputId")[0];
	$inputId.addEventListener('input',(e)=>{console.log(e.target.value)});

	const $inputValue = document.getElementsByClassName("inputValue")[0]; 
	$inputValue.addEventListener('input',(e)=>{console.log(e.target.value)});
};


// 4. 값 고급 편집 
const $textArea = document.getElementsByClassName('editValueDetail')[0];
$textArea.value = JSON.stringify(data,null,'  ');

const $applyEditValueDetail = document.getElementById('applyEditValueDetail');
$applyEditValueDetail.addEventListener('click',()=>{ setTable(JSON.parse($textArea.value)); });