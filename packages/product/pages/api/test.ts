import { NextApiRequest, NextApiResponse } from "next";

export default async function thing(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send("hello world!");
}
