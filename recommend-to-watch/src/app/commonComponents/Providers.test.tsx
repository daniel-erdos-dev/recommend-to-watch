import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Providers, { AllProviderProps, ProviderProps } from "./Providers";
import { expect } from "jest-without-globals";

const DefaultProvidersProps: AllProviderProps = {
  flatrate: [{ logo_path: "", provider_name: "" }],
  buy: [{ logo_path: "", provider_name: "" }],
  rent: [{ logo_path: "", provider_name: "" }],
};

const DefaultProviderProps: ProviderProps = {
  providers: [{ logo_path: "", provider_name: "" }],
};

describe("Providers component tests", () => {
  it("should render all providers when all kinds are available", () => {
    render(<Providers {...DefaultProvidersProps} />);

    const providerTypeElements = screen.getAllByRole("heading", { level: 1 });

    expect(providerTypeElements.length).toEqual(3);
  });

  it("should render only 2 providers when only 2 are available", () => {
    render(
      <Providers
        flatrate={DefaultProvidersProps.flatrate}
        rent={DefaultProvidersProps.rent}
      />
    );

    const providerTypeElements = screen.getAllByRole("heading", { level: 1 });

    expect(providerTypeElements.length).toEqual(2);
  });

  it("should render only rent providers when only rent is available", () => {
    render(<Providers rent={DefaultProvidersProps.rent} />);

    const providerTypeElements = screen.getAllByRole("heading", { level: 1 });

    expect(providerTypeElements.length).toEqual(1);
    expect(providerTypeElements[0].textContent).toBe("Rent");
  });

  it("should render no providers available sub-component when no providers are given", () => {
    render(<Providers />);

    const noProviderHeading = screen.getAllByRole("heading", { level: 1 });
    const noProviderText = screen.getByText(
      "No providers for this movie in your region"
    );

    expect(noProviderHeading.length).toEqual(1);
    expect(noProviderHeading[0].textContent).toBe("Sorry");
    expect(noProviderText).toBeInTheDocument();
  });

  it("should render 3 provider cards for rent if 3 providers available", () => {
    render(
      <Providers
        rent={[
          { logo_path: "a", provider_name: "test1" },
          { logo_path: "b", provider_name: "test2" },
          { logo_path: "c", provider_name: "test3" },
        ]}
      />
    );

    const providerTypeElements = screen.getAllByRole("heading", { level: 1 });

    expect(providerTypeElements.length).toEqual(1);
    expect(providerTypeElements[0].textContent).toBe("Rent");

    const providerName1 = screen.getByText("test1");
    const providerName2 = screen.getByText("test2");
    const providerName3 = screen.getByText("test3");

    const providerImg1 = screen.getByAltText("test1");
    const providerImg2 = screen.getByAltText("test2");
    const providerImg3 = screen.getByAltText("test3");

    expect(providerName1).toBeInTheDocument();
    expect(providerName2).toBeInTheDocument();
    expect(providerName3).toBeInTheDocument();

    expect(providerImg1).toBeInTheDocument();
    expect(providerImg2).toBeInTheDocument();
    expect(providerImg3).toBeInTheDocument();
  });

  it("should render provider card with image with the source given in props", () => {
    const rentData = [{ logo_path: "a.png", provider_name: "test1" }];
    render(<Providers rent={rentData} />);

    const providerImg1 = screen.getByAltText("test1") as HTMLImageElement;

    const expectedSrc = encodeURIComponent(
      `https://media.themoviedb.org/t/p/original/${rentData[0].logo_path}`
    );

    expect(providerImg1.src).toContain(expectedSrc);
  });

  it("should render provider card with provider name given", () => {
    const rentData = [{ logo_path: "a.png", provider_name: "test1" }];
    render(<Providers rent={rentData} />);

    const rentNameElement = screen.getByText(rentData[0].provider_name);

    expect(rentNameElement).toBeInTheDocument();
  });
});
