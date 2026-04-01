/**
 * @file database.types.ts
 * @description Hand-crafted TypeScript types for the Cerison Puck Supabase schema.
 * Re-generate with: npx supabase gen types typescript --project-id <id> > database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          og_image: string | null;
          lang: string;
          data: Json;
          published: boolean;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title?: string;
          description?: string | null;
          og_image?: string | null;
          lang?: string;
          data?: Json;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['pages']['Insert']>;
      };
      page_revisions: {
        Row: {
          id: string;
          page_id: string;
          data: Json;
          label: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          page_id: string;
          data: Json;
          label?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['page_revisions']['Insert']>;
      };
      templates: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          thumbnail: string | null;
          data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          thumbnail?: string | null;
          data?: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['templates']['Insert']>;
      };
      assets: {
        Row: {
          id: string;
          filename: string;
          url: string;
          mime_type: string;
          size: number | null;
          alt: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          filename: string;
          url: string;
          mime_type: string;
          size?: number | null;
          alt?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['assets']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
