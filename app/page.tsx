import { redirect } from "next/navigation";

/**
 * The convos page is the app's home page, so `/` lands there.
 *
 * The previous home (NewHomePage with 内容 / 系列 / 收藏 tabs) is still in
 * components/new-home-page if it is ever needed again.
 */
export default function Home() {
  redirect("/convos");
}
