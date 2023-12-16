btn.addEventListener("click", () => {
  let address = document.getElementById("link").value;
  let comment = document.getElementById("description").value;
  all_links.push({ address: address, comment: comment });
  browser.storage.local.set("links_saved", JSON.stringify(all_links));
  console.log(browser.storage.local);
  displayOnPage();
});
