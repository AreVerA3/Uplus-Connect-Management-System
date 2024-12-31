// Get the query parameter value
        const urlParams = new URLSearchParams(window.location.search);
        const imgSrc = urlParams.get('img');

        // Update the image source
        if (imgSrc) {
            document.getElementById('viewer-image').src = imgSrc;
        }