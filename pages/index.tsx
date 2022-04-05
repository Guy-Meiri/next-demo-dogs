import type { NextPage } from "next";
import Image from "next/image";
import TestComponent from "../components/TestComponent";
import { createElement, ReactChildren, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "./index.module.css";
import ToggleTheme from "../components/ToggleTheme";

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [dogUrl, setDogUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    setIsLoading(true);
    const res: Response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = (await res.json()) as DogApiResponse;
    setDogUrl(data.message);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <ToggleTheme />
      {isLoading ? (
        <div className={styles.image}>
          <img src="dog.svg" className={`${styles.dog}`} alt="dogi"></img>
        </div>
      ) : (
        <img className={styles.image} src={dogUrl ? dogUrl : props.dogImageUrl} alt="dogi" />
      )}

      <button className={styles.refresh} onClick={onClickHandler}>
        GIVE ME MORE
      </button>
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

  return {
    props: {
      host: "test return static props",
      dogImageUrl: data.message,
    },
    revalidate: 1,
  };
};
