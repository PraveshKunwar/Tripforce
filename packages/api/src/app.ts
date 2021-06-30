import express from "express";
import axios from "axios";

import { clientID, clientSecret } from "./config";

const app: express.Application = express();

let access_token: string = "";

app.listen(3000);

app.get("/login/callback", (req, res) => {
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.query.code,
      },
      { headers: { accept: "application/json" } }
    )
    .then((response) => {
      access_token = response.data.access_token;
      res.redirect("/success");
    });
});

app.get("/login", (_, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientID}`
  );
});

app.get("/success", (_, res) => {
  axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: { Authorization: `token ${access_token}` },
  }).then((response) => {
    res.send(`
        <img src="${response.data.avatar_url}" />
        <h1>${response.data.login}</h1>
        `);
  });
});
