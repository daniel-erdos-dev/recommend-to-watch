import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Movie from "./Movie";

const DefaultMovieCardProps = {
  overview: "",
  poster_path: "",
  release_date: "",
  title: "",
};

describe("Movie component tests", () => {
  it("renders the title to the component", () => {
    const testTitle = "testTitle";
    render(<Movie {...DefaultMovieCardProps} title={testTitle} />);

    const titleElement = screen.getByRole("heading", { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(testTitle);
  });

  it("renders the year from release_date param to the component", () => {
    const date = "1999_01_11";
    render(<Movie {...DefaultMovieCardProps} release_date={date} />);

    const yearElement = screen.getByRole("heading", { level: 3 });

    const year = new Date(date).getFullYear();

    expect(yearElement).toBeInTheDocument();
    expect(yearElement).toHaveTextContent(year.toString());
  });

  it("renders the movie poster to the component", () => {
    const posterUrl = "something.png";
    const title = "myTitle";
    render(
      <Movie {...DefaultMovieCardProps} poster_path={posterUrl} title={title} />
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

  it("renders the overview of the movie to the component", () => {
    const overview = "something to test";
    render(<Movie {...DefaultMovieCardProps} overview={overview} />);

    const overviewElement = screen.getByRole("heading", { level: 5 });

    expect(overviewElement).toBeInTheDocument();
    expect(overviewElement).toHaveTextContent(overview);
  });
});
