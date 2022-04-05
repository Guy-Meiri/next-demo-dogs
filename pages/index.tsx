import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TestComponent from "../components/TestComponent";
import { createElement, Fragment, ReactChildren } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps, InferGetStaticPropsType } from "next";

interface IndexProps {
  children: ReactChildren;
  guy: string;
}
const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div style={{ position: "relative", height: "300px" }}>
      <div>{props.host}</div>

      <Image src={props.dogImageUrl} alt="dick move" layout="fill" objectFit="contain" quality={100} />
      <TestComponent />
    </div>
  );
};

interface DogApiResponse {
  message: string;
  status: string;
}

export default Home;
export const getStaticProps: GetStaticProps = async (context) => {
  const res: Response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = (await res.json()) as DogApiResponse;
  const imgElem = createElement("img");

  return {
    props: {
      host: "test return static props",
      dogImageUrl: data.message,
    },
    revalidate: 1,
  };
};
