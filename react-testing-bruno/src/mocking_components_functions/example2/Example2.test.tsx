import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { DataGrid } from "@material-ui/data-grid";
import Example2, { rows } from "./Example2";

// Mock a component form 3rd party library (DataGrid)
jest.mock("@material-ui/data-grid", () => ({
  ...jest.requireActual("@material-ui/data-grid"),
  DataGrid: jest.fn(() => <div>Table</div>),
}));

const mockedDataGrid = mocked(DataGrid);

describe("Example2 Component", () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it("should renders Material-UI grid with columnDefs and rowdata", () => {
    const handleMoney = jest.fn();
    render(<Example2 onMoney={handleMoney} />);

    fireEvent.click(screen.getByRole("button", { name: "Give me 33 dollars" }));

    expect(handleMoney).toHaveBeenCalledTimes(1);
    expect(handleMoney).toHaveBeenCalledWith(33);
  });

  it("should renders table passing the expected props", () => {
    render(<Example2 onMoney={jest.fn()} />);

    expect(mockedDataGrid).toHaveBeenCalledTimes(1);
    expect(mockedDataGrid).toHaveBeenCalledWith(
      {
        rows: rows,
        columns: [
          expect.objectContaining({ field: "id" }),
          expect.objectContaining({ field: "firstName" }),
          expect.objectContaining({ field: "lastName" }),
          expect.objectContaining({ field: "age" }),
        ],
        pageSize: 5,
        checkboxSelection: true,
      },
      {}
    );
  });
});
