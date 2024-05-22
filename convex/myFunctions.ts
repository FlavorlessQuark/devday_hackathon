import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// BEDROCK STUFF

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// a client can be shared by different commands.

// END BEDROCK STUFF

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const listNumbers = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const numbers = await ctx.db
      .query("numbers")
      // Ordered by _creationTime, return most recent
      .order("desc")
      .take(args.count);
    return numbers.toReversed().map((number) => number.value);
  },
});

// You can write data to the database via a mutation:
export const addNumber = mutation({
  // Validators for arguments.
  args: {
    value: v.number(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const id = await ctx.db.insert("numbers", { value: args.value });

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const myAction = action({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    //// Use the browser-like `fetch` API to send HTTP requests.
    //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    // const response = await ctx.fetch("https://api.thirdpartyservice.com");
    // const data = await response.json();

    //// Query data by running Convex queries.
    const data = await ctx.runQuery(api.myFunctions.listNumbers, {
      count: 10,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.myFunctions.addNumber, {
      value: args.first,
    });
  },
});


// ACTUAL CODE - NOT DEMO STUFF :) 

export const setGeneratedImage = mutation({
  // Validators for arguments.
  args: {
    value: v.any(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const id = await ctx.db.insert("generated_image", { value: args.value });

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

export const getGeneratedImage = query({
  // Validators for arguments.
  args: {},

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    try {
      const image = await ctx.db.query("generated_image").order("desc").take(1);
      const output = [...image.values()][0].value;
      console.log("outputted:", output);
      return output;
    } catch {
      return "test 123";
    }
  },
});


// You can fetch data from and send data to third-party APIs via an action:
export const runModel = action({
  // Validators for arguments.
  args: {
    image: v.any(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    const params = {
      modelId: "amazon.titan-image-generator-v1",
      body: JSON.stringify({
          "taskType": "INPAINTING",
          "inPaintingParams": {
              "image": args.image,
              "maskPrompt": "red",                                       
          },                                                 
          "imageGenerationConfig": {
              "numberOfImages": 1,
              "height": 500,
              "width": 500,
              "cfgScale": 1.5
          }
      }),
      contentType: 'application/json',
      accept: '*/*',
    };
    const command = new InvokeModelCommand(params);

    console.log(command)

    // async/await.
    // try {
      console.log("We sending the params");
      const response = await bedrockClient.send(command);
      console.log("response received");
      // Save the raw response
      const rawRes = response.body;

      console.log(rawRes)
    // } catch (error) {
    //   // error handling.
    //   // const { requestId, cfId, extendedRequestId } = error?.$metadata;
    //   console.log({ error });
    // }    
  },
});