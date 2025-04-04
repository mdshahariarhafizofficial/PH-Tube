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
    .then(data => {
        document.getElementById('all-btn').classList.add('active');
        displayVideos(data.videos)
    })
};
// Load Video Details
const loadVideoDetails = (video_id) =>{    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
    .then( res => res.json())
    .then( data => showVideoDetails(data))
};
// Show Video Details
const showVideoDetails = (details) => {
    // console.log(details);
    document.getElementById('my_modal_4').showModal()
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = 
    `
        <div class = 'border-1 border-red-300 p-5 rounded-xl'>
            <div class='flex justify-between items-center mb-4'>
                <div class = 'flex items-center gap-3'>
                    <img class ='w-[40px] h-[40px] rounded-full' src="${details.video.authors[0].profile_picture}" /> 
                    <p class="flex items-center gap-2 text-base text-gray-500 font-semibold my-4">${details.video.authors[0].profile_name} ${details.video.authors[0].verified? `<img class="w-5 h-5 object-cover" src='assets/verify.png' alt="">`: ''}</p>
                </div>
                <div class='flex gap-2 items-center'>
                    <img class='w-8' src='assets/eye.png'>
                    <p>Views: ${details.video.others.views}</p>
                </div>
            </div>
            <img  class="w-full rounded-lg" src="${details.video.thumbnail}" />
            <h1 class="text-3xl font-bold my-4">${details.video.title}</h1>
            <p>${details.video.description}</p>
        </div>
    `
}

// ^----------- REmove Active class----------------
const removeActiveClass = () =>{
    const activeClass = document.getElementsByClassName('active');
    for( let btn of activeClass ){
        btn.classList.remove('active')
    }
};
// ^ ---------- Load Categories Videos ------------
const loadCategoriesVideo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const activeCat = document.getElementById(`btn-${id}`)
        activeCat.classList.add('active');
        displayVideos(data.category)
    }) 
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
            <button id="btn-${cat.category_id}" onclick="loadCategoriesVideo(${cat.category_id})" class="bg-[#25252520] rounded-md text-lg px-5 py-1 font-medium cursor-pointer hover:bg-[#FF1F3D] hover:text-white delay-150">${category}</button>
        `
        categoriesContainer.appendChild(div)
    }

};
// ! ---------- Display Load Videos ---------------
const displayVideos = (videos) => {

    // Get video Section
    const videoSection = document.getElementById('video-section');
    videoSection.innerHTML = '';
    if (videos.length === 0) {
        videoSection.innerHTML = `
                <div class="col-span-full py-20 flex flex-col justify-center items-center">
                    <img class="w-40" src="assets/Icon.png" alt="">
                    <h2 class="my-5 text-3xl font-bold text-center">Oops!! Sorry, There is no content here</h2>
                </div>
        `
        return
    }

    videos.forEach((video)=>{
        const div = document.createElement('div');
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
                    <button onclick=loadVideoDetails('${video.video_id}') class="btn border-1 border-[#FF1F3D] text-[#FF1F3D]">Video Details....</button>
            </div>
        `
        videoSection.appendChild(div)
    });
};


// & ------- ⁡⁣⁣⁢Call Function⁡ ---------
loadCategories();
loadVideo();