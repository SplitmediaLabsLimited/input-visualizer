/* globals xui */

(function()
{
	'use strict';

	function Thread(callbacks)
	{
		if (!Array.isArray(callbacks))
		{
			callbacks = [].slice.call(arguments);			
		}

		this.callbacks = callbacks;

		next.call(this);
	}

	Thread.sync = function()
	{
		return new Thread([].slice.call(arguments));
	};

	/**
	 * @private
	 */
	function next()
	{
		/* jshint validthis:true */

		var callback = this.callbacks.shift();

		if (typeof callback === 'function')
		{
			var args = [].slice.call(arguments);
			
			args.unshift(next.bind(this));

			callback.apply(this, args);
		}
	}

	xui.utils.Thread = Thread;
})();