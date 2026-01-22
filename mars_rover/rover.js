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
    const years = Array.from({ length: 27 }, (_, i) => 2026 - i);
    yearSelect.innerHTML = years
        .map(y => `<option value="${y}">${y}</option>`)
        .join("");

    const monthSelect = getElement("#month");
    monthSelect.innerHTML = "";
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    monthSelect.innerHTML = months
        .map(m => `<option value="${m}">${m}</option>`)
        .join("");

    const daySelect = getElement("#date");
    daySelect.innerHTML = "";
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    daySelect.innerHTML = days
        .map(d => `<option value="${d}">${d}</option>`)
        .join("");

    const cameraSelect = getElement("#camera");
    cameraSelect.innerHTML = "";
    const cameraList = roverData.cameras;
    cameraSelect.innerHTML = cameraList
        .map(c => `<option value="${c.name}">${c.name}</option>`)
        .join("");
};

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(domain);
    const roverData = await response.json();
    const roverSelect = getElement("#rover");
    const roverList = await roverData.rovers;
    roverSelect.innerHTML = roverList
        .map(r => `<option value="${r.name}">${r.name}</option>`)
        .join("");

    displayRover(roverList[0]);

    getElement("#rover").addEventListener("change", async (evt) => {
        const selectedRover = roverSelect.value;
        const selectedData = roverList.find(rover => rover.name === selectedRover);
        displayRover(selectedData);
    });

    getElement("#view").addEventListener("click", async () => {
        const requestURL = `${domain}/${roverSelect.value}/photos/?earth_date=${getElement("#year").value}-${getElement("#month").value}-${getElement("#date").value}&camera=${getElement("#camera").value}`;
        const response = await fetch(requestURL);
        const imageData = await response.json();
        const displayDiv = getElement("#display");
        displayDiv.innerHTML = "";
        displayDiv.innerHTML = imageData.photos
            .map(p => `<img src="${p.img_src}">`)
            .join("");
    });
});