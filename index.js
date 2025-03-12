// ^ ---------- Load Categories ------------

const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
};


// ! ---------- Display loadCategories -----------
const  displayCategories = (categories) => {

    // get category container
    const categoriesContainer = document.getElementById('categories-container');

    for( let cat of categories ){
        const category = cat.category;

        const div = document.createElement('div');
        div.innerHTML = `
            <button class="bg-[#25252520] rounded-md text-lg px-5 py-1 font-medium cursor-pointer hover:bg-[#FF1F3D] hover:text-white delay-150">${category}</button>
        `
        categoriesContainer.appendChild(div)
    }

};

// & ------- ⁡⁣⁣⁢Call Function⁡ ---------
loadCategories();