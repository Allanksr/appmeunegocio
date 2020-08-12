
setTimeout(function(){
  
  var main_container = document.getElementById('main_container').getElementsByClassName("alert-warning")
  var count = main_container.length
  contar()
  function contar(){
    if(count>0){
      count--
      var hint = document.getElementsByClassName("alert-warning")[count]
      hint.setAttribute("style", "width: 100%; background-color: #ffffff;display: inline-block;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box;font-weight: bold;")
      hint.setAttribute("id", "hint"+count+"")
      hint.style.visibility='hidden'
  
      var input_class = document.getElementsByClassName("form-control")[count]
      input_class.setAttribute("id", "form-control"+count+"")
     
      onlyFunctions.ShowOrHide(count, "hint"+count+"", input_class.title)
      
      input_class.setAttribute("onmouseover", [
         onlyFunctions.showElements.showHint,
         onlyFunctions.showElements.innerHint,
         onlyFunctions.showElements.snackbarShow,
         onlyFunctions.showElements.snackbarHint,
         onlyFunctions.showElements.timeOut        
        ]
        )
        input_class.setAttribute("onmouseout", [
         onlyFunctions.hideElements.showHint,
         onlyFunctions.hideElements.innerHint,
         onlyFunctions.hideElements.snackbarShow,
         onlyFunctions.hideElements.snackbarHint,
         onlyFunctions.hideElements.timeOut       
        ]
        )
    contar()
    }
  }

 }, 1000)
