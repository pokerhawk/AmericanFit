import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRouter";
import UserSalesPage from "../pages/UserSalesPage";
import NewSalePage from "../pages/NewSalePage";
import CommissionPage from "../pages/CommissionPage";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import FinancePage from "../pages/FinancePage";
import InvestmentPage from "../pages/InvestmentPage";
import NewTransactionPage from "../pages/NewTransactionPage";
import TransactionPage from "../pages/TransactionPage";
import PendingSalesPage from "../pages/PendingSalesPage";

const AllRoutes = () => {
    return (
        <Routes>
            {/* Protected Routes */}
            <Route path='/:type/:id' element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            } />
            {/* PARTE DE VENDEDORES */}
            <Route path='/:type/:id/comissao' element={
                <ProtectedRoute>
                    <CommissionPage />
                </ProtectedRoute>
            } />
            <Route path='/:type/:id/vendas/:businessId' element={
                <ProtectedRoute>
                    <UserSalesPage />
                </ProtectedRoute>
            } />
            <Route path='/:type/:id/vendas/pendentes' element={
                <ProtectedRoute>
                    <PendingSalesPage />
                </ProtectedRoute>
            } />
            <Route path='/:type/:id/venda/criar' element={
                <ProtectedRoute>
                    <NewSalePage />
                </ProtectedRoute>
            } />
            {/* TRANSAÇÕES */}
            <Route path='/:type/:id/transacao' element={
                <ProtectedRoute>
                    <TransactionPage />
                </ProtectedRoute>
            } />
            <Route path='/:type/:id/transacao/criar' element={
                <ProtectedRoute>
                    <NewTransactionPage />
                </ProtectedRoute>
            } />
            {/* OUTROS */}
            <Route path='/:type/:id/financas' element={
                <ProtectedRoute>
                    <FinancePage />
                </ProtectedRoute>
            } />
            <Route path='/:type/:id/investimentos' element={
                <ProtectedRoute>
                    <InvestmentPage />
                </ProtectedRoute>
            } />
            {/* Non Protected Routes */}
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/register' element={<SignUpPage />} />
        </Routes>
    );
}

export default AllRoutes;
