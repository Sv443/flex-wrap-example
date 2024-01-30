async function generate() {
  const container = document.querySelector(".container");

  const itemAmountValue = Number(document.querySelector("#itemAmount")?.value);
  const itemWidthValue = Number(document.querySelector("#itemWidth")?.value);
  const itemHeightValue = Number(document.querySelector("#itemHeight")?.value);
  // Set default values if NaN
  const itemAmount = isNaN(itemAmountValue) ? 12 : itemAmountValue;
  const itemWidth = isNaN(itemWidthValue) ? 200 : itemWidthValue;
  const itemHeight = isNaN(itemHeightValue) ? 480 : itemHeightValue;

  // The promises will finish at different times so the order of items is always different.
  // This was done to speed up the loading times for this specific example.
  // Open the inspector in the browser and look at the items' classes to see what I'm talking about.
  // 
  // For this example, this doesn't matter, but you probably want to uncomment the "await"
  // inside the for loop, so the items are created sequentially in your real project.
  for(let i = 0; i < itemAmount; i++) {
    /* await */ new Promise(async () => {
      // resolve URL one by one so all images are different
      const src = (await fetch(`https://picsum.photos/${itemWidth}/${itemHeight}`)).url;

      const item = document.createElement("div");
      item.classList.add("item", `item-${i}`);
      // Setting innerHTML can lead to XSS attacks! But for this locally run example it's fine.
      item.innerHTML = `<img src="${src}" />`;

      container.appendChild(item);
    });
  }
}

// Generate items initially and on every button press
document.addEventListener("DOMContentLoaded", async () => {
  generate();

  const btn = document.querySelector("#generate");
  btn.addEventListener("click", () => {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    generate();
  });
});
