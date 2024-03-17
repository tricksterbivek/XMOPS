import { useCallback } from 'react';

const useDeployDestroy = (setIsLoading, setIpAddress) => {
  const deploy = useCallback(
    (apiPath, instanceDetails) => {
      setIsLoading(true);
      fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          console.error('Error:', error);
          alert(`Error during operation`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setIsLoading, setIpAddress]
  );

  const destroy = useCallback(
    (apiPath) => {
      setIsLoading(true);
      fetch(apiPath, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          setIpAddress('');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error during operation');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setIsLoading, setIpAddress]
  );

  return { deploy, destroy };
};

export default useDeployDestroy;