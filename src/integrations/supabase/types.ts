export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          currency: string | null
          end_time: string
          id: string
          notes: string | null
          organization_id: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          space_id: string
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          end_time: string
          id?: string
          notes?: string | null
          organization_id: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          space_id: string
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          organization_id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          space_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["org_member_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["org_member_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["org_member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          created_by: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          description: string | null
          external_customer_id: string | null
          external_provider: string | null
          external_subscription_id: string | null
          id: string
          name: string
          plan: string | null
          slug: string | null
          subscription_status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          description?: string | null
          external_customer_id?: string | null
          external_provider?: string | null
          external_subscription_id?: string | null
          id?: string
          name: string
          plan?: string | null
          slug?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          description?: string | null
          external_customer_id?: string | null
          external_provider?: string | null
          external_subscription_id?: string | null
          id?: string
          name?: string
          plan?: string | null
          slug?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string | null
          id: string
          organization_id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_payment_intent_id: string | null
          provider_session_id: string | null
          raw_payload: Json | null
          receipt_url: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string | null
          id?: string
          organization_id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_payment_intent_id?: string | null
          provider_session_id?: string | null
          raw_payload?: Json | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string | null
          id?: string
          organization_id?: string
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_payment_intent_id?: string | null
          provider_session_id?: string | null
          raw_payload?: Json | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          locale: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          locale?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          locale?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      space_images: {
        Row: {
          created_at: string
          id: string
          is_cover: boolean
          space_id: string
          storage_path: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_cover?: boolean
          space_id: string
          storage_path: string
        }
        Update: {
          created_at?: string
          id?: string
          is_cover?: boolean
          space_id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_images_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          amenities: Json
          capacity: number | null
          city: string | null
          country_code: string | null
          created_at: string
          created_by: string | null
          currency: string | null
          daily_rate: number | null
          description: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean
          latitude: number | null
          longitude: number | null
          organization_id: string
          postal_code: string | null
          region: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          amenities?: Json
          capacity?: number | null
          city?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          daily_rate?: number | null
          description?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          organization_id: string
          postal_code?: string | null
          region?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          amenities?: Json
          capacity?: number | null
          city?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          daily_rate?: number | null
          description?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          organization_id?: string
          postal_code?: string | null
          region?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          external_customer_id: string | null
          external_provider: string | null
          external_subscription_id: string | null
          id: string
          organization_id: string
          plan: string | null
          price_cents: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          external_customer_id?: string | null
          external_provider?: string | null
          external_subscription_id?: string | null
          id?: string
          organization_id: string
          plan?: string | null
          price_cents?: number | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          external_customer_id?: string | null
          external_provider?: string | null
          external_subscription_id?: string | null
          id?: string
          organization_id?: string
          plan?: string | null
          price_cents?: number | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_space_org_id: {
        Args: { _space_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_org_member: {
        Args: { _organization_id: string; _user_id: string }
        Returns: boolean
      }
      is_org_member_with_min_role: {
        Args: {
          _min_role: Database["public"]["Enums"]["org_member_role"]
          _organization_id: string
          _user_id: string
        }
        Returns: boolean
      }
      org_role_rank: {
        Args: { _role: Database["public"]["Enums"]["org_member_role"] }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      booking_status: "pending" | "confirmed" | "canceled" | "completed"
      org_member_role: "owner" | "manager" | "member"
      payment_provider:
        | "stripe"
        | "paypal"
        | "mpesa"
        | "mkesh"
        | "emola"
        | "other"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "incomplete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      booking_status: ["pending", "confirmed", "canceled", "completed"],
      org_member_role: ["owner", "manager", "member"],
      payment_provider: [
        "stripe",
        "paypal",
        "mpesa",
        "mkesh",
        "emola",
        "other",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
        "incomplete",
      ],
    },
  },
} as const
