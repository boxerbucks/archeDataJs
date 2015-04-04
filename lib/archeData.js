(function(){

	function archeData(){
		var stateEnum = {
			PRISTINE: 1,
			MODIFIED: 2
		}

		var dataLibrary = {};
		var archetypes = {};

		archeData.prototype.state = {
			PRISTINE: 1,
			MODIFIED: 2};

		function ObservableProp(propVal, name){
			var privPropObj = {value:undefined,
							   oldValue:undefined,
							   name:name,
							   state: archeData.prototype.state.PRISTINE,
							   notificationCallbacks: []};
			
			function notifyListeners(callbackArray, changedObject){
				for(var index in privPropObj.notificationCallbacks){
					//For illustration
					var cbFn = privPropObj.notificationCallbacks[index];
					cbFn({name:changedObject.name, value: changedObject.value, oldValue:changedObject.oldValue});
				}
			}

			//The creation of an 'observable'
			Object.defineProperty(propVal, name, {
			  get: function(){
			  	return privPropObj; 
			  },
			  set: function(_val){
			  	if (typeof _val == 'function'){
			  		//Assume its a notification callback registration
			  		privPropObj.notificationCallbacks.push(_val);
			  	} else {
			  		//Set the old and new values 
					privPropObj.oldValue = privPropObj.value; 

					//change the state
			  		privPropObj.value = _val;

			  		//Only change the state if this isn't initialization of the value
			  		if(privPropObj.oldValue != undefined){
			  			privPropObj.state = archeData.prototype.state.MODIFIED;
			  		}

			  		//Notify of the changes
				  	notifyListeners(privPropObj.notificationCallbacks, privPropObj);	
			  	}
			  }
			  
			});

		}

		function buildInstanceObjectTree(archetypeTreeObj){
			var instanceObj = {};
			for(var prop in archetypeTreeObj){
				if(typeof archetypeTreeObj[prop] == "object" || Array.isArray(archetypeTreeObj[prop])){
					instanceObj[prop] = buildInstanceObjectTree(archetypeTreeObj[prop]);
				}else{
					new ObservableProp(instanceObj, prop);
				}
			}

			return instanceObj;
		}

		function createObjectFromArchetype(archTypeName, instanceName, optionalDataMap){
			if(typeof archTypeName == "string"){
				if(archetypes[archTypeName]){
					var instanceObj = buildInstanceObjectTree(archetypes[archTypeName]);

					//Add the instance to the data library
					dataLibrary[instanceName] = Object.seal(instanceObj);
				}
			}

			return instanceObj;
		}

		function getInstanceObject(objName){
			if(typeof objName == "string" && dataLibrary[objName]){
				return dataLibrary[objName];
			}
		}

		function addArchetype(name, archetypeObj){
			if(typeof name == "string" && archetypeObj && typeof archetypeObj == "object"){
				if(!archetypes[name]){
					archetypes[name] = archetypeObj;
					return true;
				}
			}
		}

		this.addObject = function(archTypeName, instanceName, optionalDataMap){
			return createObjectFromArchetype(archTypeName, instanceName, optionalDataMap);
		};

		this.addArchetype = function(name, archetypeObj){
			return addArchetype(name, archetypeObj);	
		};

		this.getObject = function(objName){
			return getInstanceObject(objName);
		}

	}

	//Should add to the global scope
	this.ArcheData = new archeData();

})();