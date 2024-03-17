import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import logoSpinner from "../../../logo.png";
import "./LightSail.css";

const LightSailPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [availabilityZones, setAvailabilityZones] = useState([]);
  const [blueprints, setBlueprints] = useState([]);
  const [bundles, setBundles] = useState([]);

  const [instanceDetails, setInstanceDetails] = useState({
    region: "",
    availabilityZone: "",
    platform: "",
    blueprint: "wordpress",
    instancePlan: "",
  });
  const handleDeploy = (instanceDetails) => {
    console.log(instanceDetails)
    deploy("/api/deployLightSail", instanceDetails);
  };

  useEffect(() => {
    fetch("/api/lightsail-regions")
      .then((response) => response.json())
      .then((data) => {
        console.log("This is the region data");
        console.log(data);
        setRegions(data.regions || []);
        if (data.regions && data.regions.length > 0) {
          setSelectedRegion(data.regions[0].regionName);
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            region: data.regions[0].regionName,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);
  useEffect(() => {
    const fetchRegionSpecificData = async () => {
      setIsLoading(true);
      if (instanceDetails.region) {
        try {
          let azResponse = await fetch(
            `/api/lightsail-availabilityZones?region=${instanceDetails.region}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setAvailabilityZones(data.availabilityZones || []);
              setInstanceDetails((prevDetails) => ({
                ...prevDetails,
                availabilityZone: data.availabilityZones[0]?.zoneName || "",
              }));
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          const bpResponse = await fetch(
            `/api/lightsail-blueprints?region=${selectedRegion}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const wordpressBlueprint = data.blueprints.find(
                (blueprint) => blueprint.blueprintId === "wordpress"
              );

              setBlueprints([wordpressBlueprint]);
              setInstanceDetails((prevDetails) => ({
                ...prevDetails,
                platform: wordpressBlueprint?.blueprintId || "",
              }));
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          let bundleResponse = await fetch(
            `/api/lightsail-bundles?region=${selectedRegion}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const linuxBundles = data.bundles.filter((bundle) =>
                bundle.supportedPlatforms.includes("LINUX_UNIX")
              );
              setBundles(linuxBundles);
              setInstanceDetails((prevDetails) => ({
                ...prevDetails,
                instancePlan: linuxBundles[0]?.bundleId || "",
              }));
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } catch (error) {
          console.error("Failed to fetch region-specific data:", error);
        }
      }
      setIsLoading(false);
    };

    fetchRegionSpecificData();
  }, [instanceDetails.region]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstanceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if (name === "region") {
      setSelectedRegion(value);
    }
  };
  const deploy = (apiPath, instanceDetails) => {
    setIsLoading(true);
    fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instanceDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.ip) {
          setIpAddress(data.ip);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error during operation`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const destroy = (apiPath) => {
    setIsLoading(true);
    fetch(apiPath, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setIpAddress("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error during operation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="lightsail-page">
      <button
        onClick={() => navigate("/deployment-options")}
        className="back-button"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="header">
        <FontAwesomeIcon icon={faCloud} className="icon" />
        <h1>AWS LightSail Deployments</h1>
      </div>
      <div className="content">
        <p>
          AWS LightSail is an easy-to-use cloud platform that offers you
          everything needed to build an application or website, plus a
          cost-effective, monthly plan.
        </p>
        <h2>Deployment Options</h2>
        <div className="regionSelect">
          <label htmlFor="region">Select Region:</label>
          <select
            name="region"
            id="region"
            value={instanceDetails.region}
            onChange={handleInputChange}
          >
            {regions.map((region, index) => (
              <option key={index} value={region.regionName}>
                {region.displayName}
              </option>
            ))}
          </select>{" "}
          <label htmlFor="availabilityZone ">Availability Zone :</label>
          <select
            name="instancePlan"
            id="availabilityZone"
            value={instanceDetails.availabilityZone}
            onChange={handleInputChange}
          >
            {availabilityZones.map((az, index) => (
              <option key={index} value={az.zoneName}>
                {az.zoneName}
              </option>
            ))}
          </select>
          <label htmlFor="platform ">Blueprint :</label>
          <select
            name="platform"
            id="platform"
            value={instanceDetails.platform}
            onChange={handleInputChange}
          >
            {blueprints.length > 0 ? (
              <option value={blueprints[0].blueprintId}>
                {blueprints[0].blueprintId}
              </option>
            ) : (
              <option value="">No Blueprint Available</option>
            )}
          </select>
          <label htmlFor="bundleId ">Instance Size :</label>
          <select
            name="instancePlan"
            id="bundleId"
            value={instanceDetails.instancePlan}
            onChange={handleInputChange}
          >
            {bundles.length > 0 ? (
              bundles.map((bundle, index) => (
                <option key={index} value={bundle.bundleId}>
                  {bundle.name} - Price: ${bundle.price}, Ram : {bundle.ramSizeInGb} GB, CPU Count:{" "}
                  {bundle.cpuCount}, Disk Size: {bundle.diskSizeInGb} GB
                </option>
              ))
            ) : (
              <option value="">No Bundles Available</option>
            )}
          </select>
        </div>
        <div className="buttonGroup">
          <button
            className="button"
            onClick={() => handleDeploy(instanceDetails)}
            disabled={isLoading || !instanceDetails.region}
          >
            {isLoading ? <span className="spinner"></span> : "Deploy LightSail"}
          </button>
          <button
            className="button"
            onClick={() => destroy("/api/destroyLightSail")}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "Destroy LightSail"
            )}
          </button>
        </div>
        {ipAddress && (
          <p>
            Access your site at:{" "}
            <a
              href={`http://${ipAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ipAddress}
            </a>
          </p>
        )}
        {isLoading && (
          <div className="spinner-overlay">
            <img src={logoSpinner} alt="Loading..." className="logo-spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LightSailPage;
