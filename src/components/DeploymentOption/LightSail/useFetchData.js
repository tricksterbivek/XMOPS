import { useState, useEffect, useCallback } from 'react';
import { fetchRegions, fetchAvailabilityZones, fetchBlueprints, fetchBundles } from '../utils/apiCalls';

const useFetchData = (instanceDetails, setInstanceDetails) => {
  const [regions, setRegions] = useState([]);
  const [availabilityZones, setAvailabilityZones] = useState([]);
  const [blueprints, setBlueprints] = useState([]);
  const [bundles, setBundles] = useState([]);

  const fetchRegionData = useCallback(async () => {
    try {
      const regionsData = await fetchRegions();
      setRegions(regionsData.regions || []);
      if (regionsData.regions && regionsData.regions.length > 0) {
        const selectedRegion = regionsData.regions[0].regionName;
        setInstanceDetails((prevDetails) => ({
          ...prevDetails,
          region: selectedRegion,
        }));
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
      // Handle error
    }
  }, [setInstanceDetails]);

  const fetchRegionSpecificData = useCallback(async () => {
    const { region } = instanceDetails;
    if (region) {
      try {
        const azData = await fetchAvailabilityZones(region);
        setAvailabilityZones(azData.availabilityZones || []);
        setInstanceDetails((prevDetails) => ({
          ...prevDetails,
          availabilityZone: azData.availabilityZones[0]?.zoneName || '',
        }));

        const bpData = await fetchBlueprints(region);
        const wordpressBlueprint = bpData.blueprints.find(
          (blueprint) => blueprint.blueprintId === 'wordpress'
        );
        setBlueprints([wordpressBlueprint]);
        setInstanceDetails((prevDetails) => ({
          ...prevDetails,
          platform: wordpressBlueprint?.blueprintId || '',
        }));

        const bundlesData = await fetchBundles(region);
        const linuxBundles = bundlesData.bundles.filter((bundle) =>
          bundle.supportedPlatforms.includes('LINUX_UNIX')
        );
        setBundles(linuxBundles);
        setInstanceDetails((prevDetails) => ({
          ...prevDetails,
          instancePlan: linuxBundles[0]?.bundleId || '',
        }));
      } catch (error) {
        console.error('Failed to fetch region-specific data:', error);
        // Handle error
      }
    }
  }, [instanceDetails]);

  useEffect(() => {
    fetchRegionData();
  }, [fetchRegionData]);

  useEffect(() => {
    fetchRegionSpecificData();
  }, [fetchRegionSpecificData, instanceDetails]);

  return { regions, availabilityZones, blueprints, bundles, fetchRegionSpecificData };
};

export default useFetchData;