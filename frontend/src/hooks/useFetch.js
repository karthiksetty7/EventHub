import { useCallback, useEffect, useRef, useState } from "react";

// ==========================================
// CUSTOM FETCH HOOK (FIXED)
// ==========================================

const useFetch = (apiFunction, options = {}) => {
  const { immediate = true, initialData = null, dependencies = [] } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false); // FIXED
  const [error, setError] = useState(null);

  // Prevent stale updates after unmount
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // ==========================================
  // FETCH FUNCTION (FIXED ERROR HANDLING)
  // ==========================================

  const fetchData = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...params);

        if (isMounted.current) {
          setData(response);
        }

        return response;
      } catch (error) {
        let message = "Something went wrong";

        // FIXED: handles backend + axios + custom errors
        if (error?.message) {
          message = error.message;
        } else if (error?.response?.data?.message) {
          message = error.response.data.message;
        } else if (typeof error === "string") {
          message = error;
        }

        if (isMounted.current) {
          setError(message);
        }

        throw error;
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    },
    [apiFunction],
  );

  // ==========================================
  // INITIAL FETCH
  // ==========================================

  useEffect(() => {
    if (immediate && typeof apiFunction === "function") {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, ...dependencies]);

  // ==========================================
  // RESET FUNCTION
  // ==========================================

  const reset = () => {
    setData(initialData);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    fetchData,
    reset,
    setData,
  };
};

export default useFetch;
