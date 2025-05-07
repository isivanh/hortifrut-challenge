import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Filters } from "./Filters";
import { KindFilter } from "../../types/types";
jest.mock("../../services/config");

describe("Filters", () => {
  it("renderiza correctamente el autocomplete (snapshot)", () => {
    
    const { asFragment } = render(
      <Filters
        filter={KindFilter.NAME}
        onChange={() => {}}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renderiza correctamente el autocomplete", () => {
    render(
      <Filters
        filter={KindFilter.NAME}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
