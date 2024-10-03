
// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import StarterKit from "@tiptap/starter-kit";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { lowlight } from "lowlight";
// import css from "highlight.js/lib/languages/css";
// import js from "highlight.js/lib/languages/javascript";
// import ts from "highlight.js/lib/languages/typescript";
// import html from "highlight.js/lib/languages/xml";

// lowlight.registerLanguage("html", html);
// lowlight.registerLanguage("css", css);
// lowlight.registerLanguage("js", js);
// lowlight.registerLanguage("ts", ts);

// export const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as false becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as false becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//   }),
//   CodeBlockLowlight.configure({
//     lowlight,
//   }),
// ];


// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import StarterKit from "@tiptap/starter-kit";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { createLowlight } from "lowlight"; // Correctly import createLowlight
// import css from "highlight.js/lib/languages/css";
// import js from "highlight.js/lib/languages/javascript";
// import ts from "highlight.js/lib/languages/typescript";
// import html from "highlight.js/lib/languages/xml";

// // Create the lowlight instance
// const lowlight = createLowlight();

// // Register languages with lowlight
// lowlight.registerLanguage("html", html);
// lowlight.registerLanguage("css", css);
// lowlight.registerLanguage("javascript", js);
// lowlight.registerLanguage("typescript", ts);

// export const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false, // Preserving marks, but not attributes
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false, // Preserving marks, but not attributes
//     },
//   }),
//   CodeBlockLowlight.configure({
//     lowlight, // Pass the lowlight instance here
//   }),
// ];





// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import StarterKit from "@tiptap/starter-kit";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"; // Use this correct extension
// import highlight from "highlight.js"; // Importing the default highlight.js
// import css from "highlight.js/lib/languages/css";
// import js from "highlight.js/lib/languages/javascript";
// import ts from "highlight.js/lib/languages/typescript";
// import html from "highlight.js/lib/languages/xml";

// // Register languages with highlight.js
// highlight.registerLanguage("html", html);
// highlight.registerLanguage("css", css);
// highlight.registerLanguage("javascript", js);
// highlight.registerLanguage("typescript", ts);

// export const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//   }),
//   CodeBlockLowlight.configure({
//     lowlight: highlight, // Pass the highlight instance
//   }),
// ];
  
// tiptapExtension.js
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading"; // Import Heading
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight"; // Correctly import createLowlight
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

// Create the lowlight instance
const lowlight = createLowlight({
  html: xml,
  css,
  javascript,
  typescript,
});

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // Preserving marks, but not attributes
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // Preserving marks, but not attributes
    },
  }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6], // Specify which heading levels to include
  }),
  CodeBlockLowlight.configure({
    lowlight, // Pass the lowlight instance here
  }), 
  Dropcursor,
  Image,
];











