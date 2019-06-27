const LETTER_TO_LATIN = {"Щ":"Sh", "щ":"sh", "ы":"i","Ы":"I", "ь":"'", "Ь":"'", 'А':'A', 'Б':'B', 'Д':'D', 'Э':'E', 'Е':'E', 'Ф':'F', 'Г':'G', 'Ҳ':'H', 'И':'I', 'Ж':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Қ':'Q', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'В':'V', 'Х':'X', 'Й':'Y', 'З':'Z', 'Ў':"O'", 'Ғ':"G'", 'Ш':'Sh', 'Ч':'Ch', 'Ё':'Yo', 'Ю':'Yu', 'Я':'Ya', 'Ц':'Ts', 'а':'a', 'б':'b', 'д':'d', 'э':'e', 'е':'e', 'ф':'f', 'г':'g', 'ҳ':'h', 'и':'i', 'ж':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'қ':'q', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'в':'v', 'х':'x', 'й':'y', 'з':'z', 'ў':"o'", 'ғ':"g'", 'ш':'sh', 'ч':'ch', 'ъ':"'", 'ё':'yo', 'ю':'yu', 'я':'ya', 'ц':'ts'}; 
const VOWEL = ['А','а', 'О','о', 'И','и', 'У','у', 'Э','э', 'Ў','ў', 'Е','е', 'Ё','ё', 'Ю','ю', 'Я','я'];
const LETTER_TO_CYRILLIC = {'A':'А', 'B':'Б', 'D':'Д', 'E':'Е', 'F':'Ф', 'G':'Г', 'H':'Ҳ', 'I':'И', 'J':'Ж', 'K':'К', 'L':'Л', 'M':'М', 'N':'Н', 'O':'О', 'P':'П', 'Q':'Қ', 'R':'Р', 'S':'С', 'T':'Т', 'U':'У', 'V':'В', 'X':'Х', "W":"В", 'Y':'Й', 'Z':'З', 'a':'а', 'b':'б', 'd':'д', 'e':'е', 'f':'ф', 'g':'г', 'h':'ҳ', 'i':'и', 'j':'ж', 'k':'к', 'l':'л', 'm':'м', 'n':'н', 'o':'о', 'p':'п', 'q':'қ', 'r':'р', 's':'с', 't':'т', 'u':'у', 'v':'в', 'x':'х', "w":"в", 'y':'й', 'z':'з', "ʻ":"ъ", 'ʼ':'ъ', "'":'ъ', '`':'ъ', 'yo':'ё', 'yu':'ю', 'ya':'я', 'ts':'ц', 'C':'К', 'c':'к' };

const twoStringLatinLettersNotUsed = { 'Ts':'Ц', 'ts':'ц'};
const htmlElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'strong', 'i', 'li', 'em', 'b', 'code', 'blockquote', 'label', 'div', "dd", "dt", "summary", "detail"]

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
    if (!string.match(/\p{Script=Cyrillic}/gu)) // if there are no cyrillic letters in the stirng, then just return original string
        return string;
    
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
    
    var replacer_e = replacerGenericLastLetter("ye");
    var replacer_E = replacerGenericLastLetter("Ye");
    var replacer_Ц = replacerGenericLastLetter("S");
    var replacer_ц = replacerGenericLastLetter("s");

    string = string.replace(/\P{Script=Cyrillic}е/gu, replacer_e); // matching the any non Cyrillic character and "e", and using unicode
    string = string.replace(/\P{Script=Cyrillic}Е/gu, replacer_E); // matching the any non Cyrillic character and "E", and using unicode
    string = string.replace(/\P{Script=Cyrillic}Ц/gu, replacer_Ц); // matching the any non Cyrillic character and "Ц", and using unicode
    string = string.replace(/\P{Script=Cyrillic}ц/gu, replacer_ц); // matching the any non Cyrillic character and "ц", and using unicode
    
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
    if (!string.match("[a-zA-Z']")) // if there are no latin letters in the string, then just return the original string
        return string;

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
    var replacer_E = replacerGenericLastLetter("Э"); // spec closure function to replace all words starting with e or E to э, Э
    var replacer_e = replacerGenericLastLetter("э");
    var replacer_c = replacerGenericFirstLetter("с"); 
    var replacer_C = replacerGenericFirstLetter("С");
    


    string = string.replace(/\WE/g, replacer_E);
    string = string.replace(/\Wе/g, replacer_e); 
    string = string.replace(/c[eyi]/g, replacer_c); // if latin c comes before "e y i" then it transliterates as C, on other cases as K
    string = string.replace(/C[eyi]/g, replacer_C); // if latin c comes before "e y i" then it transliterates as C, on other cases as K
    string = string.replace(/Ye/g, "Е");
    string = string.replace(/YE/g, "Е");
    string = string.replace(/ye/g, "е");
    string = string.replace(/Sh/g, "Ш");
    string = string.replace(/SH/g, "Ш");
    string = string.replace(/sh/g, "ш");
    string = string.replace(/Ch/g, "Ч");
    string = string.replace(/CH/g, "Ч");
    string = string.replace(/ch/g, "ч");

    string = string.replace(/O‘/g, "Ў");
    string = string.replace(/O'/g, "Ў");
    string = string.replace(/O`/g, "Ў");
    string = string.replace(/Oʻ/g, "Ў");
    string = string.replace(/Оʼ/g, "Ў");

    string = string.replace(/G‘/g, "Ғ");
    string = string.replace(/G'/g, "Ғ");
    string = string.replace(/G`/g, "Ғ");
    string = string.replace(/Gʼ/g, "Ғ");

    string = string.replace(/Yo/g, "Ё");
    string = string.replace(/YO/g, "Ё");
    string = string.replace(/Yu/g, "Ю");
    string = string.replace(/YU/g, "Ю");
    string = string.replace(/Ya/g, "Я");
    string = string.replace(/YA/g, "Я");

    string = string.replace(/o‘/g, "ў");
    string = string.replace(/o'/g, "ў")
    string = string.replace(/o`/g, "ў");
    string = string.replace(/oʻ/g, "ў");
    string = string.replace(/оʼ/g, "ў");   
    
    string = string.replace(/g‘/g, "ғ");
    string = string.replace(/g'/g, "ғ");
    string = string.replace(/g`/g, "ғ");
    string = string.replace(/gʼ/g, "ғ");

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

/**
 * Returns the replacer function that has a closure over the target string that should be inserted instead of matched string.
 * Replaces the last letter (or second letter) in matched string.
 */
function replacerGenericLastLetter(elem) {
    function replacer(str) {
        if (str && str.length === 2)
            return str[0] + elem;
        else if (str && str.length === 1)
            return elem;
        else
            console.warn(str); // remvoe this line after the debugging
    }

    return replacer;
}

/**
 * Returns the replacer function that has a closure over the target string that should be inserted instead of matched string.
 * Replaces the first letter in matched string.
 */
function replacerGenericFirstLetter(elem) {
    function replacer(str) {
        if (str && str.length === 2)
            return elem + str.substring(1);
        else if (str && str.length === 1)
            return elem;
        else
            console.warn(str); // remvoe this line after the debugging
    }

    return replacer;
}