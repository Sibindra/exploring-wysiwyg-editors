import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorJSONPreview from "./EditorJSONPreview";
import { NameReplacer } from "./extensions/NameReplacer";
import { ColorHighlighter } from "./extensions/color/ColorHighlighter";
import { MentionDropdown } from "./extensions/mention/MentionDropdown";
import { MentionNode } from "./extensions/mention/MentionNode";

// define your extension array
const extensions = [
  StarterKit,
  NameReplacer,
  ColorHighlighter,
  MentionNode,
  MentionDropdown,
];

const content = `
abcd
<mention-node/>
`;

const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <div className=" border border-red-500">
        <EditorJSONPreview />
      </div>
    </EditorProvider>
  );
};

export default Tiptap;
