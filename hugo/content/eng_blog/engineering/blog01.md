+++
author = "Nook Harquail, Technical Lead"
blurb = "This post describes the tools we use to build and debug JavaScript, and how our development workflow has evolved over time."
category = "Engineering Blog"
cover = "/_images/blog/eng_blog01_cover.png"
date = "2018-04-17T07:18:38-04:00"
description = ""
layout = "engineering_blog"
title = "Debugging with VSCode and Chrome"
weight = ""

+++

# ![](http://s3.amazonaws.com/static.yieldmo.com/icons/beta/ts_chrome.png)

## Introduction:

At Yieldmo, we develop digital formats (think the frame around art) for advertisers to showcase their advertising on mobile devices. Our formats are designed to encourage consumer interaction with marketing without being intrusive. In other words, we aim to help marketers engage consumers, not enrage them. Yieldmo formats run on a browser or in a webview container, so they&#39;re ultimately comprised of Javascript, HTML and CSS. Our stack is primarily comprised of Typescript and a custom build infrastructure to create the final build artifact that eventually runs on a web page. Being an external library, we need to be a respectful guest in the host environment. This requires diligence in terms of loading weights and the amount of code we bring into any given page. We keep our stack barebones; no external libraries or frameworks are used unless absolutely necessary. This post describes the tools we use to build and debug JavaScript, and how our development workflow has evolved over time.

## What we used to do:

Originally, development and debugging were separate workflows. Developers would set breakpoints or add debugger statements, and inspect their code in Chrome DevTools. For ease of debugging, we would map to the un-minified code using a debugging proxy such as Charles. While debugging, developers switched back and forth between the code editor and the browser&#39;s debugging console. On each change, a webpack watch task would automatically recompile the artifact. This approach has some downsides:

<ul>
<li>Because the code is not minified, there can be differences in behavior from the production build.</li>
<li> Development is slowed by constant switching between editor and debugger.</li>
<li>There is greater room for error with constant context switching. </li>
</ul>
<br>

## What we changed:

Our primary objective was to minimize the context switching and debugging overhead. Our first step was to consolidate debugging and code changing into a single app. Next, we had to ensure that we tested the actual artifact that would eventually be released; debugging using un-minified code risks minification errors. Finally, to reduce cognitive overhead and associated errors, it was essential that our engineers debug the Typescript source. We did not want to debug Javascript and then manually find all the places in the Typescript code that needed to be changed. Thanks to the tooling present, we were able to accomplish this using a setup that is comprised of VSCode, Typescript Source Mapping and the Chrome DevTools Protocol.

## Typescript, sourcemaps and webpack:

Before we dive into the tooling, let&#39;s quickly touch on Typescript. Typescript is a strict superset of Javascript that compiles to Javascript. Typescript lets you select different targets, such as ES5 or ES6 and polyfills features that may not be present in those target versions of Javascript. Take Javascript classes as an example. Classes were a concept introduced in ES6. Typescript provides for polyfills in the case we use a target that does not have these constructs. We use ES5 as our target so we can target older mobile browsers. The benefits of Typescript over Javascript are out of the scope of this post, but we decided to switch over to Typescript because of its maturity as a language over Javascript, and the benefits of strict type checking and IDE tooling.

Next, for execution and debugging purposes, the browser only understands Javascript; not Typescript. This is where sourcemaps come in. Sourcemaps are a way to tell the browser (or another application) how a given line of Javascript maps to a corresponding line of Typescript code. The details of sourcemaps are also out of the scope of this blog post, but we&#39;ll be following up with a more detailed post for sourcemaps soon! In the meanwhile, feel free to [check out the spec](https://sourcemaps.info/spec.html) if you&#39;re interested.

## IDE:

Visual Studio Code is an open-source IDE maintained by Microsoft, which integrates tightly with the Typescript [language service](https://github.com/Microsoft/TypeScript/wiki/Using-the-Language-Service-API). This integration with Typescript enables powerful editing features including code completion, inline compilation errors, and refactoring tools. We use VS Code for everyday development, so it&#39;s convenient to be able to set breakpoints and debug from the IDE as well.

## Chrome DevTools Protocol:

The Chrome DevTools Protocol allows external tools to interact with the debugging console, via websockets or a Javascript API. The --remote-debugging-port flag on Chrome enables this feature. For example, a client would request _http://localhost:{port}/json_, to get the available tabs. This returns a list of available tabs and websocket urls. The client can then send messages via a websocket connection to affect the debugger (e.g., to set a breakpoint), and listen to messages on the same websocket connection (e.g., to read log messages from the console).

For full details on the protocol, visit [https://chromedevtools.github.io/devtools-protocol/](https://chromedevtools.github.io/devtools-protocol/)

 ![](http://s3.amazonaws.com/static.yieldmo.com/icons/beta/blog2.png)

## All the pieces of the puzzle:

Putting all the puzzle pieces together; the basic steps for getting debugging to work with VSCode and Chrome are:

1. Install the Debugger for Chrome extension <br>
2. Set up an appropriate Launch Configuration in Code <br>
3. Enable Chrome in debugging mode <br>
4. Serve local build artifact<br>
5. Attach Code to the Chrome debugger by choosing Start Debugging from the Debug menu in Code; Select the tab that is running<br>
6. Debug!

Let&#39;s dive into the details and configurations for each of these steps.

Install the Debugger for Chrome extension:

VSCode provides a really nice way to install extensions using the Extensions button on the side panel. You can search for extensions by typing in the search bar. The panel will show you all extensions available on the VSCode marketplace: [https://marketplace.visualstudio.com/vscode](https://marketplace.visualstudio.com/vscode).

 ![](http://s3.amazonaws.com/static.yieldmo.com/icons/beta/blog3.png)

You’ll need to reload your VSCode once you’ve installed the extension.
    
P.S.: You can download and install VSCode from https://code.visualstudio.com/.

## Set up an appropriate Launch Configuration in Code
VSCode allows you to build launch configurations. A launch configuration is a JSON file that lets you save debugging details and set up. You can read more about launch configurations here: https://code.visualstudio.com/docs/editor/debugging#_launch-configurations.

You can store all VSCode IDE related configs in a directory named .vscode at the root level of your project, and commit that directory to your VCS. That way, every engineer on your team ends up using the same set of IDE configs and settings. You can always do user level overrides if need be.

You can create a launch.json file in the .vscode directory, or you can click on the Debug button on the left side panel to have the debugger window show up, and create a launch config from within there.

![](http://s3.amazonaws.com/static.yieldmo.com/icons/beta/blog4.png)


Here&#39;s the launch configuration that we use:

		{

		 // Use IntelliSense to learn about possible attributes.

 		// Hover to view descriptions of existing attributes.

		 // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387

 		"version": "0.2.0",

		 "configurations": [

	   {

	     "type": "chrome",

	     "request": "attach",

	     "name": "Attach to Chrome",

	     "port": 9222,

	     "webRoot": "${workspaceFolder}"

	   },

	 ],

	}

Note, that we use port: 9222. In the next step, we&#39;ll be instructing Chrome DevTools to expose the API on the same port as well.

# Enable Chrome in Debugger Mode

Chrome needs to be restarted in debugger mode. Here&#39;s the command that we run to do that:

&#39;/Applications/Google Chrome.app/Contents/MacOS/Google Chrome&#39; --remote-debugging-port=9222 --user-agent=&#39;Mozilla/5.0 (iPhone; CPU iPhone OS 11\_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1&#39; --auto-open-devtools-for-tabs &#39;https://testpage.com&#39;

Note that the --remote-debugging-port flag has a value of 9222, which is the same port that we asked VSCode to attach the debugger on, in the previous step.

### Serve local build artifact

As mentioned before, we use Webpack to build and package our artifact. Webpack configuration defines how assets are bundled and adds tools for minification and source mapping. We use webpack-dev-server to serve assets, and use the &#39;inline-cheap-source-map&quot; option for source mapping or an external source map.

Here&#39;s the command we use to run the webpack dev server:
./node\_modules/webpack-dev-server/bin/webpack-dev-server.js --https --hot -d --lazy

We&#39;ve added a &quot;serve&quot; command to the script section of our package.json which combines to above two steps to do the following:

&quot;serve&quot;: &quot;&#39;/Applications/Google Chrome.app/Contents/MacOS/Google Chrome&#39; --remote-debugging-port=9222 --user-agent=iPhone --auto-open-devtools-for-tabs &#39;https://testpage.com&#39; &amp; ./node\_modules/webpack-dev-server/bin/webpack-dev-server.js --https --hot -d --lazy&quot;

### Attach Code to the Chrome debugger

Once you run the command we&#39;ve outlined above, you&#39;ll have webpack dev server serving the build artifact, and Chrome open in Debugger mode, with the DevTools listening on the prt defined earlier (9222 in this case).

To start debugging, choose &quot;Start Debugging&quot; from the Debug menu in Code. Select the tab that is running.

 ![](http://s3.amazonaws.com/static.yieldmo.com/icons/beta/blog5.png)

### Debug

That&#39;s it! You&#39;re now all set to set breakpoints, inspect the call stack, and seamlessly navigate the source code. Here&#39;re a few screenshots of what it looks like for us.

## What we learned:

To conclude, we went over the various steps involved in connecting VSCode Debugger to listen to Chrome DevTools, and how we use WebPack Dev Server to serve our built artifact. We hope you found this guide useful, and that these technologies help you in your debugging journey!
