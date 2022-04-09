import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "./index.module.css";
import ToggleTheme from "../components/ToggleTheme";

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [dogUrl, setDogUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFetchRandomDog = async () => {
    await fetchDog("https://dog.ceo/api/breeds/image/random");
  };

  const onFetchLabrador = async () => {
    await fetchDog("https://dog.ceo/api/breed/labrador/images/random");
  };

  const fetchDog = async (url: string) => {
    setIsLoading(true);
    const res: Response = await fetch(url);
    const data = (await res.json()) as DogApiResponse;
    setDogUrl(data.message);
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <ToggleTheme />
        <div className={styles.image}>
          {isLoading ? (
            <img src="dog.svg" className={`${styles.dog}`} alt="dogi"></img>
          ) : (
            <img className={styles.image} src={dogUrl ? dogUrl : props.dogImageUrl} alt="dogi" />
          )}
        </div>

        <div className={styles.buttons}>
          <button className={styles.refresh} onClick={onFetchRandomDog}>
            DOGO
          </button>
          <button className={styles.refresh} onClick={onFetchLabrador}>
            LAB ❤
          </button>
        </div>
      </div>
    </Fragment>
  );
};

interface DogApiResponse {
  message: string;
  status: string;
}

export default Home;
export const getStaticProps: GetStaticProps = async (context) => {
  const res: Response = await fetch("https://dog.ceo/api/breed/labrador/images/random");
  const data = (await res.json()) as DogApiResponse;

  return {
    props: {
      host: "test return static props",
      dogImageUrl: data.message,
    },
    revalidate: 1,
  };
};
