import { Entity } from '@backstage/catalog-model';
/**
 * Returns true if the catalog entity contains the dapr annotation `dapr.io/application-id`.
 *
 * @public
 */
export declare const isDaprAvailable: (entity: Entity) => boolean;
export declare const daprApplicationId: () => string;
