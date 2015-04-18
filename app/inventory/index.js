var items = [];

var _ = require('lodash');

var findOne = function(req){
  return _.find(items, { id: req.params.id });
};

exports.list = function(req, res){
  res.render('index', {items: items});
};

exports.show = function(req, res, next){
  var item = findOne(req);
  if (typeof(item) === 'undefined' || item === null)
  {
    res.status(404);
    return next();
  }
  res.render('show', item);
};

exports.new = function(req, res){
  res.render('new');
};

exports.create = function (req, res){
  var item = {
    id: _.uniqueId(),
    name: req.body.name,
    description: req.body.description
  };

  items.push(item);
  res.redirect('/');
};

exports.edit = function(req, res){
  var item = findOne(req);
  res.render('edit', item);
};

exports.update = function(req, res, next){
  var id = req.params.id;
  var index = _.findIndex(items, {id: id });
  if (typeof(index) === 'undefined' || index === null)
  {
    res.status(404);
    return next();
  }
  var item = {
    id: id,
    name: req.body.name,
    description: req.body.description
  };
  items[index] = item;
  res.redirect('/' + id);
};

exports.delete = function (req, res) {
  _.remove(items, {id: req.params.id});
  res.json({success: true});
};
