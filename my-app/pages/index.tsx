import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Index 페이지</title>
      </Head>
      <h2>index페이지 입니다.</h2>
      <br />
      <br />
      <Link href="/static">정적경로 - 정적 페이지로 이동</Link>
      <br />
    </div>
  );
}
