import { redirect } from "next/navigation";

/**
 * Root page — redirects to the editor.
 * In production: render the published page with <Render /> instead.
 */
export default function Home() {
  redirect("/edit");
}
