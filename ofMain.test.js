import * as t from "https://deno.land/std/testing/asserts.ts";
import { ofMap } from "./ofMain.js";

Deno.test("ofMap", () => {
  t.assertEquals(ofMap(1, 0, 1, 0, 100), 100);
  t.assertEquals(ofMap(1, 0, 1, -50, 50), 50);
  t.assertEquals(ofMap(0, 0, 1, -50, 50), -50);
  t.assertEquals(ofMap(-1, 0, 1, -50, 50), -150); // over min
});

