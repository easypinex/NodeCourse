const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

const transation = ((type, { label, stock, salePrice = 5 }) => {
    console.log(type, label, stock, salePrice)
});

transation('order', product)