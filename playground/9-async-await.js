const add = (a, b) => {
    return new Promise((resolve, resject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

const dowork = async () => {
    const result  = await add(1,99);
    const sum2 = await add(result, 50)
    const sum3 = await add(sum2, 3)
    return sum3
}

dowork().then((result)=>{
    console.log('result', result)
}).catch(e=>{
    console.log('err',e)
})