import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";
import { TodoItemModel } from "../model/TodoItemModel.js";

export class TodoListView {
    constructor(todoListModel) {
        this.todoListModel = todoListModel;
    }

    /**
     * `items`に対数TODOリストのHTMLを作成（リフレッシュ）
     * @param {TodoItemModel[]} items
     * @param {function eventDone} eventDone　更新イベントリスナー
     * @param {function eventDelete} eventDelete　削除イベントリスナー
     * callbackはデータModel（の中のデータ更新するため上位より梯子してもらう）
     * @return {Element} TodoItemModelの配列に対応したリストのHTML要素
     */
    refresh(items, { eventDone, eventDelete }) {
        // TODOリストをまとめるList要素
        // utilのelementにulを指定してテンプレートを作成
        const listElement = element`<ul />`;
        items.forEach(item => {
            const todoItemView = new TodoItemView();
            const itemElement = todoItemView.createElement(item, eventDone, eventDelete);
            listElement.appendChild(itemElement);
        });
        return listElement;
    }
}