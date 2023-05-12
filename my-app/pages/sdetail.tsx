import Head from "next/head";
import { getDetail, SampleRequest } from "@/pages/api/sampleApi";

function ServerSidePage({ data }: any) {
  console.log("debugging page");
  console.log(data);
  function getDataByKeys(obj: SampleRequest) {
    let k: keyof SampleRequest;
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

export async function getServerSideProps(cdx) {
  console.log("debugging id?");
  console.log(cdx.params.id);
  const data = await getDetail({
    table_nm: "tb_category",
    where_info: [
      {
        table_nm: "tb_category",
        key: "node_id",
        value: cdx.params.id,
        compare_op: "Equal"
      }
    ]
  });

  return {
    props: {
      data
    }
  };
}
export default ServerSidePage;
