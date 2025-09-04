import { useState } from "react"
import "../src/App.css"
import Navbar from "./components/Navbar"
import Manager from "./components/Manager"

export default function App() {
  return (
    <>
      <Navbar/>
      <Manager/>
     </>
  )
}