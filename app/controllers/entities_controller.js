var locomotive = require('locomotive'),
	Controller = locomotive.Controller,
	Entity = require('../models/entity_model');

var C = new Controller();

C.index = function(){
	var self = this;
	Entity.find(function(err, data){
		if (err) self.render();
		self.entities = data;
		self.render();
	});
};

C.new = function(){
	this.render();
};

C.create = function(){
	var self = this;
	if (self.param('entity')){
		Entity.create(
			self.param('entity'),
			function(err){
				if (err) return handleError(err);
				self.redirect('/entities');
			});
	} else {
		self.render('new');
	}
};

C.edit = function(){
	var self = this;
	if (self.param('id')){
		Entity.findById(
			self.param('id'),
			function(err, data){
	console.log('\n\n\n\n\n\nSIC EDIT!:',
		data);
				if (err) return handleError(err);
				self.entity = data;
				self.render();
			});
	} else {
		self.render('index');
	}
};

C.update = function(){
	var self = this;
	var id = self.param('id');
	if (id){
		console.log('\n\n\ndata to update:\n', self.param('entity'));
		Entity.findByIdAndUpdate(
			id,
			self.param('entity'),
			function(err){
				if (err) return handleError(err);
				self.redirect('/entities/'+id);
			}
			);

	} else {
		self.render('index')
	}
};

C.destroy = function(){
	var self = this;
	var id = self.param('id');
	if (id){
		Entity.findByIdAndRemove(
			id,
			function(err){
				if (err) return handleError(err);
				self.redirect('/entities/');
			}
			);

	} else {
		self.redirect('/entities/');
	}
};

C.show = function(){
	var self = this;
	if (self.param('id')){
		Entity.findById(
			self.param('id'),
			function(err, data){
				if (err) return handleError(err);
				self.entity = data;
	console.log('\n\n\n\n\n\nSIC!:',
		data);
				self.render();
			});
	} else {
		self.render('index');
	}
};


module.exports = C;
