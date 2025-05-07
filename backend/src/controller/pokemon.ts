import { Router, NextFunction } from "express";
import { Request, Response } from "express";
import { PokemonService } from "../services/pokemon";
import { PokemonFilterRequest } from "../types/pokemon";
import { getPokemonFilterValidator, validator } from "../error/validator";
import { container } from "../container";

const router = Router();

const pokemonService = container.resolve(PokemonService);

type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

const asyncHandler =
  (fn: RouteHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

router.get(
  "/pokemon",
  getPokemonFilterValidator,
  validator,
  asyncHandler(async (req: Request, res: Response) => {
    const filters: PokemonFilterRequest = {
      type: (req.query.type as string) || null,
      ability: (req.query.ability as string) || null,
      page: parseInt(req.query.page as string) || 1,
      pageSize: parseInt(req.query.page_size as string) || 20,
    };
    const pokemonFilterResponse =
      await pokemonService.getPokemonsByFilter(filters);
    res.json(pokemonFilterResponse);
  }),
);

router.get(
  "/pokemon/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const pokemon = await pokemonService.getPokemonDetailById(id);
    res.json(pokemon);
  }),
);

export default router;
