import {
  HOME_PAGE_CONFIG,
  HOME_PAGE_CLASSES,
} from "./../../../pages/home/Home.data';";

describe("Home Page Data", () => {
  describe("HOME_PAGE_CONFIG", () => {
    it("should have correct layout configuration", () => {
      expect(HOME_PAGE_CONFIG).toBeDefined();
      expect(HOME_PAGE_CONFIG.LAYOUT).toBeDefined();
      expect(HOME_PAGE_CONFIG.LAYOUT.DESKTOP_BREAKPOINT).toBe("lg");
    });
  });

  describe("HOME_PAGE_CLASSES", () => {
    it("should have all required class definitions", () => {
      expect(HOME_PAGE_CLASSES).toBeDefined();
      expect(HOME_PAGE_CLASSES.CONTAINER).toBe(
        "flex flex-col lg:flex-row h-screen bg-gray-50"
      );
      expect(HOME_PAGE_CLASSES.SIDEBAR_WRAPPER).toBe("hidden lg:block");
      expect(HOME_PAGE_CLASSES.MAIN_CONTENT).toBe(
        "flex-1 flex flex-col lg:flex-row"
      );
      expect(HOME_PAGE_CLASSES.CONVERSATION_VIEW).toBe("flex-1");
    });

    it("should have correct responsive classes", () => {
      // Check that container has responsive flex direction
      expect(HOME_PAGE_CLASSES.CONTAINER).toContain("flex-col");
      expect(HOME_PAGE_CLASSES.CONTAINER).toContain("lg:flex-row");

      // Check that sidebar is hidden on mobile
      expect(HOME_PAGE_CLASSES.SIDEBAR_WRAPPER).toContain("hidden");
      expect(HOME_PAGE_CLASSES.SIDEBAR_WRAPPER).toContain("lg:block");
    });
  });
});
