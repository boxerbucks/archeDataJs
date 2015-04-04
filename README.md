# ArcheDataJs
A simple implementation of a notifying data storage framework in javascript

This library provides a simple data management framework that implements a few features:

### Initialization from archetypes

Data creation begins with an archetype definition that is simply an object that will serve as a base object that can be created and stored in the respoitory. This allows for strict data control as the objects are created and selaed so that there is no way to alter the objects after creation. The motivation for this is to enable central control of data graphs and prevent unnecessary data to be added to the model. 

### State tracking

All nodes defined on the archetype object are tracked as pristine or modified and maintained as they are updated. This allows for the creation of a diff object.

### Change Notification

All nodes defined on the archetype objects support the registration of callbacks that will fire with a change object when the object changes. By setting a function on the property to watch that callback will be fired with a change object when the object changes.

ToDo
-----
There are features still to be implemented such as:
* Re initialization of the tree
* Auto creation of diff objects
* Notification on parent objects on deletes and adds of children

Usage
-----
To run the tests, just do a bower install and open the SpecRunner in chrome. 

To use the library, just include the dataStore.js file and use the DataStore object on the global scope.  

Background
----------
The motivation of this project was to use the javascript Object.defineProperty prototype function to implement a change tracking and notification system for data trees. Data management across large projects can be a difficult thing to do successfully and this is my attempt at solving some of these issues based on experiences from large angular applications with big trees of data.
