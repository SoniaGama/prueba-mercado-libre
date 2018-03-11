const button = document.getElementById('prueba');
const search = document.getElementById('search');

const containerProducts = document.getElementById('search-products');


// button.addEventListener('click', getJson);

window.addEventListener('load', () => {
    // button.addEventListener('click', getJson);
    search.addEventListener('keyup', getJson);
})

// https://api.mercadolibre.com/
// https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/categories
// https://api.mercadolibre.com/categories/id

// busqueda https://api.mercadolibre.com/sites/MLM/search?q=query
// busqueda en tiendas ofiiales https://api.mercadolibre.com/sites/MLM/search?category={Category_id}&official_store_id=all
// items carrusel https://api.mercadolibre.com/sites/MLM/hot_items/search?limit=10&category={Category_id}
// descripcion productos https://api.mercadolibre.com//items/{Item_id}/description	


getJson = (e) => {
    const searchText = search.value;
    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${searchText}`)
    .then(response => {
        // console.log(response);        
        response.json().then(json => {
            getDataJson(json)            
        })     
    })
    .catch(error => {
        console.log(error);        
    });
}

getDataJson = json => {   
    const productsResults = json.results;     
    containerProducts.innerHTML = '';  
    productsResults.forEach((element, index) => { 
            
        if(index < 10){
            // let ProductId = element.id;
            // let productTitle = element.title;
            // let productImage = element.thumbnail;
            // let productPrice = element.price;
            // let productReviews = element.reviews.rating_average;
            // let originalLink = element.permalink;
            // let originState = element.address.state_name;            
            
            let output = `
                
                <section>
                    <img src="${element.thumbnail}" alt="${element.title}">
                    <h5>${element.title}</h5>
                    <p>Precio ${element.price}$ mxn</p>
                    <p>Rating: ${element.reviews.rating_average}</p>                    
                    <p>Lugar de origen: ${element.address.state_name}</p>                               
                </section> 
                <hr>           
            `
            containerProducts.insertAdjacentHTML('beforeend', output);  
                     
        }        
    });
}

