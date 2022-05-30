//* файлы который работают с сервером обычно ложат их в отделную папку services

const postDate = async (url, data) => {
    // postDate посылает запрос на сервер
    // получает какой то ответ
    const res = await fetch(url, {
        // await ждет пока fetch придет ответ, тем самым не выдает преджевременную ошибку
        //fetch("adress") and obj 2 of them is obligatory{mehtod and body}
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    });

    return await res.json();
    // convert into normal file
};
// ф будет отвечать за постинг данных, то есть когда мы будем отправлять данные на сервер
// выводим функционал общение с сервером в отдельную функцию



const getResource = async (url) => {
    // postDate посылает запрос на сервер
    // получает какой то ответ
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Coudn't fetch${url}, status: ${res.status}`);
        // обьект ошибки, который передает текс ошибки
        //и чтоб выкинуть текст ошибки есть метод throw
    }
    return await res.json();
    // convert into normal file
};

export {postDate};
export {getResource};