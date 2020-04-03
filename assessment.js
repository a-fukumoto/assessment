'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// Shift+Alf+f でコードのフォーマットができる
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(useName) {
    // 線文字のコード番号を取得して総和をとる
    let sumofcharcode = 0;
    // letで宣言した変数はスコープ内でしか使えない
    for (let i = 0; i < useName.length; i++) {
        sumofcharcode += useName.charCodeAt(i);
    }
    const index = sumofcharcode % answers.length;
    let result = answers[index];

    // /\{userName\}/g　は正規表現
    result = result.replace(/\{userName\}/g, useName);

    return result;
}

/**指定した要素のChildを全削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) =>{
    if(event.key === 'Enter'){
        // assessmentButtonのonclickプロパティに要れている関数を呼び出す
        assessmentButton.onclick();
    }
}

/**無名関数という書き方
 * オブジェクトassessmentButtonのonclickプロパティに関数を設定
 * こうすることでボタンがクリックされたときに関数の中身が動く
 */
//assessmentButton.onclick = function(){
assessmentButton.onclick = () => { // アロー関数による指定
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return; // 入力が空の場合は何もしないで終了
    }
    console.log(userName);

    // 診断結果エリアの中身を削除（あれば）
    removeAllChildren(resultDivided);

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成（ボタン押した後に出てくるようにする）
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたの良いところ')
        + '&ref_src=twsrc%5Etfw';

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたの良いところ';

    tweetDivided.appendChild(anchor);
}
