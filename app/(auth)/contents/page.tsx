"use client";

import { useState } from "react";
import { AddNewContentForm } from "./add-new-content-form";
import { ContentsV2List } from "./contents-list";

export default function ContentsPage() {
  const [addNewContent, setAddNewContent] = useState(false);

  if (addNewContent) {
    return (
      <AddNewContentForm
        handleCancelAddContent={() => {
          setAddNewContent(false);
        }}
      />
    );
  }

  return (
    <ContentsV2List
      handleAddNewContent={() => {
        setAddNewContent(true);
      }}
    />
  );
}
