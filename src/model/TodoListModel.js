import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    /**
     * @param {TodoItemModel[]} [item] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(item = []) {
        super();
        this.items = item;
    }

    /**
     * TodoItemの合計個数を返す
     * @return {number}
     */
    getCount() {
        return this.items.length;
    }

    /**
     * 表示できるTodoItemの入れるを返す
     */
    getItems() {
        return this.items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数
     * @param {Function} listener
     */
    addChangeListener(listener) {
        this.addEventListener("change", listener);
    }
    
    /**
     * 状態が変更（change）された時に呼ぶ。
     * 登録済みのイベントリスナーを呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * itemを追加する
     * @param {TodoItemModel} item
     */
    addItem(item) {
        this.items.push(item);
        this.emitChange();
    }

    /**
     * 指定したidのItemを更新する
     * @param {{id, completed}} 
     */
    update({id, completed}) {
        const target = this.items.find(item => item.id === id);
        if (!target) {
            return;
        }
        target.completed = completed;
        this.emitChange();
    }
    /**
     * 指定したidのItemを削除する
     * @param {{id}} 
     */
    delete({id}) {
        console.log(id);
        this.items = this.items.filter(item => item.id !== id);
        this.emitChange();
    }
}