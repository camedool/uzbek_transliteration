const LETTER_TO_LATIN = {"Щ":"Sh", "щ":"sh", "ы":"i","Ы":"I", "ь":"'", "Ь":"'", '#': 'S', '|':'s', '`':'Ye','~':'ye','А':'A', 'Б':'B', 'Д':'D', 'Э':'E', 'Е':'E', 'Ф':'F', 'Г':'G', 'Ҳ':'H', 'И':'I', 'Ж':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Қ':'Q', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'В':'V', 'Х':'X', 'Й':'Y', 'З':'Z', 'Ў':'Oʻ', 'Ғ':'Gʻ', 'Ш':'Sh', 'Ч':'Ch', 'Ё':'Yo', 'Ю':'Yu', 'Я':'Ya', 'Ц':'Ts', 'а':'a', 'б':'b', 'д':'d', 'э':'e', 'е':'e', 'ф':'f', 'г':'g', 'ҳ':'h', 'и':'i', 'ж':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'қ':'q', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'в':'v', 'х':'x', 'й':'y', 'з':'z', 'ў':'oʻ', 'ғ':'gʻ', 'ш':'sh', 'ч':'ch', 'ъ':'ʼ', 'ё':'yo', 'ю':'yu', 'я':'ya', 'ц':'ts'}; 
const VOWEL = {'А':'', 'а':'', 'О':'','о':'','И':'','и':'','У':'','у':'','Э':'','э':'','Ў':'','ў':'','Е':'','е':'','Ё':'','ё':'','Ю':'','ю':'','Я':'','я':''};
const LETTER_TO_CYRILLIC = {'A':'А', 'B':'Б', 'D':'Д', 'E':'Э', 'E':'Е', 'F':'Ф', 'G':'Г', 'H':'Ҳ', 'I':'И', 'J':'Ж', 'K':'К', 'L':'Л', 'M':'М', 'N':'Н', 'O':'О', 'P':'П', 'Q':'Қ', 'R':'Р', 'S':'С', 'T':'Т', 'U':'У', 'V':'В', 'X':'Х', 'Y':'Й', 'Z':'З', 'Oʻ':'Ў', 'Gʻ':'Ғ', 'Sh':'Ш', 'Ch':'Ч', 'Ye':'Е', 'Yo':'Ё', 'Yu':'Ю', 'Ya':'Я', 'Ts':'Ц', 'a':'а', 'b':'б', 'd':'д', 'e':'э', 'e':'е', 'f':'ф', 'g':'г', 'h':'ҳ', 'i':'и', 'j':'ж', 'k':'к', 'l':'л', 'm':'м', 'n':'н', 'o':'о', 'p':'п', 'q':'қ', 'r':'р', 's':'с', 't':'т', 'u':'у', 'v':'в', 'x':'х', 'y':'й', 'z':'з', 'oʻ':'ў', 'gʻ':'ғ', 'sh':'ш', 'ch':'ч', 'ʼ':'ъ', 'ye':'е', 'yo':'ё', 'yu':'ю', 'ya':'я', 'ts':'ц'};

const htmlElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'strong', 'i', 'li', 'code', 'blockquote', 'label', 'div']

// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let conversionFn;       
    if (request.language == "latin")
        conversionFn =  convertToLatin;
            
    else if (request.language == "cyrillic") 
        conversionFn =  convertToCyrillic;

    htmlElements.forEach(elem => {
        document.querySelectorAll(elem).forEach(item => {
            transliterate(conversionFn, item);
        })    
    });

    sendResponse({success: true});
}); 

function transliterate(conversionFn, element) {
    if (element.children && element.children.length != 0)
        element.childNodes.forEach(node => {
            if (node.children && node.children.length !=0) {
                transliterate(conversionFn, node);
            }
            else if (node.nodeType == 3) // this is node.TEXT_NODE
                node.textContent = conversionFn(node.textContent);
        })
    else
        element.textContent = conversionFn(element.textContent);
}

function convertToLatin(string) {
    if (!string) 
        return;
      
    let temp = string[0]; // special trick for e and E and Ц и ц translation in case it's a first letter of the string
    if (temp == "е") 
        temp = "~";
    else if  (temp == "Е") 
        temp = "&";
    else if (temp == "Ц") 
        temp = "Ы";
    else if (temp == "ц") 
        temp = 'ы';

    string = temp.concat(string.substring(1, string.length));
    
    string = string.replace(/ е/g, " ~");
    string = string.replace(/ Е/g, " `");
    string = string.replace(/ Ц/g, " #");
    string = string.replace(/ ц/g, " |");
    //string = string.replace(/<\\*\w+>/g, "");
    //string = string.replace("<br>", "****");
    //string = string.replace("<\br>", "****" );
    
    let text = "";
    let tempLetter = "";

    for (let i = 0; i < string.length; i++) {
        tempLetter = string[i];

        if (tempLetter in LETTER_TO_LATIN) {

            // checking for e in the middle of the word and vowel before
            if (i>0 && string[i-1] in VOWEL) {

                if (tempLetter=="е") 
                    tempLetter = "~";

                else if (tempLetter == "Е") 
                    tempLetter = "&";
            }

            // checking for ц in the middle of the word and not vowel before
            else if (i > 0 && !(string[i-1] in VOWEL)) {
                if (tempLetter == "ц") 
                    tempLetter = "с";
                
                else if (tempLetter == "Ц") 
                    tempLetter = "С";
            }
            text += LETTER_TO_LATIN[tempLetter];   
        } 
        else 
            text += tempLetter
    };
    return text;
  }

  function convertToCyrillic(string) {
    if (!string) 
        return;
      
    let temp = string[0]; // special trick for e and E and Ц и ц translation in case it's a first letter of the string
    if (temp == "е")
        temp = "~";
    else if  (temp == "Е") 
        temp = "&";
    else if (temp == "Ц") 
        temp = "Ы";
    else if (temp == "ц") 
        temp = 'ы';

    string = temp.concat(string.substring(1, string.length));
    
    string = string.replace(/ е/g, " ~");
    string = string.replace(/ Е/g, " &");
    string = string.replace(/ Ц/g, " Ы");
    string = string.replace(/ ц/g, " ы");
    //string = string.replace(/<\\*\w+>/g, "");
    //string = string.replace("<br>", "****");
    //string = string.replace("<\br>", "****" );
    
    let text = "";
    let tempLetter = "";

    for (let i = 0; i < string.length; i++) {

        tempLetter = string[i];

        if (tempLetter in LETTER_TO_CYRILLIC) {
            // checking for e in the middle of the word and vowel before
            if (i>0 && string[i-1] in VOWEL) {
                if (tempLetter=="е") 
                    tempLetter = "~";
                
                else if (tempLetter == "Е") 
                    tempLetter = "&";
            }

            // checking for ц in the middle of the word and not vowel before
            else if (i > 0 && !(string[i-1] in VOWEL)) {
                if (tempLetter == "ц") 
                    tempLetter = "с";

                else if (tempLetter == "Ц") 
                    tempLetter = "С";
            }
        text += LETTER_TO_CYRILLIC[tempLetter];
        } 
        else 
            text += tempLetter
        };
    
    return text;
  }