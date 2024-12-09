describe("Navigation", () => {
  it("should navigate to the home page", () => {
    cy.visit("/");
    cy.get('a[href="/"]').click();
    cy.get("button").should("contain.text", "Recommend");
  });

  it("should navigate to the about page", () => {
    cy.visit("/");
    cy.get('a[href*="/about"]').click();
    const tmdbLogo = cy.get("img[alt='The Movie Database logo']");
    tmdbLogo.should("exist");
    tmdbLogo.should(
      "have.attr",
      "src",
      "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
    );

    const justWatchLogo = cy.get("img[alt='JustWatch logo']");
    justWatchLogo.should("exist");
    justWatchLogo
      .should("have.attr", "src")
      .should(
        "include",
        "https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fe1%2FJustWatch.png&w=1080&q=75"
      );
  });
});
