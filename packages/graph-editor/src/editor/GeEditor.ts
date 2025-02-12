import { Graph, GraphDataModel } from 'packages/core/src';

export class GeEditor {
  chromeless: any;

  graph: Graph;

  editable: any;

  undoManager: any;

  status: any;

  constructor(
    chromeless: boolean | null | undefined,
    themes: any,
    model: GraphDataModel,
    graph: Graph | null | undefined,
    editable: any
  ) {
    //EventSource.call(this);
    this.chromeless = chromeless != null ? chromeless : this.chromeless;
    this.initStencilRegistry();
    this.graph = graph || this.createGraph(themes, model);
  }

  initStencilRegistry() {}

  createGraph(themes: any, model: GraphDataModel) {
    const graph = new Graph(null, model, undefined, null);
  }
}
