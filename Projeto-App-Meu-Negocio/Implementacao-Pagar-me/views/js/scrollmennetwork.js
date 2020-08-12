var ajaxValue
var urLocal = window.location.href
    $.ajax({
      type: "GET",
      url: urLocal+"/translated/"+checkLanguage()+".json",
      dataType: "json",
        success: function(data) {
            ajaxValue = data
        }
    })

    var globalLanguage
    function checkLanguage() {
        var cookie = document.cookie.replace(/(?:(?:^|.*;\s*)country\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        var language = cookie.split(",")
       
        if(language[0].length == 0){
            globalLanguage = "pt"
        }else{
            globalLanguage = language[0]
        }
        console.log("checkLanguage :", globalLanguage)
        return globalLanguage
    }
 
    setTimeout(function(){

        var animControl = []
var nova = ''
var tempLottie = ''
var urlLottie = [
    'https://assets2.lottiefiles.com/packages/lf20_dx3CMu.json',
    'https://assets4.lottiefiles.com/packages/lf20_pWLTA9.json',
    'https://assets9.lottiefiles.com/packages/lf20_SiFYir.json',
    'https://assets2.lottiefiles.com/packages/lf20_5kLgHk.json'
]

var urlNetwork = [
    'https://stackoverflow.com/users/6800637/allanribas',
    'https://www.linkedin.com/in/allanksr/',
    'https://github.com/Allanksr',
    'https://lottiefiles.com/allanksr'
   
]
var urlTitle = [
    ajaxValue.stackoverflow_title,
    ajaxValue.linkedin_title,
    ajaxValue.github_title,
    ajaxValue.lottie_title
]
var scrollmennetwork = document.getElementById('scrollmennetwork')

loadLottie()

function loadLottie() {

    for (let i = 0; i < urlLottie.length; i++) {
        tempLottie = tempLottie + "<a href='" + urlNetwork[i] + "' target='_blank' title='" + urlTitle[i] + "'><div id='lottie" + i + "'></div></a>"
        scrollmennetwork.innerHTML = tempLottie
    }

    initLoad()
}



function initLoad() {
    for (let i = 0; i < urlLottie.length; i++) {
        nova = {
            wrapper: document.getElementById('lottie' + i),
            animType: 'svg',
            loop: 2,
            prerender: true,
            autoplay: true,
            path: urlLottie[i]
        }

        animControl.push(bodymovin.loadAnimation(nova))

    }
}

    }, 1000)

