# Issues & Open Questions

* how do we publish this package with the browser extension? how does the browser load the browser extension if not with a local path?
* how do we do integration & automated testing? is this feasable in a github action (like in https://github.com/JonasGruenwald/chrobot?tab=readme-ov-file#github-actions)

## Answered
### how do we serialize references from erlang to javascript world? (f.e. elements on the page)
-> once we query an element we add a `data-` attribute with a random id (`crypto.randomUUID()`) and return that to the server
