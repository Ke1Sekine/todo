let index = 0;
// ユニークなIDを管理する変数
export class TodoItemModel {
    /**
     * @param {string} title　Todoアイテムのタイトル
     * @param {boolean} completed Todoアイテムが完了済みかどうか true / false
     */
    constructor ({id, title, completed}) {
        this.id = ++index;
        // this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
