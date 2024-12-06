import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MentionDropdownMenu from "./MentionDropdownMenu";

export const MentionNode = Node.create({
    name: "mentionNode",
    group: "block",
    atom: true,

    parseHTML() {
        return [
            {
                tag: "mention-node",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['mention-node', mergeAttributes(HTMLAttributes)]
      },
    
      addNodeView() {
        return ReactNodeViewRenderer(MentionDropdownMenu);
      },
})