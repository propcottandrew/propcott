/**
 * DynamoSessionStore
 * Evan Kennedy <evan_kennedy@yahoo.com>
 */

var util = require('util');
var Store = local('models/store');

/**
 * Return the `DynamoSessionStore` extending `express`'s session Store.
 *
 * @param {object} express session
 * @return {Function}
 * @api public
 */

module.exports = function (session) {

	/**
	 * Initialize DynamoSessionStore with the given `options`.
	 *
	 * @param {Object} options
	 * @api public
	 */

	function DynamoSessionStore (options) {
		var self = this;

		options = options || {};
		DynamoSessionStore.super_.call(this, options);
		this.prefix = options.prefix || 'session';
	}

	/**
	 * Inherit from `Store`.
	 */

	util.inherits(DynamoSessionStore, session.Store);

	/**
	 * Attempt to fetch session by the given `sid`.
	 *
	 * @param {String} sid
	 * @param {Function} callback
	 * @api public
	 */
	DynamoSessionStore.prototype.get = function (sid, callback) {
		console.log('get', sid);
		callback = callback || noop;
		
		Store.get(this.prefix + ':' + sid, function(err, data) {
			console.log(err, data);
		});
	};

	/**
	 * Commit the given `sess` object associated with the given `sid`.
	 *
	 * @param {String} sid
	 * @param {Session} sess
	 * @param {Function} callback
	 * @api public
	 */
	DynamoSessionStore.prototype.set = function (sid, sess, callback) {
		console.log('set', sid);
		callback = callback || noop;
		
		Store.set(this.prefix + ':' + sid, sess, function(err, data) {
			console.log(err, data);
		});
	};

	/**
	 * Destroy the session associated with the given `sid`.
	 *
	 * @param {String} sid
	 * @api public
	 */
	DynamoSessionStore.prototype.destroy = function (sid, callback) {
		Store.remove(this.prefix + ':' + sid, function(err, data) {
			console.log(err, data);
		});
	};

	/**
	 * Refresh the time-to-live for the session with the given `sid`.
	 *
	 * @param {String} sid
	 * @param {Session} sess
	 * @param {Function} callback
	 * @api public
	 */
	//DynamoSessionStore.prototype.touch = function (sid, sess, callback) {};
	//.length(callback)
	//.clear(callback)
	return DynamoSessionStore;
};
