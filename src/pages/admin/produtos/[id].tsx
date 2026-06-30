import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { AdminProdutoForm } from "./novo";

export default function AdminProdutoEditar() {
  return (
    <AdminLayout>
      <Head><title>Editar Produto — JD Admin</title></Head>
      <AdminProdutoForm mode="editar" />
    </AdminLayout>
  );
}
