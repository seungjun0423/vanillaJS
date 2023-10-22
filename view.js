
/** View: 전체 페이지를 그려주는 함수 */
const view = (data) => {

	/** View: data를 입력받고 그래프 생성 */
	const drawGraph = (data) => {
		const minY = data.map(el=>el.value).sort((a,b)=>a-b)[0] >= 0 ? 
			0: 
			data.map(el=>el.value)
			.sort((a,b)=>a-b)[0];
		const maxY = data.map(el=>el.value).sort((a,b)=>b-a)[0] ?? 100;
		const yData = ['0', '20', '40', '60', '80', '100'];
		const len = document.getElementsByClassName('barBox').length;
		
		// 기존 데이터가 있다면 초기화 시켜준다.
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

		// x축 id 값 삽입, 막대 그래프 생성
		for(let i=0;i<data.length;i++){
			const xIdValue = data[i].id;
			const $xDataList = 	document.getElementsByClassName("xDataList")[0];
			const $x = document.createElement('div');
			$x.className = "xData";
			$x.style.width = `${770 * (1/data.length)}px`;

			$x.innerText = xIdValue;
			$xDataList.appendChild($x);

			// bar 그래프 생성 후 삽입
			const barValue = data[i].value;
			const $yBox = document.getElementsByClassName('yBox')[0];
			const $barBox = document.createElement('div');
			const $bar = document.createElement('div');
			
			// tooltip 생성 (그래프 마우스 hover시 절대값 데이터를 보여준다)
			const $tooltip = document.createElement('div');
			$tooltip.className = 'tooltip';
			$tooltip.innerText = `${barValue}`;

			$barBox.className = "barBox";
			$bar.className = "bar";

			// bar 그래프 100분위 비율 설정
			$bar.style.height = `${barValue * 600/(maxY-minY)}px`;

			// 마우스 올리면 백분위 값이 아닌 절대값을 보여준다
			$bar.addEventListener('mouseover', (e)=>{
				$bar.appendChild($tooltip);
			});

			// 마우스를 내리면 절대값 사라짐
			$bar.addEventListener('mouseout', (e)=>{   
				e.target.children[0].remove();
		});

			$barBox.appendChild($bar);
			$yBox.appendChild($barBox);
		}

		// y축 수치 그리기 
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

			const $deleteBtn = document.createElement('div');
			$deleteBtn.className = "deleteBtn";
			$deleteBtn.innerText = `삭제`; 

			const $cancelBtn = document.createElement('div');
				$cancelBtn.className = "deleteBtn";
				$cancelBtn.innerText = `취소`;
			
			// 테이블 값 편집시 숫자만 입력할 수 있도록 alert 이벤트 추가
			$value.addEventListener('input', (e)=>{
				const isNumber = /^-?\d*\.?\d+$/;
				if(!isNumber.test(e.target.value) && e.target.value !== ''){
					$value.value = `${el.value}`;
					alert('숫자만 입력해주세요!');
				} else {
					$deleteBtn.remove();
					$itemWrapper.appendChild($cancelBtn);
					$cancelBtn.addEventListener('click', ()=>{
						$value.value = `${el.value}`;
						$cancelBtn.remove();
						$itemWrapper.appendChild($deleteBtn);
					});
				}
			});

			/** 삭제 버튼에 이벤트 추가 */
			$deleteBtn.addEventListener('click',(e) => {
				/** 삭제버튼 클릭시 value를 null로 만들고 삭제 버튼을 제거 */
				$value.value = null
				$deleteBtn.remove();

				/** 취소 버튼 클릭시 삭제버튼 사라짐 */
				$cancelBtn.addEventListener('click', ()=>{
					$value.value = `${el.value}`;
					$cancelBtn.remove();
					$itemWrapper.appendChild($deleteBtn);
				});
				$itemWrapper.appendChild($cancelBtn);
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
		// 따옴표 제거
		const textAreaData = JSON.stringify(data,null,'  ').replace(/"/g, "")
		$textArea.value = textAreaData;
	};

	drawGraph(data);
	drawTable(data);
	drawTextArea(data);
};

export default view