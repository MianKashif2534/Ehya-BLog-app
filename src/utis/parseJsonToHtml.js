import { generateHTML } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";
import Text from "@tiptap/extension-text";

const parseJsonToHtml = (json) => {
  return parse(generateHTML(json, [Bold, Document, Paragraph, Italic, Text]));
};

export default parseJsonToHtml;
