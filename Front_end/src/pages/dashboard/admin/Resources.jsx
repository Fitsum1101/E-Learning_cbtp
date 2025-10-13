import React from "react";
import ResourcesHeader from "../../../components/resources/ResourcesHeader";
import ResourcesStats from "../../../components/resources/ResourcesStats";
import ResourcesList from "../../../components/resources/Resources";

const ResourcesPage = () => {
  return (
    <div>
      <ResourcesHeader />
      <ResourcesStats />
      <ResourcesList />
    </div>
  );
};

export default ResourcesPage;
