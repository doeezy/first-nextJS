import Head from "next/head";
import { getDetail, SampleRequest } from "@/pages/api/sampleApi";

function DynamicRouteStaticPage({ data }: any) {
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
        <title>Dynamic Route - Static Page</title>
      </Head>
      <h2>Static Path - Static Page</h2>
      <p>
        <strong>동적 경로의 정적 페이지</strong>
        Next JS에서 파라미터가 동적으로 바뀌는 페이지를 빌드타임에 생성하려면
        getStaticPaths() + getTstaticProps()를 export 해주어야함 페이지의 특정
        데이터를 위한(렌더링 되기전에 데이터 가져옴) getStaticProps와 별도로
        동적 경로의 정적 페이지는 모든 경로 정보를 Next.js가 파악할 수 있도록
        해주어야함. 따라서 빌드 시 동적 루트에 대해 가능한 모든 경로를 나열하는
        getStaticPath() 함수가 필요함. ex) id로 접근 할 수 있는 모든 경로를
        알려주어야함 getStaticPath()에서 반환되는 paths에는 getStaticProps로
        전달되는 params 객체가 포함되어있음. params를 사용하여 해당 경로에
        데이터를 전달할 수 있음.
      </p>
      <br />
      <br />
      {getDataByKeys(data)}
    </div>
  );
}

export async function getStaticPaths() {
  // id값을 하나하나 지정해주기
  const paths = [
    { params: { id: "757ba1a6-0101-4aec-b840-023bef5a8e9f" } },
    { params: { id: "8e370892-1499-4e04-8236-ee83ae7d0465" } }
  ];

  // 전체 데이터를 가져온 뒤 id값만 반환
  // const allData = await getCategoryList();
  // const paths = allData.map((d: SampleRequest) => {
  //     return {
  //         params: {
  //             id: d.node_id
  //         }
  //     }
  // })

  return {
    paths,
    // 빌드타임에 생성해놓지 않은 path로 요청이 들어온 경우 어떻게 할지 정하는 옵션
    // 1. false : 404 반환
    // 2. ture: getStaticPorps()의 동작이 바뀜
    // - getStaticPaths가 반환된 path들은 빌드타임에 HTML로 렌더링
    // 그 외의 path에 요청이 들어온 경우 404를 반환하지 않고 페이지의 fallback 버전을 먼저 보여줌
    // 백그라운드에서 요청된 path에 대해 getStaticProps() 에서 HTML파일과 JSON 파일을 만들어냄
    // 요청이 끝나면 요청된 path에 해당하는 JSON 파일을 받아서 새롭게 페이지를 렌더링함
    // 새롭게 생성된 페이지의 path를 기존 빌드시 생성된 페이지 리스트에 추가하고 그 후부터 같은 path로 요청이 올 경우
    // 렌더링 된 HTML 파일을 보여줌
    // 참고 > 데이터에 의존하는 정적 페이지가 많으나 빌드시에 모든 페이지를 생성하는건 너무 큰 작업일 경우
    // 몇몇 페이지만 정적 생성하고 fallback 옵션을 true로 해줌
    // 3. blocking: true와 비슷하게 동작하지만 getStaticPaths가 반환하지 않은 path에 대한 요청은
    // fallback 상태를 보여주지않고 SSR처럼 동작. 이후 true 옵션과 같이 페이지 리스트에 해당 path 추가함함
    //fallback: false
    fallback: true
  };
}
export async function getStaticProps({
  params: { id }
}: {
  params: { id: string };
}) {
  // get all the data needed for rendering the page
  const data = await getDetail({
    table_nm: "tb_category",
    where_info: [
      {
        table_nm: "tb_category",
        key: "node_id",
        value: id,
        compare_op: "Equal"
      }
    ]
  });
  return {
    props: { data }
  };
}
export default DynamicRouteStaticPage;
