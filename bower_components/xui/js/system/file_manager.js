/* globals internal */

(function()
{
	'use strict';

	var iApp    = internal.core.App;

	// singleton list of ongoing operations
	var operations = []; 

	function FileManager()
	{
	}

	FileManager.copy = function(source, target)
	{
		var id = iApp.callDll("xsplit.Copy", source, target);
		return new FileOperation(id, FileOperationType.COPY);
	};

	FileManager.move = function(source, target)
	{
		var id = iApp.callDll("xsplit.Move", source, target);
		return new FileOperation(id, FileOperationType.MOVE);
	};

	FileManager.delete = function(source)
	{
		var id = iApp.callDll("xsplit.Delete", source, target);
		return new FileOperation(id, FileOperationType.DELETE);
	};

	FileManager.zip = function(sourceItem, targetZip, overwrite)
	{
		var id = iApp.callDll("xsplit.Zip", sourceItem, targetZip,
			overwrite ? "1" : "0");
		return new FileOperation(id, FileOperationType.zip);
	};

	FileManager.exists = function(target)
	{
		return iApp.callDll("xsplit.Exists", target);
	};

	FileManager.createFolder = function(folder)
	{
		return iApp.callDll("xsplit.CreateFolder", folder);
	};

	FileManager.Encoding = 
	{
		UNICODE	: "1",
		UTF8	: "2",
		BASE64	: "3"
	};

	FileManager.write = function(filename, data, overwrite, encoding)
	{
		return iApp.callDll("xsplit.Write", filename, data,
			(overwrite ? "1" : "0"), encoding);
	};

	function FileOperation(id, type)
	{
		this.id = id;
		this.type = type;
	}

	var FileOperationType =
	{
		COPY	: 0,
		MOVE	: 1,
		DELETE	: 2,
		ZIP		: 3
	};

	FileOperation.prototype.getProgress = function()
	{
		switch(this.type)
		{
			case FileOperationType.COPY:
				iApp.callDll("xsplit.CopyProgress", this.id);
				break;
			case FileOperationType.MOVE:
				iApp.callDll("xsplit.MoveProgress", this.id);
				break;
			case FileOperationType.DELETE:
				iApp.callDll("xsplit.DeleteProgress", this.id);
				break;
			case FileOperationType.ZIP:
				iApp.callDll("xsplit.ZipProgress", this.id);
				break;
		}
	};

	FileOperation.prototype.pause = function()
	{
		switch(this.type)
		{
			case FileOperationType.COPY:
				iApp.callDll("xsplit.CopyPause");
				break;
			case FileOperationType.MOVE:
				iApp.callDll("xsplit.MovePause");
				break;
			case FileOperationType.DELETE:
				iApp.callDll("xsplit.DeletePause");
				break;
			case FileOperationType.ZIP:
				iApp.callDll("xsplit.ZipPause");
				break;
		}
	};

	FileOperation.prototype.resume = function()
	{
		switch(this.type)
		{
			case FileOperationType.COPY:
				iApp.callDll("xsplit.CopyResume");
				break;
			case FileOperationType.MOVE:
				iApp.callDll("xsplit.MoveResume");
				break;
			case FileOperationType.DELETE:
				iApp.callDll("xsplit.DeleteResume");
				break;
			case FileOperationType.ZIP:
				iApp.callDll("xsplit.ZipResume");
				break;
		}
	};

	FileOperation.prototype.cancel = function()
	{
		switch(this.type)
		{
			case FileOperationType.COPY:
				iApp.callDll("xsplit.CopyCancel");
				break;
			case FileOperationType.MOVE:
				iApp.callDll("xsplit.MoveCancel");
				break;
			case FileOperationType.DELETE:
				iApp.callDll("xsplit.DeleteCancel");
				break;
			case FileOperationType.ZIP:
				iApp.callDll("xsplit.ZipCancel");
				break;
		}
	};

	xui.system.FileManager = FileManager;
})();