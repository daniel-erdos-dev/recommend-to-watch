import { render, screen } from "@testing-library/react";
import Page from "./page";
import { describe, expect } from "@jest/globals";

describe("About Page tests", () => {
  it("renders the TMDB image", () => {
    render(<Page />);

    const tmdbImage = screen.getByAltText("The Movie Database logo");

    expect(tmdbImage).toBeInTheDocument();
    expect(tmdbImage).toHaveAttribute(
      "src",
      "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
    );
  });

  it("renders the JustWatch image", () => {
    render(<Page />);

    const justWatchImage = screen.getByAltText(
      "JustWatch logo"
    ) as HTMLImageElement;

    const expectedSrc = encodeURIComponent(
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/JustWatch.png"
    );

    expect(justWatchImage).toBeInTheDocument();
    expect(justWatchImage.src).toContain(expectedSrc);
  });

  it("has a description paragraph for tmdb", () => {
    render(<Page />);

    const tmdbDescription = screen.getByText(
      "This product uses the TMDB API but is not endorsed or certified by TMDB."
    );

    expect(tmdbDescription).toBeInTheDocument();
  });

  it("has a description paragraph for just watch", () => {
    render(<Page />);

    const justWatchDescription = screen.getByText(
      "Through TMDB API this product also uses JustWatch"
    );

    expect(justWatchDescription).toBeInTheDocument();
  });
});
