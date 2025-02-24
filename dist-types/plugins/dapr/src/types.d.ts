/// <reference types="react" />
export interface ApplicationInstance {
    appID: string;
    httpPort: number;
    grpcPort: number;
    appPort: number;
    command: string;
    age: string;
    created: string;
    pid: number;
    replicas: number;
    address: string;
    supportsDeletion: boolean;
    supportsLogs: boolean;
    manifest: JSX.Element;
    status: string;
    labels: string;
    selector: string;
    config: string;
}
export interface ApplicationMetadata {
    id: string;
    runtimeVersion: string;
    enabledFeatures: any;
    actors: MetadataActors[];
    components: Component[];
    subscriptions: Subscription[];
    extended: Extended;
}
export interface MetadataActors {
    type: string;
    count: number;
}
export interface Component {
    name: string;
    type: string;
    version: string;
    capabilities?: string[];
}
export interface Subscription {
    pubsubname: string;
    topic: string;
    deadLetterTopic: string;
    metadata: any;
    rules: Rule[];
}
export interface Rule {
    path: string;
}
export interface Extended {
    daprRuntimeVersion: string;
}
