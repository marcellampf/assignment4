const apiKey = 'xgSVz3loCJiX2wLFfuuivFAtxoYCE9Cm2m5xUoA3';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayApod(data);
            loadPreviousDaysImages();
        })
        .catch(error => {
            console.error('Error fetching the APOD data:', error);
            document.getElementById('apodContent').innerHTML = `<p>Failed to retrieve data.</p>`;
        });
});

function displayApod(data) {
    const mainImage = document.getElementById('mainImage');
    const mainDescription = document.getElementById('mainDescription');
    const mainDate = document.getElementById('mainDate');
    const mainLink = document.getElementById('mainLink');
    const mainTitle = document.getElementById('mainTitle');

    mainImage.src = data.url;
    mainImage.alt = data.title;
    mainDescription.textContent = data.explanation;
    mainDate.textContent = data.date;
    mainLink.href = data.url;
    mainLink.textContent = 'View Original';
    mainTitle.textContent = data.title;
}

function loadPreviousDaysImages() {
    const galleryList = document.getElementById('galleryList');
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
        const previousDate = new Date();
        previousDate.setDate(today.getDate() - i);
        const formattedDate = previousDate.toISOString().split('T')[0];
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedDate}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.media_type === 'image') {
                    const imgElement = document.createElement('img');
                    imgElement.src = data.url;
                    imgElement.alt = data.title;
                    imgElement.onclick = () => {
                        const mainImage = document.getElementById('mainImage');
                        const mainDescription = document.getElementById('mainDescription');
                        const mainDate = document.getElementById('mainDate');
                        const mainLink = document.getElementById('mainLink');
                        const mainTitle = document.getElementById('mainTitle');

                        mainImage.src = data.url;
                        mainImage.alt = data.title;
                        mainDescription.textContent = data.explanation;
                        mainDate.textContent = data.date;
                        mainLink.href = data.url;
                        mainTitle.textContent = data.title;
                    };
                    galleryList.appendChild(imgElement);
                }
            })
            .catch(error => {
                console.error(`Error fetching data for ${formattedDate}:`, error);
            });
    }
}

