import view from "./view.js";

/** Model: data 소스 */
const data = [
	{ id: 0, value: 75},
	{ id: 1, value: 20},
	{ id: 2, value: 80},
	{ id: 3, value: 100},
	{ id: 4, value: 70},
];

/** Controller:  기존 data를 입력받고 값 편집 (2.값 편집: Apply버튼 클릭 이벤트)*/

/** number인지 아닌지 판별하는 정규표현식 */
const isNumber = /^-?\d*\.?\d+$/;

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
	const copied =[...data];
	const $textArea = document.getElementsByClassName('editValueDetail')[0];
	// 정규표현식 적용(공백제거)
	const editedData = $textArea.value.replace(/\s/g, "");
	console.log(editedData.match(/id:([^",}]+)/g));
	// console.log(editedData);

	// id 값만
	// console.log(editedData.replaceAll(/value:\d+/g, ''));

	// value 값만
	const test = editedData.replaceAll(/id:\d+/g, '');
	// console.log(editedData.replaceAll(/id:\d+/g, ''));
	// const test = editedData.replaceAll(/{[^{]*?(?=value:)/g, '{').replace(/},/g, '},\n') 
	console.log(test.match(/value:([^",}]+)/g));
	// console.log(editedData.match(/id:\s*([^,}]+)/g).join().replace(/value:\d+/, ''));

	// try {
	// 	const dataState = JSON.parse($textArea.value);

	// 	data.splice(0);
	// 	dataState.map(el=> { 
	// 		if((el.id || el.id===0) && el.value){
	// 			data.push(el);
	// 		} else if( el.id === undefined || el.id === null ){
	// 			el.id = 'null'
	// 			data.push(el);
	// 			alert('id가 없습니다 다시 입력해주세요');
	// 		}
	// 	});
	// } catch(error) {
	// 	alert("형식에 맞지 않는 데이터입니다. 다시 입력해주세요");
	// };
};

/** 버튼에 이벤트를 부여하는 함수 */
const setBtn = (data) => {

	// 2. 값 편집 : Apply버튼 이벤트 추가
	const $applyEditValue = document.getElementById('applyEditValue');
	$applyEditValue.addEventListener('click',()=>{
		if(window.confirm("데이터를 수정하시겠습니까?")) { 
			editValueFn(data);
			view(data);
		} else {
			// 수정사항 원상복구
			view(data);
		};
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
			// view(data);
		} else {
			// view(data);
		}
		view(data);
	});
};

// 첫 화면 생성
view(data);
setBtn(data);
