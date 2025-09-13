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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      crops: {
        Row: {
          area_size: number
          area_unit: string
          created_at: string
          expected_harvest_date: string | null
          health_status: string
          id: string
          images: string[] | null
          location: string
          name: string
          notes: string | null
          planted_date: string
          stage: string
          updated_at: string
          user_id: string
          variety: string | null
        }
        Insert: {
          area_size: number
          area_unit?: string
          created_at?: string
          expected_harvest_date?: string | null
          health_status?: string
          id?: string
          images?: string[] | null
          location: string
          name: string
          notes?: string | null
          planted_date: string
          stage: string
          updated_at?: string
          user_id: string
          variety?: string | null
        }
        Update: {
          area_size?: number
          area_unit?: string
          created_at?: string
          expected_harvest_date?: string | null
          health_status?: string
          id?: string
          images?: string[] | null
          location?: string
          name?: string
          notes?: string | null
          planted_date?: string
          stage?: string
          updated_at?: string
          user_id?: string
          variety?: string | null
        }
        Relationships: []
      }
      disease_detections: {
        Row: {
          confidence_score: number
          crop_id: string | null
          detected_at: string
          disease_name: string
          id: string
          image_url: string
          metadata: Json | null
          severity: string
          status: string
          symptoms: string[] | null
          treatment_recommendations: string[] | null
          user_id: string
        }
        Insert: {
          confidence_score: number
          crop_id?: string | null
          detected_at?: string
          disease_name: string
          id?: string
          image_url: string
          metadata?: Json | null
          severity: string
          status?: string
          symptoms?: string[] | null
          treatment_recommendations?: string[] | null
          user_id: string
        }
        Update: {
          confidence_score?: number
          crop_id?: string | null
          detected_at?: string
          disease_name?: string
          id?: string
          image_url?: string
          metadata?: Json | null
          severity?: string
          status?: string
          symptoms?: string[] | null
          treatment_recommendations?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "disease_detections_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
      }
      market_prices: {
        Row: {
          created_at: string
          crop_name: string
          currency: string
          date: string
          id: string
          market_location: string
          metadata: Json | null
          price_per_unit: number
          quality_grade: string | null
          source: string
          unit: string
          variety: string | null
        }
        Insert: {
          created_at?: string
          crop_name: string
          currency?: string
          date?: string
          id?: string
          market_location: string
          metadata?: Json | null
          price_per_unit: number
          quality_grade?: string | null
          source: string
          unit?: string
          variety?: string | null
        }
        Update: {
          created_at?: string
          crop_name?: string
          currency?: string
          date?: string
          id?: string
          market_location?: string
          metadata?: Json | null
          price_per_unit?: number
          quality_grade?: string | null
          source?: string
          unit?: string
          variety?: string | null
        }
        Relationships: []
      }
      pest_detections: {
        Row: {
          confidence_score: number
          crop_id: string | null
          detected_at: string
          id: string
          image_url: string
          infestation_level: string
          metadata: Json | null
          pest_name: string
          status: string
          treatment_recommendations: string[] | null
          user_id: string
        }
        Insert: {
          confidence_score: number
          crop_id?: string | null
          detected_at?: string
          id?: string
          image_url: string
          infestation_level: string
          metadata?: Json | null
          pest_name: string
          status?: string
          treatment_recommendations?: string[] | null
          user_id: string
        }
        Update: {
          confidence_score?: number
          crop_id?: string | null
          detected_at?: string
          id?: string
          image_url?: string
          infestation_level?: string
          metadata?: Json | null
          pest_name?: string
          status?: string
          treatment_recommendations?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pest_detections_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
      }
      soil_tests: {
        Row: {
          crop_id: string | null
          id: string
          image_url: string | null
          location: string
          metadata: Json | null
          moisture_content: number | null
          nitrogen_level: number | null
          organic_matter: number | null
          ph_level: number | null
          phosphorus_level: number | null
          potassium_level: number | null
          recommendations: string[] | null
          soil_type: string | null
          test_method: string
          tested_at: string
          user_id: string
        }
        Insert: {
          crop_id?: string | null
          id?: string
          image_url?: string | null
          location: string
          metadata?: Json | null
          moisture_content?: number | null
          nitrogen_level?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recommendations?: string[] | null
          soil_type?: string | null
          test_method: string
          tested_at?: string
          user_id: string
        }
        Update: {
          crop_id?: string | null
          id?: string
          image_url?: string | null
          location?: string
          metadata?: Json | null
          moisture_content?: number | null
          nitrogen_level?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recommendations?: string[] | null
          soil_type?: string | null
          test_method?: string
          tested_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "soil_tests_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
      }
      weather_alerts: {
        Row: {
          alert_type: string
          created_at: string
          description: string
          expires_at: string | null
          id: string
          is_active: boolean
          location: string
          metadata: Json | null
          severity: string
          title: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          description: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          location: string
          metadata?: Json | null
          severity: string
          title: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          description?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          location?: string
          metadata?: Json | null
          severity?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
