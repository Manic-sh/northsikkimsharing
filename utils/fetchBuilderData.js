import { useState, useEffect } from "react";

export function fetchBuilderData(handle) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data =
          (await builder
            .get("package", {
              fields: "data",
              includeRefs: true, // Currently this only gets one level of nested references
              cachebust: true,
              query: {
                // Get the specific article by handle
                "data.handle": handle,
              },
            })
            .promise()) || null;

        if (!data) {
          throw new Error("Network response was not ok");
        }
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [handle]);

  return { data, loading, error };
}
