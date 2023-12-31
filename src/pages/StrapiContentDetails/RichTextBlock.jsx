import React from "react";
import ReactMarkdown from "react-markdown";

function RichTextBlock({ block }) {
  return (
    <div id="rich-text" className="mt-[16px]">
      <ReactMarkdown>{block.body}</ReactMarkdown>
    </div>
  );
}

export default RichTextBlock;
