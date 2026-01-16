const video = document.getElementById("bgVideo");
// const loader = document.getElementById("loader");

// function hideLoader() {
//     loader.classList.add("hide");
// }

// video.addEventListener("canplaythrough", hideLoader);
// window.addEventListener("load", () => {
//     setTimeout(hideLoader, 2000);
// });

// const video = document.getElementById('bgVideo');
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    // Only reload if we cross the 768px/769px breakpoint
    if ((lastWidth <= 768 && currentWidth > 768) || (lastWidth > 768 && currentWidth <= 768)) {
        video.load(); // Forces the browser to re-evaluate the <source> tags
        video.play();
    }
    lastWidth = currentWidth;
});

document.getElementById("regForm").onsubmit = e => {
    e.preventDefault();
    msg.innerText = "Registration successful!";
};

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".side-menu a");

let targetSection = null;

/* OPEN MENU */
menuBtn.onclick = () => {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
};

/* CLOSE MENU (QUEUE REVERSE) */
function closeMenu(callback) {
    sideMenu.classList.add("closing");

    setTimeout(() => {
        sideMenu.classList.remove("active", "closing");
        overlay.classList.remove("active");
        if (callback) callback();
    }, 500); // must match animation timing
}

/* TOUCH OUTSIDE → CLOSE */
overlay.onclick = () => {
    closeMenu();
};

/* CLICK MENU OPTION */
menuLinks.forEach(link => {
    link.onclick = e => {
        e.preventDefault();
        targetSection = document.querySelector(link.getAttribute("href"));

        closeMenu(() => {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    };
});


document.getElementById("logo").addEventListener("click", () => {
    document.location.replace('/');
});

// EVENTS SECTION JS
var eventscard = '';
var eventList = [
    'Headshot Arena',
    'Game Fest Royale',
    'Dancing Feet',
    'Khatron Ke Khiladi',
    'Nukkad - Aarohan',
    'Xumberance',
    'Celegance Got Talent',
    'Treasure Hunt',
    'Splitsvilla',
    'Wah Wah Kya Baat Hai',
    'Sargam',
    'Bollywood Deewane'
];

for (let index = 0; index < eventList.length; index++) {
    const element = eventList[index];
    eventscard += `<div class="card" style="background-image: url('./2 X 4 Poster/1 (${index+1}).png');">${eventList[index]}</div>`;
}

document.getElementById("cards").innerHTML = eventscard;