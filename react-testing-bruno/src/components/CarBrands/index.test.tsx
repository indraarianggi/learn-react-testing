import React, { FC, ReactElement } from "react";
import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MySwrConfig } from "../MySwrConfig";
import CarBrands from ".";
import { setupServer } from "msw/node";
import { DefaultRequestBody, rest } from "msw";
import { IApiError } from "../../interface";

const server = setupServer(
  rest.get<DefaultRequestBody, string[]>(
    "/api/cars/france",
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom France B1`, `Custom France B2`])
      );
    }
  ),

  rest.get<DefaultRequestBody, string[]>(
    "/api/cars/germany",
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom Germany B1`, `Custom Germany B2`])
      );
    }
  ),

  rest.get<DefaultRequestBody, IApiError>(
    "/api/cars/italy",
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.status(500),
        ctx.json({ message: "Unit test message" })
      );
    }
  )

  // rest.get<DefaultRequestBody, string[]>('/api/cars/:country', (req, res, ctx) => {
  //   return res(
  //     ctx.delay(100),
  //     ctx.json([`${req.params.country} B1`, `${req.params.country} B2`])
  //   )
  // })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("CarBrands Component", () => {
  describe('when "France" is selected', () => {
    beforeEach(async () => {
      // render component using customRender function
      customRender(
        <MySwrConfig>
          <CarBrands country="France" />
        </MySwrConfig>
      );

      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it('should renders "Car Brands from France"', () => {
      expect(
        screen.getByRole("heading", { name: "Car Brands from France" })
      ).toBeInTheDocument();
    });

    it("should renders the expected brands", () => {
      expect(screen.getByText("Custom France B1")).toBeInTheDocument();
      expect(screen.getByText("Custom France B2")).toBeInTheDocument();
    });
  });

  describe('when "Germany" is selected', () => {
    beforeEach(async () => {
      // render component using customRender function
      customRender(
        <MySwrConfig>
          <CarBrands country="Germany" />
        </MySwrConfig>
      );

      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it('should renders "Car Brands from Germany"', () => {
      expect(
        screen.getByRole("heading", { name: "Car Brands from Germany" })
      ).toBeInTheDocument();
    });

    it("should renders the expected brands", () => {
      expect(screen.getByText("Custom Germany B1")).toBeInTheDocument();
      expect(screen.getByText("Custom Germany B2")).toBeInTheDocument();
    });
  });

  describe('when "Italy" is selected', () => {
    beforeEach(async () => {
      // render component using customRender function
      customRender(<CarBrands country="Italy" />);

      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it('should renders "Car Brands from Italy"', () => {
      expect(
        screen.getByRole("heading", { name: "Car Brands from Italy" })
      ).toBeInTheDocument();
    });

    it("should renders expected erorr message", () => {
      expect(screen.getByText("Unit test message")).toBeInTheDocument();
    });
  });

  describe("when no results returned", () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody, string[]>(
          "/api/cars/france",
          (req, res, ctx) => {
            return res(ctx.delay(100), ctx.json([]));
          }
        )
      );

      // render component using customRender function
      customRender(<CarBrands country="France" />);
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it("should show expected no data message", () => {
      expect(screen.getByText("No data to show")).toBeInTheDocument();
    });
  });
});

/**
 * Define Custom Renders
 */
const AllTheProviders: FC = ({ children }) => {
  return (
    <MySwrConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
      {children}
    </MySwrConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });
