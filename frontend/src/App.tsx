import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Box, Typography, Stack } from "@mui/material";
import ShowRap from "./ShowRap.tsx";

function Home() {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [raps, setRaps] = useState<string[]>([]);

  useEffect(() => {
    if (isStart) {
      const timer = setTimeout(() => setTime(time + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isStart, time]);

  const formatTime: string = [
    String(Math.floor(time / 3600)).padStart(2, "0"),
    String(Math.floor((time % 3600) / 60)).padStart(2, "0"),
    String(time % 60).padStart(2, "0"),
  ].join(" : ");

  return (
    <Box sx={{ maxWidth: "50%", margin: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {formatTime}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          sx={{ bgcolor: isStart ? "#ef9746" : "#4bb431" }}
          onClick={() => {
            setIsStart(!isStart);
          }}
        >
          {isStart ? "ストップ" : "開始"}
        </Button>

        <Button
          variant="contained"
          sx={{ bgcolor: isStart ? "#2b8982" : "#7d7d7d" }}
          disabled={!isStart}
          onClick={() => {
            setRaps([...raps, formatTime]);
          }}
        >
          ラップ
        </Button>

        <Button
          variant="contained"
          sx={{ bgcolor: "#e84b4b" }}
          onClick={() => {
            setIsStart(false);
            setTime(0);
          }}
        >
          リセット
        </Button>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
        <ShowRap raps={raps} />
      </Stack>
    </Box>
  );
}

function NotFound() {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{ textAlign: "center" }}
      gutterBottom
    >
      404 Not Found
    </Typography>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
