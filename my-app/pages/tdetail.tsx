import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserInfoByProperty, UserType } from "@/pages/api/sampleApi";

class Users {
  userId!: number;
  nickname!: string;
  typeCdx!: number;
  rgsDate!: string;
  uptDate!: string;
  loginId!: string;
  password!: string;
  phone!: string;
  externalId!: string;
  socialCdx!: number;
}
function TestPage() {
  const router = useRouter();
  const { id } = router.query;
  const [sample, setSample] = useState<Users>(new Users());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 진입시 실행
  useEffect(() => {
    //if (!router.isReady) return;
    console.log("useEffect start");
    async function getData() {
      try {
        await getUserInfoByProperty(`scope=userId&value=${id}`)
          .then((res: any) => {
            console.log("debugging res");
            console.log(res);
            console.log(res.result);
            if (res.hasOwnProperty("result")) {
              setSample(res.result);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err: any) {
        setError(err);
        alert(err);
      }
    }
    getData();
  }, [id]);
  // if (loading) return <div>로딩중입니다.</div>;
  // if (error) return <div>에러가 발생했습니다.</div>;

  // async function getDataByKeys() {
  //   if (sample == null) {
  //     return <p>로딩중</p>;
  //   }
  //   let k: keyof Users;
  //   let dataArr = [];
  //   let index = 0;
  //   for (k in sample) {
  //     dataArr.push(<p key={index}>{sample[k]}</p>);
  //     index++;
  //   }
  //   return dataArr;
  // }

  return (
    <div>
      <Head>
        <title>Sample Detail 페이지</title>
      </Head>
      <h2>Sample Detail 페이지 입니다.</h2>
      <div>{sample.nickname}</div>
    </div>
  );
}
export default TestPage;
