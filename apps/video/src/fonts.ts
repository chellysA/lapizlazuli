import { loadFont as loadHandwritten } from "@remotion/google-fonts/Caveat";
import { loadFont as loadSerif } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadSans } from "@remotion/google-fonts/Quicksand";

const { fontFamily: handwrittenFont } = loadHandwritten("normal", {
  weights: ["600", "700"],
});
const { fontFamily: serifFont } = loadSerif("italic", {
  weights: ["600"],
});
const { fontFamily: sansFont } = loadSans("normal", {
  weights: ["500", "700"],
});

export const fonts = {
  handwritten: handwrittenFont,
  serif: serifFont,
  sans: sansFont,
};

export const palette = {
  cream: "#FBF3E9",
  paper: "#FFFCF7",
  blush: "#F1C7C0",
  butter: "#F3DFA3",
  sage: "#C7D2B6",
  terracotta: "#D98E73",
  ink: "#5A4A42",
};
