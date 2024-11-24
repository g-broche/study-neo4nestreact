Things to take a look at in the future :

Possibility of defining a node value as being unique among all nodes of this label through constraints in the graph db itself or must this be handled in the backend.
=> resolved, see baseDB file for implementing such constraints in the database

How updating & deleting is usually done in graph in regards to identifier : must include id property to a node (or other uniquely defined value) or can use a graph db nodeid ?
=> resolved by adding an id property with a unique constraint in case the node type doesn't have an other property holding a value that can be guaranteed to remain unique when adding more data (case : two videos could have the same title so an id becomes necessary).
=> to provide consistency in id incrementation, a new node type can be added which will hold properties reflecting the last entered
id when creating a new node of a type requiring an id. This id can then be requested and incremented before use as the new node's id value.