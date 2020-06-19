export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();
export const mockUseRoute = jest.fn();

const useNavigation = () => ({
  navigate: mockNavigate,
  goBack: mockGoBack,
  canGoBack: () => true,
});
const useRoute = mockUseRoute;

export {useNavigation, useRoute};
