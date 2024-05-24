import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api.js";

// BEDROCK STUFF

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// a client can be shared by different commands.

const bedrockClient = new BedrockRuntimeClient({ region: "us-west-2", credentials: { secretAccessKey: "nlnzS6Gy/6R5C/IGzSpDrUgJhDtPXjCC3HEHwZI5", accessKeyId: "ASIAWVHY2QFWHDWAUDPT", sessionToken: "IQoJb3JpZ2luX2VjEOz//////////wEaCXVzLWVhc3QtMSJHMEUCIQDo2vg38h9bPboqDjSmJ9twjPLkb2bg7Bp+ONp6HInwKQIgDrlPlJ/EnDqa73ePKz3QCNE/BRYa/PHmxRrxWvkWVD4qmQIIZRAAGgw0NTc5MzU4NDc3ODgiDKEd+kgY6cZe2akRpSr2Adn24ztU3zW7RMoHQ2rzwY+mg00UB+6+ndMp3EdGlEI2SfMsK3wjnpKmMKSGA7nvaPwkWAivl105d0RiJtx6XOt5p6ql2sS3hOb+hniD9a3L6sZcVjwM5hON3yk301t3kueHVlAowGWvNTQXhItGkYaFXTt6rLpp4WCTWIFYchVkjKflGuRIYVLnaFs3bLZTSekDw/WaCzz+J0f1BoE/I7XQ25pKCJ0jRzXSCluAjC2RjH+M3GqmJN44stWIeQfXYehReyH9vQYU8VJoNL5u2seoUq8wmnPfGQ7W3uOvv8DkZlCQnpqly5RVpt18QPvT8bLbrorxRTDgkbmyBjqdAU1rd9CLeJNdBKF1rB+jxnDwpN47EiYqYJds9OinHpsOzX5NzU4eB/CJ34iO+ydZL8TE75mckVIL59alAM44WRB8z4y0Tsdt9SyRgE9VI84OiZHoTzOlJqMZTFud09A4rEhnVvJyoeeQC59zzzYUK3tWP00GzvIMCl+xRyX0kjUoFjC8zzX6/yRnBYZSjfuvXCzZI+p/voznQxehLIc="}, logger: undefined });
// END BEDROCK STUFF

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

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
