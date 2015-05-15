(function(){
    var Child = Parse.Object.extend("Child"),
        Note = Parse.Object.extend("Note"),
        childId = getChildIdFromUrl(),
        child;

    var elements = {
        name: document.querySelectorAll(".child-name"),
        dob: document.querySelectorAll(".child-dob"),
        disabilities: document.querySelectorAll(".child-disabilities"),
        infoText: document.querySelector("#info-text")
    };

    if (childId)
        getChildById(childId).then(renderChild);

    function getChildIdFromUrl(){
        var childIdMatch = window.location.search.match(/[\?&]childId=([^&]+)/);
        if (!childIdMatch)
            return null;

        return childIdMatch[1];
    }

    function getChildById(childId){
        var query = new Parse.Query(Child);
        return query.get(childId).then(function(result){
            child = result;
        });
    }

    function renderChild(){
        var childAttributes = child.attributes;

        setText("name", childAttributes.name);
        setText("dob", [childAttributes.birthdate.getDate(), childAttributes.birthdate.getMonth(), childAttributes.birthdate.getFullYear()].join("/"));
        setText("disabilities", childAttributes.disabilities);
    }

    function setText(property, text){
        var propertyElements = elements[property];

        for(var i=0; i < propertyElements.length; i++){
            propertyElements[i].innerText = text;
        }
    }

    window.saveNote = function(){
        var info = new Note();

        info.save({
            date: new Date(),
            text: elements.infoText.value,
            childId: child.id
        }).then(function(newNote){
            console.log("new info:" + newNote)
        });
    }
})();