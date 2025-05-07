import { useState, Fragment, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import question from "../assets/question.png";
import CircularProgress from '@mui/material/CircularProgress';
import { PokemonDetail } from "../types/types";
import { getPokemonByName } from "../services/pokemon";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};
interface PokemonCardProps {
  name: string;
  id: number;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const { name, id } = props;
  const [open, setOpen] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      getPokemonByName(name)
        .then((data) => setPokemon(data))
        .finally(() => setLoading(false));
    }
  }, [open, name]);

  return (
    <Fragment>
      <Card 
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          borderRadius: 2,
        }}
        onClick={handleOpen} 
      >
        <CardMedia
          component="img"
          height="200"
          image={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + id + ".svg"}
          alt={name}
          sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = question;
          }}
        />
        <CardContent>
          <Typography 
            variant="h5"
            align="center"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "1.1rem",
              letterSpacing: 1,
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : pokemon ? (
            <>
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <img
                  src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + id + ".svg" || question}
                  alt={pokemon.name}
                  style={{ width: 120, height: 120, objectFit: "contain", background: "#f5f5f5", borderRadius: 8 }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = question;
                  }}
                />
                <Typography variant="h6" sx={{ mt: 1, textTransform: "capitalize" }}>
                  {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Height: {pokemon.height} | Weight: {pokemon.weight}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Types: {pokemon.types.map(t => t.name).join(", ")}
                </Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Stats
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                {pokemon.stats.map(stat => (
                  <li key={stat.name}>
                    <Typography variant="body2">
                      {stat.name}: {stat.base_stat}
                    </Typography>
                  </li>
                ))}
              </Box>
              <Button fullWidth variant="contained" onClick={handleClose}>
                Cerrar
              </Button>
            </>
          ) : (
            <Typography color="error">No se pudo cargar el Pokémon.</Typography>
          )}
        </Box>
      </Modal>
    </Fragment>
    
  );
};