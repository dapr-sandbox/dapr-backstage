import { DAPR_APPLICATION_ID } from '../annotations';
import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';

/**
 * Returns true if the catalog entity contains the dapr annotation `dapr.io/application-id`.
 *
 * @public
 */

export const isDaprAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[DAPR_APPLICATION_ID]);

export const daprApplicationId = () => {
  const { entity } = useEntity();

  if (isDaprAvailable(entity)) {
    const dapr_application_id =
      entity.metadata.annotations?.[DAPR_APPLICATION_ID] ?? '';
    return dapr_application_id;
  }

  throw new Error("'Dapr' annotations are missing");
};
