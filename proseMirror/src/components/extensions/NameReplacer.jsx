import { Extension , textInputRule } from "@tiptap/core";

export const NameReplacer = Extension.create({
    name: "nameReplacer",
    addInputRules () {
        return [
            textInputRule({
                find: /--me$/,
                replace: "🎉",
            })
        ]
    }
})