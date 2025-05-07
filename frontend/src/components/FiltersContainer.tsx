import Box from "@mui/material/Box";
import { KindFilter, SimplePokemon } from '../types/types';
import { Filters } from './filters/Filters';

interface FiltersContainerProps{
  onChange: (value: SimplePokemon | null, filter: KindFilter, id?: number) => void
}

export const FiltersContainer = (props: FiltersContainerProps) => {
  const {onChange} = props;

  const kindFilterValues = Object.values(KindFilter).filter(
    (value) => typeof value === "number"
  ) as KindFilter[];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {kindFilterValues.map((filter) =>(
        <Filters key={filter} filter={filter} onChange={onChange}/>
      ))}
    </Box>
  );
}
