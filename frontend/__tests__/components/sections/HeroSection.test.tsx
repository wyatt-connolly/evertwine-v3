import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroSection from "@/components/sections/HeroSection";

// Mock the smooth scroll hook
jest.mock("@/hooks/use-smooth-scroll", () => ({
  useSmoothScroll: () => ({
    scrollTo: jest.fn(),
  }),
}));

describe("HeroSection Component", () => {
  describe("Rendering", () => {
    it("should render hero section with main heading", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/secure.*messaging/i);
    });

    it("should render subtitle text", () => {
      render(<HeroSection />);

      const subtitle = screen.getByText(/privacy.*first/i);
      expect(subtitle).toBeInTheDocument();
    });

    it("should render call-to-action buttons", () => {
      render(<HeroSection />);

      const downloadButton = screen.getByRole("button", {
        name: /download.*app/i,
      });
      const learnMoreButton = screen.getByRole("button", {
        name: /learn.*more/i,
      });

      expect(downloadButton).toBeInTheDocument();
      expect(learnMoreButton).toBeInTheDocument();
    });

    it("should render phone mockup", () => {
      render(<HeroSection />);

      const phoneMockup = screen.getByTestId("phone-mockup");
      expect(phoneMockup).toBeInTheDocument();
    });

    it("should render trust indicators", () => {
      render(<HeroSection />);

      const trustText = screen.getByText(/trusted.*by/i);
      expect(trustText).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    it("should display main value proposition", () => {
      render(<HeroSection />);

      const valueProp = screen.getByText(/end.*to.*end.*encryption/i);
      expect(valueProp).toBeInTheDocument();
    });

    it("should display security features", () => {
      render(<HeroSection />);

      const securityFeatures = screen.getByText(/self.*destructing.*messages/i);
      expect(securityFeatures).toBeInTheDocument();
    });

    it("should display privacy benefits", () => {
      render(<HeroSection />);

      const privacyBenefits = screen.getByText(/no.*data.*collection/i);
      expect(privacyBenefits).toBeInTheDocument();
    });
  });

  describe("Interactive Elements", () => {
    it("should have download button with proper styling", () => {
      render(<HeroSection />);

      const downloadButton = screen.getByRole("button", {
        name: /download.*app/i,
      });
      expect(downloadButton).toHaveClass(
        "bg-primary",
        "text-primary-foreground"
      );
    });

    it("should have learn more button with outline styling", () => {
      render(<HeroSection />);

      const learnMoreButton = screen.getByRole("button", {
        name: /learn.*more/i,
      });
      expect(learnMoreButton).toHaveClass("border", "border-input");
    });

    it("should handle download button click", () => {
      const mockScrollTo = jest.fn();
      jest.spyOn(window, "open").mockImplementation(() => null);

      render(<HeroSection />);

      const downloadButton = screen.getByRole("button", {
        name: /download.*app/i,
      });
      fireEvent.click(downloadButton);

      // Verify download action (this would typically open app store or download link)
      expect(window.open).toHaveBeenCalled();
    });

    it("should handle learn more button click", () => {
      const mockScrollTo = jest.fn();
      jest.spyOn(window, "scrollTo").mockImplementation(mockScrollTo);

      render(<HeroSection />);

      const learnMoreButton = screen.getByRole("button", {
        name: /learn.*more/i,
      });
      fireEvent.click(learnMoreButton);

      // Verify scroll action
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(<HeroSection />);

      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toBeInTheDocument();

      // Check for any subheadings
      const subheadings = screen.getAllByRole("heading");
      expect(subheadings.length).toBeGreaterThan(0);
    });

    it("should have accessible button labels", () => {
      render(<HeroSection />);

      const downloadButton = screen.getByRole("button", {
        name: /download.*app/i,
      });
      const learnMoreButton = screen.getByRole("button", {
        name: /learn.*more/i,
      });

      expect(downloadButton).toHaveAccessibleName();
      expect(learnMoreButton).toHaveAccessibleName();
    });

    it("should have proper alt text for images", () => {
      render(<HeroSection />);

      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
      });
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive container classes", () => {
      render(<HeroSection />);

      const container = screen.getByTestId("hero-section");
      expect(container).toHaveClass("container", "mx-auto", "px-4");
    });

    it("should have responsive grid layout", () => {
      render(<HeroSection />);

      const grid = screen.getByTestId("hero-grid");
      expect(grid).toHaveClass("grid", "lg:grid-cols-2");
    });

    it("should have responsive text sizing", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-4xl", "md:text-6xl");
    });
  });

  describe("Animation and Motion", () => {
    it("should render motion elements", () => {
      render(<HeroSection />);

      // Since we mocked framer-motion, motion elements should render as regular divs
      const motionElements = document.querySelectorAll("[data-motion]");
      expect(motionElements.length).toBeGreaterThan(0);
    });

    it("should have proper animation classes", () => {
      render(<HeroSection />);

      const animatedElements = document.querySelectorAll(".animate-in");
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe("SEO and Meta", () => {
    it("should have proper semantic structure", () => {
      render(<HeroSection />);

      const section = screen.getByRole("banner");
      expect(section).toBeInTheDocument();
    });

    it("should have proper heading structure for SEO", () => {
      render(<HeroSection />);

      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveTextContent(/secure.*messaging/i);
    });
  });
});
