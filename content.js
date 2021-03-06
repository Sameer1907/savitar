const generateBadge = (color, label, value) => {
    let badgeDiv = document.createElement("div");
    badgeDiv.setAttribute("id", label);
    badgeDiv.style = `display: inline-block;
                      border-radius: .75em;
                      font-family: 'Dejavu Sans','Arial';
                      margin-right: 20px;`;
    let titleDiv = document.createElement("div");
    titleDiv.style = `border-top-left-radius: .25em; 
                      border-bottom-left-radius: .25em;
                      background: #555555;
                      display: inline-block;
                      float: left;
                      text-transform: lowercase;
                      color: #FFF;
                      text-shadow: 0px 0.1em 0px rgba(0, 0, 0, 0.5);
                      margin: 0;
                      border: 0;
                      padding-left: 10px;
                      padding-right: 10px;`
    titleDiv.innerHTML = label;
    let valueDiv = document.createElement("div");
    valueDiv.style = `background: ${color};
                      border-top-right-radius: .25em;
                      border-bottom-right-radius: .25em;
                      display: inline-block;
                      float: left;
                      text-transform: lowercase;
                      color: #FFF;
                      text-shadow: 0px 0.1em 0px rgba(0, 0, 0, 0.5);
                      margin: 0;
                      border: 0;
                      padding-left: 10px;
                      padding-right: 10px;`;
    valueDiv.innerHTML = value;
    badgeDiv.appendChild(titleDiv);
    badgeDiv.appendChild(valueDiv);
    return badgeDiv;
}

const getExperience = (text) => {
    return "3 years";
}

const getSponsorship = (text) => {
    return "Yes";
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const text = document.getElementsByTagName("article")[0].textContent;

let parentDiv = getElementByXpath("/html/body/div[8]/div[3]/div/div[1]/div[1]/div/div[1]/div/section/div[2]/div[1]");

const experienceBadge = generateBadge("#44cc11", "experience", getExperience(text));
const sponsorshipBadge = generateBadge("#00aadd", "sponsorship", getSponsorship(text));
const badges = {
    experience: experienceBadge,
    sponsorship: sponsorshipBadge
};

chrome.runtime.onMessage.addListener(newMessage);

function newMessage(message, sender, sendResponse){
    resetBadges(message);
}

function resetBadges(message){
    for(const badge in message){
        const badgeElement = document.getElementById(badge);
        if(message[badge]["checked"]){
            if(!badgeElement){
                parentDiv.appendChild(badges[badge]);
            }
        }
        else{
            if(badgeElement){
                badgeElement.remove();
            }
        }
    }
}
