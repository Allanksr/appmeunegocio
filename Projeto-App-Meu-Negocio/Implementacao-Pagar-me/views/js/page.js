
const onlyFunctions = {
        showElements : {},
        hideElements : {},
         ShowOrHide(element_position, element_id, element_title){
                onlyFunctions.showElements = {
                    showHint:"document.getElementById('"+element_id+"').style.visibility='visible'",
                    innerHint:"document.getElementById('"+element_id+"').innerHTML='"+element_title+"'",
                    snackbarShow: "document.getElementById('snackbar').className = 'show'",
                    snackbarHint: "document.getElementById('snackbar').innerHTML='"+element_title+"'",
                    timeOut:'onlyFunctions.myStopFunction()'
                }
                onlyFunctions.hideElements = {
                    showHint:"document.getElementById('"+element_id+"').style.visibility='hidden'",
                    innerHint:"document.getElementById('"+element_id+"').innerHTML=''",
                    snackbarShow: "document.getElementById('snackbar').className = 'hide'",
                    snackbarHint: "document.getElementById('snackbar').innerHTML='"+element_title+"'",
                    timeOut:'onlyFunctions.myFunction()'
                }
            },
            toastTimer:null,
                myFunction() {
                    onlyFunctions.toastTimer = setTimeout(function(){document.getElementById('snackbar').className = '' }, 3000)
                },
                myStopFunction() {
                    if(onlyFunctions.toastTimer != null){
                        clearTimeout(onlyFunctions.toastTimer)
                    }
                }      
    }

    setTimeout(function(){}, 100)



    
    
    
    
    
    
    
    