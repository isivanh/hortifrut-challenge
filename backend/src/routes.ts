import { Router } from "express";
import types from "./controller/pokemon-type";

const api = Router().use(types);

export default Router().use("/v1", api);
