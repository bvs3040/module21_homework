const pageInput = document.querySelector('#pageInput');
const limitInput = document.querySelector('#limitInput');
const reqwestBtn = document.querySelector('#reqwest');
const message = document.querySelector('h3');
let picturelist = document.querySelector('ul');
let pictureField = document.querySelector('#pictureField');

// загрузка списка из localStorge

let picturelistJson = localStorage.getItem("myList");
let imgJson = localStorage.getItem("myImg");

if (picturelistJson) {
    message.innerText = "Ранее смотрели:";
    picturelist.innerHTML = JSON.parse(picturelistJson);
    pictureField.innerHTML = JSON.parse(imgJson);
}

// очистка поля ввода 

pageInput.addEventListener('click', () => pageInput.value = "")
limitInput.addEventListener('click', () => limitInput.value = "")

reqwestBtn.addEventListener('click', () => {

    // обработка данных с полей ввода

    const pageNumber = Math.round(Number(pageInput.value ? pageInput.value : 0))
    const limitNumber = Math.round(Number(limitInput.value ? limitInput.value : 0))
    message.innerText = "";
    picturelist.innerHTML = "";
    pictureField.innerHTML = "";

    // условие запроса

    if ((1 > pageNumber || pageNumber > 10 || isNaN(pageNumber)) && (1 <= limitNumber && limitNumber <= 10)) {
        message.innerText = 'Номер страницы вне диапазона от 1 до 10';
    }
    if ((1 > limitNumber || limitNumber > 10 || isNaN(limitNumber)) && (1 <= pageNumber && pageNumber <= 10)) {
        message.innerText = 'Лимит вне диапазона от 1 до 10';
    }
    if ((1 > limitNumber || limitNumber > 10 || isNaN(limitNumber)) && (1 > pageNumber || pageNumber > 10 || isNaN(pageNumber))) {
        message.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
    }
    if ((1 <= limitNumber && limitNumber <= 10) && (1 <= pageNumber && pageNumber <= 10)) {
        pictureReqwest();
    }

    // функция - запроса

    function pictureReqwest() {
        message.innerText = "Новый список:";
        fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limitNumber}`)
            .then((response) => {
                const result = response.json();
                return result;
            })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const newPicture = document.createElement("li");
                    const newPictureContent = document.createTextNode(`Автор: ${data[i].author}; адрес: `);

                    const newPictureLink = document.createElement("a");
                    const newPictureLinkContent = document.createTextNode(data[i].download_url);
                    newPictureLink.setAttribute("href", data[i].download_url)
                    newPictureLink.appendChild(newPictureLinkContent);

                    const newImage = document.createElement('img');
                    newImage.setAttribute("src", data[i].download_url);
                    newImage.setAttribute("alt", "picture");

                    newPicture.appendChild(newPictureContent);
                    newPicture.appendChild(newPictureLink);
                    picturelist.appendChild(newPicture);
                    pictureField.appendChild(newImage);
                }
                localStorage.setItem('myList', JSON.stringify(picturelist.innerHTML));
                localStorage.setItem('myImg', JSON.stringify(pictureField.innerHTML));
            })
            .catch(() => {})
    }
})