export function escapeSpecialChars(str) {
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&guot;")
    .replace(/'/g, "&#039;");
}

/**
 * HTML文字列からHTMｌ要素を作成して返す
 * @param {string} html
 */
export function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstElementChild;
}

/**
 * HTML文字列からDOM　Nodeを作成して返すタグ関数
 * @return {Element}
 */
export function element(strings, ...values) {
    // console.log(strings);
    // console.log(values);
    const htmlString = strings.reduce((previousValue, currentValue, currentIndex) => {
        const value = values[currentIndex -1];
        if (typeof value === "string") {
            return previousValue + escapeSpecialChars(value) + currentValue; 
        } else {
            return result + String(value) + currentValue;
        }
    });
    return htmlToElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書き
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function render(bodyElement, containerElement) {
    // containerElementのない編みを空
    containerElement.innerHTML = "";
    // containerElementの直下にbodyElementを追加
    containerElement.appendChild(bodyElement);
}






