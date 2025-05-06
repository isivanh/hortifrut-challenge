import { Router } from 'express';
import pokemon from './controller/pokemon';
import types from './controller/type';
import abilities from './controller/ability';

const api = Router()
  .use(pokemon)
  .use(types)
  .use(abilities);

export default Router().use('/v1', api);