/* eslint-disable no-useless-escape */
/**
 * Hat tip to PumBaa80 http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
 * for the syntax highlighting function.
 *
 * View this code running on http://jsfiddle.net/faffyman/KRb8W/
 *
 **/

export const jsonDisplay = {
	jsonstring: '',

	outputPretty: function (jsonstring: string): string {
		jsonstring = jsonstring == '' ? jsonDisplay.jsonstring : jsonstring;
		// prettify spacing
		const pretty = JSON.stringify(JSON.parse(jsonstring), null, 2);
		// syntaxhighlight the pretty print version
		const shpretty = jsonDisplay.syntaxHighlight(pretty);
		//output to a div
		// This could be a one liner with jQuery
		// - but not making assumptions about jQuery or other library being available.
		return shpretty;
	},

	syntaxHighlight: function (json: string): string {
		json = json
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		return json.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match): string {
				let cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			}
		);
	},
};
