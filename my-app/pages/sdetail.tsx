import Head from "next/head";
import { getUserInfoById, UserType } from "@/pages/api/sampleApi";

function ServerSidePage({ data }: any) {
  function getDataByKeys(obj: UserType) {
    let k: keyof UserType;
    let dataArr = [];
    let index = 0;
    for (k in obj) {
      dataArr.push(<p key={index}>{obj[k]}</p>);
      index++;
    }
    return dataArr;
  }

  return (
    <div>
      <Head>
        <title>Dynamic Route - SSR</title>
      </Head>
      <h2>Static Path - SSR</h2>
      <p>
        server side rendering으로 페이지를 작성시 매 request마다 함수가 실행되며
        데이터가 패치됨
      </p>
      <br />
      <br />
      {getDataByKeys(data)}
    </div>
  );
}

export async function getServerSideProps(cdx: any) {
  const { id } = cdx.query;
  const data = await getUserInfoById(id);

  return {
    props: {
      data
    }
  };
}
export default ServerSidePage;
