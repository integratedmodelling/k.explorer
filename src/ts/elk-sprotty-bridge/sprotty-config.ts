/*******************************************************************************
 * Copyright (c) 2017 TypeFox GmbH (http://www.typefox.io) and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
// TODO license things
import { Container, ContainerModule } from "inversify"
import {
  TYPES,
  defaultModule,
  boundsModule,
  viewportModule,
  selectModule,
  moveModule,
  hoverModule,
  exportModule,
  SGraphView,
  ConsoleLogger,
  LogLevel,
  configureViewerOptions,
  SvgExporter,
  configureModelElement,
  SGraph,
  SLabel,
  LocalModelSource,
  modelSourceModule,
  routingModule,
  graphModule,
  updateModule,
  zorderModule,
  edgeEditModule
} from "sprotty/lib"
import { ElkNodeView, ElkPortView, ElkEdgeView, ElkLabelView, JunctionView } from "./views"
import { KlabElkNode, ElkPort, ElkEdge, ElkJunction, /* ClickHandlerInitializer /*, HoverHandlerInitializer */} from "./sprotty-model";

class FilteringSvgExporter extends SvgExporter {
    protected isExported(styleSheet: CSSStyleSheet): boolean {
        return styleSheet.href !== null && (styleSheet.href.endsWith('diagram.css') || (styleSheet.href.endsWith('sprotty.css')))
    }
}

export function createContainer({ needsClientLayout = false, needsServerLayout = !needsClientLayout }, logLevel = 'warn') {
    const logLevelObj = logLevel === 'debug' ? LogLevel.log : logLevel === 'info' ? LogLevel.info : logLevel ==='warn'
        ? LogLevel.warn : logLevel === 'error' ? LogLevel.error : LogLevel.none;
    const elkGraphModule = new ContainerModule((bind, unbind, isBound, rebind) => {
        bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
        rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
        rebind(TYPES.LogLevel).toConstantValue(logLevelObj);
        // rebind(TYPES.IModelFactory).to(SGraphFactory).inSingletonScope();
        rebind(TYPES.SvgExporter).to(FilteringSvgExporter).inSingletonScope();
        const context = { bind, unbind, isBound, rebind };
        configureModelElement(context, 'graph', SGraph, SGraphView);
        configureModelElement(context, 'node', KlabElkNode, ElkNodeView);
        configureModelElement(context, 'port', ElkPort, ElkPortView);
        configureModelElement(context, 'edge', ElkEdge, ElkEdgeView);
        configureModelElement(context, 'label', SLabel, ElkLabelView);
        configureModelElement(context, 'junction', ElkJunction, JunctionView);
        configureViewerOptions(context, {
            needsClientLayout, // : false
            needsServerLayout //: false
        });
    });
    const container = new Container();
    container.load(
      defaultModule,
      selectModule,
      boundsModule,
      moveModule,
      // fadeModule,
      hoverModule,
      viewportModule,
      exportModule,
      edgeEditModule,
      modelSourceModule,
      elkGraphModule,
      routingModule,
      graphModule,
      updateModule,
      zorderModule
    );
    return container;
}

