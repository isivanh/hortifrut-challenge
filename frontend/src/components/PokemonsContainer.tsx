import { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import { KindFilter, SimplePokemon } from "../types/types";
import { PokemonCard } from "./PokemonCard";
import { getPokemonsByFilter } from "../services/pokemon";

interface PockemonsContainerProps{
  pokemons: SimplePokemon | null,
  types?: number | null,
  abilities?: number | null,
  filter: KindFilter | null,
}

export const PokemonsContainer = (props: PockemonsContainerProps) => {
  const { pokemons, filter, types, abilities } = props;
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (filter === KindFilter.NAME) {
        const newList = pokemons ? [pokemons] : [];
        setFilteredPokemons(prev =>
          prev.length === newList.length && prev[0]?.name === newList[0]?.name
            ? prev
            : newList
        );
        setPage(1);
        setTotalPages(1);
      } else {
        const data = await getPokemonsByFilter(10, page, types ?? undefined, abilities ?? undefined);
        setFilteredPokemons(prev =>
          prev.length === data.pokemons.length && prev.every((p, i) => p.name === data.pokemons[i].name)
            ? prev
            : data.pokemons
        );
        setPage(data.page);
        setTotalPages(data.total_pages);
      }
    };

    fetchPokemons();
  }, [pokemons, filter, types, abilities, page]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Pagination count={totalPages} page={page} color="primary" onChange={handleChange} />
      </Grid>
      {filteredPokemons.map((pokemon) => (
        <Grid size={{xs:12, sm:6, md:4, lg:3}} key={pokemon.name}>
          <PokemonCard name={pokemon.name} id={pokemon.id} />
        </Grid>
      ))}
  </Grid>
  );
}

