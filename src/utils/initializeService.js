import Azure from '../services/Azure';
import Firebase from '../services/Firebase';
import { loadCache } from './cache';

const initializeService = () => {
  const service = loadCache('service');
  return service === 'azure' ? new Azure() : new Firebase();
};

export default initializeService;
