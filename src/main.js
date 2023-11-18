const Graph = require("./Graph");
const data = require("./data.json");

const graph = new Graph();

graph.fill(data)

const startNode = "A";
const shortestDistances = graph.dijkstra(startNode);

console.log(`Menores distâncias a partir do nó ${startNode}:`, shortestDistances);
