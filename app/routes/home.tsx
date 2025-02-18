import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Scribe!" },
    { name: "description", content: "Welcome to Scribe!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
