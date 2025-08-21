import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, TrendingUp, Euro, Users, Clock } from 'lucide-react';

interface Space {
  id: string;
  title: string;
  address_line1?: string;
  city?: string;
  is_active: boolean;
}

interface Booking {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  payment_status: string;
  total_amount?: number;
  currency?: string;
  user_id: string;
  spaces: {
    title: string;
  };
  profiles: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
}

const OwnerDashboard = () => {
  const { profile } = useAuth();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (!profile?.id) return;

      try {
        // Fetch organizations where user is member
        const { data: orgMembers, error: orgError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', profile.id);

        if (orgError) throw orgError;

        const orgIds = orgMembers?.map(om => om.organization_id) || [];

        // Fetch spaces for these organizations
        const { data: spacesData, error: spacesError } = await supabase
          .from('spaces')
          .select('id, title, address_line1, city, is_active')
          .in('organization_id', orgIds);

        if (spacesError) throw spacesError;
        setSpaces(spacesData || []);

        // Fetch bookings for these spaces
        if (spacesData && spacesData.length > 0) {
          const spaceIds = spacesData.map(s => s.id);
          
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              id,
              start_time,
              end_time,
              status,
              payment_status,
              total_amount,
              currency,
              user_id,
              spaces (title),
              profiles (
                first_name,
                last_name,
                email
              )
            `)
            .in('space_id', spaceIds)
            .order('start_time', { ascending: false });

          if (bookingsError) throw bookingsError;
          setBookings(bookingsData || []);
        }
      } catch (error) {
        console.error('Error fetching owner data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, [profile?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount?: number, currency?: string) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: currency?.toUpperCase() || 'EUR',
    }).format(amount / 100);
  };

  const totalEarnings = bookings
    .filter(b => b.payment_status === 'paid')
    .reduce((sum, b) => sum + (b.total_amount || 0), 0);

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const activeSpaces = spaces.filter(s => s.is_active);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Painel do Proprietário
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo, {profile?.first_name}! Gerencie os seus espaços e reservas
            </p>
          </div>

          <div className="grid gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Espaços Ativos</p>
                      <p className="text-2xl font-bold text-foreground">{activeSpaces.length}</p>
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
                      <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reservas Confirmadas</p>
                      <p className="text-2xl font-bold text-foreground">{confirmedBookings.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ganhos Totais</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatAmount(totalEarnings, 'EUR')}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spaces List */}
            <Card>
              <CardHeader>
                <CardTitle>Os Seus Espaços</CardTitle>
                <CardDescription>
                  Gerencie os seus espaços de coworking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse">Carregando espaços...</div>
                  </div>
                ) : spaces.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Ainda não tem espaços cadastrados.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spaces.map((space) => (
                      <div
                        key={space.id}
                        className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">{space.title}</h3>
                          <Badge variant={space.is_active ? "default" : "secondary"}>
                            {space.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {space.address_line1}, {space.city}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Reservas Recentes</CardTitle>
                <CardDescription>
                  Últimas reservas dos seus espaços
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse">Carregando reservas...</div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Ainda não há reservas.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {booking.spaces.title}
                              </h3>
                              <Badge variant="outline">
                                {booking.profiles.first_name} {booking.profiles.last_name}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {formatDate(booking.start_time)} - {formatDate(booking.end_time)}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Euro className="h-4 w-4" />
                                <span>{formatAmount(booking.total_amount, booking.currency)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                              {booking.status === 'confirmed' ? 'Confirmada' : 
                               booking.status === 'pending' ? 'Pendente' : 'Cancelada'}
                            </Badge>
                            <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                              {booking.payment_status === 'paid' ? 'Pago' : 
                               booking.payment_status === 'pending' ? 'Pendente' : 'Falhou'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;