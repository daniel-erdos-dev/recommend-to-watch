import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Movie from "./Movie";
import { expect } from "jest-without-globals";

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

    const titleElement = screen.getByText(testTitle);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
  });

  it("renders the year from release_date param to the component", () => {
    const date = "2003-07-03T00:00:00.000Z";
    render(<Movie {...DefaultMovieCardProps} release_date={date} />);

    const year = new Date(date).getFullYear();

    const yearElement = screen.getByText(`(${year.toString()})`);

    expect(yearElement).toBeInTheDocument();
    expect(yearElement.tagName).toBe("H3");
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

    const overviewElement = screen.getByText(overview);

    expect(overviewElement).toBeInTheDocument();
    expect(overviewElement.tagName).toBe("P");
  });
});
