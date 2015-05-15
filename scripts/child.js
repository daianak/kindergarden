(function(){
	var Child = Parse.Object.extend("Child");


	var elements = {
		name: document.querySelector("#name"),
		birthdate: document.querySelector("#birthdate"),
		age: document.querySelector("#age"),
		disabilities: document.querySelector("#disabilities"),
		newInfo: document.querySelector("#newInfo")
	};

	var childrenList = document.querySelector("#children");

	window.addChild = function(){
		var childAttributes = getFormValues();


		var child = new Child();
		child.save(childAttributes).then(function(childObj){
			console.log("SAVED: ", childObj);
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
		query.find().then(renderChildren);
	}

	function renderChildren(children){
		childrenList.innerHTML = "";

		children.forEach(function(child){
			var listItem = document.createElement("li");
			listItem.textContent = child.attributes.name + " " + child.attributes.birthdate.toString();
			childrenList.appendChild(listItem);
		});
	}
})();