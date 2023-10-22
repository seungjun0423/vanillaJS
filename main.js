import view from "./view.js";

/** Model: data 소스 */
const data = [
	{ id: 0, value: 75},
	{ id: 1, value: 20},
	{ id: 2, value: 80},
	{ id: 3, value: 100},
	{ id: 4, value: 70},
];

/** number인지 아닌지 판별하는 정규표현식 */
const isNumber = /^-?\d*\.?\d+$/;

/** Controller:  기존 data를 입력받고 값 편집 (2.값 편집: Apply버튼 클릭 이벤트)*/
const editValueFn = (data) => {
	const len = document.getElementsByClassName('itemWrapper').length;
	const dataState = [];

	for(let i=0; i<len; i++){
		const id = document.getElementsByClassName(`id`)[i].innerText;
		const value = document.getElementsByClassName(`value`)[i].value;

		// VALUE에 입력된 값이 숫자 또는 공백일 시 데이터 변경
		if(isNumber.test(value) || value === ''){
			// 공백인 경우 0으로 값 변경 후 데이터 삽입
			if(value === ''){
				dataState.push({id: Number(id), value: 0});
			} else {
				dataState.push({id: Number(id), value: Number(value)});
			}
		} else {
			// number 입력이 아닌 경우
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
	const isDuplicateId = data.filter( el => el.id===Number($inputId.value)).length !== 0;

	if($inputId.value === '' && $inputValue.value === ''){
		return alert('ID 와 VALUE 를 입력해주세요!')
	};

	if($inputId.value === ''){
		return alert('ID를 입력해주세요!');
	};

	if($inputValue.value === ''){
		return alert('VALUE를 입력해주세요!');
	};
	
	if(isDuplicateId){
		$inputId.value = '';
		return alert('중복된 ID 입니다!');
	};

	const dataState = [...data];

	if( isNumber.test($inputId.value)){
		dataState.push({id: Number($inputId.value), value: Number($inputValue.value)});
	} else{
		dataState.push({id: $inputId.value, value: Number($inputValue.value)});
	}

	data.splice(0);

	dataState.map(el => { data.push(el) });
	$inputId.value = '';
	$inputValue.value = '';
};

/** Controller: 기존 data를 입력받고 값 고급 편집 (4.값 고급 편집: Apply버튼 클릭 이벤트) */
const editValueDetailFn = (data) => {
	const $textArea = document.getElementsByClassName('editValueDetail')[0];
	// 정규표현식 공백 제거
	const str = $textArea.value.replace(/\s/g, "");

	// 대괄호 체크
	if(!str.startsWith('[') || !str.endsWith(']')){
		return alert(`데이터를 배열("[]")안에 입력해주세요`);
	};

	// 중괄호의 짝 유무 체크
	const openBraces = str.split('{').length;
	const closeBraces = str.split('}').length;

	if(openBraces !== closeBraces){
		return alert(`데이터를 올바른 객체("{}")형태로 입력해주세요`);
	};

	try {
		const parseData = JSON.parse($textArea.value);

		// id,value 이외 key값 존재 확인 
		for(const obj of parseData){
			const keys = Object.keys(obj);

			for(const key of keys){
				if(key !== "id" && key !=="value"){
					return alert(`id와 value 외 다른 key는 허용되지 않습니다`)
				}
			}
		}

		// id값 중복 검사
		for(let i=0;i<parseData.length;i++){
			const el = parseData[i];
			if(el.id === undefined || el.id === null){
				return alert(`${i+1}번째 id값을 찾을 수 업습니다. 다시 입력해주세요`);
			};
			if(el.value === undefined || el.value === null){
				return alert(`${i+1}번째 value값을 찾을 수 없습니다. 다시 입력해주세요`);
			};

			if(typeof el.value !== 'number'){
				return alert(`${i+1}번째 value값이 number가 아닙니다. value는 number타입이어야 합니다. `);
			}


			for(let j=i+1;j<parseData.length-1;j++){
				const el2 = parseData[j];
				if(el.id === el2.id){
					return alert('중복된 id가 있습니다. 데이터를 다시 입력해주세요');
				};
			};
		};
	
		data.splice(0);
		parseData.map(el=>data.push(el));

	} catch(error){
		return alert(`올바른 데이터 형태가 아닙니다. 데이터를 다시 입력해주세요`)
	};
};

/** 버튼에 이벤트를 부여하는 함수 */
const setBtn = (data) => {

	// 2. 값 편집 : Apply버튼 이벤트 추가
	const $applyEditValue = document.getElementById('applyEditValue');
	$applyEditValue.addEventListener('click',()=>{
		if(window.confirm("데이터를 수정하시겠습니까?")) { 
			editValueFn(data);
		} 
		view(data);
	});

	// 3. 값 추가 : Add 버튼 이벤트 추가
	const $addBtn = document.getElementsByClassName("addBtn")[0];
	$addBtn.addEventListener('click', ()=>{
		if(window.confirm("데이터를 추가하시겠습니까?")) { 
			addDataFn(data);
			view(data);
		} else {
			// input창 초기화
			document.getElementsByClassName("inputId")[0].value = '';
			document.getElementsByClassName("inputValue")[0].value = '';
		};
	});

	// 값 추가시 number만 입력되도록 alert 이벤트 추가
	const $inputValue = document.getElementsByClassName('inputValue')[0];
	$inputValue.addEventListener('input',(e)=>{
		const input = e.target.value ?? 0;

		if( !isNumber.test(input) && input !== ''){
			$inputValue.value = input.slice(0,-1);
			alert('숫자만 입력해주세요!');
		};
	});

	// 4. 값 고급 편집 : Apply 버튼 이벤트 추가
	const $applyEditValueDetail = document.getElementById('applyEditValueDetail');
	$applyEditValueDetail.addEventListener('click', ()=>{ 
		if(window.confirm("데이터를 수정하시겠습니까?")){
			editValueDetailFn(data);
		};
		view(data);
	});
};


// 첫 화면 생성
view(data);
setBtn(data);

