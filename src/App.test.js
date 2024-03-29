import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import WeatherCard from "./components/WeatherCard";

import { createMockServer } from "./createMockServer";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

let server;
beforeEach(() => {
  server = createMockServer();
});
afterEach(() => {
  server.shutdown();
});

describe("Weather Application tests", () => {
  it("Weather Application tests", () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("shows city search results", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Melbourne");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    );
  });

  it("shows city search result details", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Melbourne");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    );

    const cityNames = await screen.findAllByText(/Melbourne/i);
    cityNames.forEach(cityName => {
      expect(cityName).toBeInTheDocument();
    });
  
    const cityLocationLat = await screen.findByText(/-37.8142176/i);
    const cityLocationLon = await screen.findByText(/144.9631608/i);
  
    expect(cityLocationLat).toBeInTheDocument();
    expect(cityLocationLon).toBeInTheDocument();
  });

  it("add search result to my weather list", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Melbourne");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    );

    const selected = screen.getAllByText(/Melbourne/i)[3];
    act(() => {
      userEvent.click(selected);
    });

    expect(
      within(screen.getByTestId("my-weather-list")).getByText(/Melbourne/i)
    ).toBeInTheDocument();

    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
});
});

describe('WeatherCard component tests', () => {
  it('renders city name', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };
    render(<WeatherCard city={city} />);
    expect(screen.getByText(city.name)).toBeInTheDocument();
  });

  it('renders temperature', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };
    render(<WeatherCard city={city} />);
    await waitFor(() => expect(screen.getByText(14.65)).toBeInTheDocument());
  });

  it('renders placeholder temperature', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };
    render(<WeatherCard city={city} />);
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it('renders weather information', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };
    render(<WeatherCard city={city} />);
    await waitFor(() => expect(screen.getByText('Clear')).toBeInTheDocument());
  });
});
