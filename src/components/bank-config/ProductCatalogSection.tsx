import { Package, Plus, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Product {
  id: string;
  name: string;
  category: string;
  status: "active" | "draft";
}

const products: Product[] = [
  { id: "1", name: "Personal Checking", category: "Checking Accounts", status: "active" },
  { id: "2", name: "Business Checking", category: "Checking Accounts", status: "active" },
  { id: "3", name: "Auto Loan", category: "Loans", status: "active" },
  { id: "4", name: "Home Mortgage", category: "Loans", status: "draft" },
  { id: "5", name: "Visa Platinum", category: "Credit Cards", status: "active" },
  { id: "6", name: "Secured Card", category: "Credit Cards", status: "draft" },
];

const ProductCatalogSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Product Catalog</CardTitle>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      product.status === "active"
                        ? "text-success border-success/30 bg-success/10"
                        : "text-muted-foreground border-border"
                    }
                  >
                    {product.status === "active" ? "Active" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductCatalogSection;
