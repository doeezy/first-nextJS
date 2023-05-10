import Link from "next/link";
import Head from "next/head";

export default function Home() {
  // const getData = () => {
  //   $axios.get("https://jsonplaceholder.typicode.com/posts");
  // };
  return (
    <div>
      <Head>
        <title>Index 페이지</title>
      </Head>
      <h2>index페이지 입니다.</h2>
      <br />
      <Link href="/sample">샘플페이지로 이동</Link>
      <br />
    </div>
  );
}
