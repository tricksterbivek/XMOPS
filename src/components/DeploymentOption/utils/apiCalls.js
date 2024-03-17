const API_BASE_URL = '/api';

export const fetchRegions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lightsail-regions`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const fetchAvailabilityZones = async (region) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lightsail-availabilityZones?region=${region}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching availability zones:', error);
    throw error;
  }
};

export const fetchBlueprints = async (region) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lightsail-blueprints?region=${region}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blueprints:', error);
    throw error;
  }
};

export const fetchBundles = async (region) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lightsail-bundles?region=${region}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bundles:', error);
    throw error;
  }
};