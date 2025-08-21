// sab se pehley hum currency ka API use karey ge
const BaseUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// then hum dropdowns ko populate karey ge os k liye on ko access kar liya
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const errorMsg = document.querySelector(".error-msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

// then inhi k opar loop lagaye ge
for (let select of dropdowns) {
  // apni country list ko access karey ge or osko print karey ge
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "From" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currcode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 0) {
    errorMsg.style.display = "block";
    amount.style.border = "2px solid red";
    return;
  } else {
    errorMsg.style.display = "none";
    amount.style.border = "1px solid lightgray";
  }
  const URL = `${BaseUrl}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = Math.round(amtVal * rate);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
