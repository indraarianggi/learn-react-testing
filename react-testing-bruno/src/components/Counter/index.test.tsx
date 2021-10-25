import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from ".";

describe("Counter Component", () => {
  describe('initialized with defaultCount=0 and description="My Counter"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    it('should renders title as "My Counter"', () => {
      expect(screen.getByText(/My Counter/i)).toBeInTheDocument();
    });

    it('should renders "Current Count: 0"', () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    describe("when + button is clicked", () => {
      it('should renders "Current Count: 1"', () => {
        fireEvent.click(screen.getByRole("button", { name: "Increment" }));

        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });

    describe("when - button is clicked", () => {
      it('should renders "Current Count: -1"', () => {
        fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });
  });

  describe('initialized with defaultCount=10 and description="Counter App"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="Counter App" />);
    });

    it('should renders title as "Counter App"', () => {
      expect(screen.getByText(/Counter App/i)).toBeInTheDocument();
    });

    it('should renders "Current Count: 10"', () => {
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(() => {
        userEvent.type(screen.getByLabelText(/Incrementor/), "{selectall}5");
        userEvent.click(screen.getByRole("button", { name: "Increment" }));
      });

      it('should renders "Current Count: 15"', () => {
        expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        userEvent.type(screen.getByLabelText(/Incrementor/), "{selectall}25");
        userEvent.click(screen.getByRole("button", { name: "Decrement" }));
      });

      it('should renders "Current Count: -15"', () => {
        expect(screen.getByText("Current Count: -15")).toBeInTheDocument();
      });
    });
  });
});
