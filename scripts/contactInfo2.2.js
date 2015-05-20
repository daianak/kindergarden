(function(){
	var Contact = Parse.Object.extend("Contact"),
		contactsData;

	var elements = {
		fullname: document.querySelector("#fullname"),
		tel: document.querySelector("#tel"),
		tel2: document.querySelector("#tel2"),
		email: document.querySelector("#email"),
		Kinship: document.querySelector("#Kinship"),
		address: document.querySelector("#address")
	};

	var contactFormElement = document.querySelector("#contact-form");

	var contactsTbody = document.querySelector("#contacts"),
		contactsTemplate = Handlebars.compile(document.querySelector("#contact-template").innerHTML);

	window.addContact = function(){
		var contactAttributes = getFormValues();

		var contact = new Contact();
		contact.save(contactAttributes).then(function(contactObj){
			contactsData.push(contactObj);
			renderContacts();
			toggleForm();
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
		query.find().then(function(data){
			contactsData = data;
			renderContacts();
		});
	}

	function renderContacts() {
		contactsTbody.innerHTML = contactsTemplate({contacts: contactsData});
	}

	window.toggleForm = function() {
		contactFormElement.classList.toggle("hidden");
		if (!contactFormElement.classList.contains("hidden"))
			document.querySelector("#fullname").focus();
	};

})();

