import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Euro } from 'lucide-react';

interface Booking {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  payment_status: string;
  total_amount?: number;
  currency?: string;
  spaces: {
    title: string;
    address_line1?: string;
    city?: string;
  };
}

const ClientDashboard = () => {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            start_time,
            end_time,
            status,
            payment_status,
            total_amount,
            currency,
            spaces (
              title,
              address_line1,
              city
            )
          `)
          .eq('user_id', profile?.id)
          .order('start_time', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.id) {
      fetchBookings();
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Olá, {profile?.first_name || 'Cliente'}!
            </h1>
            <p className="text-muted-foreground">
              Gerencie as suas reservas e histórico de pagamentos
            </p>
          </div>

          <div className="grid gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <p className="text-2xl font-bold text-foreground">
                        {bookings.filter(b => b.status === 'confirmed').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Gasto</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatAmount(
                          bookings
                            .filter(b => b.payment_status === 'paid')
                            .reduce((sum, b) => sum + (b.total_amount || 0), 0),
                          'EUR'
                        )}
                      </p>
                    </div>
                    <Euro className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings List */}
            <Card>
              <CardHeader>
                <CardTitle>As Suas Reservas</CardTitle>
                <CardDescription>
                  Histórico completo das suas reservas de espaços
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse">Carregando reservas...</div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Ainda não tem reservas.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2">
                              {booking.spaces.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {formatDate(booking.start_time)} - {formatDate(booking.end_time)}
                                </span>
                              </div>
                              
                              {booking.spaces.address_line1 && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>
                                    {booking.spaces.address_line1}, {booking.spaces.city}
                                  </span>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-1">
                                <Euro className="h-4 w-4" />
                                <span>{formatAmount(booking.total_amount, booking.currency)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status === 'confirmed' ? 'Confirmada' : 
                               booking.status === 'pending' ? 'Pendente' : 'Cancelada'}
                            </Badge>
                            <Badge className={getPaymentStatusColor(booking.payment_status)}>
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

export default ClientDashboard;