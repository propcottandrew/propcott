/*var dynamo = local('framework/dynamo');
var s3 = local('framework/s3');
var Store = local('models/store');
var Model = local('models/base');
var fs = require('fs');
var uuid = require('uuid');
var hasher = local('framework/hasher');*/




/*
take save and load out of base and move into stored decorator
make a required decorator system to check for event decorator in indexed
in indexed, hook into the saving/saved event to index before/after saving
*/






var Base   = require(app.models.base);
var aws    = require(app.aws);

class Propcott extends Base {
	constructor(data) {
		this._saved = false;
		this._indexed = false;
		this.published = false;
		this.created = Date.now();
		if(data) this.import(data);
	}

	ensureId(callback) {
		if(this.id || this.draftId && !this.published) return callback();
		if(this.published) {
			if(!this.id) return this.genId(callback);
		} else {
			if(this.creator) this.draftId = hasher.to(this.creator.id) + '/' + uuid.v4();
			else this.draftId = uuid.v4();
		}
		return callback();
	}

	// Iterate through matching propcott ids
	static list(options, iterator, callback) {

	}

	// Iterate through matching propcott objects
	static each(options, iterator, callback) {
		// should utilize list
	}
}

// Decorators
/*
Propcott.decorate(stored({
	Bucket: (propcott.id ? 'propcotts' : 'drafts') + '.data.propcott.com',
	Key: (propcott.id || propcott.draftId) + (propcott.id ? '/data' : '') + '.json'
}));
Propcott.decorate(indexed({TableName: 'Propcotts'}));
Propcott.decorate(id('propcotts'));
Propcott.decorate(json());
Propcott.decorate(timestamp());
Propcott.decorate(cache());
*/

// Events
Propcott.on('data.saving', function(callback) {
	this.ensureId(function(err) {
		this._stored.Key = (this.id || this.draftId) + (this.id ? '/data' : '');
		callback(err);
	}.bind(this));
});

Propcott.on('data.saved', function(callback) {
	if(!this.creator && this.draftId) return callback.error('SavedAsDraft');
	callback();
});

Propcott.on('data.loading', function(callback) {
	if(!(this.id || this.draftId)) return callback.error('NotYetSaved');
	this._stored.Key = ($this.id || $this.draftId) + ($this.id ? '/data' : '');
	callback();
});

Propcott.on('index.saving', function(callback) {
	this.ensureId(function(err) {
		if(err) return callback(err);
		if(!this.id) return callback.error('NotYetPublished');
		if(this._indexed) {
			// check for change to indexed properties
			return callback();
		} else {
			callback();
		}
		//this._stored.Key = (this.id || this.draftId) + (this.id ? '/data' : '');
	}.bind(this));
});

// Export
module.exports = Propcott;

/*
Propcott.each({
	option: 1
}, function(propcott) {
	// iterator
}, function(err) {
	// callback
});



propcott.save(function(err, propcott) {
	if(err) {
		if(err.SavedAsDraft) {
			req.session.draft = err.SavedAsDraft;
			req.flash('Please log in to save your propcott.');
			return res.redirect('/login');
		}
		req.flash('Could not save your propcott.');
		return res.redirect('back');
	}
	// continue
});

Propcott.prototype.saveIndex = function(callback) {
	var propcott = this;
	propcott.ensureId(function(err) {
		if(err) return callback(err);
		if(!propcott.id) return callback.error('NotYetPublished');
		if(propcott._indexed) {
			// check for change to indexed properties
			return callback();
		} else {
			dynamo.putItem({
				TableName: 'Propcotts',
				Item: {
					Status: {S: 'published'},
					Id: {N: propcott.id},
					SDay: {N: 1},
					SWeek: {N: 1},
					SMonth: {N: 1},
					SAll: {N: 1},
					SPrevious: {N: 1},
					Industry: {S: propcott.industry},
					Target: {S: propcott.target}
				}
			}, function(err, data) {
				if(err) return callback(err);
				propcott.emit('saved', function(err) {
					return callback(err, propcott);
				});
			});
		}
	});
};

// move these to base model
Propcott.prototype.loadIndex = function(callback) {
	var propcott = this;
	if(!propcott.id) return callback();
	dynamo.getItem({
		TableName: 'Propcotts',
		Key: {
			Status: {S: 'published'},
			Id: {N: propcott.id}
		}
	}, function(err, data) {
		if(err) return callback(err);
		if(!data.Item) return callback({PropcottNotFound:1});
		propcott.support = {
			all: data.Item.SAll.N,
			monthly: data.Item.SMonth.N,
			weekly: data.Item.SWeek.N,
			daily: data.Item.SDay.N,
			previous: data.Item.SPrevious.N
		};
		propcott.industry = data.Item.Industry.S;
		propcott.target = data.Item.Target.S;
		propcott._indexed = true;
		return callback();
	});
};
*/
