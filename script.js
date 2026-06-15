
let images = [];
let currentIndex = 0;

const gallery = document.getElementById("gallery");

const categories = ["nature", "architecture", "abstract"];

// CREATE 60 IMAGES (TRUE MASONRY STYLE)
for (let i = 1; i <= 60; i++) {

    const category = categories[i % 3];

    const div = document.createElement("div");
    div.classList.add("item", category);

    const img = document.createElement("img");

    // random natural sizes → no empty space problem
    const width = Math.random() > 0.5 ? 800 : 1200;
    const height = Math.random() > 0.5 ? 1200 : 800;

    img.src = `https://picsum.photos/${width}/${height}?random=${i}`;
    img.onclick = () => openImage(img.src);

    div.appendChild(img);
    gallery.appendChild(div);
}

// collect images
window.onload = function () {
    images = Array.from(document.querySelectorAll(".item img"));
};

// open lightbox
function openImage(src) {
    currentIndex = images.findIndex(img => img.src === src);
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = src;
}

// close lightbox
function closeImage() {
    document.getElementById("lightbox").style.display = "none";
}

// next
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// prev
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// keyboard support
document.addEventListener("keydown", function (e) {
    const lightbox = document.getElementById("lightbox");

    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextImage();
        else if (e.key === "ArrowLeft") prevImage();
        else if (e.key === "Escape") closeImage();
    }
});

// FILTER SYSTEM
function filterImages(category) {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        if (category === "all") {
            item.style.display = "block";
        } else {
            item.style.display = item.classList.contains(category)
                ? "block"
                : "none";
        }
    });
}