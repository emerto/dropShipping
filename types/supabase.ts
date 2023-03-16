export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      carts: {
        Row: {
          amount: number | null
          order_id: number
          product_id: number
        }
        Insert: {
          amount?: number | null
          order_id?: number
          product_id: number
        }
        Update: {
          amount?: number | null
          order_id?: number
          product_id?: number
        }
      }
      customers: {
        Row: {
          customer_id: string
        }
        Insert: {
          customer_id: string
        }
        Update: {
          customer_id?: string
        }
      }
      dropshippers: {
        Row: {
          dropshipper_id: string
        }
        Insert: {
          dropshipper_id: string
        }
        Update: {
          dropshipper_id?: string
        }
      }
      orders: {
        Row: {
          customer_id: string | null
          delivery_address: string | null
          id: number
          order_date: string | null
          status: string | null
          store_id: number | null
          total: number | null
        }
        Insert: {
          customer_id?: string | null
          delivery_address?: string | null
          id?: number
          order_date?: string | null
          status?: string | null
          store_id?: number | null
          total?: number | null
        }
        Update: {
          customer_id?: string | null
          delivery_address?: string | null
          id?: number
          order_date?: string | null
          status?: string | null
          store_id?: number | null
          total?: number | null
        }
      }
      products: {
        Row: {
          id: number
          name: string
          price: number
          store_id: number
          supplier_prod_image: string
          supplier_product_id: number
        }
        Insert: {
          id?: number
          name: string
          price: number
          store_id: number
          supplier_prod_image: string
          supplier_product_id: number
        }
        Update: {
          id?: number
          name?: string
          price?: number
          store_id?: number
          supplier_prod_image?: string
          supplier_product_id?: number
        }
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          balance: number | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          balance?: number | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          balance?: number | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
          username?: string | null
        }
      }
      stores: {
        Row: {
          id: number
          owner: string
          store_address: string | null
          store_image: string | null
          store_name: string
          store_phone: string
        }
        Insert: {
          id?: number
          owner: string
          store_address?: string | null
          store_image?: string | null
          store_name: string
          store_phone: string
        }
        Update: {
          id?: number
          owner?: string
          store_address?: string | null
          store_image?: string | null
          store_name?: string
          store_phone?: string
        }
      }
      supplier_products: {
        Row: {
          id: number
          image: string
          name: string
          price: number
          stock: number
        }
        Insert: {
          id?: number
          image: string
          name: string
          price: number
          stock: number
        }
        Update: {
          id?: number
          image?: string
          name?: string
          price?: number
          stock?: number
        }
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
