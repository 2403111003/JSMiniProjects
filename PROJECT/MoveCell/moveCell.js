window.onload = function () {
    // 윈도우가 로드된 후에 스크립트를 실행
    const startBtn = document.querySelector("#startBtn"); // 시작 버튼 요소를 가져옴
    startBtn.addEventListener("click", function () { // 시작 버튼에 클릭 이벤트 리스너 추가
        const numberInput = document.querySelector("#numberInput"); // 숫자 입력 요소를 가져옴
        let size; // 테이블 크기를 저장할 변수
        
        // 입력이 비어 있으면 플레이스홀더 값을 사용하고, 그렇지 않으면 입력 값을 사용
        if (numberInput.value == "") {
            size = numberInput.placeholder;
        } else {
            size = numberInput.value;
        }
        console.log(size); // 콘솔에 크기 출력

        const tableArea = document.querySelector(".tableArea"); // 테이블이 표시될 영역을 가져옴
        // 지정된 크기로 테이블 HTML 생성
        const cellHTML = '<table class="w-auto">\n'
            + ('\t<tr>' + '<td></td>'.repeat(size) + '</tr>').repeat(size)
            + '</table>';
        tableArea.innerHTML = cellHTML; // 생성된 테이블 HTML을 tableArea의 innerHTML로 설정

        const tds = document.querySelectorAll("td"); // 모든 테이블 셀을 가져옴

        // 시작 셀을 무작위로 선택하고 배경색을 보라색으로 설정
        let curLoc = Math.floor(Math.random() * size * size);
        tds[curLoc].style.backgroundColor = "violet";
        console.log(curLoc); // 현재 위치를 콘솔에 출력

        window.onkeydown = function (event) { // 윈도우에 keydown 이벤트 리스너 추가
            // 누른 키가 화살표 키가 아니면 아무것도 하지 않음
            if (event.keyCode < 37 || event.keyCode > 40) return;
            
            tds[curLoc].style.backgroundColor = "white"; // 현재 셀의 배경색을 흰색으로 재설정
            let row = Math.floor(curLoc / size); // 현재 행 계산
            let col = curLoc % size; // 현재 열 계산

            // 누른 화살표 키에 따라 새로운 위치 결정
            switch (event.key) {
                case 'ArrowLeft':
                    curLoc += (col > 0 ? -1 : size - 1); // 왼쪽으로 이동하거나 마지막 열로 래핑
                    break;
                case 'ArrowRight':
                    curLoc += (col < size - 1) ? 1 : -(size - 1); // 오른쪽으로 이동하거나 첫 번째 열로 래핑
                    break;
                case 'ArrowUp':
                    curLoc += (row > 0 ? -size : (size - 1) * size); // 위로 이동하거나 마지막 행으로 래핑
                    break;
                case 'ArrowDown':
                    curLoc += Number((row < size - 1) ? size : -(size - 1) * size); // 아래로 이동하거나 첫 번째 행으로 래핑
                    break;
            }
            console.log(curLoc); // 새로운 위치를 콘솔에 출력

            tds[curLoc].style.backgroundColor = "violet"; // 새로운 셀의 배경색을 보라색으로 설정
        }
    });
}