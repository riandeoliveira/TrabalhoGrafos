const Graph = require("../Graph")
const data = require("../data.json")

const graph = new Graph()

describe("Testes da classe Graph e seus métodos", () => {
  beforeEach(() => {
    graph.clear();
    graph.fill(data);
  });

  it("Deveria exibir o grafo corretamente a partir de um nó inicial", () => {
    const startNode = "A";

    expect(graph.dijkstra(startNode)).toEqual({
      A: 0, B: 1, C: 4,
      D: 5, E: 4, F: 3,
      G: 7, H: 11, I: 9
    })
  });

  it("Deveria exibir o grafo corretamente com a formatação adequada", () => {
    expect(graph.toString().replace(/\s/g, '').replace(/\n/g, ' ')).toBe("A->B(1)C(4)D(5)B->A(1)E(3)F(2)C->A(4)D(7)G(10)D->A(5)C(7)G(2)H(6)E->B(3)I(5)F->B(2)I->E(5)G->C(10)D(2)H->D(6)");
  });

  it("Deveria limpar todos os dados do grafo", () => {
    graph.clear();

    expect(graph.getAdjList()).toEqual(new Map());
    expect(graph.getVertices()).toEqual([]);
    expect(graph.isDirected).toBe(false);
  })

  it("Deveria retornar a lista de adjacência corretamente", () => {
    expect(JSON.stringify(Object.fromEntries(graph.getAdjList()))).toBe('{"A":[{"node":"B","weight":1},{"node":"C","weight":4},{"node":"D","weight":5}],"B":[{"node":"A","weight":1},{"node":"E","weight":3},{"node":"F","weight":2}],"C":[{"node":"A","weight":4},{"node":"D","weight":7},{"node":"G","weight":10}],"D":[{"node":"A","weight":5},{"node":"C","weight":7},{"node":"G","weight":2},{"node":"H","weight":6}],"E":[{"node":"B","weight":3},{"node":"I","weight":5}],"F":[{"node":"B","weight":2}],"I":[{"node":"E","weight":5}],"G":[{"node":"C","weight":10},{"node":"D","weight":2}],"H":[{"node":"D","weight":6}]}');
  })

  it("Deveria retornar a lista de vértices corretamente", () => {
    expect(graph.getVertices()).toEqual(["A", "B", "C", "D", "E", "F", "I", "G", "H"]);
  })

  it("Deveria soltar um erro quando o peso (weight) for menor que zero", () => {
    data[0].weight = -1;

    expect(() => graph.fill(data)).toThrow("O peso não pode ser menor que 0");
  });
})
