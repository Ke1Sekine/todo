import { element } from "./html-util.js";

export class TodoItemView {
    /**
    * `items`に対数TODOリストのHTMLを作成
    * @param {TodoItemModel} item TodoItemModel
    * @param {function eventDone} eventDone　更新イベントリスナー
    * @param {function eventDelete} eventDelete　削除イベントリスナー
    * @return {Element} TodoItemModelの配列に対応したリストのHTML要素
    */
    createElement(item , eventDone, eventDelete) {
        // liのエレメントを取得
        const itemElement = this.getLi(item);
        // チェックボックスに更新イベントをデタッチ
        // console.log(eventDone);
        this.addEventOnChangeToCheckBox(itemElement.querySelector(".checkbox"), eventDone, item);
        
        // デリートボタンを追加
        itemElement.append(element`<button class="delete">x</button>`);
        // デリートボタンにクリックイベントをデタッチ
        this.addEventOnClickToDeleteBottom(itemElement.querySelector(".delete"), eventDelete, item);
        return itemElement;
    }

    getLi(item) {
        return item.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
            : element`<li><input type="checkbox" class="checkbox" >${item.title}</li>`;
    }
    addEventOnChangeToCheckBox(element, callback, item) {
        element.addEventListener("change", () => {
            callback(item)
        });
    }
    addEventOnClickToDeleteBottom(element, callback, item) {
        element.addEventListener("click", () => { 
            callback(item)
        });
    }

}