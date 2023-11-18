/**
 * Classe responsável pelos atributos e métodos do Grafo.
 */
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Map();
  }

  /**
   * Adiciona uma aresta ao grafo.
   */
  addEdge(v, w, weight = 1) {
    if (!this.adjList.get(v)) this.addVertex(v);
    if (!this.adjList.get(w)) this.addVertex(w);

    this.adjList.get(v).push({ node: w, weight });

    if (!this.isDirected) this.adjList.get(w).push({ node: v, weight });
  }

  /**
   * Adiciona um vértice ao grafo.
   */
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  /**
   * Limpa os dados do grafo.
   */
  clear() {
    this.adjList = new Map();
    this.isDirected = false;
    this.vertices = [];
  }

  dijkstra(start) {
    const distances = {};
    const unvisited = new Set(this.vertices);

    for (const vertex of this.vertices) {
      distances[vertex] = vertex === start ? 0 : Infinity;
    }

    while (unvisited.size > 0) {
      const currVertex = this.getMinDistanceVertex(distances, unvisited);

      if (distances[currVertex] === Infinity) break;

      const neighbors = this.adjList.get(currVertex);

      for (const neighborObj of neighbors) {
        const neighbor = neighborObj.node;
        const newDistance = distances[currVertex] + neighborObj.weight;

        if (newDistance < distances[neighbor]) distances[neighbor] = newDistance;
      }

      unvisited.delete(currVertex);
    }

    return distances;
  }

  /**
   * Monta o grafo com os dados informados.
   */
  fill(data) {
    data.forEach((edge) => this.addEdge(edge.v, edge.w, edge.weigth));
  }

  /**
   * Retorna a lista de adjacência.
   */
  getAdjList() {
    return this.adjList;
  }

  getMinDistanceVertex(distances, unvisited) {
    let minDistance = Infinity;
    let minVertex = null;

    for (const vertex of unvisited) {
      if (distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        minVertex = vertex;
      }
    }

    return minVertex;
  }

  /**
   * Retorna a lista de vértices.
   */
  getVertices() {
    return this.vertices;
  }

  /**
   * Formata a exibição do grafo para uma visualização mais adequada.
   */
  toString() {
    let s = "";

    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;

      const neighbors = this.adjList.get(this.vertices[i]);

      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j].node}(${neighbors[j].weight}) `;
      }

      s += "\n";
    }

    return s;
  }
}

module.exports = Graph;
