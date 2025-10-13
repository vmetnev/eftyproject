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

// Screen rotation detection
class RotationDetector {
  constructor() {
    this.currentOrientation = this.getOrientation();
    this.init();
  }

  init() {
    // Listen for orientation change events
    window.addEventListener("orientationchange", () => {
      // Delay to allow for orientation change to complete
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });

    // Also listen for resize events as backup (some devices use resize instead of orientationchange)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.handleOrientationChange();
      }, 200);
    });
  }

  getOrientation() {
    // Check screen orientation
    if (screen.orientation) {
      return screen.orientation.angle;
    } else if (window.orientation !== undefined) {
      return window.orientation;
    } else {
      // Fallback: determine by window dimensions
      return window.innerWidth > window.innerHeight ? 90 : 0;
    }
  }

  getOrientationName(angle) {
    switch (angle) {
      case 0:
        return "Portrait";
      case 90:
        return "Landscape Left";
      case -90:
      case 270:
        return "Landscape Right";
      case 180:
        return "Portrait Upside Down";
      default:
        return window.innerWidth > window.innerHeight
          ? "Landscape"
          : "Portrait";
    }
  }

  handleOrientationChange() {
    const newOrientation = this.getOrientation();
    const orientationName = this.getOrientationName(newOrientation);

    // Only trigger if orientation actually changed
    if (newOrientation !== this.currentOrientation) {
      console.log(
        `Screen rotated from ${this.getOrientationName(
          this.currentOrientation
        )} to ${orientationName}`
      );

      this.onRotationChange(orientationName, newOrientation);
      this.currentOrientation = newOrientation;
    }
  }

  onRotationChange(orientationName, angle) {
    // Get appropriate emoji for orientation
    let emoji;
    switch (orientationName) {
      case "Portrait":
        emoji = "📱";
        break;
      case "Landscape Left":
        emoji = "📱↪️";
        break;
      case "Landscape Right":
        emoji = "📱↩️";
        break;
      case "Portrait Upside Down":
        emoji = "🙃📱";
        break;
      default:
        emoji = "🔄";
    }

    this.showRotationMessage(`Rotated to ${orientationName}! ${emoji}`);
  }

  showRotationMessage(message) {
    // Create a temporary message element (same style as swipe messages)
    const messageEl = document.createElement("div");
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 100, 200, 0.9);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-size: 18px;
      z-index: 1000;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(messageEl);

    // Remove message after 1.5 seconds (slightly longer for rotation messages)
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 1500);
  }
}

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
    this.element.addEventListener(
      "touchstart",
      (e) => this.handleTouchStart(e),
      { passive: false }
    );
    this.element.addEventListener("touchmove", (e) => this.handleTouchMove(e), {
      passive: false,
    });
    this.element.addEventListener("touchend", (e) => this.handleTouchEnd(e), {
      passive: false,
    });

    // Prevent default scrolling behavior on the main element
    this.element.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
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
      if (
        Math.abs(this.distY) >= this.threshold &&
        Math.abs(this.distX) <= this.restraint
      ) {
        if (this.distY < 0) {
          // Swipe up
          this.onSwipeUp();
        } else {
          // Swipe down
          this.onSwipeDown();
        }
      }
      // Check for horizontal swipes
      else if (
        Math.abs(this.distX) >= this.threshold &&
        Math.abs(this.distY) <= this.restraint
      ) {
        if (this.distX < 0) {
          // Swipe left
          this.onSwipeLeft();
        } else {
          // Swipe right
          this.onSwipeRight();
        }
      }
    }
  }

  onSwipeUp() {
    console.log("Swipe UP detected!");
    // Add your swipe up functionality here
    this.showSwipeMessage("Swiped UP! 👆");
  }

  onSwipeDown() {
    console.log("Swipe DOWN detected!");
    // Add your swipe down functionality here
    this.showSwipeMessage("Swiped DOWN! 👇");
  }

  onSwipeLeft() {
    console.log("Swipe LEFT detected!");
    // Add your swipe left functionality here
    this.showSwipeMessage("Swiped LEFT! 👈");
  }

  onSwipeRight() {
    console.log("Swipe RIGHT detected!");
    // Add your swipe right functionality here
    this.showSwipeMessage("Swiped RIGHT! 👉");
  }

  showSwipeMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement("div");
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

// Initialize swipe detection and rotation detection
document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector(".main");
  if (mainElement) {
    const swipeDetector = new SwipeDetector(mainElement);
    console.log("Swipe detection initialized on .main element");
  }

  // Initialize rotation detection
  const rotationDetector = new RotationDetector();
  console.log("Rotation detection initialized");
});
