import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./CustomEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faListOl,
  faListUl,
  faQuoteLeft,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import { StrapiMedia } from "../tiptap/extension-strapi-media";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menubar">
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faBold} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faItalic} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faCode} />
      </button> */}
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().setParagraph().run();
        }}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleHeading({ level: 5 }).run();
        }}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleHeading({ level: 6 }).run();
        }}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListUl} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListOl} />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faCode} />
      </button> */}
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().toggleBlockquote().run();
        }}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faQuoteLeft} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor.chain().focus().setHorizontalRule().run();
        }}
      >
        &lt;hr&gt;
      </button>
      {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button> */}
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor
            .chain()
            .focus()
            .insertStrapiMedia({ type: "image" })
            .run();
        }}
      >
        Image
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return editor
            .chain()
            .focus()
            .insertStrapiMedia({ type: "video" })
            .run();
        }}
      >
        Video
      </button>
    </div>
  );
};

export default (props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({}), StrapiMedia],
    content: props.value,
  });

  const editorHtml = editor?.getHTML();
  React.useEffect(() => {
    props.onChange({
      target: {
        name: props.name,
        value: editorHtml,
      },
    });
  }, [editorHtml]);

  return (
    <div className="CustomEditor">
      <label>{props.name}</label>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
