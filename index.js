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

// https://openapi.programming-hero.com/api/phero-tube/category/1001

// ^ ---------- Load Videos ------------
const loadVideo = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
};
// ^ ---------- Load Categories Videos ------------
const loadCategoriesVideo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayVideos(data.category))
};

// ! ---------- Display load Categories -----------
const  displayCategories = (categories) => {

    // get category container
    const categoriesContainer = document.getElementById('categories-container');

    for( let cat of categories ){
        const category = cat.category;
        // const catId = cat.category_id;
        // console.log(catId);
        
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="loadCategoriesVideo(${cat.category_id})" class="bg-[#25252520] rounded-md text-lg px-5 py-1 font-medium cursor-pointer hover:bg-[#FF1F3D] hover:text-white delay-150">${category}</button>
        `
        categoriesContainer.appendChild(div)
    }

};
// ! ---------- Display Load Videos ---------------
const displayVideos = (videos) => {
    // Get video Section
    const videoSection = document.getElementById('video-section');
    videoSection.innerHTML = '';
    
    videos.forEach((video)=>{
        const div = document.createElement('div');
        // console.log(video.authors[0].verified);
        const checkVerified = very => {
            if (very === true) {
                return "block"
            }
            else{
                return "hidden"
            }
        };
        // console.log(video.authors[0].verified);
        div.innerHTML = `
            <div class="bg-base-100">
                    <figure class="relative">
                        <img class="w-full h-[200px] object-cover rounded-lg"
                        src="${video.thumbnail}" />
                        <span class="text-white bg-black p-1 text-sm rounded-sm absolute right-4 bottom-4">3hrs 56 min ago</span>
                    </figure>
                    <div class="flex gap-2 py-5">
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                              <img src="${video.authors[0].profile_picture}" />
                            </div>
                          </div>
                        <div>
                            <h2 class="text-base font-bold text-black">${video.title}</h2>
                            <p class="text-gray-500 font-medium flex gap-3 my-1">${video.authors[0].profile_name}<img class="${checkVerified(video.authors[0].verified)} w-5 h-5 object-cover" src="assets/verify.png" alt=""></p>
                            <p class="text-gray-500">${video.others.views} views</p>
                        </div>
                    </div>
            </div>
        `
        videoSection.appendChild(div)
    });
};


// & ------- ⁡⁣⁣⁢Call Function⁡ ---------
loadCategories();
// loadVideo();