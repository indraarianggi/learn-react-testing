/**
 * This test file is example of bad (or less effective) test for component with http request
 *
 * Bad because it's mocking axios or fetch
 */

import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { mocked } from "ts-jest/utils";
import { IPhoto } from "../../interface";
import PhotoList from ".";

jest.mock("axios");
// jest.spyOn(window, 'fetch')

const mockedAxios = mocked(axios);
const mockedAxiosGet = mocked(mockedAxios.get);
const mockedAxiosPost = mocked(mockedAxios.post);

describe("PhotoList Component (Bad Test)", () => {
  beforeEach(() => {
    mockedAxiosGet.mockResolvedValue({
      data: [
        {
          id: 1,
          thumbnailUrl: "/photo1.png",
          title: "Hello World",
          favourite: false,
        },
      ] as IPhoto[],
    });
  });

  describe("after application fully loads", () => {
    beforeEach(async () => {
      render(<PhotoList />);
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it("should renders the photos", () => {
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    describe('when clicking in "Refresh" button', () => {
      beforeEach(async () => {
        mockedAxiosGet.mockReset().mockResolvedValue({
          data: [
            {
              id: 1,
              thumbnailUrl: "/photo1.png",
              title: "New Loaded Data",
              favourite: false,
            },
          ] as IPhoto[],
        });

        userEvent.type(screen.getByLabelText("Your Name:"), "Bruno");
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      });

      it('should performs HTTP call with name="Bruno"', () => {
        expect(mockedAxiosGet).toHaveBeenCalledWith("/api/photos?name=Bruno");
      });

      it("should renders the newly loaded data", () => {
        expect(screen.queryByText("Hello World")).not.toBeInTheDocument();
        expect(screen.getByText("New Loaded Data")).toBeInTheDocument();
      });
    });

    describe('when clicking "Refresh" button and server returns error', () => {
      beforeEach(async () => {
        mockedAxiosGet.mockReset().mockRejectedValue({
          response: {
            data: { message: "Server says sorry!" },
          },
        });

        userEvent.click(screen.getByText("Refresh"));
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      });

      it("should renders the error and keeping the old data", () => {
        expect(screen.getByText("Hello World")).toBeInTheDocument();
        expect(screen.getByText("Server says sorry!")).toBeInTheDocument();
      });
    });

    describe('when clicking in "Add to Favourites" changes the button text', () => {
      beforeEach(async () => {
        mockedAxiosPost.mockReset().mockResolvedValue({
          data: {
            id: 1,
            thumbnailUrl: "/photo1.png",
            title: "New Loaded Data",
            favourite: true,
          } as IPhoto,
        });

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
