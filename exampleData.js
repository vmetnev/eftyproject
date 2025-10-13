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
  {
    link: {
      yes: true,
      text: "Click to proceed",
      href: "www.vedomosti.ru",
    },
  },
];

let page2 = [
  { title: "Another Page" },
  { content1: "This is another example page." },
  { content2: "Feel free to explore." },
  { content3: "Enjoy coding!" },
];

let page3 = [
  { title: "Final Page" },
  { content1: "This is the final example page." },
  { content2: "Thank you for visiting." },
  { content3: "Goodbye!" },
];

pages.content.push(page1);
pages.content.push(page2);
pages.content.push(page3);

for (let i = 0; i < pages.content[0].length; i++) {
  console.log(pages.content[0][i]);
}
