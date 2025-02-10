---
sidebar_position: 4
description: Learn how to save and open Editor data stored in a XML file.
---

# Editor Input/Output

:::note

This tutorial is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). \
It is adapted from the original [mxGraph tutorial](https://github.com/jgraph/mxgraph/blob/v4.2.2/docs/tutorial.html).

> Copyright 2021-present The maxGraph project Contributors \
Copyright (c) JGraph Ltd 2006-2017

:::


## Codecs

See the dedicated [codecs page](../usage/codecs.md) for more information on how to use codecs.

For encoding other objects, or if no editor instance is available, the [Codec](https://maxgraph.github.io/maxGraph/api-docs/classes/Codec.html) can be used to create and read XML data.


<a id="Files"></a>
## Files

The `save`, `open`, `readGraphModel` and `writeGraphModel` functions implement a standard mechanism for handling files in [Editor](https://maxgraph.github.io/maxGraph/api-docs/classes/Editor.html).

The default implementation of `Editor.save` is called with an argument to indicate if the save was triggered by the user or by the system.
It then uses the `urlPost` variable of the editor object to check if a post request should be issued.
If the variable is defined, the editor issues a post request to the specified URL passing the XML along as a POST variable called xml.


<a id="Post"></a>
## Post

As an example, consider the following PHP file which is located in the same directory as the HTML page.
If the filename is `server.php` then the `urlPost` variable must be set to `server.php` on the editor in order to post the diagram to the server.
The PHP file will get the XML from the POST request and write it to a file called `diagram.xml`.

```php
<?php
// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

$xml = $_POST['xml'] ?? null;
if ($xml != null) {
    // Validate XML content
    if (!simplexml_load_string($xml)) {
        http_response_code(400);
        exit('Invalid XML');
    }
    $fh=fopen("diagram.xml","w");
    fputs($fh, stripslashes($xml));
    fclose($fh);
}
?>
```

To set the URL to post to, change the respective entry in the `Editor` node of the config file as follows:

```xml
<Editor urlPost="http://www.example.com/server.php" ... >
```

Keep in mind that the JavaScript can only post to the server where it originated from, so we recommend to use relative URLs, e.g. `server.php`.

<a id="FormFields"></a>
## Form Fields

If you need to read/write the graph from/to a string (e.g. to fill a form-field), you can use the following methods:

```javascript
const data = editor.writeGraphModel();
editor.readGraphModel(xmlUtils.parseXml(data));
```
