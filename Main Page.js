document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    }

    // Change image every 3 seconds
    setInterval(showNextImage, 3000);

    // Change image on click
    images.forEach((img) => {
        img.addEventListener('click', showNextImage);
    });
});