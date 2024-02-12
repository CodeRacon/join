let currentPriority;

function setPriority(prio) {
  currentPriority = prio;
}

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
function showContactsToAssign() {
  let content = document.getElementById("labels");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    content.innerHTML += `
      <div class="single-contact">
        <label for="option${i}" class="label-layout">
          <input
            type="checkbox"
            class="custom-checkbox"
            id="option${i}"
            value="${element}"
          />
          ${element["name"]}
        </label>
        <br />
        ${createContactInitials(element)}
      </div>`;
  }
}

function createContactInitials(element) {
  const initials = element.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return `
      <div 
      class="initialsCyrcle"
          style="background-color: ${element.color}">
          ${initials}
    </div>
    `;
}
