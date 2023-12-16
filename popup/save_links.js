function getCurrentTabUrl(callback) {
  var queryInfo = { active: true, currentWindow: true };

  browser.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var tabInfo = {
      url: tab.url,
      title: tab.title,
    };
    callback(tabInfo);
  });
}

getCurrentTabUrl(function (tabInfo) {
  document.getElementById("link").value = tabInfo.url;
  document.getElementById("title").value = tabInfo.title;
});

var btn = document.getElementById("save");
var output_items = document.querySelector(".output_list");

var all_links = {};

async function run() {
  let storageData = await browser.storage.local.get("links_saved");
  let links_saved = storageData["links_saved"] || {};
  all_links = links_saved;
  displayOnPage();
}

btn.addEventListener("click", async () => {
  let address = document.getElementById("link").value;
  let comment = document.getElementById("description").value;
  let title = document.getElementById("title").value;
  all_links[title] = { address: address, title: title, comment: comment };
  await browser.storage.local.set({ links_saved: all_links });
  displayOnPage();
  document.getElementById("description").value = "";
});

async function displayOnPage() {
  let storageData = await browser.storage.local.get("links_saved");
  let links_saved = storageData["links_saved"] || {};
  output_items.innerHTML = "";
  Object.values(links_saved).forEach((link) => {
    output_items.innerHTML += `<li>
      <p class="address"><a href="${link.address}">${link.title}</a></p>
      <p>${link.comment}</p>
      <p class="remove">remove</p> 
    </li>`;
  });

  var removeItems = document.querySelectorAll(".remove");

  removeItems.forEach((item, index) => {
    item.addEventListener("click", async () => {
      let updated_links = Object.values(links_saved);
      updated_links.splice(index, 1);
      all_links = updated_links;
      await browser.storage.local.set({ links_saved: all_links });
      displayOnPage();
    });
  });
}

run();
