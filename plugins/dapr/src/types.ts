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
  manifest: string;
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

export interface ComponentDetails {
  name: string;
  kind: string;
  type: string;
  created: string;
  age: string;
  scopes: null | string[];
  manifest: {
    kind: string;
    apiVersion: string;
    metadata: {
      name: string;
      namespace: string;
      uid: string;
      resourceVersion: string;
      generation: number;
      creationTimestamp: string;
      labels: Record<string, string>;
      annotations: Record<string, string>;
      managedFields: Array<{
        manager: string;
        operation: string;
        apiVersion: string;
        time: string;
        fieldsType: string;
        fieldsV1: Record<string, any>;
      }>;
    };
    spec: {
      type: string;
      version: string;
      ignoreErrors: boolean;
      metadata: Array<{
        name: string;
        value: string | null;
        secretKeyRef: {
          name: string;
          key: string;
        };
      }>;
      initTimeout: string;
    };
    auth: {
      secretStore: string;
    };
  };
}
