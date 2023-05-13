import Head from "next/head";
import Link from "next/link";
import api from "@/common/axios";
import { getUserList, UserType } from "@/pages/api/sampleApi";

function StaticPage({ data }: any) {
  return (
    <div>
      <Head>
        <title>Static Path - Static Page</title>
      </Head>
      <h2>Static Path - Static Page</h2>
      <p>
        <b>정적 경로의 정적 페이지</b>
        빌드 시 렌더링 되므로 렌더링 되기 전에 모든 데이터를 가져와야함 빌드시
        실행되는 getStaticProps() 함수로 데이터 요청 getStaticProps는 request가
        요청되는 시점이 아닌 빌드 시에 실행되므로 요청(query 매개변수, HTTP
        헤더) 등에 액세스 할 수 없음 !
      </p>
      <br />
      <br />
      {data.map((s: UserType) => (
        <li key={s.userId}>
          <Link href={{ pathname: `/dynamic/${s.userId}` }}>
            닉네임: {s.nickname}
          </Link>
        </li>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  // get all the data needed for rendering the page
  let data = [] as any;
  try {
    //const res = await axios.get("http://192.168.100.126:9010/route/meta/portal/api/getCategoryList")
    await getUserList().then((res: any) => (data = res.result));
  } catch (err: any) {
    console.log(err);
  }
  return {
    props: {
      data
    }
  };
}

export default StaticPage;
