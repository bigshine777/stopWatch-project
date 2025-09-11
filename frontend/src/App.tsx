import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Box, Typography, Stack } from "@mui/material";
import axios from "axios";

import ShowRap from "./ShowRap.tsx";
import Login from "./Login.tsx";
import NotFound from "./NotFound.tsx";

function formatTimeString(
  h: number,
  m: number,
  s: number,
  withSpace = true
): string {
  const formatH = String(h).padStart(2, "0");
  const formatM = String(m).padStart(2, "0");
  const formatS = String(s).padStart(2, "0");

  return [formatH, formatM, formatS].join(withSpace ? " : " : ":");
}

function Home() {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [raps, setRaps] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isStart) {
      const timer = setTimeout(() => setTime(time + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isStart, time]);

  if (localStorage.getItem("access")) {
    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get("http://localhost:8000/raps/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          });
          const raps = response.data.map(
            (rapObj: { h: number; m: number; s: number }) =>
              formatTimeString(rapObj.h, rapObj.m, rapObj.s, true)
          );
          setRaps([...raps]);
        } catch (error) {
          console.error("Error fetching data:", error);
          navigate("login/");
        }
      })();
    }, []);
  }

  const handleRap = async () => {
    setRaps([
      ...raps,
      formatTimeString(
        Math.floor(time / 3600),
        Math.floor((time % 3600) / 60),
        time % 60,
        true
      ),
    ]);

    try {
      const response = await axios.post(
        "http://localhost:8000/raps/",
        {
          time: formatTimeString(
            Math.floor(time / 3600),
            Math.floor((time % 3600) / 60),
            time % 60,
            false
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting rap:", error);
    }
  };

  const formatTime = formatTimeString(
    Math.floor(time / 3600),
    Math.floor((time % 3600) / 60),
    time % 60,
    true
  );

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
          onClick={handleRap}
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
