import { Extension } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";
import { Plugin } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import MentionDropdownMenu from "./MentionDropdownMenu";

export const MentionDropdown = Extension.create({
  name: "mentionDropdown",

  addProseMirrorPlugins() {
    return [mentionDropdownPlugin];
  },
});

const mentionDropdownPlugin = new Plugin({
  state: {
    init(_, { doc }) {
      return findMentions(doc);
    },

    apply(transaction, oldState) {
      return transaction.docChanged ? findMentions(transaction.doc) : oldState;
    },
  },

  props: {
    decorations(state) {
      return this.getState(state);
    },
  },
});

const findMentions = (doc: Node): DecorationSet => {

  const decorations: Decoration[] = [];

  doc.descendants((node) => {
    if (!node.text) {
      console.log("No text");
      return;
    }

    const text = node.text.split(" ");
    text.forEach((word) => {
      if (word.startsWith("@") && node.text) {
        const from = node.text.indexOf("@") + 1;
        const to = from + word.length;

        const decoration = Decoration.inline(from, to, {
          class: "mention",
        });
        decorations.push(decoration);
        return decoration;
      }
    });
  });

  return DecorationSet.create(doc, decorations);
};
