const inputbtn = document.getElementById("input-btn");
const deletebtn = document.getElementById("delete-btn");
const tabbtn = document.getElementById("tab-btn");
let myleads = [];
const input = document.getElementById("input");
const ulEl = document.getElementById("ulEl");

// localStorage.setItem("myleads","www.google.com");
// console.log(localStorage.getItem("myleads"));
// localStorage.clear();

// myleads = JSON.parse(myleads);
// myleads.push("Pratap");
// myleads = JSON.stringify(myleads);
// console.log(typeof myleads);

// const tabs = [
//   {url: "https://www.youtube.com"}
// ];

tabbtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myleads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myleads));
    render(myleads);
  });
});

deletebtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myleads = [];
  render(myleads);
  // console.log("Double Clicked");
});

let leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"));
// console.log(leadsfromlocalstorage);
if (leadsfromlocalstorage) {
  myleads = leadsfromlocalstorage;
  render(myleads);
}

inputbtn.addEventListener("click", function () {
  myleads.push(input.value);
  localStorage.setItem("myleads", JSON.stringify(myleads));
  render(myleads);
  input.value = "";
  // console.log(localStorage.getItem("myleads"));
  // console.log(myleads)
});

function render(leads) {
  let listitems = "";
  for (let i = 0; i < leads.length; i++) {
    listitems += `
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`;
    // const li = document.createElement("li");
    // li.textContent = myleads[i];
    // ulEl.append(li);
  }
  ulEl.innerHTML = listitems;
}