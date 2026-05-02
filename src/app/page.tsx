import Image from "next/image";
import Card from "../app/components/Card"
import NewCard from "../app/components/NewCard"

export default function Home() {




  return (
    <div className = "flex justify-center w-full">

    <div className="min-h-screen cardList w-[98vw]">
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <NewCard/>
    </div>
    </div>
  );
}
