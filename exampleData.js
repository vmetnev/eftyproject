let pages = {
  content: [],
  fadeInOut: true,
  fadingTime: 1000,
  sequential: true,
  callObject: {
    yes: true,
    type: "phone",
    number: "+1234567890",
  },
};

let page1 = [
  { title: "Example Page" },
  { content1: "This is an example page." },
  { content2: "It contains sample data." },
  { content3: "You can modify it as needed." },
  //   {
  //     link: {
  //       yes: true,
  //       text: "Click to proceed",
  //       href: "www.vedomosti.ru",
  //     },
  //   },
];

let page2 = [
  { title: "Another Page" },
  { content1: "This is another example page." },
  { content2: "Feel free to explore." },
  { content3: "Enjoy coding!" },
];

let page3 = {};
page3.title = "Final Page";
page3.content = [
  "This is the final example page.",
  "Thank you for visiting.",
  "Goodbye!",
];

pages.content.push(page1);
pages.content.push(page2);
pages.content.push(page3);

target = document.querySelector(".content");

let elements = [];

if (page3.title) {
  let el = document.createElement("h3");
  el.textContent = page3.title;
  el.classList.add("title");
  elements.push(el);
}

for (let i = 0; i < page3.content.length; i++) {
  let el = document.createElement("p");
  el.textContent = page3.content[i];
  el.classList.add("paragraph");
  elements.push(el);
}

console.log(elements);
elements.forEach((el) => document.querySelector(".content").appendChild(el));

// Fix viewport height for mobile devices (especially iPhone)
function setMobileViewportHeight() {
  // Get the actual viewport height
  const vh = window.innerHeight * 0.01;
  // Set CSS custom property
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // Debug logging for mobile
  console.log("Viewport height set:", window.innerHeight, "vh unit:", vh);
}

// Set initial height
document.addEventListener("DOMContentLoaded", setMobileViewportHeight);

// Update on resize and orientation change with debouncing
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setMobileViewportHeight, 100);
});

window.addEventListener("orientationchange", () => {
  setTimeout(setMobileViewportHeight, 500); // Delay for orientation change
});

// Force initial calculation
setMobileViewportHeight();

// Swipe detection for iPhone and mobile devices
class SwipeDetector {
  constructor(element) {
    this.element = element;
    this.startY = 0;
    this.startX = 0;
    this.distY = 0;
    this.distX = 0;
    this.threshold = 50; // Minimum distance for a swipe
    this.restraint = 100; // Maximum distance perpendicular to swipe direction
    this.allowedTime = 300; // Maximum time for swipe
    this.startTime = 0;
    
    this.init();
  }
  
  init() {
    // Add touch event listeners
    this.element.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    this.element.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.element.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
    
    // Prevent default scrolling behavior on the main element
    this.element.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }
  
  handleTouchStart(e) {
    const touch = e.changedTouches[0];
    this.startY = touch.pageY;
    this.startX = touch.pageX;
    this.startTime = new Date().getTime();
  }
  
  handleTouchMove(e) {
    // Prevent default to avoid scrolling
    e.preventDefault();
  }
  
  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    this.distY = touch.pageY - this.startY;
    this.distX = touch.pageX - this.startX;
    const elapsedTime = new Date().getTime() - this.startTime;
    
    // Check if it's a valid swipe
    if (elapsedTime <= this.allowedTime) {
      // Check for vertical swipes
      if (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint) {
        if (this.distY < 0) {
          // Swipe up
          this.onSwipeUp();
        } else {
          // Swipe down
          this.onSwipeDown();
        }
      }
    }
  }
  
  onSwipeUp() {
    console.log('Swipe UP detected!');
    // Add your swipe up functionality here
    this.showSwipeMessage('Swiped UP! 👆');
  }
  
  onSwipeDown() {
    console.log('Swipe DOWN detected!');
    // Add your swipe down functionality here
    this.showSwipeMessage('Swiped DOWN! 👇');
  }
  
  showSwipeMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-size: 18px;
      z-index: 1000;
      pointer-events: none;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove message after 1 second
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 1000);
  }
}

// Initialize swipe detection on the main element
document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('.main');
  if (mainElement) {
    const swipeDetector = new SwipeDetector(mainElement);
    console.log('Swipe detection initialized on .main element');
  }
});
