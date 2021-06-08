import Head from "next/head";

import StructuredDataModel from "models/structured-data";

function StructuredData({ data }) {
  const strucuturedDataScript = (data, type) => {
    const structuredData = new StructuredDataModel(data, type);
    return (
      structuredData.hasRequiredProperties() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.body),
          }}
        />
      )
    );
  };

  const eventStrucuturedData = strucuturedDataScript(data, "event");

  if (!eventStrucuturedData) return null;

  return <Head>{eventStrucuturedData}</Head>;
}

export default StructuredData;
