import React from 'react';
export declare const daprApi: import("@backstage/frontend-plugin-api").ExtensionDefinition<{
    kind: "api";
    name: "daprApi";
    config: {};
    configInput: {};
    output: import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<import("@backstage/frontend-plugin-api").AnyApiFactory, "core.api.factory", {}>;
    inputs: {};
    params: {
        factory: import("@backstage/frontend-plugin-api").AnyApiFactory;
    };
}>;
export declare const daprEntityContent: import("@backstage/frontend-plugin-api").ExtensionDefinition<{
    kind: "entity-content";
    name: "daprEntityContent";
    config: {
        path: string | undefined;
        title: string | undefined;
        filter: string | undefined;
    };
    configInput: {
        filter?: string | undefined;
        title?: string | undefined;
        path?: string | undefined;
    };
    output: import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<React.JSX.Element, "core.reactElement", {}> | import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<string, "core.routing.path", {}> | import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<import("@backstage/frontend-plugin-api").RouteRef<import("@backstage/frontend-plugin-api").AnyRouteRefParams>, "core.routing.ref", {
        optional: true;
    }> | import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<string, "catalog.entity-content-title", {}> | import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<(entity: import("@backstage/catalog-model/index").Entity) => boolean, "catalog.entity-filter-function", {
        optional: true;
    }> | import("@backstage/frontend-plugin-api").ConfigurableExtensionDataRef<string, "catalog.entity-filter-expression", {
        optional: true;
    }>;
    inputs: {};
    params: {
        loader: () => Promise<JSX.Element>;
        defaultPath: string;
        defaultTitle: string;
        routeRef?: import("@backstage/frontend-plugin-api").RouteRef<import("@backstage/frontend-plugin-api").AnyRouteRefParams> | undefined;
        filter?: string | ((entity: import("@backstage/catalog-model/index").Entity) => boolean) | undefined;
    };
}>;
export declare const entityApplicationSummaryCard: any;
export declare const entityApplicationSubscriptionCard: any;
export declare const entityApplicationComponentsCard: any;
export declare const entityApplicationActorsCard: any;
declare const _default: import("@backstage/frontend-plugin-api").FrontendPlugin<{}, {}, {}>;
export default _default;
