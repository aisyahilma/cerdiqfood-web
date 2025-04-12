import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cerdiq Food" },
    {
      name: "description",
      content:
        "Web E-commerce web application for **CerDiQ Food**, a platform inspired by Sayurbox to sell fresh vegetables and homemade frozen food from our own garden and kitchen.",
    },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Cerdiq Food</h1>
    </div>
  );
}
