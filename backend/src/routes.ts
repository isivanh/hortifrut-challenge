import { Router } from "express";
import types from "./controller/pokemon-type";
import ability from "./controller/ability";
import pokemon from "./controller/pokemon";

const api = Router().use(types).use(ability).use(pokemon);

export default Router().use("/v1", api);
