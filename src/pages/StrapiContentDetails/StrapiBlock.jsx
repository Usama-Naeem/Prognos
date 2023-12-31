import React from "react";
import RichTextBlock from "./RichTextBlock";
import MediaBlock from "./MediaBlock";

function StrapiBlock({ blocks }) {
  return (
    <div className="mb-[30px]">
      {blocks.map((block, index) => (
        <div key={index}>
          {block?.__component === "shared.rich-text" ? (
            <RichTextBlock block={block} />
          ) : (
            <MediaBlock block={block} />
          )}
        </div>
      ))}
    </div>
  );
}

export default StrapiBlock;
