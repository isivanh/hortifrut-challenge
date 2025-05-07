import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import question from "../assets/question.png";

interface PokemonCardProps {
  name: string;
  id: number;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const { name, id } = props;

  return (
    <Card 
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
      }}
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
  );
};