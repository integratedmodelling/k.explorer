/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import { SGraphSchema } from 'sprotty/lib';
import { KlabElkNode } from './elkgraph-json';
export declare class ElkGraphJsonToSprotty {
    private nodeIds;
    private edgeIds;
    private portIds;
    private labelIds;
    private sectionIds;
    transform(elkGraph: KlabElkNode): SGraphSchema;
    private transformElkNode;
    private transformElkPort;
    private transformElkLabel;
    private transformElkEdge;
    private pos;
    private size;
    private checkAndRememberId;
}
