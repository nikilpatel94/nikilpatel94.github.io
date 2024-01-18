
const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose");

// js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});

sidebarClose.addEventListener("click" , () =>{
    nav.classList.remove("active");
});

body.addEventListener("click" , e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});
function checkScreenSize() {
    const leftSection = document.getElementById("leftSection");
    const rightSection = document.getElementById("rightSection");
    const leftSection2 = document.getElementById("leftSection2");
    const rightSection2 = document.getElementById("rightSection2");
    if (window.innerWidth < 768) {
        leftSection.parentNode.insertBefore(rightSection, leftSection);
        leftSection2.parentNode.insertBefore(rightSection2, leftSection2);
    } else {
        leftSection.parentNode.insertBefore(leftSection, rightSection);
        leftSection2.parentNode.insertBefore(leftSection2, rightSection2);
    }
}


// window.addEventListener("resize", checkScreenSize);
// checkScreenSize();

document.addEventListener("DOMContentLoaded", function () {
    // This function will be executed when the DOM is fully loaded

    // Get the element with the ID 'loadingText'
    var loadingTextElement = document.getElementById("loadingText");

    // Generate the specified text
    var dynamicContent = "Hero Worship [5.11]\nData: I have often wished to be human. I study people carefully, in order to more closely approximate human behavior.\nTimothy: Why? We're smarter and stronger than humans, we can do more than they can.\nData: But I cannot take pride in my abilities. I cannot take pleasure in my accomplishments.\nTimothy: We never have to feel bad, either.\nData: I would gladly risk feeling bad at times, if it also meant that I could taste my dessert.";

    // Create a new paragraph element
    var paragraphElement = document.createElement("p");

    // Set the text content of the paragraph
    paragraphElement.textContent = dynamicContent;

    // Append the paragraph to the 'loadingText' element
    loadingTextElement.appendChild(paragraphElement);
});
