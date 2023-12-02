"use-client"
import NavComponent from "@/components/Navbar";
import Featurepage from "./components/Featurepage";
import Home_page from "./components/Home_page";
import Nav_Home from "./components/Nav_Home";
import Schedulepage from "./components/Schedulingpage";
import Footerpage from "./components/footerpage";
import { useState } from "react";

export default function Page() {
  return (
    <div className="">
      <Nav_Home />
      <Home_page />
      <Schedulepage />
      <Featurepage />
      <Footerpage />
    </div>
  );
}
