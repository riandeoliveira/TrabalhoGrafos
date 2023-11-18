const Graph = require("./classes/Graph");
const data = require("./data/graph.json");

const graph = new Graph();

graph.fill(data)

const startNode = "A";
const shortestDistances = graph.dijkstra(startNode);

console.log(`Menores distâncias a partir do nó ${startNode}:`, shortestDistances);
