import { useState } from 'react'
import { Grid, Container, Typography } from "@mui/material";
import './App.css'
import {KindFilter, SimplePokemon} from "./types/types"
import {FiltersContainer} from "./components/FiltersContainer"
import { PokemonsContainer } from './components/PokemonsContainer';

function App() {
  const [search, setSearch] = useState< SimplePokemon | null>(null);
  const [types, setTypes] = useState<number | null>(null);
  const [abilities, setAbilities] = useState<number | null>(null);
  const [filter, setFilter] = useState<KindFilter | null>(null);

  const onChangeFilter = (value: SimplePokemon | null, filter: KindFilter, id?: number) => {
    if (filter === KindFilter.TYPE) {
      setTypes(id ?? null);
    } else if (filter === KindFilter.ABILITY) {
      setAbilities(id ?? null);
    } else {
      setSearch(value);
    }
    setFilter(filter);
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, mb: 4, bgcolor: "background.default" }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            Simple Pokedex
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FiltersContainer onChange={onChangeFilter}/>
        </Grid>
        <Grid
          size={{ xs: 12, md: 9 }}
          sx={{ mb: 2, bgcolor: "background.default" }}
        >
          <PokemonsContainer 
            pokemons={search}
            filter={filter}
            types={types}
            abilities={abilities}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
