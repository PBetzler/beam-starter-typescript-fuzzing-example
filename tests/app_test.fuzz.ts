import * as beam from "apache-beam";
import * as runner from "apache-beam/runners/runner";
import * as testing from "apache-beam/testing/assert";
import { FuzzedDataProvider } from "@jazzer.js/core";
import "@jazzer.js/jest-runner";

import * as app from "../src/app";

describe("fuzz", function () {
  test.fuzz("pipeline", (jazzerBuffer: Buffer) => {
    const provider: FuzzedDataProvider = new FuzzedDataProvider(jazzerBuffer);
    //console.log("calling pipeline with input_text", "test_string");
    runner.createRunner({}).run((root) => {
      const result = root.apply(app.createPipeline(provider.consumeRemainingAsString()));
      result.apply(testing.assertDeepEqual(["test_string", "Hello", "World!"]));
    });
  });
});
