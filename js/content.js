chrome.runtime.onMessage.addListener(
	function(request) {
		// console.log(sender.tab ? 
		// 	"from a content script: " + sender.tab.url : 
		// 	"from the extenstion");
		if (request.greeting == "latin") {
			console.log("trasnletirating to Latin...");
			$("p").each(function () {
			replaceToLatin($(this));
		});
		} else if (request.greeting == "cyrillic") {
			console.log("trasnletirating to Cyrillic...");
			$("p").each(function () {
				replaceToCyrillic($(this));
		});	
		}
	})

var p = document.getElementsByTagName('p');
// console.log(p);
// $("p").each(function () {
// 			replaceToLatin($(this));
// 		});


function replaceToLatin(obj) {
	var $letter = {'Ы': 'S', 'ы':'s', '&':'Ye','~':'ye','А':'A', 'Б':'B', 'Д':'D', 'Э':'E', 'Е':'E', 'Ф':'F', 'Г':'G', 'Ҳ':'H', 'И':'I', 'Ж':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Қ':'Q', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'В':'V', 'Х':'X', 'Й':'Y', 'З':'Z', 'Ў':'Oʻ', 'Ғ':'Gʻ', 'Ш':'Sh', 'Ч':'Ch', 'Ё':'Yo', 'Ю':'Yu', 'Я':'Ya', 'Ц':'Ts', 'а':'a', 'б':'b', 'д':'d', 'э':'e', 'е':'e', 'ф':'f', 'г':'g', 'ҳ':'h', 'и':'i', 'ж':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'қ':'q', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'в':'v', 'х':'x', 'й':'y', 'з':'z', 'ў':'oʻ', 'ғ':'gʻ', 'ш':'sh', 'ч':'ch', 'ъ':'ʼ', 'ё':'yo', 'ю':'yu', 'я':'ya', 'ц':'ts'};
	var $vowel = {'А':'', 'а':'', 'О':'','о':'','И':'','и':'','У':'','у':'','Э':'','э':'','Ў':'','ў':'','Е':'','е':'','Ё':'','ё':'','Ю':'','ю':'','Я':'','я':''};

    var string = obj.html(); // getting the text of the element
    //console.log(obj.html());
    if (string.length < 1) { //exiting function of string is empty
      return;
    }; 

        var temp = string[0]; // special trick for e and E and Ц и ц translation in case it's a first letter of the string
        if (temp == "е") {
          temp = "~";
        } else if  (temp == "Е") {
          temp = "&";
        }
        else if (temp == "Ц") {
          temp = "Ы";
        }

        else if (temp == "ц") {
          temp = 'ы';
        };

        string = temp.concat(string.substring(1, string.length));
        
        string = string.replace(/ е/g, " ~");
        string = string.replace(/ Е/g, " &");
        string = string.replace(/ Ц/g, " Ы");
        string = string.replace(/ ц/g, " ы");
        //string = string.replace(/<\\*\w+>/g, "");
        //string = string.replace("<br>", "****");
        //string = string.replace("<\br>", "****" );
        
        var text = "";
        var tempLetter = "";

        //console.log(string);  
    for (i = 0; i < string.length; i++) {
      tempLetter = string[i];

      if (tempLetter in $letter) {

        // checking for e in the middle of the word and vowel before
        if (i>0 && string[i-1] in $vowel) {

          if (tempLetter=="е") {
            tempLetter = "~";
            console.log("found e");
          }

          else if (tempLetter == "Е") {
            tempLetter = "&";
            console.log("found E");
          }
        }

        // checking for ц in the middle of the word and not vowel before
        else if (i > 0 && !(string[i-1] in $vowel)) {
          if (tempLetter == "ц") {
            tempLetter = "с";
            console.log("found c")
          }

          else if (tempLetter == "Ц") {
            tempLetter = "С";
            console.log("found C")
          }
        }
      text += $letter[tempLetter];
        
      } else {
          text += tempLetter
        };

    };

    return(obj.html(text));
  };

function replaceToCyrillic(obj) {
  var $letter = {'A':'А', 'B':'Б', 'D':'Д', 'E':'Э', 'E':'Е', 'F':'Ф', 'G':'Г', 'H':'Ҳ', 'I':'И', 'J':'Ж', 'K':'К', 'L':'Л', 'M':'М', 'N':'Н', 'O':'О', 'P':'П', 'Q':'Қ', 'R':'Р', 'S':'С', 'T':'Т', 'U':'У', 'V':'В', 'X':'Х', 'Y':'Й', 'Z':'З', 'Oʻ':'Ў', 'Gʻ':'Ғ', 'Sh':'Ш', 'Ch':'Ч', 'Ye':'Е', 'Yo':'Ё', 'Yu':'Ю', 'Ya':'Я', 'Ts':'Ц', 'a':'а', 'b':'б', 'd':'д', 'e':'э', 'e':'е', 'f':'ф', 'g':'г', 'h':'ҳ', 'i':'и', 'j':'ж', 'k':'к', 'l':'л', 'm':'м', 'n':'н', 'o':'о', 'p':'п', 'q':'қ', 'r':'р', 's':'с', 't':'т', 'u':'у', 'v':'в', 'x':'х', 'y':'й', 'z':'з', 'oʻ':'ў', 'gʻ':'ғ', 'sh':'ш', 'ch':'ч', 'ʼ':'ъ', 'ye':'е', 'yo':'ё', 'yu':'ю', 'ya':'я', 'ts':'ц'};
  var $vowel = {'А':'', 'а':'', 'О':'','о':'','И':'','и':'','У':'','у':'','Э':'','э':'','Ў':'','ў':'','Е':'','е':'','Ё':'','ё':'','Ю':'','ю':'','Я':'','я':''};

    console.log("here we are!");
    var string = obj.html(); // getting the text of the element
    //console.log(obj.html());
    if (string.length < 1) { //exiting function of string is empty
      return;
    }; 

        var temp = string[0]; // special trick for e and E and Ц и ц translation in case it's a first letter of the string
        if (temp == "е") {
          temp = "~";
        } else if  (temp == "Е") {
          temp = "&";
        }
        else if (temp == "Ц") {
          temp = "Ы";
        }

        else if (temp == "ц") {
          temp = 'ы';
        };

        string = temp.concat(string.substring(1, string.length));
        
        string = string.replace(/ е/g, " ~");
        string = string.replace(/ Е/g, " &");
        string = string.replace(/ Ц/g, " Ы");
        string = string.replace(/ ц/g, " ы");
        //string = string.replace(/<\\*\w+>/g, "");
        //string = string.replace("<br>", "****");
        //string = string.replace("<\br>", "****" );
        
        var text = "";
        var tempLetter = "";

        //console.log(string);  
    for (i = 0; i < string.length; i++) {
      tempLetter = string[i];

      if (tempLetter in $letter) {

        // checking for e in the middle of the word and vowel before
        if (i>0 && string[i-1] in $vowel) {

          if (tempLetter=="е") {
            tempLetter = "~";
            console.log("found e");
          }

          else if (tempLetter == "Е") {
            tempLetter = "&";
            console.log("found E");
          }
        }

        // checking for ц in the middle of the word and not vowel before
        else if (i > 0 && !(string[i-1] in $vowel)) {
          if (tempLetter == "ц") {
            tempLetter = "с";
            console.log("found c")
          }

          else if (tempLetter == "Ц") {
            tempLetter = "С";
            console.log("found C")
          }
        }
      text += $letter[tempLetter];
        
      } else {
          text += tempLetter
        };

    };

    return(obj.html(text));
  };


// chrome.extension.onMessage.addListener(
//  function(request, sender) {
//   alert("Contentscript has received a message from from background script: '" + request.message + "'");
//   });