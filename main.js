define(function (require, exports, module) {

	var Menus = brackets.getModule('command/Menus'),
		CommandManager = brackets.getModule( 'command/CommandManager' ),
		PreferencesManager = brackets.getModule( 'preferences/PreferencesManager' ),
		menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);

	var preferences = PreferencesManager.getExtensionPrefs( 'mskocik.brackets.icons' );
	// Define preferences.
	preferences.definePreference( 'grayscale', 'boolean', false );

	
	var COMMAND_ID = 'mskocik.brackets.icons';
	// Register extension.
	CommandManager.register('Grayscale icons', COMMAND_ID, toggleGrayscale );
	menu.addMenuItem( COMMAND_ID );

	var fileInfo = {};

	/**
	 * Icon grayscale toggle
	 */
	function toggleGrayscale() {
		var enabled = !preferences.get('grayscale');
		preferences.set('grayscale', enabled);
		preferences.save();

		var $sidebar = $('#sidebar');
		if (enabled) {
			$sidebar.addClass('icons-grayscale');
		} else {
			$sidebar.removeClass('icons-grayscale');
		}

		CommandManager.get( COMMAND_ID ).setChecked( enabled );
	}

	/**
	 * Initial check if grayscale icons shoud be displayed
	 */
	function init() {
		var initAsGrayscale = preferences.get('grayscale');
		if (initAsGrayscale) {
			var $sidebar = $('#sidebar');
			$sidebar.addClass('icons-grayscale');
		}
	}
	
	function addIcon(extension, icon, css) {
		fileInfo[extension] = {
			icon: icon,
			css: css
		};
	}
	
	function addAlias(extension, other) {
		fileInfo[extension] = fileInfo[other];
	}
	
	var config = require('config').definitions;
	
	for (var i=0,l=config.length; i<l; i++) {
		var extDef = config[i];
		if (extDef.alias) {
			addAlias(extDef.ext, extDef.alias);
			continue;
		}
		addIcon(extDef.ext, extDef.css);
	}

	var WorkingSetView = brackets.getModule('project/WorkingSetView');
	var ExtensionUtils = brackets.getModule('utils/ExtensionUtils');
	var FileTreeView = brackets.getModule('project/FileTreeView');
	var FileUtils = brackets.getModule('file/FileUtils');

	ExtensionUtils.loadStyleSheet(module, 'styles/style.css');

	var provider = function (entry) {
		var data = null;

		if (!entry.isFile) {
			data = fileInfo['folder'];
		} else {
			var ext = entry.fullPath.substring(entry.fullPath.lastIndexOf('.') + 1) || entry.name.substr(1);
			if (fileInfo.hasOwnProperty(ext)) {
				data = fileInfo[ext];
			} else {
				data = fileInfo.file;
			}
		}
		var $new = $('<ins>');
		$new.addClass('file-icon icon-' + data.icon);
		return $new;
	};

	FileTreeView.addIconProvider(provider);
	WorkingSetView.addIconProvider(provider);
	// init - grayscale check
	init();
});
