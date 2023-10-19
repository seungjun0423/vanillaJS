/** Model: data 소스 */
const data = [
	{ id: 0, value: 75},
	{ id: 1, value: 20},
	{ id: 2, value: 80},
	{ id: 3, value: 100},
	{ id: 4, value: 70},
];

/** View: 전체 페이지를 그려주는 함수 */
const drawPage = (data) => {

	/** View: data를 입력받고 그래프 생성 */
	const drawGraph = (data) => {
		const minY = data.map(el=>el.value).sort((a,b)=>a-b)[0] >= 0 ? 0: data.map(el=>el.value).sort((a,b)=>a-b)[0];
		const maxY = data.map(el=>el.value).sort((a,b)=>b-a)[0] ?? 100;
		const yData = [minY, maxY];

		const len = document.getElementsByClassName('barBox').length;

		if(len){
			for(let i=0;i<len;i++){
				const $barBox = document.getElementsByClassName('barBox')[0];
				const $xData = document.getElementsByClassName('xData')[0];
				$barBox.remove();
				$xData.remove();
			};
			const $yData = document.getElementsByClassName('yData');
			
			yData.map(()=>{
				$yData[0].remove();
			})
		};

		for(let i=0;i<data.length;i++){
			// x축 id 값 삽입
			const xAxis = data[i].id;
			const $xDataList = 	document.getElementsByClassName("xDataList")[0];
			const $x = document.createElement('div');
			$x.className = "xData";

			$x.innerText = xAxis;
			$xDataList.appendChild($x);

			// bar 그래프 생성 후 삽입
			const barValue = data[i].value;
			const $yBox = document.getElementsByClassName('yBox')[0];
			const $barBox = document.createElement('div');
			$barBox.className = "barBox";
			const $bar = document.createElement('div');
			$bar.className = "bar";
			$bar.style.height = `${barValue * 600/(maxY-minY)}px`;
			$barBox.appendChild($bar);
			$yBox.appendChild($barBox);
		}

		// y축 좌표 그리기 
		yData.map( el => {
			const $yDataList = 	document.getElementsByClassName("yDataList")[0]
			const $y = document.createElement('div');
			$y.className = "yData";
			$y.innerText = el;
			$yDataList.appendChild($y);
		});
	};

	/** View: data를 입력받고 테이블 생성 */
	const drawTable = (data) => {
		const len = document.getElementsByClassName('itemWrapper').length;

		if(len){
			for(let i=0; i<len; i++){
				document.getElementsByClassName('itemWrapper')[0].remove();
			}
		};

		data.map( (el) => {
			const $itemWrapper = document.createElement('div');
			$itemWrapper.className = `itemWrapper`;

			const $id = document.createElement('div');
			$id.className = `id`;
			$id.innerText = `${el.id}`;

			const $value = document.createElement('input');
			$value.className = `value`;
			$value.value = `${el.value}`;
			
			// 테이블 값 편집시 숫자만 입력할 수 있도록 alert 이벤트 추가
			$value.addEventListener('input', (e)=>{
				const isNumber = /^-?\d*\.?\d+$/;
				if(!isNumber.test(e.target.value)){
					$value.value = `${el.value}`;
					alert('숫자만 입력해주세요!');
				};
			});

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

	/** View: data를 입력받고 텍스트 삽입 */
	const drawTextArea = (data) => {
		const $textArea = document.getElementsByClassName('editValueDetail')[0];
		$textArea.value = JSON.stringify(data,null,'  ');
	};

	drawGraph(data);
	drawTable(data);
	drawTextArea(data);
};

/** Controller:  기존 data를 입력받고 값 편집 (2.값 편집: Apply버튼 클릭 이벤트)*/
const editValueFn = (data) => {
	const len = document.getElementsByClassName('itemWrapper').length;
	const dataState = [];

	for(let i=0; i<len; i++){
		const id = document.getElementsByClassName(`id`)[i].innerText;
		const value = document.getElementsByClassName(`value`)[i].value;

		if(isNumber.test(value) && value !== ''){
			dataState.push({id, value});
		} else {
			return alert('숫자만 입력 가능합니다.');
		}
	};

	data.splice(0);
	dataState.map(el=> { data.push(el) });
};

/** Controller: 기존 data를 입력받고 값 추가 (3.값 추가: Add버튼 클릭 이벤트) */
const addDataFn = (data) => {
	const $inputId = document.getElementsByClassName("inputId")[0];
	const $inputValue = document.getElementsByClassName("inputValue")[0];
	const dataState = [...data, {id: $inputId.value, value: $inputValue.value}];

	data.splice(0);
	dataState.map(el => { data.push(el) });
	$inputId.value = '';
	$inputValue.value = '';
};

/** Controller: 기존 data를 입력받고 값 고급 편집 (4.값 고급 편집: Apply버튼 클릭 이벤트) */
const editValueDetailFn = (data) => {
	const $textArea = document.getElementsByClassName('editValueDetail')[0];
	const dataState = JSON.parse($textArea.value);

	data.splice(0);

	dataState.map(el=> { data.push(el) });
};

/** 버튼 관리하는 함수 */
const setBtn = (data) => {

	// 2. 값 편집 : Apply버튼 이벤트 추가
	const $applyEditValue = document.getElementById('applyEditValue');
	$applyEditValue.addEventListener('click',(e)=>{
		editValueFn(data);
		drawPage(data);
	});

	// 3. 값 추가 : Add 버튼 이벤트 추가
	const $addBtn = document.getElementsByClassName("addBtn")[0];
	$addBtn.addEventListener('click', ()=>{
		addDataFn(data);
		drawPage(data);
	});

	// 값 추가시 number만 입력되도록 alert 이벤트 추가
	const $inputValue = document.getElementsByClassName('inputValue')[0];
	$inputValue.addEventListener('input',(e)=>{
		const input = e.target.value ?? 0;
		// console.log(input === '')
		const isNumber = /^-?\d*\.?\d+$/;

		if( !isNumber.test(input) && input !== ''){
			$inputValue.value = input.slice(0,-1);
			alert('숫자만 입력해주세요!');
		};
	});

	// 4. 값 고급 편집 : Apply 버튼 이벤트 추가
	const $applyEditValueDetail = document.getElementById('applyEditValueDetail');
	$applyEditValueDetail.addEventListener('click', ()=>{ 
		editValueDetailFn(data);
		drawPage(data);
	});
};


// 첫 화면 생성
drawPage(data);
setBtn(data);
