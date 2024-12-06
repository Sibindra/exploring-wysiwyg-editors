import { useEffect } from "react";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockComponent from "./CodeBlockComponent";

const doc = new Y.Doc();

const lowlight = createLowlight(all);

const extensions = [
  StarterKit.configure({
    history: false,
  }),
  Collaboration.configure({
    document: doc,
  }),
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }).configure({ lowlight }),
];

const content = `
    <placeholder class="placeholder"> Type here </placeholder>
`;

const Editor: React.FC = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  useEffect(() => {
    new TiptapCollabProvider({
      name: "document.name",
      appId: "7j9y6m10",
      token: "notoken",
      document: doc,

      onSynced() {
        if (!doc.getMap("config").get("initialContentLoaded") && editor) {
          doc.getMap("config").set("initialContentLoaded", true);

          editor.commands.setContent(`
          <p>This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.</p>
          <p>The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.</p>
          `);
        }
      },
    });
  }, []);

  return <EditorContent editor={editor} />;
};

export default Editor;
