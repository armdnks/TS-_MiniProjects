import SessionStorageAPI from '../../utils/SessionStorageAPI.js';
import { randomHex } from '../../utils/helpers.js';
const storageAPI = new SessionStorageAPI('todo-list');

// Form Modal
const formModalContainer = document.querySelector('.form-modal-container ')! as HTMLDivElement;
const formModal = document.getElementById('form-modal')! as HTMLDivElement;
const modalBg = document.querySelector('.modal-bg')! as HTMLDivElement;
// Form Input
const formInput = document.getElementById('form-input')! as HTMLInputElement;
const formCheckBox = document.getElementById('form-checked')! as HTMLInputElement;
// Todo List
const todoList = document.getElementById('todo-list')! as HTMLDivElement;
// Todo Alert
const todoAlert = document.getElementById('todo-alert')! as HTMLDivElement;
const todoAlertContainer = document.querySelector('.todo-alert-container')! as HTMLDivElement;
const todoAlertMessage = document.querySelector('.todo-alert-message')! as HTMLHeadingElement;
// Buttons
const addBtn = document.querySelector('.add-btn')! as HTMLButtonElement;
const closeModalBtn = document.querySelector('.close-modal-btn')! as HTMLButtonElement;
const submitBtn = document.querySelector('.submit-btn')! as HTMLButtonElement;

// EDIT OPTIONS
let editTodoValue: HTMLHeadingElement;
let editMode: boolean = false;
let editID: string = '';

type TTodoItem = {
  id: string;
  data: {
    value: string;
    isComplete: boolean;
  };
};

/* DOM CONTENT LOADED */
window.addEventListener('DOMContentLoaded', loadTodos);
function loadTodos(): TTodoItem[] {
  // let todos: TTodoItem[] = getLocalStorage();
  let todos: TTodoItem[] = storageAPI.get();

  if (todos.length > 0) {
    todos.forEach((todo: TTodoItem) => {
      console.log(todo);
      const {
        id,
        data: { value, isComplete },
      } = todo;

      createTodo(id, value, isComplete);
    });
  }

  return todos;
}

/* OPEN/CLOSE MODAL */
// Open/Close Modal Listeners
addBtn.addEventListener('click', openFormModal);
closeModalBtn.addEventListener('click', closeFormModal);
modalBg.addEventListener('click', closeFormModal);
// Open/Close Modal Functions
function openFormModal() {
  formModalContainer.classList.add('show');
}
function closeFormModal() {
  formModalContainer.classList.remove('show');
  clearInput();
}

/* SUBMIT FORM */
formModal.addEventListener('submit', submitTodo);
function submitTodo(e: SubmitEvent) {
  e.preventDefault();
  const value: string = formInput.value;
  const isComplete: boolean = formCheckBox.checked;
  const id: string = randomHex();

  if (value && !editMode) {
    createTodo(id, value, isComplete);
    // addToLocalStorage(id, value, isComplete);
    storageAPI.post(id, { value, isComplete });
    showAlert('add new todo', 'success');
    clearInput();
  } else if (value && editMode) {
    editTodoValue.innerHTML = value;
    if (isComplete) {
      editTodoValue.classList.add('checked');
    } else {
      editTodoValue.classList.remove('checked');
    }
    // editFromLocalStorage(editID, value, isComplete);
    storageAPI.update(editID, { data: { value, isComplete } });
    showAlert('todo updated!', 'info');
    clearInput();
  } else {
    showAlert('something?', 'danger');
  }
}

/* TODO FUNCTION */
function createTodo(id: string, value: string, isComplete: boolean): HTMLDivElement {
  const todoItem = document.createElement('div')! as HTMLDivElement;
  todoItem.setAttribute('data-id', id);
  todoItem.classList.add('todo-list-item');
  todoItem.innerHTML = `
    <h3 class="todo-list-title ${isComplete ? 'checked' : ''}" >${value}</h3>
    <div class="todo-list-controls">
      <button class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  // delete/edit todo
  const deleteBtn = todoItem.querySelector('.delete-btn')! as HTMLButtonElement;
  deleteBtn.addEventListener('click', deleteTodo);
  const editBtn = todoItem.querySelector('.edit-btn')! as HTMLButtonElement;
  editBtn.addEventListener('click', editTodo);

  return todoList.appendChild(todoItem);
}

function deleteTodo(e: MouseEvent) {
  const currentTarget = e.currentTarget as HTMLElement;
  const todoItem = currentTarget.parentElement!.parentElement as HTMLDivElement;
  todoList.removeChild(todoItem);
  const todoId = todoItem.dataset.id!;
  // removeFromLocalStorage(todoId);
  storageAPI.delete(todoId);
  showAlert('todo removed..', 'danger');
}

function editTodo(e: Event) {
  const currentTarget = e.currentTarget as HTMLElement;
  const todoItem = currentTarget.parentElement!.parentElement as HTMLDivElement;
  editTodoValue = currentTarget.parentElement!.previousElementSibling as HTMLHeadingElement;
  formInput.value = editTodoValue.innerHTML;
  if (editTodoValue.classList.contains('checked')) {
    formCheckBox.checked = true;
  }
  editID = todoItem.dataset.id!;
  editMode = true;
  submitBtn.textContent = 'update';
  formModalContainer.classList.add('show');
}

function clearInput() {
  formInput.value = '';
  formCheckBox.checked = false;
  editMode = false;
  editID = '';
  submitBtn.textContent = 'submit';
  formModalContainer.classList.remove('show');
}

function showAlert(message: string, background: string) {
  todoAlert.classList.add('show');
  todoAlertContainer.classList.add(`bg-alert-${background}`);
  todoAlertMessage.textContent = message;

  setTimeout(function () {
    todoAlert.classList.remove('show');
    todoAlertContainer.classList.remove(`bg-alert-${background}`);
    todoAlertMessage.textContent = '';
  }, 1800);
}
