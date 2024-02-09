function openAndCloseDropDownToAssign() {
  const dropdownContent = document.getElementById("dropdownContent");
  const img = document.getElementById("arrowImg");

  if (dropdownContent.style.display !== "block") {
    dropdownContent.style.display = "block";
    img.style.transform = "rotate(180deg)";
  } else {
    dropdownContent.style.display = "none";
    img.style.transform = "rotate(0deg)";
  }
}

// test um auf contacts von contact.js zuzugreifen
function test() {
  console.log(contacts);
}
