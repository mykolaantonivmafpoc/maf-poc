import { routeByPath, routeByName } from './config';

const mockSingleCampaign = {
  path: '/campaign/:id',
  name: 'campaign'
};

const mockAllCampaigns = {
  path: '/campaigns',
  name: 'campaigns'
};

describe('routeByPath', () => {
  it('should return the first object in the mockRoutes for search with "campaigns"', () => {
    expect(routeByPath('/campaigns')).toEqual(mockAllCampaigns);
  });
  it('should return undefined for search with "login"', () => {
    expect(routeByPath('/login')).toBeUndefined();
  });
});

describe('routeByName', () => {
  it('should return the second object in the mockRoutes for search with "dashboard"', () => {
    expect(routeByName('campaign')).toEqual(mockSingleCampaign);
  });
  it('should return undefined for search with "dashboard"', () => {
    expect(routeByName('dashboard')).toBeUndefined();
  });
});
