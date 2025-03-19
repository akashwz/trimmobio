"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.content;
  const [content, setContent] = useState(editData);
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      toolbarAdaptive: false,
      height: 400,
      toolbarSticky: false,
      iframe: true,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",
    }),
    [],
  );

  useEffect(() => {
    if (content) {
      setAddDefaultApp((prev) => ({ ...prev, content: content }));
    }
  }, [content, setAddDefaultApp]);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default RichTextEditor;
