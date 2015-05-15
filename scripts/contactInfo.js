(function(){
	var Contact = Parse.Object.extend("Contact");

	var elements = {
		fullname: document.querySelector("#fullname"),
		tel: document.querySelector("#tel"),
		tel2: document.querySelector("#tel2"),
		email: document.querySelector("#email"),
		Kinship: document.querySelector("#Kinship"),
		address: document.querySelector("#address")
	};

	var contactsList = document.querySelector("#contacts");

	window.addContact = function(){
		var contactAttributes = getFormValues();


		var contact = new Contact();
		contact.save(contactAttributes).then(function(contactObj){
			console.log("SAVED: ", contactObj);
		}, function(error){
			console.error("Can't save contact: ", error.message);
		});
	};

	getAllContacts();

	function getFormValues(){
		var values = {},
			element;

		for(var elementName in elements){
			element = elements[elementName];
			if (element) {
				if (element.getAttribute("type") === "date")
					values[elementName] = new Date(element.value);
				else
					values[elementName] = element.value;
			}
		}

		return values;
	}

	function getAllContacts(){
		var query = new Parse.Query(Contact);
		query.find().then(renderContacts);
	}

	function renderContacts(contacts){
		contactsList.innerHTML = "";

		contacts.forEach(function(contact){
			var listItem = document.createElement("li");
			listItem.textContent = contact.attributes.fullname()+ " " + contact.attribute.email();
			contactsList.appendChild(listItem);
		});
	}
})();