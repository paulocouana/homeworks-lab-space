import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building, Calendar, TrendingUp, Euro, Shield } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalSpaces: number;
  totalBookings: number;
  totalRevenue: number;
  usersByType: { client: number; owner: number; admin: number };
}

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalSpaces: 0,
    totalBookings: 0,
    totalRevenue: 0,
    usersByType: { client: 0, owner: 0, admin: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        // Fetch total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch users by type
        const { data: usersByType } = await supabase
          .from('profiles')
          .select('user_type');

        const userTypeStats = usersByType?.reduce((acc, user) => {
          acc[user.user_type] = (acc[user.user_type] || 0) + 1;
          return acc;
        }, { client: 0, owner: 0, admin: 0 }) || { client: 0, owner: 0, admin: 0 };

        // Fetch total spaces
        const { count: spacesCount } = await supabase
          .from('spaces')
          .select('*', { count: 'exact', head: true });

        // Fetch total bookings
        const { count: bookingsCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        // Fetch total revenue
        const { data: payments } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'paid');

        const totalRevenue = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

        setStats({
          totalUsers: usersCount || 0,
          totalSpaces: spacesCount || 0,
          totalBookings: bookingsCount || 0,
          totalRevenue,
          usersByType: userTypeStats
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.user_type === 'admin') {
      fetchAdminStats();
    }
  }, [profile]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount / 100);
  };

  if (profile?.user_type !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Acesso Negado</h2>
            <p className="text-muted-foreground">
              Não tem permissões para aceder a esta página.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Painel de Administração
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo, {profile?.first_name}! Visão geral completa da plataforma
            </p>
          </div>

          <div className="grid gap-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Utilizadores</p>
                      <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Espaços</p>
                      <p className="text-2xl font-bold text-foreground">{stats.totalSpaces}</p>
                    </div>
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Reservas</p>
                      <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatAmount(stats.totalRevenue)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Utilizadores</CardTitle>
                <CardDescription>
                  Breakdown dos tipos de utilizadores na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse">Carregando dados...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {stats.usersByType.client}
                      </div>
                      <Badge variant="outline" className="mb-2">Clientes</Badge>
                      <p className="text-sm text-muted-foreground">
                        {((stats.usersByType.client / stats.totalUsers) * 100).toFixed(1)}% do total
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {stats.usersByType.owner}
                      </div>
                      <Badge variant="outline" className="mb-2">Proprietários</Badge>
                      <p className="text-sm text-muted-foreground">
                        {((stats.usersByType.owner / stats.totalUsers) * 100).toFixed(1)}% do total
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {stats.usersByType.admin}
                      </div>
                      <Badge variant="outline" className="mb-2">Administradores</Badge>
                      <p className="text-sm text-muted-foreground">
                        {((stats.usersByType.admin / stats.totalUsers) * 100).toFixed(1)}% do total
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estado da Plataforma</CardTitle>
                  <CardDescription>Informações sobre o funcionamento geral</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sistema</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Base de Dados</span>
                    <Badge className="bg-green-100 text-green-800">Conectada</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Autenticação</span>
                    <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Ferramentas de gestão administrativa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Funcionalidades de gestão avançada estarão disponíveis em breve.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline">Gestão de Utilizadores</Badge>
                    <Badge variant="outline">Moderação de Espaços</Badge>
                    <Badge variant="outline">Relatórios Financeiros</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;