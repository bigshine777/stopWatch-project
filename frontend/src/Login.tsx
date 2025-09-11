import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState("");
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: "50%", margin: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h5" component="h1">
        ログイン
      </Typography>
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="body1" sx={{ fontSize: 15, color: "red" }}>
          {error}
        </Typography>
        <TextField
          label="ユーザー名"
          variant="standard"
          sx={{ width: "50%" }}
          value={username}
          onChange={(e) => Setusername(e.target.value)}
        ></TextField>
        <TextField
          label="パスワード"
          variant="standard"
          type="password"
          value={password}
          sx={{ width: "50%" }}
          onChange={(e) => Setpassword(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          sx={{ bgcolor: "#000000" }}
          onClick={() => {
            axios
              .post("http://localhost:8000/api/token/", {
                username: username,
                password: password,
              })
              .then((response) => {
                console.log(response.data);
                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);
                navigate("/");
              })
              .catch((err) => {
                console.log(err.response);
                Seterror("ユーザー名またはパスワードが異なります");
              });
          }}
        >
          ログイン
        </Button>
      </Stack>
    </Box>
  );
}

export default Login;
