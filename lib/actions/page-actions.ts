import { withIndexNow } from './indexnow';
import { revalidateAndNotify } from '../hooks/useRevalidate';

// Home page actions
export const updateHomeContent = withIndexNow(
  ['/'],
  async (content: any) => {
    await revalidateAndNotify(['/']);
    return content;
  }
);

// State page actions
export const updateStateContent = withIndexNow(
  ['/', '/[state]'],
  async (stateId: string, content: any) => {
    await revalidateAndNotify(['/', `/${stateId}`]);
    return content;
  }
);

// City page actions
export const updateCityContent = withIndexNow(
  ['/', '/[state]', '/[state]/[city]'],
  async (stateId: string, cityId: string, content: any) => {
    await revalidateAndNotify([
      '/',
      `/${stateId}`,
      `/${stateId}/${cityId}`
    ]);
    return content;
  }
);

// Services page actions
export const updateServicesContent = withIndexNow(
  ['/services'],
  async (content: any) => {
    await revalidateAndNotify(['/services']);
    return content;
  }
);

// About page actions
export const updateAboutContent = withIndexNow(
  ['/about'],
  async (content: any) => {
    await revalidateAndNotify(['/about']);
    return content;
  }
);

// Contact page actions
export const updateContactContent = withIndexNow(
  ['/contact'],
  async (content: any) => {
    await revalidateAndNotify(['/contact']);
    return content;
  }
);

// Locations page actions
export const updateLocationsContent = withIndexNow(
  ['/locations'],
  async (content: any) => {
    await revalidateAndNotify(['/locations']);
    return content;
  }
);

// Privacy Policy page actions
export const updatePrivacyPolicyContent = withIndexNow(
  ['/privacy-policy'],
  async (content: any) => {
    await revalidateAndNotify(['/privacy-policy']);
    return content;
  }
);

// Terms and Services page actions
export const updateTermsContent = withIndexNow(
  ['/termsandservices'],
  async (content: any) => {
    await revalidateAndNotify(['/termsandservices']);
    return content;
  }
);

// DMCA page actions
export const updateDMCAContent = withIndexNow(
  ['/dmca'],
  async (content: any) => {
    await revalidateAndNotify(['/dmca']);
    return content;
  }
);
