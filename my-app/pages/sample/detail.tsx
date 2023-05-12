import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SampleRequest, getDetail } from "@/pages/api/sampleApi";

function SampleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [sample, setSample] = useState<SampleRequest>({} as SampleRequest);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 진입시 실행
  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      try {
        await getDetail({
          table_nm: "tb_category",
          where_info: [
            {
              table_nm: "tb_category",
              key: "node_id",
              value: id,
              compare_op: "Equal"
            }
          ]
        })
          .then((res: any) => {
            console.log(res);
            setSample(res);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err: any) {
        setError(err);
        alert(err);
      }
    };
    if (loading) {
      fetchData();
    }
  }, [router.isReady]);
  if (loading) return <div>로딩중입니다.</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  function getDataByKeys(data: SampleRequest) {
    let k: keyof SampleRequest;
    let dataArr = [];
    let index = 0;
    for (k in data) {
      dataArr.push(<p key={index}>{data[k]}</p>);
      index++;
    }
    return dataArr;
  }

  return (
    <div>
      <Head>
        <title>Sample Detail 페이지</title>
      </Head>
      <h2>Sample Detail 페이지 입니다.</h2>
      {getDataByKeys(sample)}
    </div>
  );
}
// 동적 페이지의 경우 getServerSideProps || getInitialProps 를 선언해줘야
// 페이지 요청시 마다 페이지를 재 랜더링함
// next v9 이상에서는 getInitialProps 대신 getServerSideProps를 사용하도록 가이드함
// export async function getServerSideProps({
//   params: { id }
// }: {
//   params: { id: string };
// }) {
//   return {
//     props: {
//       id
//     }
//   };
// }
//
// export async function getStaticProps({ params }) {
//   console.log("debugging params");
//   console.log(params.id);
//   let resData = null;
//   try {
//     await getDetail({
//       table_nm: "tb_category",
//       where_info: [
//         {
//           table_nm: "tb_category",
//           key: "node_id",
//           value: params.id,
//           compare_op: "Equal"
//         }
//       ]
//     }).then((res: any) => {
//       console.log(res);
//       resData = res;
//     });
//   } catch (err: any) {
//     alert(err);
//   }
//   // res = await fetch(`https://.../posts/${params.id}`);
//   const data = await resData.json();
//
//   return { props: { data } };
// }

export default SampleDetailPage;
