export const URL = "http://localhost:3000/";

export function clickRecommendButton() {
  cy.get("button").should("contain.text", "Recommend").click();
}

export function writeToMovieSearchField(title: string) {
  cy.get('input[type="text"]').type(title);
}

export function shouldHavePoster(altText: string) {
  cy.get(`img[alt="${altText}"]`).should("exist");
}

export function shouldHaveTitle(title: string) {
  cy.get("h1").should("contain.text", title);
}

export function shouldHaveYear(year: number) {
  cy.get("h3").should("contain.text", `(${year})`);
}
