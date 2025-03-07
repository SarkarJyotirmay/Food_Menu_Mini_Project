const menu = document.querySelectorAll("input");
const orderButton = document.querySelector("button");
const foodContainer = document.querySelector(".food-container");

const imageBasePath = "./assets/";
const orderSound = document.getElementById("ordered");
const deliveredSound = document.getElementById("delivered");
const orders = [];

orderButton.addEventListener("click", () => {
    // play order sound
  orderSound.currentTime = 0;
  orderSound.play();
//   check which orders are selected and show them
  checkOrder();
});

//! Check order
function checkOrder() {
  // looping over menu > check if any item is selected
  menu.forEach(async (item) => {
    if (item.checked) {
      // create and resolve a promise that fetch and show data
      const myPromise = new Promise((resolve, reject) => {
        const randomTimer = Math.floor(Math.random() * 5000);
        setTimeout(() => {
          resolve({
            message: "Successfull",
            item: `${item.value}`,
            orderId: randomTimer,
          });
          reject(
            "Sorry for the inconviniance, We could not executred your ordder!"
          );
        }, randomTimer);
      });

      //   resolve the promise
      const result = await myPromise;
      console.log(result);
      //   orders.push(result);
      // create and append order div from resolved object
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item-div");
      const image = document.createElement("img");
      const orderId = document.createElement("p");
      orderId.classList.add("order-id");

      image.src = imageBasePath + item.value + ".jpg";
      orderId.innerText = "Order Id : " + result.orderId;

      itemDiv.append(image, orderId);
      foodContainer.append(itemDiv);
// play delivered sound
      deliveredSound.currentTime = 0;
      deliveredSound.play();
    }
  });
}

/* Logic : 
When some one click on the order >
First check whether he has checked any checkbox by looping over the nodeList. >
If any box has been checked/selected then create a promise and resolve the promise >
Create a item div from the object returned by the resolved promise >
Append that div to food-conatainer div.
*/ 
