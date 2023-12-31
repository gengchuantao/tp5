# Electron

This library is compatible with Electron and should just work out of the box.
The demonstration uses Electron 18.2.0.  The library is added via `require` from
the renderer process.

The library can also be required from the main process, as shown in this demo
to render a version string in the About dialog on OSX.

The standard HTML5 `FileReader` techniques from the browser apply to Electron.
This demo includes a drag-and-drop box as well as a file input box, mirroring
the [SheetJS Data Preview Live Demo](http://oss.sheetjs.com/sheetjs/)

The core data in this demo is an editable HTML table.  The readers build up the
table using `sheet_to_html` (with `editable:true` option) and the writers scrape
the table using `table_to_book`.

## Reading and Writing Files

Since electron provides an `fs` implementation, `readFile` and `writeFile` can
be used in conjunction with the standard dialog windows.  For example:

```js
/* from app code, require('electron').remote calls back to main process */
var dialog = require('electron').remote.dialog;

/* show a file-open dialog and read the first selected file */
var o = dialog.showOpenDialog({ properties: ['openFile'] });
var workbook = XLSX.readFile(o[0]);

/* show a file-save dialog and write the workbook */
var o = dialog.showSaveDialog();
XLSX.writeFile(workbook, o);
```

## Breaking Changes in Electron

The first version of this demo used Electron 1.7.5.

Electron 9.0.0 and later require the preference `nodeIntegration: true` in order
to `require('XLSX')` in the renderer process.

Electron 12.0.0 and later also require `worldSafeExecuteJavascript: true` and
`contextIsolation: true`.

Electron 14+ must use `@electron/remote` instead of `remote`.



[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/SheetJS/js-xlsx?pixel)](https://github.com/SheetJS/js-xlsx)
