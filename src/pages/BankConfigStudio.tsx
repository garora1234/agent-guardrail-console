import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SetupStepper from "@/components/bank-config/SetupStepper";
import DataSourcesSection from "@/components/bank-config/DataSourcesSection";
import ProductCatalogSection from "@/components/bank-config/ProductCatalogSection";
import WorkflowMappingSection from "@/components/bank-config/WorkflowMappingSection";
import PolicySourcesSection from "@/components/bank-config/PolicySourcesSection";
import ApprovedPoliciesSection from "@/components/bank-config/ApprovedPoliciesSection";

const BankConfigStudio = () => {
  const [newlyApproved, setNewlyApproved] = useState(0);

  const handlePolicyApproved = () => {
    setNewlyApproved((prev) => prev + 1);
  };

  return (
    <AppLayout>
      <div className="px-8 py-6 space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Bank Configuration Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Define your bank's environment — data sources, products, workflows, and policies — so AI agents can operate within the correct context.
          </p>
        </div>

        <SetupStepper currentStep={2} />

        <DataSourcesSection />
        <ProductCatalogSection />
        <WorkflowMappingSection />
        <PolicySourcesSection onPolicyApproved={handlePolicyApproved} />
        <ApprovedPoliciesSection newlyApproved={newlyApproved} />
      </div>
    </AppLayout>
  );
};

export default BankConfigStudio;
