import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        <Image
          src={
            "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
          }
          alt={"The Movie Database logo"}
          width={554}
          height={40}
        />
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/e/e1/JustWatch.png?20210111012421"
          }
          alt={"JustWatch logo"}
          width={509}
          height={520}
        />
        <p>Through TMDB API this product also uses JustWatch</p>
      </main>
    </div>
  );
}
