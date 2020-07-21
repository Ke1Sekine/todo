export class EventEmitter {
    constructor () {
        // 登録する[イベント名, Set（リスナー:listener関数）]を管理するMapを用意
        this._listeners = new Map();
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成しリスナー関数を登録
        // 指定したイベントが存在しない場合はSetを用意
        if (!this._listeners.has(type)) {
            //重複不可（自動上書き）配列を用意
            this._listeners.set(type, new Set())
        }
        const listenerSet = this._listeners.get(type);
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチ
     * (指定されたイベント名に登録済みのすべてのコールバック関数を呼び出す)
     * @param {string} type　イベント名
     */
    emit (type) {
        const listenerSet = this._listeners.get(type);
        // イベントリスナーが存在しない場合は何もしない
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type　イベント名
     * @param {Function} listener　イベントリスナー
     */
    removeEventLister(type, listener) {
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(setListener => {
            if (setListener === listener) {
                listenerSet.delete(listener);
            }
        });
    }
}