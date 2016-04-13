# TodoMVC Benchmarking

Used for benchmarking and comparing performance with Redux (see also https://github.com/mweststrate/redux-todomvc).
The main question: what are the performing impacts of a single change when the state size increases.

Surely nobody will render 10.000 todo items, but to know whether we can several thousand of components in visualizations with support drag and drop, this benchmark is a nice indication 
whether rendering speed is roughly O(1) or O(n). 

See the discussion around: https://twitter.com/mweststrate/status/718444275239882753

## Running:
* `npm install`
* `npm start`

## Profiling:

* `npm install`
* `npm run build`
* Open index.html

Profiling is done by using the chrome developers tool, profiles > collect CPU profile > record > change todo items > stop recording > Chart view > Take the average of the "Total Time" of the different stacks you see. Skip the first one as that one is usually slower (probably JIT initialization and such) 