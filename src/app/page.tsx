import Image from "next/image";
import Card from "../app/components/Card"
export default function Home() {




  return (
    <div className="grid grid-cols-4 gap-5 min-h-screen m-5">
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
      <Card t = "How to use DaisyUI cards" d = "This page talks about the usage of cards as a daisyUI component" i = "mock.jpg"></Card>
    </div>
  );
}
