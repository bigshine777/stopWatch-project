import { Typography } from "@mui/material";

const ShowRap = ({ raps }: { raps: string[] }) => {
  return (
    <>
      {raps.map((rap, index) => (
        <Typography key={index} variant="body1">
          Rap{index}: {rap}
        </Typography>
      ))}
    </>
  );
};

export default ShowRap;
