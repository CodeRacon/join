/**
 * Array of hex color values used for contacts and task-categories
 */
let hexColors = [
  "#0038FF",
  "#00BEE8",
  "#1FD7C1",
  "#6E52FF",
  "#9747FF",
  "#A6C063",
  "#FC71FF",
  "#FF4646",
  "#FF5EB3",
  "#FF745E",
  "#FF7A00",
  "#FFA35E",
  "#FFBB2B",
  "#FFC701",
  "#FFE62B",
  "#00FF9D",
  "#00B155",
  "#85FF00",
  "#FFD100",
  "#FFC300",
  "#FF00E1",
  "#FF0091",
  "#0077FF",
  "#00A6FF",
  "#FF6A00",
  "#FF8A00",
  "#FF0038",
  "#FF005E",
  "#006AFF",
  "#00B8AB",
];

startData = [
  
];

/**
 * Stores the start data in local storage.
 */
async function storeStartData() {
  await setItem("startData", JSON.stringify(startData));
}
 async function getData(){
  await getItem('startData');
 }