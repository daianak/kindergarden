(function(){
    var Child = Parse.Object.extend("Child"),
        Note = Parse.Object.extend("Note"),
        Role = Parse.Object.extend("_Role"),
        childId = getChildIdFromUrl(),
        child,
        childRole,
        notesData;

    HandlebarsIntl.registerWith(Handlebars);

    var intlData = {
        data: {intl: { locales: "he-IL" }}
    };

    var elements = {
        name: document.querySelectorAll(".child-name"),
        dob: document.querySelectorAll(".child-dob"),
        disabilities: document.querySelectorAll(".child-disabilities"),
        infoText: document.querySelector("#info-text"),
        infoTitle: document.querySelector("#info-title"),
        addNote: document.querySelector("#add-note")
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

    /**
     * Gets the Role connected to the child
     */
    function getChildRole(){
        var query = new Parse.Query(Role);
        query.equalTo("child", child);
        return query.first().then(function(role){
            childRole = role || null;
            return role;
        });
    }

    function renderChild(){
        var childAttributes = child.attributes;

        setText("name", childAttributes.name);
        setText("dob", [childAttributes.birthdate.getDate(), childAttributes.birthdate.getMonth(), childAttributes.birthdate.getFullYear()].join("/"));
        setText("disabilities", childAttributes.disabilities);
        getAllNotes();
    }

    function setText(property, text){
        var propertyElements = elements[property];

        for(var i=0; i < propertyElements.length; i++){
            propertyElements[i].innerText = text;
        }
    }

    window.toggleAddNote = function(){
        elements.addNote.classList.toggle("active");
    };

    window.saveNote = function(){
        if (childRole === undefined) {
            getChildRole().then(window.saveNote);
            return false;
        }

        if (childRole === null) {
            alert("Couldn't get child role!");
            return false;
        }
        var info = new Note(),
            infoAcl = new Parse.ACL();

        infoAcl.setRoleReadAccess(childRole, true);
        infoAcl.setPublicReadAccess(false);
        infoAcl.setPublicWriteAccess(false);

        info.setACL(infoAcl);

        info.save({
            date: new Date(),
            text: elements.infoText.value,
            childId: child.id,
            title: elements.infoTitle.value,
            user: Parse.User.current()
        }).then(function(newNote){
            addNewNote(newNote);
        }, function(error){
            console.error("Can't save note: ", error);
        });

        return false;
    };

    var notesTbody = document.querySelector("#notes"),
        notesTemplate = Handlebars.compile(document.querySelector("#note-template").innerHTML);

    function getAllNotes(){
        var query = new Parse.Query(Note);
        query.equalTo("childId", childId).include("user").descending("date");

        query.find().then(function(data){
            notesData = data;
            renderNotes(data);
        });
    }

    function addNewNote(note){
        notesTbody.innerHTML = notesTemplate({ notes: [note] }, intlData) + notesTbody.innerHTML;
    }

    function renderNotes(notesData){
        notesTbody.innerHTML = notesTemplate({ notes: notesData }, intlData);
    }
})();