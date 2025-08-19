
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/Header";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/*" 
              element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } 
                      />
                    </Routes>
                  </main>
                </div>
              } 
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
