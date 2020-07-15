import Heroku from '../services/Heroku';
import Firebase from '../services/Firebase';
import { loadCache } from './cache';

const initializeService = () => {
  const service = loadCache('service');
  return service === 'azure' ? new Heroku() : new Firebase();
};

export default initializeService;
