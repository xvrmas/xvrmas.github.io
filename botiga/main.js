

const btnCart = document.querySelector('.contenidor-icona');
const btnContenidor = document.querySelector('.contenidor-cart-productes');

btnCart.addEventListener('click', () => {
    btnContenidor.classList.toggle('hiden-cart');
})


//--------------------------------------------------------------------------


const cartInfo = document.querySelector('.info-cart-product');
const compraInfo = document.querySelector('.cart-product');
const btn = document.querySelectorAll('.add-cart');

//llista dels contenidors de producte

const productList = document.querySelector('.cart');
let totProductes = []

let valorTotal = document.querySelector('.total-pagar');
let countProduct = document.querySelector('#contador-productes');

//funcio per eliminar articles de la cistella

compraInfo.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('creu-tancar'))
    {
        const product = e.target.parentElement;
        const title = product.querySelector('.nom-producte-cistella').textContent;

        totProductes = totProductes.filter(
            product => product.title !== title
        );
        showHtml();
    }
});

const showHtml = () => 
{
    let totalCistella = 0;
    let total = 0;


    compraInfo.innerHTML = '';

    if (totProductes.length == 0)
    {
            const emptyMessage = document.createElement('p');
            emptyMessage.classList.add('cart-empty');
            emptyMessage.textContent = 'Cistella buida';
            compraInfo.append(emptyMessage);
            totalCistella = 0;
            countProduct.innerHTML = `${totalCistella}`;
            valorTotal.innerHTML = `${total}€`;
    }
    else
    {

    
    
        totProductes.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product')
            containerProduct.innerHTML =
                                `<div class="info-cart-product">
                                    <span class="quantitat-producte-cistella">${product.quantity}</span>
                                    <span id="nom-producte" class="nom-producte-cistella">${product.title}</span>
                                    <span class="preu-producte-cistella">${parseInt(product.price) * product.quantity}€</span>
                                    <span class="creu-tancar">X</span>
                                </div>`
            .append(containerProduct);
    
            total = total + parseInt(product.price) * product.quantity;
            totalCistella = totalCistella + product.quantity;
    
        });
        valorTotal.innerHTML = `${total}€`;
        countProduct.innerHTML = `${totalCistella}`;
    }

    

}



btn.forEach(boto => {


    boto.addEventListener('click', (e) => {

        if (e.target.classList.contains('add-cart')) {
            const product = e.target.parentElement;

            const infoProduct =
            {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: product.querySelector('p').textContent,
            };
            const exits = totProductes.some( product => product.title === infoProduct.title);
            if (exits)
            {
                const products = totProductes.map(product =>
                {
                    if (product.title === infoProduct.title)
                    {
                        product.quantity++;
                        return product;
                    }
                    else
                    {
                        return product;
                    }
                })
                totProductes = [...products];
            }
            else
            {
                totProductes = [ ...totProductes, infoProduct];
            }
            showHtml()
        }
    })
});
