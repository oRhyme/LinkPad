import Image from "next/image";
import Card from "../app/components/Card"
export default function Home() {




  return (
    <div className = "flex justify-center w-full">

    <div className="flex justify-start flex-wrap gap-5 min-h-screen m-5 w-[calc(100vw-7rem)] mt-5">
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
    </div>
    </div>
  );
}
