window.onload = function () {  // 페이지가 로드될 때 실행되는 함수
    const savedTodoList = JSON.parse(localStorage.getItem('todolist'));  // 로컬 스토리지에서 저장된 할 일 목록을 불러옴
    if (savedTodoList) {  // 저장된 할 일 목록이 존재하면 실행
        for (let i = 0; i < savedTodoList.length; i++) {  // 저장된 할 일 목록을 하나씩 반복
            console.log(savedTodoList[i]);  // 각 할 일 항목을 콘솔에 출력
            addTodoList(savedTodoList[i])  // 저장된 할 일 항목을 전달인자로 사용하여 리스트에 추가
        }
    }

    const todoInput = document.querySelector("#todoInput");  // 할 일 입력 필드를 선택
    const addBtn = document.querySelector("#addBtn");  // 추가 버튼을 선택
    addBtn.addEventListener("click", function () {  // 추가 버튼에 클릭 이벤트 리스너를 추가
        if (todoInput.value != "") addTodoList();  // 입력 필드가 비어 있지 않으면 할 일 항목을 추가
    });
}

window.onkeydown = function (event) {  // 키보드 이벤트 리스너를 추가
    const todoInput = document.querySelector("#todoInput");  // 할 일 입력 필드를 선택
    if (event.key == "Enter") {  // Enter 키가 눌렸을 때 실행
        if (todoInput.value != "") addTodoList();  // 입력 필드가 비어 있지 않으면 할 일 항목을 추가
    }
}

function saveItems() {  // 로컬 스토리지에 할 일 목록을 저장하는 함수
    const saveItems = [];  // 빈 배열 할당
    const listArea = document.querySelector(".listArea");  // 할 일 목록을 담고 있는 요소를 선택
    for (let node of listArea.children) {  // 각 할 일 항목을 반복
        textNode = node.querySelector('span');  // 각 항목의 텍스트 노드를 선택
        const todoObj = {  // 할 일 객체를 생성
            todo: textNode.textContent,  // 할 일 텍스트
            check: textNode.classList.contains('check')  // 완료 여부
        };
        saveItems.push(todoObj);  // 할 일 객체를 배열에 추가
    }
    console.log(JSON.stringify(saveItems));  // JSON 문자열로 변환된 할 일 목록을 콘솔에 출력

    localStorage.setItem('todolist', JSON.stringify(saveItems));  // 로컬 스토리지에 할 일 목록을 저장
}

function addTodoList(savedTodo) {  // 할 일 항목을 추가하는 함수
    const listArea = document.querySelector(".listArea");  // 할 일 목록을 담고 있는 요소를 선택

    const liNode = document.createElement("li");  // 새로운 <li> 요소를 생성
    const checkBtn = document.createElement("button");  // 완료 버튼을 생성
    const todoText = document.createElement("span");  // 할 일 텍스트를 담을 요소를 생성
    const delBtn = document.createElement("button");  // 삭제 버튼을 생성

    liNode.appendChild(checkBtn);  // <li> 요소에 완료 버튼을 추가
    liNode.appendChild(todoText);  // <li> 요소에 할 일 텍스트를 추가
    liNode.appendChild(delBtn);  // <li> 요소에 삭제 버튼을 추가
    listArea.appendChild(liNode);  // 할 일 목록에 <li> 요소를 추가

    if (savedTodo) {  // 저장된 할 일 항목이 있으면 실행
        todoText.innerText = savedTodo.todo;  // 저장된 할 일 텍스트를 설정
        if (savedTodo.check) {  // 저장된 할 일 항목이 완료 상태이면 실행
            todoText.classList.add("check");  // 할 일 텍스트에 완료 클래스를 추가
            checkBtn.innerHTML = "✔";  // 완료 버튼에 체크 표시를 추가
        }
    } else {  // 새로운 할 일 항목이면 실행
        todoText.innerText = document.querySelector("#todoInput").value;  // 입력 필드의 값을 설정
        document.querySelector("#todoInput").value = "";  // 입력 필드를 비움
    }
    delBtn.innerText = "X";  // 삭제 버튼의 텍스트를 설정

    checkBtn.classList.add("checkBtn");  // 완료 버튼에 클래스 추가
    todoText.classList.add("todoText");  // 할 일 텍스트에 클래스 추가
    delBtn.classList.add("delBtn");  // 삭제 버튼에 클래스 추가
    saveItems();  // 로컬 스토리지에 할 일 목록을 저장

    checkBtn.addEventListener("click", function () {  // 완료 버튼에 클릭 이벤트 리스너를 추가
        if (checkBtn.innerHTML == "") {  // 완료 버튼이 체크 표시가 없으면 실행
            checkBtn.innerHTML = "✔";  // 체크 표시를 추가
        } else {  // 완료 버튼이 체크 표시가 있으면 실행
            checkBtn.innerHTML = "";  // 체크 표시를 제거
        }
        todoText.classList.toggle("check");  // 할 일 텍스트의 완료 상태를 토글
        saveItems();  // 로컬 스토리지에 할 일 목록을 저장
    })

    delBtn.addEventListener("click", function () {  // 삭제 버튼에 클릭 이벤트 리스너를 추가
        liNode.remove();  // 할 일 항목을 삭제
        saveItems();  // 로컬 스토리지에 할 일 목록을 저장
    })

    console.log(listArea.lastChild);  // 마지막으로 추가된 할 일 항목을 콘솔에 출력
}
