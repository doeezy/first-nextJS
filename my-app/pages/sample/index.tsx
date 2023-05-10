import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SampleRequest, getCategoryList } from "@/apis/sampleApi";

function SamplePage() {
  const [sample, setSampleList] = useState<Array<SampleRequest>>(
    [] as Array<SampleRequest>
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 진입시 실행
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCategoryList()
          .then((res: any) => setSampleList(res))
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

  return (
    <div>
      <Head>
        <title>Sample 페이지</title>
      </Head>
      <h2>Sample 페이지 입니다.</h2>
      <ul>
        {sample.map((s) => (
          <li key={s.node_id}>
            <Link
              href={{ pathname: "/sample/detail", query: { id: s.node_id } }}
            >
              카테고리명: {s.node_nm}
            </Link>
            <br />
            정렬순서: {s._order}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SamplePage;
