# <%=title%>

#### Embed code

```
<div id="<%=slug%>"></div>

<script src="//pym.nprapps.org/pym.v1.min.js"></script>
<script>new pym.Parent('<%=slug%>', 'http://www.politico.com/interactives/<%=path%>', {})</script>
```

**NOTE:** If you change the `publishPath` in `meta.json`, you need to adjust the URL in this code, as well.

#### Responsive iframes

We use [pym.js](http://blog.apps.npr.org/pym.js/) to create responsive embeds.

By default, your app has been setup to correctly adjust the height of your iframe on the parent page using the library. If, however, you have dynamic content that updates your embed's height, then you need to explicitly call pym's `sendHeight` method in the child page:

```javascript
import pym from 'pym.js';

const pymChild = new pym.Child();
pymChild.sendHeight(); // Sets initial height

const functionThatChangesContentHeight = () =>{
    // Do stuff here that changes content height...

    // Call sendHeight to update iframe height on parent page
    pymChild.sendHeight();
};


functionThatChangesContentHeight();
```

Sometimes, if you have animations associated with your transitions, you may want to delay the `sendHeight` call. Simply add a timeout:

```javascript
window.setTimeout(() => {pymChild.sendHeight();}, 500);
```

#### To publish

Make sure you have the correct publish path set in `meta.json` and that you've correctly filled in you AWS access keys in `aws.json`. Then run:

```bash
$ gulp publish
```

Unless you've changed your publishPath in meta.json, your project will be published at:

**[http://www.politico.com/interactives/<%=path%>](http://www.politico.com/interactives/<%=path%>)**
