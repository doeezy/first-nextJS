import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserInfoById, UserType } from "@/pages/api/sampleApi";

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
    const userId = String(id);
    async function getData() {
      try {
        await getUserInfoById(userId)
          .then((res: any) => {
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
    if (id != null && id != undefined) {
      getData();
    }
  }, [id]);

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
