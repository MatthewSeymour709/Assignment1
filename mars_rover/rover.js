"use strict";
const getElement = selector => document.querySelector(selector);

const domain = "https://rovers.nebulum.one/api/v1/rovers";

const displayRover = (roverData) => {
    getElement("#options").classList.remove("hide");

    getElement("#status").textContent = roverData.status;
    getElement("#photos").textContent = roverData.total_photos;
    getElement("#landing").textContent = roverData.landing_date;
    getElement("#max").textContent = roverData.max_date;

    const yearSelect = getElement("#year");
    yearSelect.innerHTML = "";
    for(let i=2026; i>1999; i--) {
        let option = document.createElement("option")
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    const monthSelect = getElement("#month");
    monthSelect.innerHTML = "";
    for(let i=1; i<=12; i++) {
        let option = document.createElement("option")
        option.value = i;
        option.textContent = i;
        monthSelect.appendChild(option);
    }

    const daySelect = getElement("#date");
    daySelect.innerHTML = "";
    for(let i=1; i<=31; i++) {
        let option = document.createElement("option")
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    const cameraSelect = getElement("#camera");

    const cameraData = roverData.cameras;

    cameraData.forEach(camera => {
        let option = document.createElement("option")
        option.value = camera.name;
        option.textContent = camera.name;
        cameraSelect.appendChild(option);
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    // get rover data
    const response = await fetch(domain);
    // console.log(response); check to see the response promise
    const roverData = await response.json();

    const roverSelect = getElement("#rover");

    const roverList = roverData.rovers;

    roverList.forEach(rover => {
        let roverOption = document.createElement("option");
        roverOption.value = rover.name;
        roverOption.textContent = rover.name;
        roverSelect.appendChild(roverOption);

    })

    displayRover(roverList[0]);

    // change event handler for Rover drop-down
    getElement("#rover").addEventListener("change", async (evt) => {
        const selectedRover = roverSelect.value;

        const selectedData = roverList.find(rover => rover.name === selectedRover);

        displayRover(selectedData);
    });

    // click event handler for View button
    getElement("#view").addEventListener("click", async () => {

        const requestURL = `${domain}/${roverSelect.value}/photos/?earth_date=${getElement("#year").value}-${getElement("#month").value}-${getElement("#date").value}&camera=${getElement("#camera").value}`
        const imageRequest = await fetch(requestURL);
        const imageData = await imageRequest.json();

        const displayDiv = getElement("#display")
        displayDiv.innerHTML = "";
        imageData.photos.forEach(photo => {
            let image = document.createElement("img");
            image.src = photo.img_src;
            displayDiv.appendChild(image);
        })
    });
});