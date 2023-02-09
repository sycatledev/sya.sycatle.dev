export const LOADING_ICON = `<span class="h-10 w-10 absolute inset-0 block mx-auto my-auto rounded-full border-4 border-t-[#6fb463] animate-spin"></span>`;
export const TYPING_SPEED = 75;

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function renderReplyIcon() {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
  
    iconSvg.setAttribute('fill', 'currentColor');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('stroke', 'currentColor');
  
    iconPath.setAttribute(
      'd',
      'm19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6Z'
    );
    iconPath.setAttribute('stroke-width', '1');
  
    iconSvg.appendChild(iconPath);
  
    return iconSvg;
  }

export function uuid() {    
  var uuid = "", i, random;    

  for (i = 0; i < 32; i++) {      
      random = Math.random() * 16 | 0;        

      if (i == 8 || i == 12 || i == 16 || i == 20) {        
          uuid += "-";      
      }

      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);    
   }   

   return uuid;  
}

export async function typeMessage(node, message) {
  node.textContent = "";
  const characters = message.split(""); // Split the text string value and add it to an array: "123" => ["1","2","3"]
  node.classList.add("border-r-2");
  
  const interval = setInterval(()=>{
    if (!characters.length){ 
      node.classList.remove("border-r-2");
      return clearInterval(interval); // Stop the animation once we're out of characters.
    }
    node.textContent += characters.shift(); // Remove the first character from the array and append it to the text display element
  }, getRandomInt(TYPING_SPEED, TYPING_SPEED / 3));
}