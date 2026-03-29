import AppLayout from "@/components/layout/AppLayout";
import DataSourcesSection from "@/components/bank-config/DataSourcesSection";
import ProductCatalogSection from "@/components/bank-config/ProductCatalogSection";
import WorkflowMappingSection from "@/components/bank-config/WorkflowMappingSection";
import PolicySourcesSection from "@/components/bank-config/PolicySourcesSection";
import ApprovedPoliciesSection from "@/components/bank-config/ApprovedPoliciesSection";

const BankConfigStudio = () => {
  return (
    <AppLayout>
      <div className="px-8 py-6 space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Bank Configuration Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Define your bank's environment — data sources, products, workflows, and policies — so AI agents can operate within the correct context.
          </p>
        </div>

        <DataSourcesSection />
        <ProductCatalogSection />
        <WorkflowMappingSection />
        <PolicySourcesSection />
        <ApprovedPoliciesSection />
      </div>
    </AppLayout>
  );
};

export default BankConfigStudio;
