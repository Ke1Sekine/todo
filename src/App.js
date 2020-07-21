import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
        this.todoListView = new TodoListView(this.todoListModel);
        this.handleDone = this.handleDone.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    mount () {
        const listElement = document.querySelector("#js-todo-list");
        const counterElement = document.querySelector("#js-todo-count");
        // TodoListModelの状態が更新（change）されたときのイベントをデタッチ
        this.todoListModel.addChangeListener(() => {
            console.log(this.todoListModel.getItems());
            const callbacks = {
                eventDone: this.handleDone(),
                eventDelete: this.handleDelete()
            };
            const refreshListElement = this.todoListView.refresh(this.todoListModel.getItems(), callbacks);
            // listElementの中身をrefreshListElementで上書きする
            render(refreshListElement, listElement);
            this.changeCount(counterElement);
        });
        this.submit()
    }
    changeCount(counterElement) {
        counterElement.textContent = `Todoアイテム数: ${this.todoListModel.getCount()}`;
    }
    submit() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            if (inputElement.value === "") {
                return;
            }
            // 新しいItemをListに追加する
            this.todoListModel.addItem(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }

    handleDone() {
        return (item) => {
            item.completed = !item.completed;
            this.todoListModel.update(item);
        }
    }
    handleDelete() {
        return (item) => {
            this.todoListModel.delete(item);
        }
    }
}