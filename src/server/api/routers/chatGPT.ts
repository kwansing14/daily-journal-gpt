import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { env } from "@/src/env/server.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default createTRPCRouter({
  generateJournal: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input.text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (res.data.choices.length > 0) {
        return res.data.choices[0]?.text;
      }
      return "no response";
    }),
  generateJournal2: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const res = await openai.createCompletion({
        model: "text-curie-001",
        prompt: input.text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (res.data.choices.length > 0) {
        return res.data.choices[0]?.text;
      }
      return "no response";
    }),
  generateJournal3: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const res = await openai.createCompletion({
        model: "text-ada-001",
        prompt: input.text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (res.data.choices.length > 0) {
        return res.data.choices[0]?.text;
      }
      return "no response";
    }),
});
