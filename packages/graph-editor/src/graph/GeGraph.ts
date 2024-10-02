import {
  cloneUtils,
  Graph,
  GraphDataModel,
  Stylesheet,
  InternalEvent,
  EventObject,
  eventUtils,
  CellState,
  Point,
  InternalMouseEvent,
  mathUtils,
  SelectionCellsHandler,
  PanningHandler,
  Rectangle,
  Shape,
  Cell
} from "@maxgraph/core";

export class GeGraph extends Graph {

  themes: any;
  currentEdgeStyle: any;
  currentVertexStyle: any;
  standalone: boolean | null | undefined;

  defaultThemes: GeGraph["themes"];

  defaultEdgeStyle: GeGraph["currentEdgeStyle"];

  defaultVertexStyle: GeGraph["currentVertexStyle"];

  baseUrl: string = ""

  domainUrl: string;

  domainPathUrl: string;

  pageBreakColor = "#c0c0c0";

  pageScale = 1;

  edgeMode: any;

  constructor(
    container: HTMLElement,
    model: GraphDataModel,
    stylesheet: Stylesheet,
    themes: any,
    standalone: boolean | null | undefined
  ) {
    super(container, model, undefined, stylesheet);
    this.themes = themes || this.defaultThemes;
    this.currentEdgeStyle = cloneUtils.clone(this.defaultEdgeStyle);
    this.currentVertexStyle = cloneUtils.clone(this.defaultVertexStyle);
    this.standalone = (standalone != null) ? standalone : false;

    // Sets the base domain URL and domain path URL for relative links.

    const b = this.baseUrl;
    const p = b.indexOf("//");
    this.domainUrl = "";
    this.domainPathUrl = "";
    if (p > 0) {
      let d = b.indexOf("/", p + 2);
      if (d > 0) {
        this.domainUrl = b.substring(0, d);
      }
      d = b.lastIndexOf("/");
      if (d > 0) {
        this.domainPathUrl = b.substring(0, d + 1);
      }
    }

    if (this.edgeMode) {
      const start: { point: Point | null, event: InternalMouseEvent | null, state: CellState | null, handle: any, selected: boolean } = {
        point: null,
        event: null,
        state: null,
        handle: null,
        selected: false,
      };

      this.addListener(InternalEvent.FIRE_MOUSE_EVENT, (sender: any, evt: EventObject) => {
        if (evt.getProperty("eventName") == "mouseDown" && this.isEnabled()) {
          const me = evt.getProperty("event") as InternalMouseEvent;
          const state = me.getState();
          if (eventUtils.isAltDown(me.getEvent()) && state != null) {
            if (state.cell.isEdge()) {
              start.point = new Point(me.getGraphX(), me.getGraphY());
              start.selected = this.isCellSelected(state.cell);
              start.state = state;
              start.event = me;

              if (
                state.text != null
                && state.text.boundingBox != null
                && mathUtils.contains(state.text.boundingBox, me.getGraphX(), me.getGraphY())
              ) {
                start.handle = InternalEvent.LABEL_HANDLE;
              }
              else {
                const handler = this.getPlugin<SelectionCellsHandler>("selectionCellsHandler").getHandler(state.cell);
                if (
                  handler != null
                  && "bends" in handler
                  && handler.bends != null
                  && handler.bends.length > 0
                ) {
                  start.handle = handler.getHandleForEvent(me);
                }
              }
            }
            else if (
              !this.getPlugin<PanningHandler>("panningHandler").isActive()
              && !eventUtils.isControlDown(me.getEvent())
            ) {
              const handler = this.getPlugin<SelectionCellsHandler>("selectionCellsHandler").getHandler(state.cell);
              if (handler == null || handler.getHandleForEvent(me) == null) {
                const box = new Rectangle(me.getGraphX() - 1, me.getGraphY() - 1);
                box.grow(eventUtils.isTouchEvent(me.getEvent()) ?
                  Shape.prototype.svgStrokeTolerance - 1 :
                  (Shape.prototype.svgStrokeTolerance + 1) / 2
                );
                if (this.isTableCell(state.cell) && !this.isCellSelected(state.cell)) {

                }
              }
            }
          }
        }
      });
    }

  }

  isTableCell(cell: Cell) {
    return cell.isVertex() && this.isTableRow(this.model.get)
  }


}