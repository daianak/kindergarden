(function(){
    var htmlName = window.location.href.match(/(\w+)\.html$/i)[1];
    document.querySelector("#footer [href='" + htmlName + "']").classList.add("selected");
})();