import { KafkaIcon } from './KafkaIcon';
import { RedisIcon } from './RedisIcon';

const serviceIcons = {
  kafka: KafkaIcon,
  redis: RedisIcon,
};

export const getIcon = (type: string) => {
  if (!type) return null;
  return serviceIcons[type as keyof typeof serviceIcons] ?? null;
};
