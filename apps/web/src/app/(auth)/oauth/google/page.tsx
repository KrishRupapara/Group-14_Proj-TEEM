// "use client";
import getGoogleUrl from "@/utils/getGoogleurl";
import React from "react";

export default function GooglePage() {
  // const handleGoogleSignup = async () => {
  //   try {
  //     const response = await fetch(getGoogleUrl());
  //     console.log(response);
  //     // return response.json();
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <h1>Google Page</h1>
      <a href={getGoogleUrl()}>Click to login</a>
    </div>
  );
}
