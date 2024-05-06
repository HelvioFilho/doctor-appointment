import Index from "@/app";
import { render, screen, waitFor } from "@testing-library/react-native";

describe("App: index", () => {
  it("should render text button correctly", async () => {
    render(<Index />);

    await waitFor(() => {
      expect(screen.getByText("Entrar com o google")).toBeTruthy();
    });
  });
});
