const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const randomValue = Math.round(Math.random() * 100)
        randomValue % 2 ? reject(randomValue) : resolve(randomValue)
    }, 3000)
})

myPromise
    .then((result) => {
        console.log("Завершено успешно. Сгенерированное число —", result)
    })
    .catch((error) => {
        console.log("Завершено с ошибкой. Сгенерированное число —", error)
    })
    .finally(() => console.log("The end"))