// understandingSizes.js
function printMainDimensions() {
  const mainElement = document.querySelector("body");
  if (mainElement) {
    const rect = mainElement.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(mainElement);

    console.log("=== Main Element Dimensions ===");
    console.log("Client Width:", mainElement.clientWidth + "px");
    console.log("Client Height:", mainElement.clientHeight + "px");
    console.log("Offset Width:", mainElement.offsetWidth + "px");
    console.log("Offset Height:", mainElement.offsetHeight + "px");
    console.log("Bounding Rect Width:", rect.width + "px");
    console.log("Bounding Rect Height:", rect.height + "px");
    console.log("Computed Style Width:", computedStyle.width);
    console.log("Computed Style Height:", computedStyle.height);
    console.log("================================");
  } else {
    console.log("Main element not found");
  }
}

// Wait for DOM to be fully loaded, then print dimensions
document.addEventListener("DOMContentLoaded", printMainDimensions);

// Also print dimensions when window is resized
window.addEventListener("resize", printMainDimensions);
