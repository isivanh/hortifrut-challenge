import {SyntheticEvent, useState, Fragment} from 'react';
import { KindFilter, SimpleAbility, SimplePokemon, SimpleType } from "../../types/types";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import { getPokemons } from "../../services/pokemon";
import { getTypes } from "../../services/types";
import { getAbilities } from "../../services/ability";

const CACHE_KEY_PREFIX = "filters-cache-";

const getValues = async (filter: KindFilter): Promise<SimplePokemon[]| SimpleAbility[]|SimpleType[]> => {
  const cacheKey = `${CACHE_KEY_PREFIX}${filter}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached && cached.length > 0) {
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  let result: SimplePokemon[] | SimpleAbility[] | SimpleType[] = [];
  if (filter === KindFilter.NAME) {
    result = await getPokemons(100, 1);
  } else if (filter === KindFilter.TYPE) {
    result = await getTypes(100, 1);
  } else if (filter === KindFilter.ABILITY) {
    result = await getAbilities(100, 1);
  }

  localStorage.setItem(cacheKey, JSON.stringify(result));
  return result;
}

interface FiltersProps{
  filter: KindFilter,
  onChange: (value: SimplePokemon | null, filter: KindFilter, id?: number) => void,
}

export const Filters = (props: FiltersProps) => {
  const {filter, onChange} = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SimplePokemon[]| SimpleAbility[]|SimpleType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      const pokemons = await getValues(filter);
      setLoading(false);

      setOptions([...pokemons]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleChange = (_: SyntheticEvent, value: SimplePokemon | SimpleAbility | SimpleType | null) => {
      onChange(value, filter, value?.id);
  };

  return (
    <Box width="100%">
      <Autocomplete
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={KindFilter[filter].toLowerCase()}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              },
              inputLabel: {
                sx: {
                  fontWeight: 400,
                  textTransform: "capitalize",
                  fontSize: "0.9rem",
                  letterSpacing: 1,
                },
              },
            }}
          />
        )}
      />
    </Box>  
    
  )
}