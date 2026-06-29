// ==============================
// 1. HTML 요소 가져오기
// ==============================

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const remainingCount = document.querySelector("#remaining-count");
const emptyMessage = document.querySelector("#empty-message");
const filterButtons = document.querySelectorAll(".filter-button");

// 모든 할 일을 저장할 배열입니다.
let todos = [];

// 현재 선택된 필터입니다.
// all: 전체, active: 진행 중, completed: 완료
let currentFilter = "all";

// ==============================
// 2. 할 일 추가
// ==============================

todoForm.addEventListener("submit", function (event) {
  // form의 기본 새로고침 동작을 막습니다.
  event.preventDefault();

  // 입력값의 앞뒤 공백을 제거합니다.
  const todoText = todoInput.value.trim();

  // 내용이 없다면 추가하지 않습니다.
  if (todoText === "") {
    todoInput.focus();
    return;
  }

  // 새로운 할 일 객체를 만듭니다.
  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  // 배열의 맨 앞에 새로운 할 일을 추가합니다.
  todos.unshift(newTodo);

  // 입력창을 비우고 다시 포커스합니다.
  todoInput.value = "";
  todoInput.focus();

  // 화면을 새로 그립니다.
  renderTodos();
});

// ==============================
// 3. 필터 버튼 클릭
// ==============================

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // 클릭한 버튼의 data-filter 값을 저장합니다.
    currentFilter = button.dataset.filter;

    // 모든 버튼에서 active 클래스를 제거합니다.
    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    // 클릭한 버튼에만 active 클래스를 추가합니다.
    button.classList.add("active");

    // 선택한 필터에 맞춰 목록을 다시 그립니다.
    renderTodos();
  });
});

// ==============================
// 4. 할 일 완료 상태 변경
// ==============================

function toggleTodo(todoId) {
  todos = todos.map(function (todo) {
    if (todo.id === todoId) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }

    return todo;
  });

  renderTodos();
}

// ==============================
// 5. 할 일 삭제
// ==============================

function deleteTodo(todoId) {
  todos = todos.filter(function (todo) {
    return todo.id !== todoId;
  });

  renderTodos();
}

// ==============================
// 6. 현재 필터에 맞는 목록 구하기
// ==============================

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  }

  if (currentFilter === "completed") {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }

  return todos;
}

// ==============================
// 7. 남은 할 일 개수 표시
// ==============================

function updateRemainingCount() {
  const activeTodos = todos.filter(function (todo) {
    return !todo.completed;
  });

  remainingCount.textContent = activeTodos.length;
}

// ==============================
// 8. 할 일 목록을 화면에 출력
// ==============================

function renderTodos() {
  // 기존 목록을 모두 지웁니다.
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  // 현재 필터에서 보여줄 항목이 있는지 확인합니다.
  if (filteredTodos.length === 0) {
    emptyMessage.classList.remove("hidden");

    if (currentFilter === "active" && todos.length > 0) {
      emptyMessage.querySelector("p").textContent =
        "진행 중인 할 일이 없습니다.";
    } else if (currentFilter === "completed" && todos.length > 0) {
      emptyMessage.querySelector("p").textContent =
        "완료된 할 일이 없습니다.";
    } else {
      emptyMessage.querySelector("p").textContent =
        "아직 등록된 할 일이 없습니다.";
    }
  } else {
    emptyMessage.classList.add("hidden");
  }

  // 각 할 일마다 li 요소를 만들어 목록에 추가합니다.
  filteredTodos.forEach(function (todo) {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    // 완료된 항목이라면 completed 클래스를 추가합니다.
    if (todo.completed) {
      todoItem.classList.add("completed");
    }

    const checkboxId = `todo-${todo.id}`;

    todoItem.innerHTML = `
      <input
        id="${checkboxId}"
        class="todo-checkbox"
        type="checkbox"
        ${todo.completed ? "checked" : ""}
      />

      <label
        class="custom-checkbox"
        for="${checkboxId}"
        aria-label="${todo.completed ? "완료 취소" : "할 일 완료"}"
      ></label>

      <span class="todo-text"></span>

      <button
        class="delete-button"
        type="button"
        aria-label="할 일 삭제"
      >
        삭제
      </button>
    `;

    // textContent를 사용하면 사용자가 입력한 HTML 코드가 실행되지 않아 안전합니다.
    todoItem.querySelector(".todo-text").textContent = todo.text;

    // 체크박스 변경 이벤트
    todoItem
      .querySelector(".todo-checkbox")
      .addEventListener("change", function () {
        toggleTodo(todo.id);
      });

    // 삭제 버튼 클릭 이벤트
    todoItem
      .querySelector(".delete-button")
      .addEventListener("click", function () {
        deleteTodo(todo.id);
      });

    todoList.appendChild(todoItem);
  });

  updateRemainingCount();
}

// 페이지가 처음 열렸을 때 기본 화면을 그립니다.
renderTodos();
