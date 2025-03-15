# Here I document the questions I had along with their answers on solving ch1 exercises

**In `reactTestExtensions.js` file, how are we using
the `document.createElement()` to create an element even though we
are not in the browser ?**

=> Since we have configured jest to use jsdom, we don't need to
manually instantiate an instance of it and use it .   
Jest will use it directly on running tests . 