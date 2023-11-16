"use client";

import { useState } from "react";
import { InputProps } from "./input";

export default function InputBox({ initalText }: { initalText: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initalText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="text-xl transition-all hover:shadow-lg"
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          className="focus:outline-none px-1"
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
