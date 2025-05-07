import { Router, NextFunction } from 'express';
import { Request, Response } from 'express';
import { getPokemons, getPokemonByName, getPokemonsByFilter } from '../services/pokemon';
import { Filter } from '../types/pokemon';


const router = Router();

type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: RouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  '/pokemon',
  asyncHandler(async (req: Request, res: Response) => {
    const values = await getPokemons();
    res.send(values);
  }),
);

router.post(
  '/pokemon',
  asyncHandler(async (req: Request, res: Response) => {
    const { limit, offset, abilities, types } = req.body;
    const limitValue = Number(limit) || 20;
    const offsetValue = Number(offset) || 0;
    const abilitiesValue = Array.isArray(abilities) ? abilities : null;
    const typesValue = Array.isArray(types) ? types : null;
    const filter: Filter = {
      limit: limitValue,
      offset: offsetValue,
      abilities: abilitiesValue,
      types: typesValue,
    };
    const values = await getPokemonsByFilter(filter);
    res.send(values);
  }),
);

router.get(
  '/pokemon/:name',
  asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;
    const pokemon = await getPokemonByName(name);
    if (!pokemon) {
      return res.status(404).send({ error: 'Pokemon not found' });
    }
    res.send(pokemon);
  }),
);

export default router;
