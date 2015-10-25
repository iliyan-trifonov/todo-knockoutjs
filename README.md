## TODO with Knockout.js
TODO app created with [Knockout.js](http://knockoutjs.com/)/[jQuery](https://jquery.com/).
You can add new items, set them as completed, delete them.

[See it in action here](https://todo-knockoutjs.iliyan-trifonov.com "TODO with Knockout.js").

### Install
Go to the root of the app and run:

    bower install
    
This will install Knockout.js and jQuery in src/vendor.

### Run
Open [src/index.html](src/index.html) in your browser. You need a modern browser supporting the local storage.
There are 3 sample TODOs which you can complete and delete.
You can add new ones. Everything is saved in the local storage of the browser.
The local storage key is called `data` and is read once on app load.
On add, complete and delete events all of the todos are saved back in the storage.
