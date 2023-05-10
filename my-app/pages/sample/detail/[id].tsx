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
    console.log("debugging id");
    console.log(id);
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
  }, []);
  if (loading) return <div>로딩중입니다.</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  function getDataByKeys(data: SampleRequest) {
    let k: keyof SampleRequest;
    let dataArr = [];
    for (k in data) {
      dataArr.push(<p>{data[k]}</p>);
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

export default SampleDetailPage;
