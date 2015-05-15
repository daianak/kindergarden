(function(){
	var Child = Parse.Object.extend("Child"),
		childrensData;

	var elements = {
		name: document.querySelector("#name"),
		birthdate: document.querySelector("#birthdate"),
		age: document.querySelector("#age"),
		disabilities: document.querySelector("#disabilities"),
		newInfo: document.querySelector("#newInfo")
	};

	var childFormElement = document.querySelector("#child-form");

	var childrensTbody = document.querySelector("#childrens tbody"),
		childrensTemplate = Handlebars.compile(document.querySelector("#child-template").innerHTML);


	window.addChild = function(){
		var childAttributes = getFormValues();

		var child = new Child();
		child.save(childAttributes).then(function(childObj){
			childrensData.push(childObj);
			renderChildrens();
			toggleForm();
		}, function(error){
			console.error("Can't save child: ", error.message);
		});
	};

	getAllChildren();

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

	function getAllChildren(){
		var query = new Parse.Query(Child);
		query.find().then(function(data){
			childrensData = data;
			renderChildrens();
		});
	}

	function renderChildrens(){
		childrensTbody.innerHTML = childrensTemplate({ childrens: childrensData });
	}

	window.toggleForm = function(){
		childFormElement.classList.toggle("hidden");
		if (!childFormElement.classList.contains("hidden"))
			document.querySelector("#name").focus();
	};
})();