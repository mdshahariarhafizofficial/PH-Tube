// ^ ---------- Load Categories ------------

const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
};

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

// ^ ---------- Load Videos ------------
const loadVideo = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
};

// ! ---------- Display load Categories -----------
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
// ! ---------- Display Load Videos ---------------
const displayVideos = (videos) => {
    // Get video Section
    const videoSection = document.getElementById('video-section');

    videos.forEach((video)=>{
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img
                    src="${video.thumbnail}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        videoSection.appendChild(div)
    });
};

// *----- Video time - 9.47 min --------------------------------

// & ------- ⁡⁣⁣⁢Call Function⁡ ---------
loadCategories();
loadVideo();