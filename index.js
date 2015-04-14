var hasProp = {}.hasOwnProperty;


/*
	sets up the constructor function.
*/
var createClass = function(body, _super) {
	var o = hasProp.call(body, 'constructor') ? body.constructor : (_super ? function() {_super.prototype.constructor.apply(this, arguments);} : function() {});
	return o;
};

/*
	extend the object
*/
var extend = function(child, parent) {
	//have to copy __super__, maybe any other props that have been set on the function
	for (var key in parent) {
		if (hasProp.call(parent, key)) {
			child[key] = parent[key];
		} 
	}
	function ctor() {
		this.constructor = child; 
	} 
	ctor.prototype = parent.prototype; 
	child.prototype = new ctor(); 
	child.__super__ = parent.prototype;
	return child; 
};

/*
	copy the body onto the prototype
*/
var copyBody = function(ctor, body) {
	for (var prop in body) {

		// copy if it's not the defined constructor
		if (hasProp.call(body, prop) && prop !== 'constructor') {
			ctor.prototype[prop] = body[prop];
		}
	}
	return ctor;
};


/*
	the exported function to declare objects
*/
var declare = function(parent, body) {

	if (parent && body) {

		var clazz = createClass(body, parent);
		clazz = (function(_super) {
			return extend(clazz, _super);
		})(parent);
		copyBody(clazz, body);
		return clazz;
	}
	//no super class defined, parent is actually body
	var c = createClass(parent);
	return copyBody(c, parent);
};

module.exports = declare;