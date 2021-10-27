/**
 * This test file is example of good test for component with http request
 *
 * Mocking http request using Mock Service Worker (MSW)
 */

import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { DefaultRequestBody, rest } from "msw";
import PhotoList from ".";
import { IPhoto } from "../../interface";

// Create mocked server (define request handler)
const server = setupServer(
  rest.get<DefaultRequestBody, IPhoto[]>("/api/photos", (req, res, ctx) => {
    const name = req.url.searchParams.get("name") || "Unknown";

    return res(
      ctx.json([
        {
          id: 1,
          thumbnailUrl: "/photo1.png",
          title: name + ": Hello World",
          favourite: false,
        },
      ])
    );
  }),
  rest.post<IPhoto, IPhoto>("/api/favourite", (req, res, ctx) => {
    const photo = req.body;

    return res(
      ctx.delay(200),
      ctx.json({ ...photo, favourite: !photo.favourite })
    );
  })
);

// Start the server before all tests
beforeAll(() => server.listen());
// Stop the server after all tests
afterAll(() => server.close());
// Will reset to the default request handler after each tests
afterEach(() => server.resetHandlers());

describe("PhotoList Component (Good Test)", () => {
  describe("after application fully loads", () => {
    beforeEach(async () => {
      render(<PhotoList />);
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it("should renders the photos", () => {
      expect(screen.getByText("Unknown: Hello World")).toBeInTheDocument();
    });

    describe('when clicking in "Refresh" button', () => {
      beforeEach(async () => {
        userEvent.type(screen.getByLabelText("Your Name:"), "Bruno");
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      });

      it("should renders the newly loaded data", () => {
        expect(screen.queryByText("Bruno: Hello World")).toBeInTheDocument();
      });
    });

    describe('when clicking "Refresh" button and server returns error', () => {
      beforeEach(async () => {
        server.use(
          rest.get<DefaultRequestBody, { message: string }>(
            "/api/photos",
            (req, res, ctx) => {
              return res(
                ctx.status(500),
                ctx.json({ message: "Sorry something happened!" })
              );
            }
          )
        );

        userEvent.click(screen.getByText("Refresh"));
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      });

      it("should renders the error and keeping the old data", () => {
        expect(
          screen.getByText("Sorry something happened!")
        ).toBeInTheDocument();
      });
    });

    describe('when clicking in "Add to Favourites" changes the button text', () => {
      beforeEach(async () => {
        userEvent.click(
          screen.getByRole("button", { name: "Add to Favourites" })
        );
        await waitForElementToBeRemoved(() =>
          screen.getByRole("button", { name: "Add to Favourites" })
        );
      });

      it('should renders "Remove from Favourites"', () => {
        expect(
          screen.getByRole("button", { name: "Remove from Favourites" })
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("button", { name: "Add to Favourites" })
        ).not.toBeInTheDocument();
      });
    });
  });
});
