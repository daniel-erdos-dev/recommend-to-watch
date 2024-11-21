import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BigMovieCard from "./BigMovieCard";
import { title } from "process";

const BigMovieCardProps = {
  overview: "",
  poster_path: "",
  release_date: "",
  title: "",
};

describe("BigMovieCard component tests", () => {
  it("renders the title to the card", () => {
    const testTitle = "testTitle";
    render(<BigMovieCard {...BigMovieCardProps} title={testTitle} />);

    const titleElement = screen.getByRole("heading", { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(testTitle);
  });

  it("renders the year from release_date param to the card", () => {
    const date = "1999_01_11";
    render(<BigMovieCard {...BigMovieCardProps} release_date={date} />);

    const yearElement = screen.getByRole("heading", { level: 3 });

    const year = new Date(date).getFullYear();

    expect(yearElement).toBeInTheDocument();
    expect(yearElement).toHaveTextContent(year.toString());
  });

  it("renders the movie poster to the card", () => {
    const posterUrl = "something.png";
    const title = "myTitle";
    render(
      <BigMovieCard
        {...BigMovieCardProps}
        poster_path={posterUrl}
        title={title}
      />
    );

    const poster = screen.getByAltText(
      `Poster for ${title}`
    ) as HTMLImageElement;

    const expectedSrc = encodeURIComponent(
      `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${posterUrl}`
    );

    expect(poster).toBeInTheDocument();
    expect(poster.src).toContain(expectedSrc);
  });

  it("renders the overview of the movie to the card", () => {
    const overview = "something to test";
    render(<BigMovieCard {...BigMovieCardProps} overview={overview} />);

    const overviewElement = screen.getByRole("heading", { level: 5 });

    expect(overviewElement).toBeInTheDocument();
    expect(overviewElement).toHaveTextContent(overview);
  });
});
