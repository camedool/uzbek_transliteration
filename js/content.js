const LETTER_TO_LATIN = {"Щ":"Sh", "щ":"sh", "ы":"i","Ы":"I", "ь":"'", "Ь":"'", 'А':'A', 'Б':'B', 'Д':'D', 'Э':'E', 'Е':'E', 'Ф':'F', 'Г':'G', 'Ҳ':'H', 'И':'I', 'Ж':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Қ':'Q', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'В':'V', 'Х':'X', 'Й':'Y', 'З':'Z', 'Ў':'Oʻ', 'Ғ':'Gʻ', 'Ш':'Sh', 'Ч':'Ch', 'Ё':'Yo', 'Ю':'Yu', 'Я':'Ya', 'Ц':'Ts', 'а':'a', 'б':'b', 'д':'d', 'э':'e', 'е':'e', 'ф':'f', 'г':'g', 'ҳ':'h', 'и':'i', 'ж':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'қ':'q', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'в':'v', 'х':'x', 'й':'y', 'з':'z', 'ў':'oʻ', 'ғ':'gʻ', 'ш':'sh', 'ч':'ch', 'ъ':'ʼ', 'ё':'yo', 'ю':'yu', 'я':'ya', 'ц':'ts'}; 
const VOWEL = ['А','а', 'О','о', 'И','и', 'У','у', 'Э','э', 'Ў','ў', 'Е','е', 'Ё','ё', 'Ю','ю', 'Я','я'];
const LETTER_TO_CYRILLIC = {'A':'А', 'B':'Б', 'D':'Д', 'E':'Е', 'F':'Ф', 'G':'Г', 'H':'Ҳ', 'I':'И', 'J':'Ж', 'K':'К', 'L':'Л', 'M':'М', 'N':'Н', 'O':'О', 'P':'П', 'Q':'Қ', 'R':'Р', 'S':'С', 'T':'Т', 'U':'У', 'V':'В', 'X':'Х', 'Y':'Й', 'Z':'З', 'a':'а', 'b':'б', 'd':'д', 'e':'е', 'f':'ф', 'g':'г', 'h':'ҳ', 'i':'и', 'j':'ж', 'k':'к', 'l':'л', 'm':'м', 'n':'н', 'o':'о', 'p':'п', 'q':'қ', 'r':'р', 's':'с', 't':'т', 'u':'у', 'v':'в', 'x':'х', 'y':'й', 'z':'з', 'oʻ':'ў', 'gʻ':'ғ', 'ʼ':'ъ', "'":'ъ', '`':'ъ', 'yo':'ё', 'yu':'ю', 'ya':'я', 'ts':'ц'};

const twoStringLatinLettersNotUsed = { 'Ts':'Ц', 'ts':'ц'};
// const LETTER_TO_LATIN = {"Щ":"Sh", "щ":"sh", "ы":"i","Ы":"I", "ь":"'", "Ь":"'", '#': 'S', '|':'s', '`':'Ye','~':'ye','А':'A', 'Б':'B', 'Д':'D', 'Э':'E', 'Е':'E', 'Ф':'F', 'Г':'G', 'Ҳ':'H', 'И':'I', 'Ж':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Қ':'Q', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'В':'V', 'Х':'X', 'Й':'Y', 'З':'Z', 'Ў':'Oʻ', 'Ғ':'Gʻ', 'Ш':'Sh', 'Ч':'Ch', 'Ё':'Yo', 'Ю':'Yu', 'Я':'Ya', 'Ц':'Ts', 'а':'a', 'б':'b', 'д':'d', 'э':'e', 'е':'e', 'ф':'f', 'г':'g', 'ҳ':'h', 'и':'i', 'ж':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'қ':'q', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'в':'v', 'х':'x', 'й':'y', 'з':'z', 'ў':'oʻ', 'ғ':'gʻ', 'ш':'sh', 'ч':'ch', 'ъ':'ʼ', 'ё':'yo', 'ю':'yu', 'я':'ya', 'ц':'ts'}; 
// const VOWEL = {'А':'', 'а':'', 'О':'','о':'','И':'','и':'','У':'','у':'','Э':'','э':'','Ў':'','ў':'','Е':'','е':'','Ё':'','ё':'','Ю':'','ю':'','Я':'','я':''};
// const LETTER_TO_CYRILLIC = {'A':'А', 'B':'Б', 'D':'Д', 'E':'Э', 'E':'Е', 'F':'Ф', 'G':'Ғ', 'H':'Ҳ', 'I':'И', 'J':'Ж', 'K':'К', 'L':'Л', 'M':'М', 'N':'Н', 'O':'О', 'P':'П', 'Q':'Қ', 'R':'Р', 'S':'С', 'T':'Т', 'U':'У', 'V':'В', 'X':'Х', 'Y':'Й', 'Z':'З', 'Oʻ':'Ў', 'Gʻ':'Ғ', 'Sh':'Ш', 'Ch':'Ч', 'Ye':'Е', 'Yo':'Ё', 'Yu':'Ю', 'Ya':'Я', 'Ts':'Ц', 'a':'а', 'b':'б', 'd':'д', 'e':'э', 'e':'е', 'f':'ф', 'g':'ғ', 'h':'ҳ', 'i':'и', 'j':'ж', 'k':'к', 'l':'л', 'm':'м', 'n':'н', 'o':'о', 'p':'п', 'q':'қ', 'r':'р', 's':'с', 't':'т', 'u':'у', 'v':'в', 'x':'х', 'y':'й', 'z':'з', 'oʻ':'ў', 'gʻ':'ғ', 'sh':'ш', 'ch':'ч', 'ʼ':'ъ', 'ye':'е', 'yo':'ё', 'yu':'ю', 'ya':'я', 'ts':'ц'};

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
    
    // special trick for (e, E, Ц, ц) transliterated differently  in case it's a first letter of the string
    switch (string[0]) {
        case "е":
            string = string.replace("е", "ye");
            break;
        case "Е":
            string = string.replace("Е", "Ye");
            break;
        case "Ц":
            string = string.replace("Ц",  "S");
            break;
        case "ц":
            string = string.replace("ц", "s");
            break;
    }
   
    string = string.replace(/ е/g, " ye");
    string = string.replace(/ Е/g, " Ye");
    string = string.replace(/ Ц/g, " S");
    string = string.replace(/ ц/g, " s");
    
    let result = ""; // transliterated string
    for (let i = 0; i < string.length; i++) {
        let tempLetter = string[i];

        // checking for e in the middle of the word and vowel before
        if (i>0 && VOWEL.includes(string[i-1])) {

            if (tempLetter=="е") 
                tempLetter = "ye";

            else if (tempLetter == "Е") 
                tempLetter = "Ye";
        }

        // checking for ц in the middle of the word and not vowel before
        else if (i > 0 && !(VOWEL.includes(string[i-1]))) {
            if (tempLetter == "ц") 
                tempLetter = "s";
            
            else if (tempLetter == "Ц") 
                tempLetter = "S";
        }

        // replace the tempLetter from the dictionary, if not found just concatenate
        if (tempLetter in LETTER_TO_LATIN)
            result += LETTER_TO_LATIN[tempLetter];   
        else 
            result += tempLetter
    };
    return result;
}

function convertToCyrillic(string) {
    if (!string) 
        return;

    // special trick for (e and E) transliterated differently  in case it's a first letter of the string
    switch (string[0]) {
        case "e":
            string  = string.replace("e", "э");
            break;
        case "E":
            string = string.replace("E", "Э");
            break;
    }
    
    // special trick for (sh, ch, and ye, yo, ya) transliterated differently  in case it's a first letter of the string
    switch (string.substring(0, 2)) {
        case "ye":
            string[0] = "е";
            break;
        case "Ye":
            string[0] = "Е";
            break;
}

    string = string.replace(/ е/g, " э");
    string = string.replace(/ Е/g, " Э");
    string = string.replace(/ye/g, "е");
    string = string.replace(/Ye/g, "Е");
    string = string.replace(/sh/g, "ш");
    string = string.replace(/Sh/g, "Ш");
    string = string.replace(/ch/g, "ч");
    string = string.replace(/ch/g, "Ч");
    string = string.replace(/O‘/g, "Ў");
    string = string.replace(/O'/g, "Ў");
    string = string.replace(/O`/g, "Ў");
    string = string.replace(/Оʻ/g, "Ў");
    
    string = string.replace(/G‘/g, "Ғ");
    string = string.replace(/G'/g, "Ғ");
    string = string.replace(/G`/g, "Ғ");
    string = string.replace(/Yo/g, "Ё");
    string = string.replace(/Yu/g, "Ю");
    string = string.replace(/Ya/g, "Я");

    string = string.replace(/o‘/g, "ў");
    string = string.replace(/o'/g, "ў")
    string = string.replace(/o`/g, "ў");
    string = string.replace(/оʻ/g, "ў");
    
    string = string.replace(/g‘/g, "ғ");
    string = string.replace(/g'/g, "ғ");
    string = string.replace(/g`/g, "ғ");

    string = string.replace(/yo/g, "ё");
    string = string.replace(/yu/g, "ю");
    string = string.replace(/ya/g, "я");
  
    let result = "";
    for (let i = 0; i < string.length; i++) {
        let tempLetter = string[i];
        
        if (tempLetter in LETTER_TO_CYRILLIC) 
            result += LETTER_TO_CYRILLIC[tempLetter];
        
        else 
            result += tempLetter
    };
    
    return result;
}