import {
  clickRecommendButton,
  shouldHavePoster,
  shouldHaveTitle,
  shouldHaveYear,
  writeToMovieSearchField,
  URL,
} from "./e2eHelpers";

describe("Movie Selection", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should offer a single movie when only one movie match the title", () => {
    writeToMovieSearchField("Eternal sunshine of the spotless mind");
    clickRecommendButton();

    // EXPECTATIONS
    cy.get("h1").should("contain.text", "Is this the movie you thought about?");
    shouldHaveTitle("Eternal Sunshine of the Spotless Mind");
    shouldHaveYear(2004);
    shouldHavePoster("Poster for Eternal Sunshine of the Spotless Mind");
    cy.get("button").first().should("have.text", "Yes").should("exist");
    cy.get("button").last().should("have.text", "No").should("exist");
  });

  it("should go back to home when only one movie match the title and No button is clicked", () => {
    writeToMovieSearchField("Eternal sunshine of the spotless mind");
    clickRecommendButton();
    const noButton = cy.get("button").last().should("have.text", "No");

    // EXPECTATIONS
    noButton.should("exist");
    noButton.click();

    cy.url().should("equal", URL);
  });

  it("should offer multiple movies when multiple movies match the title", () => {
    writeToMovieSearchField("Godfather");
    clickRecommendButton();

    // EXPECTATIONS
    const posters = cy.get("img");
    const postersCount = posters.then((posterList) => posterList.length);
    postersCount.should("be.greaterThan", 1);

    const titles = cy.get("h1");
    const titlesCount = titles.then((titleList) => titleList.length);

    cy.get("h1").each(($title) => {
      expect($title.text().toLowerCase()).to.contain("godfather");
    });

    const chooseThisMovieButtons = cy
      .get("button")
      .contains("Choose this Movie");
    const chooseButtonCount = chooseThisMovieButtons.then(
      (chooseButtons) => chooseButtons.length
    );

    expect(postersCount === titlesCount && titlesCount === chooseButtonCount);
  });
});
