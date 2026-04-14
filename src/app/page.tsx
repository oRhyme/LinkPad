import Image from "next/image";
import Card from "../app/components/Card"
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title = "How to use DaisyUI cards" description = "This page talks about the usage of cards as a daisyUI component" image = "mock.jpg"></Card>
    </div>
  );
}
