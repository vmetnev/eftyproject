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
