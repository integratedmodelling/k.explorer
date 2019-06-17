/*******************************************************************************
 * Copyright (c) 2017 TypeFox GmbH (http://www.typefox.io) and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import * as snabbdom from "snabbdom-jsx"
import { VNode } from "snabbdom/vnode"
import {
    RenderingContext, SEdge, IView, PolylineEdgeView, RectangularNodeView, CircularNodeView,
    Point, toDegrees, SLabel, angleOfPoint
} from "sprotty/lib"
import { KlabElkNode, ElkPort, ElkJunction } from "./sprotty-model"

const JSX = {createElement: snabbdom.svg};

export class ElkNodeView extends RectangularNodeView {
    render(node: KlabElkNode, context: RenderingContext): VNode {
        let classNames = `elknode ${node.hoverFeedback ? 'mouseover ' : ''}${node.selected ? 'selected ' : ''}${node.status} elk-${node.nodeType}`;
        return <g>
            <rect
                classNames={classNames}
                x="0" y="0" width={node.bounds.width} height={node.bounds.height}
            />
            { context.renderChildren(node) }
        </g>
    }
}

export class ElkPortView extends RectangularNodeView {
    render(port: ElkPort, context: RenderingContext): VNode {
        return <g>
            <rect
                class-elkport={true}
                class-mouseover={port.hoverFeedback}
                class-selected={port.selected}
                x="0" y="0" width={port.bounds.width} height={port.bounds.height}/>
            { context.renderChildren(port) }
        </g>
    }
}

export class ElkEdgeView extends PolylineEdgeView {
    protected renderLine(edge: SEdge, segments: Point[], context: RenderingContext): VNode {
        const firstPoint = segments[0];
        let path = `M ${firstPoint.x},${firstPoint.y}`;
        for (let i = 1; i < segments.length; i++) {
            const p = segments[i];
            path += ` L ${p.x},${p.y}`
        }
        return <path class-elkedge={true} d={path}/>
    }

    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2];
        const p2 = segments[segments.length - 1];
        return [
            <path class-edge={true} class-arrow={true} d="M 0,0 L 8,-3 L 8,3 Z"
                  transform={`rotate(${toDegrees(angleOfPoint({ x: p1.x - p2.x, y: p1.y - p2.y }))} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}/>
        ]
    }
}

export class ElkLabelView implements IView {
    render(label: SLabel, context: RenderingContext): VNode {
        /*
        let style = null;
        if (typeof label.layoutOptions !== "undefined"){
            if (typeof label.layoutOptions["org.eclipse.elk.font.name"] !== 'undefined') {
                style = `font-family: '${label.layoutOptions["org.eclipse.elk.font.name"]}';`;
            }
            if (typeof label.layoutOptions["org.eclipse.elk.font.size"] !== 'undefined') {
                style += `font-size: '${label.layoutOptions["org.eclipse.elk.font.size"]}pt';`;
            }
        }
        */
        return <text class-elklabel={true}>{label.text}</text>
    }
}

export class JunctionView extends CircularNodeView {
    render(node: ElkJunction, context: RenderingContext): VNode {
        const radius = this.getRadius(node);
        return <g>
            <circle class-elkjunction={true} r={radius}/>
        </g>
    }

    protected getRadius(node: ElkJunction): number {
        return 2;
    }
}
