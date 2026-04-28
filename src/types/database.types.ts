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
      blog_posts: {
        Row: {
          canonical_url: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          gtm_layer: Json | null
          id: string
          markdown_path: string
          persona: string | null
          published_at: string | null
          seo_description: string | null
          seo_path: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          gtm_layer?: Json | null
          id?: string
          markdown_path: string
          persona?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_path?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          gtm_layer?: Json | null
          id?: string
          markdown_path?: string
          persona?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_path?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cartitems: {
        Row: {
          carts: number | null
          cartToken: string
          changeType: Database["public"]["Enums"]["itemChangeType"] | null
          consumers: number | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          discountAllocation: number | null
          discountScope: Database["public"]["Enums"]["discountScope"] | null
          id: number
          lineAllowDiscounts: number | null
          lineAllowFinance: number | null
          lineAllowShipping: number | null
          lineAllowShrink: number | null
          lineCostOfGoods: number | null
          lineDiscountsTaken: number | null
          lineFinanceTaken: number | null
          lineGrossProfit: number | null
          lineMarketAdjust: number | null
          lineMarketAdjustTaken: number | null
          lineMMUDollars: number | null
          lineMMUPercent: number | null
          lineOfferDiscounts: number | null
          lineOfferFinance: number | null
          lineOfferMarketAdjust: number | null
          lineOfferMMUDollars: number | null
          lineOfferMMUPercent: number | null
          lineOfferShipping: number | null
          lineOfferShrink: number | null
          lineOfferSubtotal: number | null
          lineProfitMarkup: number | null
          lineProfitMarkupTaken: number | null
          lineProfitMUTaken: number | null
          lineRetainedProfitMU: number | null
          lineRetainedTotalMarkup: number | null
          lineSellingSubtotal: number | null
          lineSettleDiscounts: number | null
          lineSettleFinance: number | null
          lineSettleMarketAdjust: number | null
          lineSettleMMUDollars: number | null
          lineSettleMMUPercent: number | null
          lineSettleShipping: number | null
          lineSettleShrink: number | null
          lineSettleSubtotal: number | null
          lineShippingTaken: number | null
          lineShrinkTaken: number | null
          lineTotalAllowances: number | null
          lineTotalMarkup: number | null
          modifiedDate: string | null
          name: string | null
          offers: number | null
          productGID: string | null
          productID: string | null
          productImageURL: string | null
          productName: string | null
          products: number | null
          productURL: string | null
          shops: number | null
          sku: string | null
          status: Database["public"]["Enums"]["itemStatus"] | null
          template: string | null
          unitAllowDiscounts: number | null
          unitAllowFinance: number | null
          unitAllowShipping: number | null
          unitAllowShrink: number | null
          unitCost: number | null
          unitMarketAdjust: number | null
          unitOfferDiscount: number | null
          unitOfferPrice: number | null
          unitPriceBuilderPrice: number | null
          unitPriceMismatch: boolean | null
          unitPriceMismatchCents: number | null
          unitProfitMU: number | null
          unitQuantity: number | null
          unitSellingPrice: number | null
          unitSettlePrice: number | null
          unitTotalAllowances: number | null
          unitTotalMarkup: number | null
          variantGID: string | null
          variantID: string
          variantImageURL: string | null
          variantName: string | null
          variants: number | null
        }
        Insert: {
          carts?: number | null
          cartToken: string
          changeType?: Database["public"]["Enums"]["itemChangeType"] | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          discountAllocation?: number | null
          discountScope?: Database["public"]["Enums"]["discountScope"] | null
          id?: number
          lineAllowDiscounts?: number | null
          lineAllowFinance?: number | null
          lineAllowShipping?: number | null
          lineAllowShrink?: number | null
          lineCostOfGoods?: number | null
          lineDiscountsTaken?: number | null
          lineFinanceTaken?: number | null
          lineGrossProfit?: number | null
          lineMarketAdjust?: number | null
          lineMarketAdjustTaken?: number | null
          lineMMUDollars?: number | null
          lineMMUPercent?: number | null
          lineOfferDiscounts?: number | null
          lineOfferFinance?: number | null
          lineOfferMarketAdjust?: number | null
          lineOfferMMUDollars?: number | null
          lineOfferMMUPercent?: number | null
          lineOfferShipping?: number | null
          lineOfferShrink?: number | null
          lineOfferSubtotal?: number | null
          lineProfitMarkup?: number | null
          lineProfitMarkupTaken?: number | null
          lineProfitMUTaken?: number | null
          lineRetainedProfitMU?: number | null
          lineRetainedTotalMarkup?: number | null
          lineSellingSubtotal?: number | null
          lineSettleDiscounts?: number | null
          lineSettleFinance?: number | null
          lineSettleMarketAdjust?: number | null
          lineSettleMMUDollars?: number | null
          lineSettleMMUPercent?: number | null
          lineSettleShipping?: number | null
          lineSettleShrink?: number | null
          lineSettleSubtotal?: number | null
          lineShippingTaken?: number | null
          lineShrinkTaken?: number | null
          lineTotalAllowances?: number | null
          lineTotalMarkup?: number | null
          modifiedDate?: string | null
          name?: string | null
          offers?: number | null
          productGID?: string | null
          productID?: string | null
          productImageURL?: string | null
          productName?: string | null
          products?: number | null
          productURL?: string | null
          shops?: number | null
          sku?: string | null
          status?: Database["public"]["Enums"]["itemStatus"] | null
          template?: string | null
          unitAllowDiscounts?: number | null
          unitAllowFinance?: number | null
          unitAllowShipping?: number | null
          unitAllowShrink?: number | null
          unitCost?: number | null
          unitMarketAdjust?: number | null
          unitOfferDiscount?: number | null
          unitOfferPrice?: number | null
          unitPriceBuilderPrice?: number | null
          unitPriceMismatch?: boolean | null
          unitPriceMismatchCents?: number | null
          unitProfitMU?: number | null
          unitQuantity?: number | null
          unitSellingPrice?: number | null
          unitSettlePrice?: number | null
          unitTotalAllowances?: number | null
          unitTotalMarkup?: number | null
          variantGID?: string | null
          variantID: string
          variantImageURL?: string | null
          variantName?: string | null
          variants?: number | null
        }
        Update: {
          carts?: number | null
          cartToken?: string
          changeType?: Database["public"]["Enums"]["itemChangeType"] | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          discountAllocation?: number | null
          discountScope?: Database["public"]["Enums"]["discountScope"] | null
          id?: number
          lineAllowDiscounts?: number | null
          lineAllowFinance?: number | null
          lineAllowShipping?: number | null
          lineAllowShrink?: number | null
          lineCostOfGoods?: number | null
          lineDiscountsTaken?: number | null
          lineFinanceTaken?: number | null
          lineGrossProfit?: number | null
          lineMarketAdjust?: number | null
          lineMarketAdjustTaken?: number | null
          lineMMUDollars?: number | null
          lineMMUPercent?: number | null
          lineOfferDiscounts?: number | null
          lineOfferFinance?: number | null
          lineOfferMarketAdjust?: number | null
          lineOfferMMUDollars?: number | null
          lineOfferMMUPercent?: number | null
          lineOfferShipping?: number | null
          lineOfferShrink?: number | null
          lineOfferSubtotal?: number | null
          lineProfitMarkup?: number | null
          lineProfitMarkupTaken?: number | null
          lineProfitMUTaken?: number | null
          lineRetainedProfitMU?: number | null
          lineRetainedTotalMarkup?: number | null
          lineSellingSubtotal?: number | null
          lineSettleDiscounts?: number | null
          lineSettleFinance?: number | null
          lineSettleMarketAdjust?: number | null
          lineSettleMMUDollars?: number | null
          lineSettleMMUPercent?: number | null
          lineSettleShipping?: number | null
          lineSettleShrink?: number | null
          lineSettleSubtotal?: number | null
          lineShippingTaken?: number | null
          lineShrinkTaken?: number | null
          lineTotalAllowances?: number | null
          lineTotalMarkup?: number | null
          modifiedDate?: string | null
          name?: string | null
          offers?: number | null
          productGID?: string | null
          productID?: string | null
          productImageURL?: string | null
          productName?: string | null
          products?: number | null
          productURL?: string | null
          shops?: number | null
          sku?: string | null
          status?: Database["public"]["Enums"]["itemStatus"] | null
          template?: string | null
          unitAllowDiscounts?: number | null
          unitAllowFinance?: number | null
          unitAllowShipping?: number | null
          unitAllowShrink?: number | null
          unitCost?: number | null
          unitMarketAdjust?: number | null
          unitOfferDiscount?: number | null
          unitOfferPrice?: number | null
          unitPriceBuilderPrice?: number | null
          unitPriceMismatch?: boolean | null
          unitPriceMismatchCents?: number | null
          unitProfitMU?: number | null
          unitQuantity?: number | null
          unitSellingPrice?: number | null
          unitSettlePrice?: number | null
          unitTotalAllowances?: number | null
          unitTotalMarkup?: number | null
          variantGID?: string | null
          variantID?: string
          variantImageURL?: string | null
          variantName?: string | null
          variants?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cartitems_carts_fkey"
            columns: ["carts"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cartitems_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cartitems_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cartitems_products_fkey"
            columns: ["products"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cartitems_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cartitems_variants_fkey"
            columns: ["variants"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          cartAllowDiscounts: number | null
          cartAllowFinance: number | null
          cartAllowShipping: number | null
          cartAllowShrink: number | null
          cartComposition: string | null
          cartCostOfGoods: number | null
          cartDiscountAllocation: number | null
          cartDiscountAllocationDiff: number | null
          cartDiscountPercent: number | null
          cartDiscountsTaken: number | null
          cartFinanceTaken: number | null
          cartGrossProfitOffer: number | null
          cartGrossProfitSell: number | null
          cartGrossProfitSettle: number | null
          cartItemCount: number | null
          cartMarketAdjust: number | null
          cartMarketAdjustTaken: number | null
          cartMMU: number | null
          cartMMUPercent: number | null
          cartOfferDiscount: number | null
          cartOfferDiscountPercent: number | null
          cartOfferDiscounts: number | null
          cartOfferFinance: number | null
          cartOfferMarketAdjust: number | null
          cartOfferMMU: number | null
          cartOfferRetainedMarkup: number | null
          cartOfferRetainedMarkupPercent: number | null
          cartOfferShipping: number | null
          cartOfferShrink: number | null
          cartOfferSubtotal: number | null
          cartOtherMarkup: number | null
          cartPriceMismatchCount: number | null
          cartPriceMismatchFlag: boolean | null
          cartPriceMismatchMax: number | null
          cartProfitMarkup: number | null
          cartProfitMarkupTaken: number | null
          cartRetainedMarkup: number | null
          cartRetainedMarkupPercent: number | null
          cartSellingSubtotal: number | null
          cartSellMMU: number | null
          cartSettleDiscount: number | null
          cartSettleDiscountPercent: number | null
          cartSettleDiscountsTaken: number | null
          cartSettleFinanceTaken: number | null
          cartSettleMarketAdjustTaken: number | null
          cartSettleMMU: number | null
          cartSettleRetainedMarkup: number | null
          cartSettleRetainedMarkupPercent: number | null
          cartSettleShippingTaken: number | null
          cartSettleShrinkTaken: number | null
          cartSettleSubtotal: number | null
          cartSettleTotal: number | null
          cartShippingCost: number | null
          cartShippingPrice: number | null
          cartShippingTaken: number | null
          cartShrinkTaken: number | null
          cartStatus: Database["public"]["Enums"]["cartStatus"] | null
          cartToken: string | null
          cartTotalAllowance: number | null
          cartTotalMarkup: number | null
          cartTotalPrice: number | null
          cartUnitCount: number | null
          consumers: number | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          currency: string | null
          id: number
          modifiedDate: string | null
          offers: number | null
          orders: number | null
          shops: number | null
          updateDate: string | null
        }
        Insert: {
          cartAllowDiscounts?: number | null
          cartAllowFinance?: number | null
          cartAllowShipping?: number | null
          cartAllowShrink?: number | null
          cartComposition?: string | null
          cartCostOfGoods?: number | null
          cartDiscountAllocation?: number | null
          cartDiscountAllocationDiff?: number | null
          cartDiscountPercent?: number | null
          cartDiscountsTaken?: number | null
          cartFinanceTaken?: number | null
          cartGrossProfitOffer?: number | null
          cartGrossProfitSell?: number | null
          cartGrossProfitSettle?: number | null
          cartItemCount?: number | null
          cartMarketAdjust?: number | null
          cartMarketAdjustTaken?: number | null
          cartMMU?: number | null
          cartMMUPercent?: number | null
          cartOfferDiscount?: number | null
          cartOfferDiscountPercent?: number | null
          cartOfferDiscounts?: number | null
          cartOfferFinance?: number | null
          cartOfferMarketAdjust?: number | null
          cartOfferMMU?: number | null
          cartOfferRetainedMarkup?: number | null
          cartOfferRetainedMarkupPercent?: number | null
          cartOfferShipping?: number | null
          cartOfferShrink?: number | null
          cartOfferSubtotal?: number | null
          cartOtherMarkup?: number | null
          cartPriceMismatchCount?: number | null
          cartPriceMismatchFlag?: boolean | null
          cartPriceMismatchMax?: number | null
          cartProfitMarkup?: number | null
          cartProfitMarkupTaken?: number | null
          cartRetainedMarkup?: number | null
          cartRetainedMarkupPercent?: number | null
          cartSellingSubtotal?: number | null
          cartSellMMU?: number | null
          cartSettleDiscount?: number | null
          cartSettleDiscountPercent?: number | null
          cartSettleDiscountsTaken?: number | null
          cartSettleFinanceTaken?: number | null
          cartSettleMarketAdjustTaken?: number | null
          cartSettleMMU?: number | null
          cartSettleRetainedMarkup?: number | null
          cartSettleRetainedMarkupPercent?: number | null
          cartSettleShippingTaken?: number | null
          cartSettleShrinkTaken?: number | null
          cartSettleSubtotal?: number | null
          cartSettleTotal?: number | null
          cartShippingCost?: number | null
          cartShippingPrice?: number | null
          cartShippingTaken?: number | null
          cartShrinkTaken?: number | null
          cartStatus?: Database["public"]["Enums"]["cartStatus"] | null
          cartToken?: string | null
          cartTotalAllowance?: number | null
          cartTotalMarkup?: number | null
          cartTotalPrice?: number | null
          cartUnitCount?: number | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          currency?: string | null
          id?: number
          modifiedDate?: string | null
          offers?: number | null
          orders?: number | null
          shops?: number | null
          updateDate?: string | null
        }
        Update: {
          cartAllowDiscounts?: number | null
          cartAllowFinance?: number | null
          cartAllowShipping?: number | null
          cartAllowShrink?: number | null
          cartComposition?: string | null
          cartCostOfGoods?: number | null
          cartDiscountAllocation?: number | null
          cartDiscountAllocationDiff?: number | null
          cartDiscountPercent?: number | null
          cartDiscountsTaken?: number | null
          cartFinanceTaken?: number | null
          cartGrossProfitOffer?: number | null
          cartGrossProfitSell?: number | null
          cartGrossProfitSettle?: number | null
          cartItemCount?: number | null
          cartMarketAdjust?: number | null
          cartMarketAdjustTaken?: number | null
          cartMMU?: number | null
          cartMMUPercent?: number | null
          cartOfferDiscount?: number | null
          cartOfferDiscountPercent?: number | null
          cartOfferDiscounts?: number | null
          cartOfferFinance?: number | null
          cartOfferMarketAdjust?: number | null
          cartOfferMMU?: number | null
          cartOfferRetainedMarkup?: number | null
          cartOfferRetainedMarkupPercent?: number | null
          cartOfferShipping?: number | null
          cartOfferShrink?: number | null
          cartOfferSubtotal?: number | null
          cartOtherMarkup?: number | null
          cartPriceMismatchCount?: number | null
          cartPriceMismatchFlag?: boolean | null
          cartPriceMismatchMax?: number | null
          cartProfitMarkup?: number | null
          cartProfitMarkupTaken?: number | null
          cartRetainedMarkup?: number | null
          cartRetainedMarkupPercent?: number | null
          cartSellingSubtotal?: number | null
          cartSellMMU?: number | null
          cartSettleDiscount?: number | null
          cartSettleDiscountPercent?: number | null
          cartSettleDiscountsTaken?: number | null
          cartSettleFinanceTaken?: number | null
          cartSettleMarketAdjustTaken?: number | null
          cartSettleMMU?: number | null
          cartSettleRetainedMarkup?: number | null
          cartSettleRetainedMarkupPercent?: number | null
          cartSettleShippingTaken?: number | null
          cartSettleShrinkTaken?: number | null
          cartSettleSubtotal?: number | null
          cartSettleTotal?: number | null
          cartShippingCost?: number | null
          cartShippingPrice?: number | null
          cartShippingTaken?: number | null
          cartShrinkTaken?: number | null
          cartStatus?: Database["public"]["Enums"]["cartStatus"] | null
          cartToken?: string | null
          cartTotalAllowance?: number | null
          cartTotalMarkup?: number | null
          cartTotalPrice?: number | null
          cartUnitCount?: number | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          currency?: string | null
          id?: number
          modifiedDate?: string | null
          offers?: number | null
          orders?: number | null
          shops?: number | null
          updateDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carts_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carts_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carts_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          categoryName: string | null
          created_at: string
          description: string | null
          id: number
        }
        Insert: {
          categoryName?: string | null
          created_at?: string
          description?: string | null
          id?: number
        }
        Update: {
          categoryName?: string | null
          created_at?: string
          description?: string | null
          id?: number
        }
        Relationships: []
      }
      collections: {
        Row: {
          collectionTitle: string | null
          created_at: string
          description: string | null
          id: number
          shopifyCollectionGID: string | null
          shopifyCollectionID: string | null
          shops: number | null
          variants: Json | null
        }
        Insert: {
          collectionTitle?: string | null
          created_at?: string
          description?: string | null
          id?: number
          shopifyCollectionGID?: string | null
          shopifyCollectionID?: string | null
          shops?: number | null
          variants?: Json | null
        }
        Update: {
          collectionTitle?: string | null
          created_at?: string
          description?: string | null
          id?: number
          shopifyCollectionGID?: string | null
          shopifyCollectionID?: string | null
          shops?: number | null
          variants?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      consumerNotifications: {
        Row: {
          consumers: number
          counterOffers: number | null
          createdAt: string
          ctaUrl: string | null
          dedupeKey: string | null
          expiresAt: string | null
          id: number
          isRead: boolean
          message: string
          offers: number | null
          payload: Json
          readAt: string | null
          shops: number
          title: string
          type: string
        }
        Insert: {
          consumers: number
          counterOffers?: number | null
          createdAt?: string
          ctaUrl?: string | null
          dedupeKey?: string | null
          expiresAt?: string | null
          id?: number
          isRead?: boolean
          message: string
          offers?: number | null
          payload?: Json
          readAt?: string | null
          shops: number
          title: string
          type: string
        }
        Update: {
          consumers?: number
          counterOffers?: number | null
          createdAt?: string
          ctaUrl?: string | null
          dedupeKey?: string | null
          expiresAt?: string | null
          id?: number
          isRead?: boolean
          message?: string
          offers?: number | null
          payload?: Json
          readAt?: string | null
          shops?: number
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "consumerNotifications_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerNotifications_counterOffers_fkey"
            columns: ["counterOffers"]
            isOneToOne: false
            referencedRelation: "counterOffers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerNotifications_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerNotifications_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      consumers: {
        Row: {
          address: string | null
          carts: string[] | null
          city: string | null
          consumerSampleID: number | null
          created_at: string
          created_by: string | null
          createDate: string | null
          customerShopifyGID: string | null
          displayName: string | null
          email: string | null
          email_canonical: string | null
          firstName: string | null
          geoAddress: Json | null
          id: number
          lastChange: Json | null
          lastName: string | null
          modifiedDate: string | null
          offers: string[] | null
          phone: string | null
          phone_canonical: string | null
          postalCode: string | null
          stateProvince: string | null
          users: string | null
        }
        Insert: {
          address?: string | null
          carts?: string[] | null
          city?: string | null
          consumerSampleID?: number | null
          created_at?: string
          created_by?: string | null
          createDate?: string | null
          customerShopifyGID?: string | null
          displayName?: string | null
          email?: string | null
          email_canonical?: string | null
          firstName?: string | null
          geoAddress?: Json | null
          id?: number
          lastChange?: Json | null
          lastName?: string | null
          modifiedDate?: string | null
          offers?: string[] | null
          phone?: string | null
          phone_canonical?: string | null
          postalCode?: string | null
          stateProvince?: string | null
          users?: string | null
        }
        Update: {
          address?: string | null
          carts?: string[] | null
          city?: string | null
          consumerSampleID?: number | null
          created_at?: string
          created_by?: string | null
          createDate?: string | null
          customerShopifyGID?: string | null
          displayName?: string | null
          email?: string | null
          email_canonical?: string | null
          firstName?: string | null
          geoAddress?: Json | null
          id?: number
          lastChange?: Json | null
          lastName?: string | null
          modifiedDate?: string | null
          offers?: string[] | null
          phone?: string | null
          phone_canonical?: string | null
          postalCode?: string | null
          stateProvince?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consumers_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      consumerShop: {
        Row: {
          consumers: number
          created_at: string
          customerShopID: string | null
          shopifyConsumerGID: string | null
          shops: number
        }
        Insert: {
          consumers: number
          created_at?: string
          customerShopID?: string | null
          shopifyConsumerGID?: string | null
          shops: number
        }
        Update: {
          consumers?: number
          created_at?: string
          customerShopID?: string | null
          shopifyConsumerGID?: string | null
          shops?: number
        }
        Relationships: [
          {
            foreignKeyName: "consumerShop_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerShop_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      consumerShop12m: {
        Row: {
          acceptedCount: number | null
          consumers: number
          created_at: string | null
          declinedCount: number | null
          expiredCount: number | null
          firstOfferDate: string | null
          grossCOGS: number | null
          grossDiscounts: number | null
          grossItems: number | null
          grossReturns: number | null
          grossSales: number | null
          grossShippingCost: number | null
          grossShippingSales: number | null
          grossUnits: number | null
          id: number
          lastOfferDate: string | null
          lastPurchaseDate: string | null
          netItems: number | null
          netSales: number | null
          netShippingSales: number | null
          netUnits: number | null
          norSales: number | null
          offersMade: number | null
          orders: number | null
          returnCOGS: number | null
          returnDiscounts: number | null
          returnItems: number | null
          returnShippingCost: number | null
          returnShippingSales: number | null
          returnUnits: number | null
          shops: number
          totalCartPrice: number | null
          totalItemsCount: number | null
          totalOfferPrice: number | null
          totalOffersCount: number | null
          totalUnitsSum: number | null
        }
        Insert: {
          acceptedCount?: number | null
          consumers: number
          created_at?: string | null
          declinedCount?: number | null
          expiredCount?: number | null
          firstOfferDate?: string | null
          grossCOGS?: number | null
          grossDiscounts?: number | null
          grossItems?: number | null
          grossReturns?: number | null
          grossSales?: number | null
          grossShippingCost?: number | null
          grossShippingSales?: number | null
          grossUnits?: number | null
          id?: number
          lastOfferDate?: string | null
          lastPurchaseDate?: string | null
          netItems?: number | null
          netSales?: number | null
          netShippingSales?: number | null
          netUnits?: number | null
          norSales?: number | null
          offersMade?: number | null
          orders?: number | null
          returnCOGS?: number | null
          returnDiscounts?: number | null
          returnItems?: number | null
          returnShippingCost?: number | null
          returnShippingSales?: number | null
          returnUnits?: number | null
          shops: number
          totalCartPrice?: number | null
          totalItemsCount?: number | null
          totalOfferPrice?: number | null
          totalOffersCount?: number | null
          totalUnitsSum?: number | null
        }
        Update: {
          acceptedCount?: number | null
          consumers?: number
          created_at?: string | null
          declinedCount?: number | null
          expiredCount?: number | null
          firstOfferDate?: string | null
          grossCOGS?: number | null
          grossDiscounts?: number | null
          grossItems?: number | null
          grossReturns?: number | null
          grossSales?: number | null
          grossShippingCost?: number | null
          grossShippingSales?: number | null
          grossUnits?: number | null
          id?: number
          lastOfferDate?: string | null
          lastPurchaseDate?: string | null
          netItems?: number | null
          netSales?: number | null
          netShippingSales?: number | null
          netUnits?: number | null
          norSales?: number | null
          offersMade?: number | null
          orders?: number | null
          returnCOGS?: number | null
          returnDiscounts?: number | null
          returnItems?: number | null
          returnShippingCost?: number | null
          returnShippingSales?: number | null
          returnUnits?: number | null
          shops?: number
          totalCartPrice?: number | null
          totalItemsCount?: number | null
          totalOfferPrice?: number | null
          totalOffersCount?: number | null
          totalUnitsSum?: number | null
        }
        Relationships: []
      }
      consumerShopCategoryIndex: {
        Row: {
          category: string | null
          consumer: number | null
          created_at: string
          id: number
          shops: number | null
        }
        Insert: {
          category?: string | null
          consumer?: number | null
          created_at?: string
          id?: number
          shops?: number | null
        }
        Update: {
          category?: string | null
          consumer?: number | null
          created_at?: string
          id?: number
          shops?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "consumerCategoryIndex_consumer_fkey"
            columns: ["consumer"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerShopCategoryIndex_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      consumerShopCPM: {
        Row: {
          consumers: number | null
          cpDaysBetweenOrders: number | null
          cpEndDate: string | null
          cpGrossCOGS: number | null
          cpGrossDiscounts: number | null
          cpGrossFinanceCost: number | null
          cpGrossItems: number | null
          cpGrossReturns: number | null
          cpGrossSales: number | null
          cpGrossShippingCost: number | null
          cpGrossSrinkCost: number | null
          cpGrossUnits: number | null
          cpOrders: number | null
          cpProfitMarkup: number | null
          cpReturnCOGS: number | null
          cpReturnDiscounts: number | null
          cpReturnItems: number | null
          cpReturnSales: number | null
          cpReturnUnits: number | null
          cpStartDate: string | null
          cpStoresShopped: number | null
          createDate: string | null
          createdby: string | null
          id: number
          isActive: boolean | null
          modifiedDate: string | null
          periodType: string | null
          ppCategoriesShopped: number | null
          ppDaysBetweenOrders: number | null
          ppEndDate: string | null
          ppGrossCOGS: number | null
          ppGrossDiscounts: number | null
          ppGrossFinanceCost: number | null
          ppGrossItems: number | null
          ppGrossSales: number | null
          ppGrossShipCost: number | null
          ppGrossShrinkCost: number | null
          ppGrossUnits: number | null
          ppOrders: number | null
          ppProfitMarkup: number | null
          ppReturnCOGS: number | null
          ppReturnItems: number | null
          ppReturnSales: number | null
          ppReturnUnits: number | null
          ppStartDate: string | null
          ppStoresShopped: number | null
          shops: number | null
        }
        Insert: {
          consumers?: number | null
          cpDaysBetweenOrders?: number | null
          cpEndDate?: string | null
          cpGrossCOGS?: number | null
          cpGrossDiscounts?: number | null
          cpGrossFinanceCost?: number | null
          cpGrossItems?: number | null
          cpGrossReturns?: number | null
          cpGrossSales?: number | null
          cpGrossShippingCost?: number | null
          cpGrossSrinkCost?: number | null
          cpGrossUnits?: number | null
          cpOrders?: number | null
          cpProfitMarkup?: number | null
          cpReturnCOGS?: number | null
          cpReturnDiscounts?: number | null
          cpReturnItems?: number | null
          cpReturnSales?: number | null
          cpReturnUnits?: number | null
          cpStartDate?: string | null
          cpStoresShopped?: number | null
          createDate?: string | null
          createdby?: string | null
          id?: number
          isActive?: boolean | null
          modifiedDate?: string | null
          periodType?: string | null
          ppCategoriesShopped?: number | null
          ppDaysBetweenOrders?: number | null
          ppEndDate?: string | null
          ppGrossCOGS?: number | null
          ppGrossDiscounts?: number | null
          ppGrossFinanceCost?: number | null
          ppGrossItems?: number | null
          ppGrossSales?: number | null
          ppGrossShipCost?: number | null
          ppGrossShrinkCost?: number | null
          ppGrossUnits?: number | null
          ppOrders?: number | null
          ppProfitMarkup?: number | null
          ppReturnCOGS?: number | null
          ppReturnItems?: number | null
          ppReturnSales?: number | null
          ppReturnUnits?: number | null
          ppStartDate?: string | null
          ppStoresShopped?: number | null
          shops?: number | null
        }
        Update: {
          consumers?: number | null
          cpDaysBetweenOrders?: number | null
          cpEndDate?: string | null
          cpGrossCOGS?: number | null
          cpGrossDiscounts?: number | null
          cpGrossFinanceCost?: number | null
          cpGrossItems?: number | null
          cpGrossReturns?: number | null
          cpGrossSales?: number | null
          cpGrossShippingCost?: number | null
          cpGrossSrinkCost?: number | null
          cpGrossUnits?: number | null
          cpOrders?: number | null
          cpProfitMarkup?: number | null
          cpReturnCOGS?: number | null
          cpReturnDiscounts?: number | null
          cpReturnItems?: number | null
          cpReturnSales?: number | null
          cpReturnUnits?: number | null
          cpStartDate?: string | null
          cpStoresShopped?: number | null
          createDate?: string | null
          createdby?: string | null
          id?: number
          isActive?: boolean | null
          modifiedDate?: string | null
          periodType?: string | null
          ppCategoriesShopped?: number | null
          ppDaysBetweenOrders?: number | null
          ppEndDate?: string | null
          ppGrossCOGS?: number | null
          ppGrossDiscounts?: number | null
          ppGrossFinanceCost?: number | null
          ppGrossItems?: number | null
          ppGrossSales?: number | null
          ppGrossShipCost?: number | null
          ppGrossShrinkCost?: number | null
          ppGrossUnits?: number | null
          ppOrders?: number | null
          ppProfitMarkup?: number | null
          ppReturnCOGS?: number | null
          ppReturnItems?: number | null
          ppReturnSales?: number | null
          ppReturnUnits?: number | null
          ppStartDate?: string | null
          ppStoresShopped?: number | null
          shops?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "consumerShopCPM_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerShopPortfolioMeasures_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      consumerShopCPMS: {
        Row: {
          consumers: number | null
          cpEndDate: string | null
          cpQuintile: number | null
          cpStartDate: string | null
          created_at: string
          id: number
          isActive: boolean
          name: Database["public"]["Enums"]["portfolioName"] | null
          portfolioPeriod: Database["public"]["Enums"]["portfolioPeriod"]
          ppEndDate: string | null
          ppQuintile: number | null
          ppStartDate: string | null
          shops: number | null
        }
        Insert: {
          consumers?: number | null
          cpEndDate?: string | null
          cpQuintile?: number | null
          cpStartDate?: string | null
          created_at?: string
          id?: number
          isActive?: boolean
          name?: Database["public"]["Enums"]["portfolioName"] | null
          portfolioPeriod: Database["public"]["Enums"]["portfolioPeriod"]
          ppEndDate?: string | null
          ppQuintile?: number | null
          ppStartDate?: string | null
          shops?: number | null
        }
        Update: {
          consumers?: number | null
          cpEndDate?: string | null
          cpQuintile?: number | null
          cpStartDate?: string | null
          created_at?: string
          id?: number
          isActive?: boolean
          name?: Database["public"]["Enums"]["portfolioName"] | null
          portfolioPeriod?: Database["public"]["Enums"]["portfolioPeriod"]
          ppEndDate?: string | null
          ppQuintile?: number | null
          ppStartDate?: string | null
          shops?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "consumerShopCPMS_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerShopPortfolioScores_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      consumerShopLTV: {
        Row: {
          averageOrderValue: number | null
          brandDuration: number | null
          consumers: number | null
          created_at: string
          distinctCategories: number | null
          firstPurchaseDate: string | null
          grossCOGS: number | null
          grossDiscounts: number | null
          grossFinanceCost: number | null
          grossItems: number | null
          grossProfitMarkup: number | null
          grossSales: number | null
          grossShippingCost: number | null
          grossShippingSales: number | null
          grossShrinkCost: number | null
          grossUnits: number | null
          highestOrderValue: number | null
          id: number
          lastPurchaseDate: string | null
          lowestOrderValue: number | null
          returnCOGS: number | null
          returnDiscounts: number | null
          returnItems: number | null
          returnProfitMarkup: number | null
          returnSales: number | null
          returnShippingCost: number | null
          returnShippingSales: number | null
          returnUnits: number | null
          salesVelocity: number | null
          shops: number | null
          topCategory: string | null
          totalGrossProfit: number | null
          totalItems: number | null
          totalNetSales: number | null
          totalNORSales: number | null
          totalOffers: number | null
          totalOrders: number | null
          totalShippingSales: number | null
          totalUnits: number | null
          uniqueCategoriesShopped: number | null
          updated_at: string | null
        }
        Insert: {
          averageOrderValue?: number | null
          brandDuration?: number | null
          consumers?: number | null
          created_at?: string
          distinctCategories?: number | null
          firstPurchaseDate?: string | null
          grossCOGS?: number | null
          grossDiscounts?: number | null
          grossFinanceCost?: number | null
          grossItems?: number | null
          grossProfitMarkup?: number | null
          grossSales?: number | null
          grossShippingCost?: number | null
          grossShippingSales?: number | null
          grossShrinkCost?: number | null
          grossUnits?: number | null
          highestOrderValue?: number | null
          id?: number
          lastPurchaseDate?: string | null
          lowestOrderValue?: number | null
          returnCOGS?: number | null
          returnDiscounts?: number | null
          returnItems?: number | null
          returnProfitMarkup?: number | null
          returnSales?: number | null
          returnShippingCost?: number | null
          returnShippingSales?: number | null
          returnUnits?: number | null
          salesVelocity?: number | null
          shops?: number | null
          topCategory?: string | null
          totalGrossProfit?: number | null
          totalItems?: number | null
          totalNetSales?: number | null
          totalNORSales?: number | null
          totalOffers?: number | null
          totalOrders?: number | null
          totalShippingSales?: number | null
          totalUnits?: number | null
          uniqueCategoriesShopped?: number | null
          updated_at?: string | null
        }
        Update: {
          averageOrderValue?: number | null
          brandDuration?: number | null
          consumers?: number | null
          created_at?: string
          distinctCategories?: number | null
          firstPurchaseDate?: string | null
          grossCOGS?: number | null
          grossDiscounts?: number | null
          grossFinanceCost?: number | null
          grossItems?: number | null
          grossProfitMarkup?: number | null
          grossSales?: number | null
          grossShippingCost?: number | null
          grossShippingSales?: number | null
          grossShrinkCost?: number | null
          grossUnits?: number | null
          highestOrderValue?: number | null
          id?: number
          lastPurchaseDate?: string | null
          lowestOrderValue?: number | null
          returnCOGS?: number | null
          returnDiscounts?: number | null
          returnItems?: number | null
          returnProfitMarkup?: number | null
          returnSales?: number | null
          returnShippingCost?: number | null
          returnShippingSales?: number | null
          returnUnits?: number | null
          salesVelocity?: number | null
          shops?: number | null
          topCategory?: string | null
          totalGrossProfit?: number | null
          totalItems?: number | null
          totalNetSales?: number | null
          totalNORSales?: number | null
          totalOffers?: number | null
          totalOrders?: number | null
          totalShippingSales?: number | null
          totalUnits?: number | null
          uniqueCategoriesShopped?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consumerShopLTV_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumerShopLTV_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      counterOffers: {
        Row: {
          approvedAt: string | null
          approvedByUser: number | null
          consumerResponse: string | null
          consumerResponseDate: string | null
          consumers: number | null
          counterConfig: Json | null
          counterReason: string | null
          counterStatus: Database["public"]["Enums"]["offerStatus"] | null
          counterType: Database["public"]["Enums"]["counterTypes"] | null
          createDate: string | null
          createdByUser: number | null
          dateSubmitted: string | null
          description: string | null
          discountPercent: number | null
          earningPeriodEnd: string | null
          earningPeriodStart: string | null
          estimatedMargin: number | null
          estimatedMarginPercent: number | null
          expirationDate: string | null
          expiryMinutes: number | null
          finalPrice: number | null
          firmDiscount: number | null
          headline: string | null
          id: number
          internalNotes: string | null
          isActive: boolean
          itemCategoryGID: string | null
          marginImpact: number | null
          modifiedDate: string | null
          offers: number
          orders: number | null
          originalMargin: number | null
          originalMarginPercent: number | null
          redemptionPeriodEnd: string | null
          redemptionPeriodStart: string | null
          requiresApproval: boolean | null
          shippingClass: string | null
          shippingPrice: number | null
          shops: number
          strategyRationale: string | null
          targetAudience: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired: boolean | null
          targetOrderSpend: number | null
          targetUnitPrice: number | null
          targetUnits: number | null
          targetVariantGID: string | null
          tierOneDiscount: number | null
          tierOneDiscountPercent: number | null
          tierTwoDiscount: number | null
          tierTwoDiscountPercent: number | null
          tirggerTierTwoSpend: number | null
          totalDiscount: number | null
          triggerTierOneSpend: number | null
        }
        Insert: {
          approvedAt?: string | null
          approvedByUser?: number | null
          consumerResponse?: string | null
          consumerResponseDate?: string | null
          consumers?: number | null
          counterConfig?: Json | null
          counterReason?: string | null
          counterStatus?: Database["public"]["Enums"]["offerStatus"] | null
          counterType?: Database["public"]["Enums"]["counterTypes"] | null
          createDate?: string | null
          createdByUser?: number | null
          dateSubmitted?: string | null
          description?: string | null
          discountPercent?: number | null
          earningPeriodEnd?: string | null
          earningPeriodStart?: string | null
          estimatedMargin?: number | null
          estimatedMarginPercent?: number | null
          expirationDate?: string | null
          expiryMinutes?: number | null
          finalPrice?: number | null
          firmDiscount?: number | null
          headline?: string | null
          id?: number
          internalNotes?: string | null
          isActive?: boolean
          itemCategoryGID?: string | null
          marginImpact?: number | null
          modifiedDate?: string | null
          offers: number
          orders?: number | null
          originalMargin?: number | null
          originalMarginPercent?: number | null
          redemptionPeriodEnd?: string | null
          redemptionPeriodStart?: string | null
          requiresApproval?: boolean | null
          shippingClass?: string | null
          shippingPrice?: number | null
          shops: number
          strategyRationale?: string | null
          targetAudience?: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired?: boolean | null
          targetOrderSpend?: number | null
          targetUnitPrice?: number | null
          targetUnits?: number | null
          targetVariantGID?: string | null
          tierOneDiscount?: number | null
          tierOneDiscountPercent?: number | null
          tierTwoDiscount?: number | null
          tierTwoDiscountPercent?: number | null
          tirggerTierTwoSpend?: number | null
          totalDiscount?: number | null
          triggerTierOneSpend?: number | null
        }
        Update: {
          approvedAt?: string | null
          approvedByUser?: number | null
          consumerResponse?: string | null
          consumerResponseDate?: string | null
          consumers?: number | null
          counterConfig?: Json | null
          counterReason?: string | null
          counterStatus?: Database["public"]["Enums"]["offerStatus"] | null
          counterType?: Database["public"]["Enums"]["counterTypes"] | null
          createDate?: string | null
          createdByUser?: number | null
          dateSubmitted?: string | null
          description?: string | null
          discountPercent?: number | null
          earningPeriodEnd?: string | null
          earningPeriodStart?: string | null
          estimatedMargin?: number | null
          estimatedMarginPercent?: number | null
          expirationDate?: string | null
          expiryMinutes?: number | null
          finalPrice?: number | null
          firmDiscount?: number | null
          headline?: string | null
          id?: number
          internalNotes?: string | null
          isActive?: boolean
          itemCategoryGID?: string | null
          marginImpact?: number | null
          modifiedDate?: string | null
          offers?: number
          orders?: number | null
          originalMargin?: number | null
          originalMarginPercent?: number | null
          redemptionPeriodEnd?: string | null
          redemptionPeriodStart?: string | null
          requiresApproval?: boolean | null
          shippingClass?: string | null
          shippingPrice?: number | null
          shops?: number
          strategyRationale?: string | null
          targetAudience?: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired?: boolean | null
          targetOrderSpend?: number | null
          targetUnitPrice?: number | null
          targetUnits?: number | null
          targetVariantGID?: string | null
          tierOneDiscount?: number | null
          tierOneDiscountPercent?: number | null
          tierTwoDiscount?: number | null
          tierTwoDiscountPercent?: number | null
          tirggerTierTwoSpend?: number | null
          totalDiscount?: number | null
          triggerTierOneSpend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "counterOffers_approvedByUser_fkey"
            columns: ["approvedByUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counterOffers_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counterOffers_createdByUser_shops_fkey"
            columns: ["createdByUser", "shops"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["shopifyUserId", "shops"]
          },
          {
            foreignKeyName: "counterOffers_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counterOffers_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counterOffers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      counterTemplates: {
        Row: {
          accepted: number | null
          acceptRate: number | null
          autoApply: boolean | null
          category: string | null
          config: Json
          createDate: string | null
          createdByUser: number | null
          description: string | null
          headline: string | null
          id: number
          isActive: boolean | null
          isDefault: boolean | null
          isFinal: boolean | null
          maxCartValueCents: number | null
          maxDiscountPercent: number | null
          message: string | null
          minCartValueCents: number | null
          minMarginPercent: number | null
          modifiedDate: string | null
          name: string
          requiresApproval: boolean | null
          shops: number
          target: string[] | null
          targetPortfolios: string[] | null
          type: string
          usage: number | null
          validFrom: string | null
          validUntil: string | null
        }
        Insert: {
          accepted?: number | null
          acceptRate?: number | null
          autoApply?: boolean | null
          category?: string | null
          config: Json
          createDate?: string | null
          createdByUser?: number | null
          description?: string | null
          headline?: string | null
          id?: number
          isActive?: boolean | null
          isDefault?: boolean | null
          isFinal?: boolean | null
          maxCartValueCents?: number | null
          maxDiscountPercent?: number | null
          message?: string | null
          minCartValueCents?: number | null
          minMarginPercent?: number | null
          modifiedDate?: string | null
          name: string
          requiresApproval?: boolean | null
          shops: number
          target?: string[] | null
          targetPortfolios?: string[] | null
          type: string
          usage?: number | null
          validFrom?: string | null
          validUntil?: string | null
        }
        Update: {
          accepted?: number | null
          acceptRate?: number | null
          autoApply?: boolean | null
          category?: string | null
          config?: Json
          createDate?: string | null
          createdByUser?: number | null
          description?: string | null
          headline?: string | null
          id?: number
          isActive?: boolean | null
          isDefault?: boolean | null
          isFinal?: boolean | null
          maxCartValueCents?: number | null
          maxDiscountPercent?: number | null
          message?: string | null
          minCartValueCents?: number | null
          minMarginPercent?: number | null
          modifiedDate?: string | null
          name?: string
          requiresApproval?: boolean | null
          shops?: number
          target?: string[] | null
          targetPortfolios?: string[] | null
          type?: string
          usage?: number | null
          validFrom?: string | null
          validUntil?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "counterTemplates_createdByUser_fkey"
            columns: ["createdByUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counterTemplates_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          carts: number | null
          cartToken: string | null
          code: string | null
          combineOrders: boolean | null
          combineProduct: boolean | null
          combineShipping: boolean | null
          consumers: number | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          datecreated: string | null
          discountAmount: number | null
          discountTitle: string | null
          emailRestriction: string | null
          expiryEndDate: string | null
          expiryStartDate: string | null
          id: number
          journeyType: string | null
          lastRewardError: string | null
          minimumSubtotal: number | null
          modifiedDate: string | null
          offers: number | null
          orders: number | null
          parentDiscounts: number | null
          programs: number | null
          redeemedAt: string | null
          redemptionStatus: string | null
          rewardDiscounts: number | null
          rewardIssuedAt: string | null
          shopifyCodeEcho: string | null
          shopifyCustomerGID: string | null
          shopifyDiscountGID: string | null
          shopifyPostedDate: string | null
          shopifyResponse: Json | null
          shops: number | null
          sourceCounterOffer: number | null
          usageCount: number | null
        }
        Insert: {
          carts?: number | null
          cartToken?: string | null
          code?: string | null
          combineOrders?: boolean | null
          combineProduct?: boolean | null
          combineShipping?: boolean | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          datecreated?: string | null
          discountAmount?: number | null
          discountTitle?: string | null
          emailRestriction?: string | null
          expiryEndDate?: string | null
          expiryStartDate?: string | null
          id?: number
          journeyType?: string | null
          lastRewardError?: string | null
          minimumSubtotal?: number | null
          modifiedDate?: string | null
          offers?: number | null
          orders?: number | null
          parentDiscounts?: number | null
          programs?: number | null
          redeemedAt?: string | null
          redemptionStatus?: string | null
          rewardDiscounts?: number | null
          rewardIssuedAt?: string | null
          shopifyCodeEcho?: string | null
          shopifyCustomerGID?: string | null
          shopifyDiscountGID?: string | null
          shopifyPostedDate?: string | null
          shopifyResponse?: Json | null
          shops?: number | null
          sourceCounterOffer?: number | null
          usageCount?: number | null
        }
        Update: {
          carts?: number | null
          cartToken?: string | null
          code?: string | null
          combineOrders?: boolean | null
          combineProduct?: boolean | null
          combineShipping?: boolean | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          datecreated?: string | null
          discountAmount?: number | null
          discountTitle?: string | null
          emailRestriction?: string | null
          expiryEndDate?: string | null
          expiryStartDate?: string | null
          id?: number
          journeyType?: string | null
          lastRewardError?: string | null
          minimumSubtotal?: number | null
          modifiedDate?: string | null
          offers?: number | null
          orders?: number | null
          parentDiscounts?: number | null
          programs?: number | null
          redeemedAt?: string | null
          redemptionStatus?: string | null
          rewardDiscounts?: number | null
          rewardIssuedAt?: string | null
          shopifyCodeEcho?: string | null
          shopifyCustomerGID?: string | null
          shopifyDiscountGID?: string | null
          shopifyPostedDate?: string | null
          shopifyResponse?: Json | null
          shops?: number | null
          sourceCounterOffer?: number | null
          usageCount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discounts_carts_fkey"
            columns: ["carts"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_parentdiscounts_fkey"
            columns: ["parentDiscounts"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_programs_fkey"
            columns: ["programs"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_rewarddiscounts_fkey"
            columns: ["rewardDiscounts"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_sourcecounteroffer_fkey"
            columns: ["sourceCounterOffer"]
            isOneToOne: false
            referencedRelation: "counterOffers"
            referencedColumns: ["id"]
          },
        ]
      }
      gdprconsumerreq: {
        Row: {
          consumers: number | null
          created_at: string
          customer_email: string | null
          customerGID: string | null
          id: number
          payload: Json | null
          reqeust_completed: string | null
          requested_date: string | null
          shop_domain: string | null
          shops: number | null
          status: string | null
        }
        Insert: {
          consumers?: number | null
          created_at?: string
          customer_email?: string | null
          customerGID?: string | null
          id?: number
          payload?: Json | null
          reqeust_completed?: string | null
          requested_date?: string | null
          shop_domain?: string | null
          shops?: number | null
          status?: string | null
        }
        Update: {
          consumers?: number | null
          created_at?: string
          customer_email?: string | null
          customerGID?: string | null
          id?: number
          payload?: Json | null
          reqeust_completed?: string | null
          requested_date?: string | null
          shop_domain?: string | null
          shops?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gdprconsumerreq_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdprconsumerreq_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      gdprrequests: {
        Row: {
          consumers: number | null
          created_at: string
          created_by: string | null
          created_date: string | null
          customer_email: string | null
          customer_id: string | null
          customer_phone: string | null
          customerGID: string | null
          data_request_id: string | null
          id: number
          modified_date: string | null
          orders_requested: string | null
          orders_to_redact: string | null
          processed_at: string | null
          received_at: string | null
          request_type: string | null
          scheduled_for: string | null
          shop_domain: string | null
          shop_id: string | null
          shops: number | null
          topic: string | null
        }
        Insert: {
          consumers?: number | null
          created_at?: string
          created_by?: string | null
          created_date?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_phone?: string | null
          customerGID?: string | null
          data_request_id?: string | null
          id?: number
          modified_date?: string | null
          orders_requested?: string | null
          orders_to_redact?: string | null
          processed_at?: string | null
          received_at?: string | null
          request_type?: string | null
          scheduled_for?: string | null
          shop_domain?: string | null
          shop_id?: string | null
          shops?: number | null
          topic?: string | null
        }
        Update: {
          consumers?: number | null
          created_at?: string
          created_by?: string | null
          created_date?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_phone?: string | null
          customerGID?: string | null
          data_request_id?: string | null
          id?: number
          modified_date?: string | null
          orders_requested?: string | null
          orders_to_redact?: string | null
          processed_at?: string | null
          received_at?: string | null
          request_type?: string | null
          scheduled_for?: string | null
          shop_domain?: string | null
          shop_id?: string | null
          shops?: number | null
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gdprrequests_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdprrequests_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      iwtPixelEvents: {
        Row: {
          createDate: string
          discountPct: number | null
          eventName: string
          id: number
          offeredPrice: number | null
          pageURL: string | null
          payload: Json
          productID: string | null
          sellingPrice: number | null
          sessionID: string | null
          shops: number
          source: string | null
          surface: string | null
          variantID: string | null
        }
        Insert: {
          createDate?: string
          discountPct?: number | null
          eventName: string
          id?: number
          offeredPrice?: number | null
          pageURL?: string | null
          payload?: Json
          productID?: string | null
          sellingPrice?: number | null
          sessionID?: string | null
          shops: number
          source?: string | null
          surface?: string | null
          variantID?: string | null
        }
        Update: {
          createDate?: string
          discountPct?: number | null
          eventName?: string
          id?: number
          offeredPrice?: number | null
          pageURL?: string | null
          payload?: Json
          productID?: string | null
          sellingPrice?: number | null
          sessionID?: string | null
          shops?: number
          source?: string | null
          surface?: string | null
          variantID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "iwtPixelEvents_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      myAccount: {
        Row: {
          accountStatus: string | null
          accountType: string | null
          created_at: string
          createDate: string | null
          id: number
          modifiedDate: string | null
          myPlan: number | null
          storesShopped: number | null
          totalOffers: number | null
          totalOrders: number | null
          totalPurchases: number | null
          totalSavings: number | null
          totalSpentCents: number | null
          users: string | null
        }
        Insert: {
          accountStatus?: string | null
          accountType?: string | null
          created_at?: string
          createDate?: string | null
          id?: number
          modifiedDate?: string | null
          myPlan?: number | null
          storesShopped?: number | null
          totalOffers?: number | null
          totalOrders?: number | null
          totalPurchases?: number | null
          totalSavings?: number | null
          totalSpentCents?: number | null
          users?: string | null
        }
        Update: {
          accountStatus?: string | null
          accountType?: string | null
          created_at?: string
          createDate?: string | null
          id?: number
          modifiedDate?: string | null
          myPlan?: number | null
          storesShopped?: number | null
          totalOffers?: number | null
          totalOrders?: number | null
          totalPurchases?: number | null
          totalSavings?: number | null
          totalSpentCents?: number | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myAccount_myPlan_fkey"
            columns: ["myPlan"]
            isOneToOne: false
            referencedRelation: "myPlan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myAccount_users_fkey"
            columns: ["users"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myBilling: {
        Row: {
          amountBilled: number | null
          approvalCode: string | null
          billingDate: string | null
          billingFrequency: number | null
          cardName: string | null
          cardType: string | null
          createDate: string
          id: number
          invoiceDate: string | null
          plan: number | null
          planAmount: number | null
          planBalance: number | null
          salesTaxAmount: number | null
          salesTaxAuthority: string | null
          users: string | null
        }
        Insert: {
          amountBilled?: number | null
          approvalCode?: string | null
          billingDate?: string | null
          billingFrequency?: number | null
          cardName?: string | null
          cardType?: string | null
          createDate?: string
          id?: number
          invoiceDate?: string | null
          plan?: number | null
          planAmount?: number | null
          planBalance?: number | null
          salesTaxAmount?: number | null
          salesTaxAuthority?: string | null
          users?: string | null
        }
        Update: {
          amountBilled?: number | null
          approvalCode?: string | null
          billingDate?: string | null
          billingFrequency?: number | null
          cardName?: string | null
          cardType?: string | null
          createDate?: string
          id?: number
          invoiceDate?: string | null
          plan?: number | null
          planAmount?: number | null
          planBalance?: number | null
          salesTaxAmount?: number | null
          salesTaxAuthority?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myBilling_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "myPlan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myBilling_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myCircle: {
        Row: {
          addresses: Json | null
          created_at: string
          createDate: string | null
          displayName: string | null
          emails: Json | null
          events: Json | null
          firstName: string | null
          household: Json | null
          id: number
          lastName: string | null
          middleName: string | null
          modifiedDate: string | null
          nickname: string | null
          notes: string | null
          phones: Json | null
          relationship: Database["public"]["Enums"]["relationshipType"] | null
          users: string | null
        }
        Insert: {
          addresses?: Json | null
          created_at?: string
          createDate?: string | null
          displayName?: string | null
          emails?: Json | null
          events?: Json | null
          firstName?: string | null
          household?: Json | null
          id?: number
          lastName?: string | null
          middleName?: string | null
          modifiedDate?: string | null
          nickname?: string | null
          notes?: string | null
          phones?: Json | null
          relationship?: Database["public"]["Enums"]["relationshipType"] | null
          users?: string | null
        }
        Update: {
          addresses?: Json | null
          created_at?: string
          createDate?: string | null
          displayName?: string | null
          emails?: Json | null
          events?: Json | null
          firstName?: string | null
          household?: Json | null
          id?: number
          lastName?: string | null
          middleName?: string | null
          modifiedDate?: string | null
          nickname?: string | null
          notes?: string | null
          phones?: Json | null
          relationship?: Database["public"]["Enums"]["relationshipType"] | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myContacts_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myInterests: {
        Row: {
          createDate: string | null
          createdby: string | null
          endDate: string | null
          id: number
          interestCategory: string | null
          interestType: string | null
          interestValue: string | null
          modifiedDate: string | null
          myProfile: number | null
          possibleProducts: Json[] | null
          possibleShops: Json[] | null
          productURL: string | null
          shops: number | null
          specificInterests: string | null
          users: string | null
        }
        Insert: {
          createDate?: string | null
          createdby?: string | null
          endDate?: string | null
          id?: number
          interestCategory?: string | null
          interestType?: string | null
          interestValue?: string | null
          modifiedDate?: string | null
          myProfile?: number | null
          possibleProducts?: Json[] | null
          possibleShops?: Json[] | null
          productURL?: string | null
          shops?: number | null
          specificInterests?: string | null
          users?: string | null
        }
        Update: {
          createDate?: string | null
          createdby?: string | null
          endDate?: string | null
          id?: number
          interestCategory?: string | null
          interestType?: string | null
          interestValue?: string | null
          modifiedDate?: string | null
          myProfile?: number | null
          possibleProducts?: Json[] | null
          possibleShops?: Json[] | null
          productURL?: string | null
          shops?: number | null
          specificInterests?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myInterests_myProfile_fkey"
            columns: ["myProfile"]
            isOneToOne: false
            referencedRelation: "myProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myInterests_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myInterests_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myNotifications: {
        Row: {
          communicationChannelOrder: string[] | null
          consumer: number | null
          createDate: string | null
          emailOptIn: boolean | null
          emailOptInDate: string | null
          emailOptInSource: string | null
          emailOptOutDate: string | null
          expoPushTokens: string[] | null
          id: number
          modifiedDate: string | null
          preferredChannel: string | null
          pushOptIn: boolean | null
          pushOptInDate: string | null
          pushOptInSource: string | null
          pushOptOutDate: string | null
          smsOptIn: boolean | null
          smsOptInDate: string | null
          smsOptInSource: string | null
          smsOptOutDate: string | null
          users: string | null
        }
        Insert: {
          communicationChannelOrder?: string[] | null
          consumer?: number | null
          createDate?: string | null
          emailOptIn?: boolean | null
          emailOptInDate?: string | null
          emailOptInSource?: string | null
          emailOptOutDate?: string | null
          expoPushTokens?: string[] | null
          id?: number
          modifiedDate?: string | null
          preferredChannel?: string | null
          pushOptIn?: boolean | null
          pushOptInDate?: string | null
          pushOptInSource?: string | null
          pushOptOutDate?: string | null
          smsOptIn?: boolean | null
          smsOptInDate?: string | null
          smsOptInSource?: string | null
          smsOptOutDate?: string | null
          users?: string | null
        }
        Update: {
          communicationChannelOrder?: string[] | null
          consumer?: number | null
          createDate?: string | null
          emailOptIn?: boolean | null
          emailOptInDate?: string | null
          emailOptInSource?: string | null
          emailOptOutDate?: string | null
          expoPushTokens?: string[] | null
          id?: number
          modifiedDate?: string | null
          preferredChannel?: string | null
          pushOptIn?: boolean | null
          pushOptInDate?: string | null
          pushOptInSource?: string | null
          pushOptOutDate?: string | null
          smsOptIn?: boolean | null
          smsOptInDate?: string | null
          smsOptInSource?: string | null
          smsOptOutDate?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myPrivacy_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "privacy_consumer_fkey"
            columns: ["consumer"]
            isOneToOne: true
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
        ]
      }
      myPlaces: {
        Row: {
          addressLabel: string | null
          addressType: Database["public"]["Enums"]["addressType"] | null
          city: string | null
          contactEmail: string | null
          contactPhone: string | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          displayName: string | null
          geoAddress: Json | null
          id: number
          isDefault: boolean | null
          isValidated: boolean | null
          lastUsedDate: string | null
          modifiedDate: string | null
          myCircle: number | null
          postalCode: string | null
          province: string | null
          state: string | null
          streetName: string | null
          streetNumber: string | null
          users: string | null
        }
        Insert: {
          addressLabel?: string | null
          addressType?: Database["public"]["Enums"]["addressType"] | null
          city?: string | null
          contactEmail?: string | null
          contactPhone?: string | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          displayName?: string | null
          geoAddress?: Json | null
          id?: number
          isDefault?: boolean | null
          isValidated?: boolean | null
          lastUsedDate?: string | null
          modifiedDate?: string | null
          myCircle?: number | null
          postalCode?: string | null
          province?: string | null
          state?: string | null
          streetName?: string | null
          streetNumber?: string | null
          users?: string | null
        }
        Update: {
          addressLabel?: string | null
          addressType?: Database["public"]["Enums"]["addressType"] | null
          city?: string | null
          contactEmail?: string | null
          contactPhone?: string | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          displayName?: string | null
          geoAddress?: Json | null
          id?: number
          isDefault?: boolean | null
          isValidated?: boolean | null
          lastUsedDate?: string | null
          modifiedDate?: string | null
          myCircle?: number | null
          postalCode?: string | null
          province?: string | null
          state?: string | null
          streetName?: string | null
          streetNumber?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myAddresses_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myPlaces_myCircle_fkey"
            columns: ["myCircle"]
            isOneToOne: false
            referencedRelation: "myCircle"
            referencedColumns: ["id"]
          },
        ]
      }
      myPlan: {
        Row: {
          createDate: string
          endDate: string | null
          frequency: number | null
          id: number
          name: string | null
          price: number | null
          term: string | null
          users: string | null
        }
        Insert: {
          createDate?: string
          endDate?: string | null
          frequency?: number | null
          id?: number
          name?: string | null
          price?: number | null
          term?: string | null
          users?: string | null
        }
        Update: {
          createDate?: string
          endDate?: string | null
          frequency?: number | null
          id?: number
          name?: string | null
          price?: number | null
          term?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myPlan_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myProducts: {
        Row: {
          carts: number | null
          consumers: number | null
          createDate: string | null
          id: number
          isFavorite: boolean | null
          isWatchList: boolean | null
          lastPurchaseDate: string | null
          modifiedDate: string | null
          orders: number | null
          productHandle: string | null
          productHistory: Json | null
          products: number | null
          rating: number | null
          reviewedDate: string | null
          reviewText: string | null
          shops: number | null
          status: Database["public"]["Enums"]["itemStatus"] | null
          totalPrice: number | null
          totalQuantity: number | null
          users: string | null
          variantID: string | null
          variants: number | null
          watchListEnd: string | null
          watchListStart: string | null
        }
        Insert: {
          carts?: number | null
          consumers?: number | null
          createDate?: string | null
          id?: number
          isFavorite?: boolean | null
          isWatchList?: boolean | null
          lastPurchaseDate?: string | null
          modifiedDate?: string | null
          orders?: number | null
          productHandle?: string | null
          productHistory?: Json | null
          products?: number | null
          rating?: number | null
          reviewedDate?: string | null
          reviewText?: string | null
          shops?: number | null
          status?: Database["public"]["Enums"]["itemStatus"] | null
          totalPrice?: number | null
          totalQuantity?: number | null
          users?: string | null
          variantID?: string | null
          variants?: number | null
          watchListEnd?: string | null
          watchListStart?: string | null
        }
        Update: {
          carts?: number | null
          consumers?: number | null
          createDate?: string | null
          id?: number
          isFavorite?: boolean | null
          isWatchList?: boolean | null
          lastPurchaseDate?: string | null
          modifiedDate?: string | null
          orders?: number | null
          productHandle?: string | null
          productHistory?: Json | null
          products?: number | null
          rating?: number | null
          reviewedDate?: string | null
          reviewText?: string | null
          shops?: number | null
          status?: Database["public"]["Enums"]["itemStatus"] | null
          totalPrice?: number | null
          totalQuantity?: number | null
          users?: string | null
          variantID?: string | null
          variants?: number | null
          watchListEnd?: string | null
          watchListStart?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myproducts_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myProfile: {
        Row: {
          address: string | null
          apartmentSuite: string | null
          avatarUrl: string | null
          backgroundImageUrl: string | null
          birthdate: string | null
          city: string | null
          country: string | null
          createDate: string
          currency: Database["public"]["Enums"]["currencyCode"] | null
          darkMode: boolean | null
          darkModeUpdateDate: string | null
          displayName: string | null
          firstName: string | null
          geoAddress: Json | null
          id: number
          language: string | null
          lastName: string | null
          modifiedDate: string | null
          phone: string | null
          postalCode: string | null
          state: string | null
          users: string | null
        }
        Insert: {
          address?: string | null
          apartmentSuite?: string | null
          avatarUrl?: string | null
          backgroundImageUrl?: string | null
          birthdate?: string | null
          city?: string | null
          country?: string | null
          createDate?: string
          currency?: Database["public"]["Enums"]["currencyCode"] | null
          darkMode?: boolean | null
          darkModeUpdateDate?: string | null
          displayName?: string | null
          firstName?: string | null
          geoAddress?: Json | null
          id?: number
          language?: string | null
          lastName?: string | null
          modifiedDate?: string | null
          phone?: string | null
          postalCode?: string | null
          state?: string | null
          users?: string | null
        }
        Update: {
          address?: string | null
          apartmentSuite?: string | null
          avatarUrl?: string | null
          backgroundImageUrl?: string | null
          birthdate?: string | null
          city?: string | null
          country?: string | null
          createDate?: string
          currency?: Database["public"]["Enums"]["currencyCode"] | null
          darkMode?: boolean | null
          darkModeUpdateDate?: string | null
          displayName?: string | null
          firstName?: string | null
          geoAddress?: Json | null
          id?: number
          language?: string | null
          lastName?: string | null
          modifiedDate?: string | null
          phone?: string | null
          postalCode?: string | null
          state?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myProfile_users_fkey"
            columns: ["users"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myShops: {
        Row: {
          addedDate: string | null
          createDate: string
          firstOfferDate: string | null
          firstOrderDate: string | null
          id: number
          lastOfferDate: string | null
          lastOrderDate: string | null
          modifiedDate: string | null
          notifyNewProducts: boolean | null
          notifySales: boolean | null
          shops: number | null
          totalItemsOffered: number | null
          totalItemsPurchased: number | null
          totalOffersToShop: number | null
          totalPurchasesFromShop: number | null
          totalShopSavings: number | null
          totalShopSpend: number | null
          totalUnitsOffered: number | null
          totalUnitsPurchased: number | null
          users: string | null
        }
        Insert: {
          addedDate?: string | null
          createDate?: string
          firstOfferDate?: string | null
          firstOrderDate?: string | null
          id?: number
          lastOfferDate?: string | null
          lastOrderDate?: string | null
          modifiedDate?: string | null
          notifyNewProducts?: boolean | null
          notifySales?: boolean | null
          shops?: number | null
          totalItemsOffered?: number | null
          totalItemsPurchased?: number | null
          totalOffersToShop?: number | null
          totalPurchasesFromShop?: number | null
          totalShopSavings?: number | null
          totalShopSpend?: number | null
          totalUnitsOffered?: number | null
          totalUnitsPurchased?: number | null
          users?: string | null
        }
        Update: {
          addedDate?: string | null
          createDate?: string
          firstOfferDate?: string | null
          firstOrderDate?: string | null
          id?: number
          lastOfferDate?: string | null
          lastOrderDate?: string | null
          modifiedDate?: string | null
          notifyNewProducts?: boolean | null
          notifySales?: boolean | null
          shops?: number | null
          totalItemsOffered?: number | null
          totalItemsPurchased?: number | null
          totalOffersToShop?: number | null
          totalPurchasesFromShop?: number | null
          totalShopSavings?: number | null
          totalShopSpend?: number | null
          totalUnitsOffered?: number | null
          totalUnitsPurchased?: number | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myStores_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myStores_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      myWatchList: {
        Row: {
          capabilities: Json | null
          createDate: string | null
          deletedDate: string | null
          id: number
          isActive: boolean
          lastInventory: number | null
          lastPriceCents: number | null
          modifiedDate: string | null
          myProducts: number | null
          productID: string | null
          productImageURL: string | null
          productName: string | null
          productPageURL: string | null
          repurchaseDate: string | null
          repurchaseDays: number | null
          shopDomain: string | null
          shops: number | null
          source: Database["public"]["Enums"]["watchListSource"] | null
          targetPriceCents: number | null
          trackInventory: boolean | null
          trackPrice: boolean | null
          users: string | null
          variantID: string | null
          variantImageURL: string | null
          variantName: string | null
        }
        Insert: {
          capabilities?: Json | null
          createDate?: string | null
          deletedDate?: string | null
          id?: number
          isActive?: boolean
          lastInventory?: number | null
          lastPriceCents?: number | null
          modifiedDate?: string | null
          myProducts?: number | null
          productID?: string | null
          productImageURL?: string | null
          productName?: string | null
          productPageURL?: string | null
          repurchaseDate?: string | null
          repurchaseDays?: number | null
          shopDomain?: string | null
          shops?: number | null
          source?: Database["public"]["Enums"]["watchListSource"] | null
          targetPriceCents?: number | null
          trackInventory?: boolean | null
          trackPrice?: boolean | null
          users?: string | null
          variantID?: string | null
          variantImageURL?: string | null
          variantName?: string | null
        }
        Update: {
          capabilities?: Json | null
          createDate?: string | null
          deletedDate?: string | null
          id?: number
          isActive?: boolean
          lastInventory?: number | null
          lastPriceCents?: number | null
          modifiedDate?: string | null
          myProducts?: number | null
          productID?: string | null
          productImageURL?: string | null
          productName?: string | null
          productPageURL?: string | null
          repurchaseDate?: string | null
          repurchaseDays?: number | null
          shopDomain?: string | null
          shops?: number | null
          source?: Database["public"]["Enums"]["watchListSource"] | null
          targetPriceCents?: number | null
          trackInventory?: boolean | null
          trackPrice?: boolean | null
          users?: string | null
          variantID?: string | null
          variantImageURL?: string | null
          variantName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "myWatchList_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myWatchList_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      offerAssignments: {
        Row: {
          assignedByUser: number | null
          assignedDate: string | null
          assignedUser: number | null
          completedDate: string | null
          id: number
          notes: string | null
          offers: number
          status: string | null
        }
        Insert: {
          assignedByUser?: number | null
          assignedDate?: string | null
          assignedUser?: number | null
          completedDate?: string | null
          id?: number
          notes?: string | null
          offers: number
          status?: string | null
        }
        Update: {
          assignedByUser?: number | null
          assignedDate?: string | null
          assignedUser?: number | null
          completedDate?: string | null
          id?: number
          notes?: string | null
          offers?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offerAssignments_assignedByUser_fkey"
            columns: ["assignedByUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offerAssignments_assignedUser_fkey"
            columns: ["assignedUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offerAssignments_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
      }
      offerMetrics: {
        Row: {
          created_at: string
          id: number
          shops: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          shops?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          shops?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offerMetrics_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          approvedDate: string | null
          approvedDiscountPrice: number | null
          approvedItems: number | null
          approvedPrice: number | null
          approvedUnits: number | null
          assignedUser: number | null
          calendarWeek: number | null
          campaign: string | null
          campaignCode: string | null
          campaigns: number | null
          cartComposition: string | null
          cartItems: Json[] | null
          carts: number | null
          cartToken: string | null
          cartTotalPrice: number | null
          checkoutToken: string | null
          checkoutUrl: string | null
          consumerEmail: string | null
          consumerName: string | null
          consumerPhone: string | null
          consumers: number | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          declinedDate: string | null
          declineMessage: string | null
          declineReason:
            | Database["public"]["Enums"]["sellerDeclineReasons"]
            | null
          discountCode: string | null
          discounts: number | null
          expiryEnd: string | null
          expiryMinutes: number | null
          expiryStart: string | null
          id: number
          isArchived: boolean | null
          items: number | null
          lastActivityByUser: number | null
          lastChange: Json | null
          lastUserActivityDate: string | null
          modifiedDate: string | null
          offerDeclineDate: string | null
          offerDiscountPrice: number | null
          offerDiscountRateBPS: number | null
          offerOrigin: Database["public"]["Enums"]["offerOrigin"] | null
          offerPrice: number | null
          offerShippingPrice: number | null
          offerStatus: Database["public"]["Enums"]["offerStatus"] | null
          orders: number | null
          periods: number | null
          program: string | null
          programAcceptRate: number | null
          programCode: string | null
          programDeclineRate: number | null
          programs: number | null
          reviewedByUser: number | null
          reviewedDate: string | null
          shops: number | null
          tosCheckDate: string | null
          units: number | null
        }
        Insert: {
          approvedDate?: string | null
          approvedDiscountPrice?: number | null
          approvedItems?: number | null
          approvedPrice?: number | null
          approvedUnits?: number | null
          assignedUser?: number | null
          calendarWeek?: number | null
          campaign?: string | null
          campaignCode?: string | null
          campaigns?: number | null
          cartComposition?: string | null
          cartItems?: Json[] | null
          carts?: number | null
          cartToken?: string | null
          cartTotalPrice?: number | null
          checkoutToken?: string | null
          checkoutUrl?: string | null
          consumerEmail?: string | null
          consumerName?: string | null
          consumerPhone?: string | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          declinedDate?: string | null
          declineMessage?: string | null
          declineReason?:
            | Database["public"]["Enums"]["sellerDeclineReasons"]
            | null
          discountCode?: string | null
          discounts?: number | null
          expiryEnd?: string | null
          expiryMinutes?: number | null
          expiryStart?: string | null
          id?: number
          isArchived?: boolean | null
          items?: number | null
          lastActivityByUser?: number | null
          lastChange?: Json | null
          lastUserActivityDate?: string | null
          modifiedDate?: string | null
          offerDeclineDate?: string | null
          offerDiscountPrice?: number | null
          offerDiscountRateBPS?: number | null
          offerOrigin?: Database["public"]["Enums"]["offerOrigin"] | null
          offerPrice?: number | null
          offerShippingPrice?: number | null
          offerStatus?: Database["public"]["Enums"]["offerStatus"] | null
          orders?: number | null
          periods?: number | null
          program?: string | null
          programAcceptRate?: number | null
          programCode?: string | null
          programDeclineRate?: number | null
          programs?: number | null
          reviewedByUser?: number | null
          reviewedDate?: string | null
          shops?: number | null
          tosCheckDate?: string | null
          units?: number | null
        }
        Update: {
          approvedDate?: string | null
          approvedDiscountPrice?: number | null
          approvedItems?: number | null
          approvedPrice?: number | null
          approvedUnits?: number | null
          assignedUser?: number | null
          calendarWeek?: number | null
          campaign?: string | null
          campaignCode?: string | null
          campaigns?: number | null
          cartComposition?: string | null
          cartItems?: Json[] | null
          carts?: number | null
          cartToken?: string | null
          cartTotalPrice?: number | null
          checkoutToken?: string | null
          checkoutUrl?: string | null
          consumerEmail?: string | null
          consumerName?: string | null
          consumerPhone?: string | null
          consumers?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          declinedDate?: string | null
          declineMessage?: string | null
          declineReason?:
            | Database["public"]["Enums"]["sellerDeclineReasons"]
            | null
          discountCode?: string | null
          discounts?: number | null
          expiryEnd?: string | null
          expiryMinutes?: number | null
          expiryStart?: string | null
          id?: number
          isArchived?: boolean | null
          items?: number | null
          lastActivityByUser?: number | null
          lastChange?: Json | null
          lastUserActivityDate?: string | null
          modifiedDate?: string | null
          offerDeclineDate?: string | null
          offerDiscountPrice?: number | null
          offerDiscountRateBPS?: number | null
          offerOrigin?: Database["public"]["Enums"]["offerOrigin"] | null
          offerPrice?: number | null
          offerShippingPrice?: number | null
          offerStatus?: Database["public"]["Enums"]["offerStatus"] | null
          orders?: number | null
          periods?: number | null
          program?: string | null
          programAcceptRate?: number | null
          programCode?: string | null
          programDeclineRate?: number | null
          programs?: number | null
          reviewedByUser?: number | null
          reviewedDate?: string | null
          shops?: number | null
          tosCheckDate?: string | null
          units?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_assignedUser_fkey"
            columns: ["assignedUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_carts_fkey"
            columns: ["carts"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_discounts_fkey"
            columns: ["discounts"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_lastActivityByUser_fkey"
            columns: ["lastActivityByUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_periods_fkey"
            columns: ["periods"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_programs_fkey"
            columns: ["programs"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_reviewedByUser_fkey"
            columns: ["reviewedByUser"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      orderCheckouts: {
        Row: {
          abandonedCheckoutUrl: string | null
          appliedDiscount: Json
          billingAddress: Json
          browserIp: string | null
          buyerAcceptsMarketing: boolean | null
          cancelledAt: string | null
          cancelReason: string | null
          cartToken: string | null
          checkoutToken: string | null
          clientDetails: Json
          closedAt: string | null
          completedAt: string | null
          confirmed: boolean | null
          consumers: number | null
          created_at: string
          createdAt: string | null
          createDate: string | null
          currency: string | null
          customer: Json
          customerId: number | null
          deviceId: number | null
          discountApplications: Json
          discountCodes: Json
          duties: Json
          dutiesIncluded: boolean | null
          email: string | null
          estimatedTaxes: boolean | null
          financialStatus: string | null
          gateway: string | null
          giftCards: Json
          id: number
          landingSite: string | null
          lineItems: Json
          locationId: number | null
          note: string | null
          noteAttributes: Json
          orderId: number | null
          orderStatusUrl: string | null
          payload: Json
          paymentGatewayNames: Json
          platform: Database["public"]["Enums"]["commercePlatform"]
          poNumber: string | null
          presentmentCurrency: string | null
          presentmentTotalPriceSet: Json
          reference: string | null
          referringSite: string | null
          shippingAddress: Json
          shippingAddressSameAsBilling: boolean | null
          shippingLines: Json
          shippingRate: Json
          shopDomain: string | null
          shopifyCheckoutId: string
          shops: number | null
          sourceName: string | null
          subtotalPrice: number | null
          subtotalPriceSet: Json
          tags: string[] | null
          taxesIncluded: boolean | null
          taxLines: Json
          test: boolean | null
          token: string | null
          totalDiscounts: number | null
          totalDiscountsSet: Json
          totalLineItemsPrice: number | null
          totalPrice: number | null
          totalPriceSet: Json
          totalShippingPriceSet: Json
          totalTax: number | null
          totalTaxSet: Json
          updatedAt: string | null
        }
        Insert: {
          abandonedCheckoutUrl?: string | null
          appliedDiscount?: Json
          billingAddress?: Json
          browserIp?: string | null
          buyerAcceptsMarketing?: boolean | null
          cancelledAt?: string | null
          cancelReason?: string | null
          cartToken?: string | null
          checkoutToken?: string | null
          clientDetails?: Json
          closedAt?: string | null
          completedAt?: string | null
          confirmed?: boolean | null
          consumers?: number | null
          created_at?: string
          createdAt?: string | null
          createDate?: string | null
          currency?: string | null
          customer?: Json
          customerId?: number | null
          deviceId?: number | null
          discountApplications?: Json
          discountCodes?: Json
          duties?: Json
          dutiesIncluded?: boolean | null
          email?: string | null
          estimatedTaxes?: boolean | null
          financialStatus?: string | null
          gateway?: string | null
          giftCards?: Json
          id?: number
          landingSite?: string | null
          lineItems?: Json
          locationId?: number | null
          note?: string | null
          noteAttributes?: Json
          orderId?: number | null
          orderStatusUrl?: string | null
          payload?: Json
          paymentGatewayNames?: Json
          platform?: Database["public"]["Enums"]["commercePlatform"]
          poNumber?: string | null
          presentmentCurrency?: string | null
          presentmentTotalPriceSet?: Json
          reference?: string | null
          referringSite?: string | null
          shippingAddress?: Json
          shippingAddressSameAsBilling?: boolean | null
          shippingLines?: Json
          shippingRate?: Json
          shopDomain?: string | null
          shopifyCheckoutId?: string
          shops?: number | null
          sourceName?: string | null
          subtotalPrice?: number | null
          subtotalPriceSet?: Json
          tags?: string[] | null
          taxesIncluded?: boolean | null
          taxLines?: Json
          test?: boolean | null
          token?: string | null
          totalDiscounts?: number | null
          totalDiscountsSet?: Json
          totalLineItemsPrice?: number | null
          totalPrice?: number | null
          totalPriceSet?: Json
          totalShippingPriceSet?: Json
          totalTax?: number | null
          totalTaxSet?: Json
          updatedAt?: string | null
        }
        Update: {
          abandonedCheckoutUrl?: string | null
          appliedDiscount?: Json
          billingAddress?: Json
          browserIp?: string | null
          buyerAcceptsMarketing?: boolean | null
          cancelledAt?: string | null
          cancelReason?: string | null
          cartToken?: string | null
          checkoutToken?: string | null
          clientDetails?: Json
          closedAt?: string | null
          completedAt?: string | null
          confirmed?: boolean | null
          consumers?: number | null
          created_at?: string
          createdAt?: string | null
          createDate?: string | null
          currency?: string | null
          customer?: Json
          customerId?: number | null
          deviceId?: number | null
          discountApplications?: Json
          discountCodes?: Json
          duties?: Json
          dutiesIncluded?: boolean | null
          email?: string | null
          estimatedTaxes?: boolean | null
          financialStatus?: string | null
          gateway?: string | null
          giftCards?: Json
          id?: number
          landingSite?: string | null
          lineItems?: Json
          locationId?: number | null
          note?: string | null
          noteAttributes?: Json
          orderId?: number | null
          orderStatusUrl?: string | null
          payload?: Json
          paymentGatewayNames?: Json
          platform?: Database["public"]["Enums"]["commercePlatform"]
          poNumber?: string | null
          presentmentCurrency?: string | null
          presentmentTotalPriceSet?: Json
          reference?: string | null
          referringSite?: string | null
          shippingAddress?: Json
          shippingAddressSameAsBilling?: boolean | null
          shippingLines?: Json
          shippingRate?: Json
          shopDomain?: string | null
          shopifyCheckoutId?: string
          shops?: number | null
          sourceName?: string | null
          subtotalPrice?: number | null
          subtotalPriceSet?: Json
          tags?: string[] | null
          taxesIncluded?: boolean | null
          taxLines?: Json
          test?: boolean | null
          token?: string | null
          totalDiscounts?: number | null
          totalDiscountsSet?: Json
          totalLineItemsPrice?: number | null
          totalPrice?: number | null
          totalPriceSet?: Json
          totalShippingPriceSet?: Json
          totalTax?: number | null
          totalTaxSet?: Json
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orderCheckouts_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderCheckouts_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      orderDetails: {
        Row: {
          allowDiscounts: number | null
          allowFinance: number | null
          allowOther: number | null
          allowShipping: number | null
          allowShrink: number | null
          created_at: string
          discountAllocation: number | null
          discountsTaken: number | null
          financeTaken: number | null
          id: number
          itemCost: number | null
          itemName: string | null
          itemQuantity: number | null
          itemSKU: string | null
          itemStatus: Database["public"]["Enums"]["itemStatus"] | null
          itemWeight: number | null
          lastChange: Json | null
          lineItemID: string | null
          maintainedMarkupDollars: number | null
          maintainedMarkupPercent: number | null
          marketAdjust: number | null
          marketAdjustTaken: number | null
          orderID: string | null
          orders: number | null
          products: number | null
          productType: string | null
          profitMarkup: number | null
          profitRetained: number | null
          sellPrice: number | null
          settlePrice: number | null
          shippingCost: number | null
          shippingSales: number | null
          shippingTaken: number | null
          shopifyItemCost: number | null
          shops: number | null
          shrinkTaken: number | null
          totalMarkup: number | null
          variantID: string | null
          variants: number | null
        }
        Insert: {
          allowDiscounts?: number | null
          allowFinance?: number | null
          allowOther?: number | null
          allowShipping?: number | null
          allowShrink?: number | null
          created_at?: string
          discountAllocation?: number | null
          discountsTaken?: number | null
          financeTaken?: number | null
          id?: number
          itemCost?: number | null
          itemName?: string | null
          itemQuantity?: number | null
          itemSKU?: string | null
          itemStatus?: Database["public"]["Enums"]["itemStatus"] | null
          itemWeight?: number | null
          lastChange?: Json | null
          lineItemID?: string | null
          maintainedMarkupDollars?: number | null
          maintainedMarkupPercent?: number | null
          marketAdjust?: number | null
          marketAdjustTaken?: number | null
          orderID?: string | null
          orders?: number | null
          products?: number | null
          productType?: string | null
          profitMarkup?: number | null
          profitRetained?: number | null
          sellPrice?: number | null
          settlePrice?: number | null
          shippingCost?: number | null
          shippingSales?: number | null
          shippingTaken?: number | null
          shopifyItemCost?: number | null
          shops?: number | null
          shrinkTaken?: number | null
          totalMarkup?: number | null
          variantID?: string | null
          variants?: number | null
        }
        Update: {
          allowDiscounts?: number | null
          allowFinance?: number | null
          allowOther?: number | null
          allowShipping?: number | null
          allowShrink?: number | null
          created_at?: string
          discountAllocation?: number | null
          discountsTaken?: number | null
          financeTaken?: number | null
          id?: number
          itemCost?: number | null
          itemName?: string | null
          itemQuantity?: number | null
          itemSKU?: string | null
          itemStatus?: Database["public"]["Enums"]["itemStatus"] | null
          itemWeight?: number | null
          lastChange?: Json | null
          lineItemID?: string | null
          maintainedMarkupDollars?: number | null
          maintainedMarkupPercent?: number | null
          marketAdjust?: number | null
          marketAdjustTaken?: number | null
          orderID?: string | null
          orders?: number | null
          products?: number | null
          productType?: string | null
          profitMarkup?: number | null
          profitRetained?: number | null
          sellPrice?: number | null
          settlePrice?: number | null
          shippingCost?: number | null
          shippingSales?: number | null
          shippingTaken?: number | null
          shopifyItemCost?: number | null
          shops?: number | null
          shrinkTaken?: number | null
          totalMarkup?: number | null
          variantID?: string | null
          variants?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderDetails_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderDetails_products_fkey"
            columns: ["products"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderDetails_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderDetails_variants_fkey"
            columns: ["variants"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orderDiscounts: {
        Row: {
          created_at: string
          discounts: number | null
          id: number
          orders: number | null
        }
        Insert: {
          created_at?: string
          discounts?: number | null
          id?: number
          orders?: number | null
        }
        Update: {
          created_at?: string
          discounts?: number | null
          id?: number
          orders?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderDiscounts_discounts_fkey"
            columns: ["discounts"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderDiscounts_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          allowancesGranted: number | null
          allowancesTaken: number | null
          cancelledAt: string | null
          cancelledCOGS: number | null
          cancelReason: string | null
          carts: number | null
          cartSampleID: number | null
          cartToken: string | null
          categoriesShopped: number | null
          checkoutToken: string | null
          consumers: number | null
          consumerSampleID: number | null
          discountAllocation: number | null
          discountCodes: Json | null
          discounts: number | null
          externalOrderKey: string | null
          financialStatus: string | null
          fulfillmentStatus: string | null
          grossCOGS: number | null
          grossDiscounts: number | null
          grossFinanceCost: number | null
          grossItems: number | null
          grossSales: number | null
          grossShippingCost: number | null
          grossShippingSales: number | null
          grossUnits: number | null
          id: number
          lastChange: Json | null
          lineItems: Json | null
          maintainedMarkupDollars: number | null
          maintainedMarkupPercent: number | null
          marketAdjustGranted: number | null
          marketAdjustTaken: number | null
          modifiedDate: string | null
          netCOGS: number | null
          netDiscount: number | null
          netItems: number | null
          netSales: number | null
          netShippingSales: number | null
          netUnits: number | null
          norSales: number | null
          norShippingSales: number | null
          offers: number | null
          offerSampleID: number | null
          orderDate: string
          orderDateTime: string | null
          orderGID: string | null
          orderSampleID: number | null
          orderSource: string | null
          payload: Json | null
          paymentMethod: string | null
          profitMarkupGranted: number | null
          profitMarkupRetained: number | null
          profitMarkupTaken: number | null
          refundedCOGS: number | null
          returnCOGS: number | null
          returnDiscounts: number | null
          returnItems: number | null
          returnSales: number | null
          returnShippingCost: number | null
          returnShippingSales: number | null
          returnUnits: number | null
          salesChannel: string | null
          shopGID: string | null
          shopifyOrderId: string | null
          shops: number | null
          sourceOrderID: number | null
          totalMarkup: number | null
          totalPrice: number | null
          totalTax: number | null
        }
        Insert: {
          allowancesGranted?: number | null
          allowancesTaken?: number | null
          cancelledAt?: string | null
          cancelledCOGS?: number | null
          cancelReason?: string | null
          carts?: number | null
          cartSampleID?: number | null
          cartToken?: string | null
          categoriesShopped?: number | null
          checkoutToken?: string | null
          consumers?: number | null
          consumerSampleID?: number | null
          discountAllocation?: number | null
          discountCodes?: Json | null
          discounts?: number | null
          externalOrderKey?: string | null
          financialStatus?: string | null
          fulfillmentStatus?: string | null
          grossCOGS?: number | null
          grossDiscounts?: number | null
          grossFinanceCost?: number | null
          grossItems?: number | null
          grossSales?: number | null
          grossShippingCost?: number | null
          grossShippingSales?: number | null
          grossUnits?: number | null
          id?: number
          lastChange?: Json | null
          lineItems?: Json | null
          maintainedMarkupDollars?: number | null
          maintainedMarkupPercent?: number | null
          marketAdjustGranted?: number | null
          marketAdjustTaken?: number | null
          modifiedDate?: string | null
          netCOGS?: number | null
          netDiscount?: number | null
          netItems?: number | null
          netSales?: number | null
          netShippingSales?: number | null
          netUnits?: number | null
          norSales?: number | null
          norShippingSales?: number | null
          offers?: number | null
          offerSampleID?: number | null
          orderDate?: string
          orderDateTime?: string | null
          orderGID?: string | null
          orderSampleID?: number | null
          orderSource?: string | null
          payload?: Json | null
          paymentMethod?: string | null
          profitMarkupGranted?: number | null
          profitMarkupRetained?: number | null
          profitMarkupTaken?: number | null
          refundedCOGS?: number | null
          returnCOGS?: number | null
          returnDiscounts?: number | null
          returnItems?: number | null
          returnSales?: number | null
          returnShippingCost?: number | null
          returnShippingSales?: number | null
          returnUnits?: number | null
          salesChannel?: string | null
          shopGID?: string | null
          shopifyOrderId?: string | null
          shops?: number | null
          sourceOrderID?: number | null
          totalMarkup?: number | null
          totalPrice?: number | null
          totalTax?: number | null
        }
        Update: {
          allowancesGranted?: number | null
          allowancesTaken?: number | null
          cancelledAt?: string | null
          cancelledCOGS?: number | null
          cancelReason?: string | null
          carts?: number | null
          cartSampleID?: number | null
          cartToken?: string | null
          categoriesShopped?: number | null
          checkoutToken?: string | null
          consumers?: number | null
          consumerSampleID?: number | null
          discountAllocation?: number | null
          discountCodes?: Json | null
          discounts?: number | null
          externalOrderKey?: string | null
          financialStatus?: string | null
          fulfillmentStatus?: string | null
          grossCOGS?: number | null
          grossDiscounts?: number | null
          grossFinanceCost?: number | null
          grossItems?: number | null
          grossSales?: number | null
          grossShippingCost?: number | null
          grossShippingSales?: number | null
          grossUnits?: number | null
          id?: number
          lastChange?: Json | null
          lineItems?: Json | null
          maintainedMarkupDollars?: number | null
          maintainedMarkupPercent?: number | null
          marketAdjustGranted?: number | null
          marketAdjustTaken?: number | null
          modifiedDate?: string | null
          netCOGS?: number | null
          netDiscount?: number | null
          netItems?: number | null
          netSales?: number | null
          netShippingSales?: number | null
          netUnits?: number | null
          norSales?: number | null
          norShippingSales?: number | null
          offers?: number | null
          offerSampleID?: number | null
          orderDate?: string
          orderDateTime?: string | null
          orderGID?: string | null
          orderSampleID?: number | null
          orderSource?: string | null
          payload?: Json | null
          paymentMethod?: string | null
          profitMarkupGranted?: number | null
          profitMarkupRetained?: number | null
          profitMarkupTaken?: number | null
          refundedCOGS?: number | null
          returnCOGS?: number | null
          returnDiscounts?: number | null
          returnItems?: number | null
          returnSales?: number | null
          returnShippingCost?: number | null
          returnShippingSales?: number | null
          returnUnits?: number | null
          salesChannel?: string | null
          shopGID?: string | null
          shopifyOrderId?: string | null
          shops?: number | null
          sourceOrderID?: number | null
          totalMarkup?: number | null
          totalPrice?: number | null
          totalTax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_carts_fkey"
            columns: ["carts"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_discounts_fkey"
            columns: ["discounts"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      periods: {
        Row: {
          bbl_periods: string | null
          calendarDateEnd: string | null
          calendarDateStart: string | null
          calendarDayOfWeek: number | null
          calendarMNTH: string | null
          calendarMonth: number | null
          calendarQTR: string | null
          calendarQuarter: number | null
          calendarWeek: number | null
          calendarWK: string | null
          calendarWKDAY: string | null
          calendarYear: string | null
          created_at: string
          createDate: string | null
          createdby: string | null
          id: number
          modifiedDate: string | null
        }
        Insert: {
          bbl_periods?: string | null
          calendarDateEnd?: string | null
          calendarDateStart?: string | null
          calendarDayOfWeek?: number | null
          calendarMNTH?: string | null
          calendarMonth?: number | null
          calendarQTR?: string | null
          calendarQuarter?: number | null
          calendarWeek?: number | null
          calendarWK?: string | null
          calendarWKDAY?: string | null
          calendarYear?: string | null
          created_at?: string
          createDate?: string | null
          createdby?: string | null
          id?: number
          modifiedDate?: string | null
        }
        Update: {
          bbl_periods?: string | null
          calendarDateEnd?: string | null
          calendarDateStart?: string | null
          calendarDayOfWeek?: number | null
          calendarMNTH?: string | null
          calendarMonth?: number | null
          calendarQTR?: string | null
          calendarQuarter?: number | null
          calendarWeek?: number | null
          calendarWK?: string | null
          calendarWKDAY?: string | null
          calendarYear?: string | null
          created_at?: string
          createDate?: string | null
          createdby?: string | null
          id?: number
          modifiedDate?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          annualOfferLimit: number | null
          annualPrice: number | null
          annualTrialDays: number | null
          cappedAmount: number | null
          created_at: string
          createdDate: string | null
          description: string | null
          displayOrder: number
          features: Json
          id: number
          interval: string | null
          isActive: boolean | null
          isOneTime: boolean | null
          modifiedDate: string | null
          monthlyOfferLimit: number | null
          monthlyPrice: number | null
          monthlyTrialDays: number | null
          name: string | null
          returnUrl: string | null
          slug: string | null
          terms: string | null
        }
        Insert: {
          annualOfferLimit?: number | null
          annualPrice?: number | null
          annualTrialDays?: number | null
          cappedAmount?: number | null
          created_at?: string
          createdDate?: string | null
          description?: string | null
          displayOrder: number
          features: Json
          id?: number
          interval?: string | null
          isActive?: boolean | null
          isOneTime?: boolean | null
          modifiedDate?: string | null
          monthlyOfferLimit?: number | null
          monthlyPrice?: number | null
          monthlyTrialDays?: number | null
          name?: string | null
          returnUrl?: string | null
          slug?: string | null
          terms?: string | null
        }
        Update: {
          annualOfferLimit?: number | null
          annualPrice?: number | null
          annualTrialDays?: number | null
          cappedAmount?: number | null
          created_at?: string
          createdDate?: string | null
          description?: string | null
          displayOrder?: number
          features?: Json
          id?: number
          interval?: string | null
          isActive?: boolean | null
          isOneTime?: boolean | null
          modifiedDate?: string | null
          monthlyOfferLimit?: number | null
          monthlyPrice?: number | null
          monthlyTrialDays?: number | null
          name?: string | null
          returnUrl?: string | null
          slug?: string | null
          terms?: string | null
        }
        Relationships: []
      }
      productCategory: {
        Row: {
          categories: number | null
          created_at: string
          createDate: string | null
          id: number
          products: number | null
          shops: number | null
        }
        Insert: {
          categories?: number | null
          created_at?: string
          createDate?: string | null
          id?: number
          products?: number | null
          shops?: number | null
        }
        Update: {
          categories?: number | null
          created_at?: string
          createDate?: string | null
          id?: number
          products?: number | null
          shops?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "productCategory_categories_fkey"
            columns: ["categories"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productCategory_products_fkey"
            columns: ["products"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productCategory_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: number | null
          comparePrice: number | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          description: string | null
          id: number
          imuPrice: number | null
          isActive: boolean | null
          modifiedDate: string | null
          name: string | null
          productGID: string | null
          productHandle: string | null
          productID: string
          productImageURL: string | null
          productJSON: Json | null
          productType: string | null
          publishedAt: string | null
          regularPrice: number | null
          shops: number | null
          shortDescription: string | null
          status: string | null
          title: string | null
          type: string | null
          vendor: string | null
        }
        Insert: {
          category?: number | null
          comparePrice?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          description?: string | null
          id?: number
          imuPrice?: number | null
          isActive?: boolean | null
          modifiedDate?: string | null
          name?: string | null
          productGID?: string | null
          productHandle?: string | null
          productID: string
          productImageURL?: string | null
          productJSON?: Json | null
          productType?: string | null
          publishedAt?: string | null
          regularPrice?: number | null
          shops?: number | null
          shortDescription?: string | null
          status?: string | null
          title?: string | null
          type?: string | null
          vendor?: string | null
        }
        Update: {
          category?: number | null
          comparePrice?: number | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          description?: string | null
          id?: number
          imuPrice?: number | null
          isActive?: boolean | null
          modifiedDate?: string | null
          name?: string | null
          productGID?: string | null
          productHandle?: string | null
          productID?: string
          productImageURL?: string | null
          productJSON?: Json | null
          productType?: string | null
          publishedAt?: string | null
          regularPrice?: number | null
          shops?: number | null
          shortDescription?: string | null
          status?: string | null
          title?: string | null
          type?: string | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      programCounterTemplates: {
        Row: {
          acceptanceRate: number | null
          autoApply: boolean | null
          configOverrides: Json | null
          counterTemplates: number
          createDate: string | null
          daysSinceLastOrderMax: number | null
          daysSinceLastOrderMin: number | null
          id: number
          isActive: boolean | null
          isFinal: boolean | null
          maxCartValueCents: number | null
          maxLifetimeOrders: number | null
          maxOfferDiscountPercent: number | null
          minCartValueCents: number | null
          minLifetimeOrders: number | null
          minOfferDiscountPercent: number | null
          modifiedDate: string | null
          priority: number | null
          programs: number
          targetPortfolios: string[] | null
          timesAccepted: number | null
          timesUsed: number | null
        }
        Insert: {
          acceptanceRate?: number | null
          autoApply?: boolean | null
          configOverrides?: Json | null
          counterTemplates: number
          createDate?: string | null
          daysSinceLastOrderMax?: number | null
          daysSinceLastOrderMin?: number | null
          id?: number
          isActive?: boolean | null
          isFinal?: boolean | null
          maxCartValueCents?: number | null
          maxLifetimeOrders?: number | null
          maxOfferDiscountPercent?: number | null
          minCartValueCents?: number | null
          minLifetimeOrders?: number | null
          minOfferDiscountPercent?: number | null
          modifiedDate?: string | null
          priority?: number | null
          programs: number
          targetPortfolios?: string[] | null
          timesAccepted?: number | null
          timesUsed?: number | null
        }
        Update: {
          acceptanceRate?: number | null
          autoApply?: boolean | null
          configOverrides?: Json | null
          counterTemplates?: number
          createDate?: string | null
          daysSinceLastOrderMax?: number | null
          daysSinceLastOrderMin?: number | null
          id?: number
          isActive?: boolean | null
          isFinal?: boolean | null
          maxCartValueCents?: number | null
          maxLifetimeOrders?: number | null
          maxOfferDiscountPercent?: number | null
          minCartValueCents?: number | null
          minLifetimeOrders?: number | null
          minOfferDiscountPercent?: number | null
          modifiedDate?: string | null
          priority?: number | null
          programs?: number
          targetPortfolios?: string[] | null
          timesAccepted?: number | null
          timesUsed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programCounterTemplates_counterTemplates_fkey"
            columns: ["counterTemplates"]
            isOneToOne: false
            referencedRelation: "counterTemplates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programCounterTemplates_programs_fkey"
            columns: ["programs"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programGoals: {
        Row: {
          created_at: string
          goalMetric: Database["public"]["Enums"]["goalMetric"] | null
          goalType: Database["public"]["Enums"]["goalType"]
          goalValue: number | null
          id: number
          modifiedDate: string | null
          programs: number
          shops: number | null
        }
        Insert: {
          created_at?: string
          goalMetric?: Database["public"]["Enums"]["goalMetric"] | null
          goalType: Database["public"]["Enums"]["goalType"]
          goalValue?: number | null
          id?: number
          modifiedDate?: string | null
          programs: number
          shops?: number | null
        }
        Update: {
          created_at?: string
          goalMetric?: Database["public"]["Enums"]["goalMetric"] | null
          goalType?: Database["public"]["Enums"]["goalType"]
          goalValue?: number | null
          id?: number
          modifiedDate?: string | null
          programs?: number
          shops?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programGoals_programs_fkey"
            columns: ["programs"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programgoals_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      programMetrics: {
        Row: {
          accepted: number
          aov: number
          checkouts: number
          consumers: number
          created_at: string
          declined: number
          discountRate: number
          discounts: number
          grossRevenue: number
          id: number
          items: number
          modifiedDate: string
          netSales: number
          offerOrderRate: number
          offersMade: number
          ordered: number
          programs: number | null
          shops: number | null
          units: number
        }
        Insert: {
          accepted?: number
          aov?: number
          checkouts?: number
          consumers?: number
          created_at?: string
          declined?: number
          discountRate?: number
          discounts?: number
          grossRevenue?: number
          id?: number
          items?: number
          modifiedDate?: string
          netSales?: number
          offerOrderRate?: number
          offersMade?: number
          ordered?: number
          programs?: number | null
          shops?: number | null
          units?: number
        }
        Update: {
          accepted?: number
          aov?: number
          checkouts?: number
          consumers?: number
          created_at?: string
          declined?: number
          discountRate?: number
          discounts?: number
          grossRevenue?: number
          id?: number
          items?: number
          modifiedDate?: string
          netSales?: number
          offerOrderRate?: number
          offersMade?: number
          ordered?: number
          programs?: number | null
          shops?: number | null
          units?: number
        }
        Relationships: [
          {
            foreignKeyName: "programMetrics_programs_fkey"
            columns: ["programs"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programMetrics_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          acceptRate: number
          codePrefix: string | null
          combineOrderDiscounts: boolean
          combineProductDiscounts: boolean
          combineShippingDiscounts: boolean
          created_at: string
          createDate: string | null
          createdBy: string | null
          createdByUser: number | null
          createdByUserName: string | null
          declineRate: number
          description: string | null
          discountPrefix: string | null
          endDate: string | null
          expiryMinutes: number
          focus: Database["public"]["Enums"]["programFocus"] | null
          goals: Database["public"]["Enums"]["goalType"][] | null
          id: number
          isActive: boolean
          isDefault: boolean
          modifiedDate: string | null
          name: string | null
          shops: number | null
          startDate: string | null
          status: Database["public"]["Enums"]["programStatus"]
          usageCount: number | null
        }
        Insert: {
          acceptRate: number
          codePrefix?: string | null
          combineOrderDiscounts: boolean
          combineProductDiscounts: boolean
          combineShippingDiscounts: boolean
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          createdByUser?: number | null
          createdByUserName?: string | null
          declineRate: number
          description?: string | null
          discountPrefix?: string | null
          endDate?: string | null
          expiryMinutes: number
          focus?: Database["public"]["Enums"]["programFocus"] | null
          goals?: Database["public"]["Enums"]["goalType"][] | null
          id?: number
          isActive?: boolean
          isDefault: boolean
          modifiedDate?: string | null
          name?: string | null
          shops?: number | null
          startDate?: string | null
          status?: Database["public"]["Enums"]["programStatus"]
          usageCount?: number | null
        }
        Update: {
          acceptRate?: number
          codePrefix?: string | null
          combineOrderDiscounts?: boolean
          combineProductDiscounts?: boolean
          combineShippingDiscounts?: boolean
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          createdByUser?: number | null
          createdByUserName?: string | null
          declineRate?: number
          description?: string | null
          discountPrefix?: string | null
          endDate?: string | null
          expiryMinutes?: number
          focus?: Database["public"]["Enums"]["programFocus"] | null
          goals?: Database["public"]["Enums"]["goalType"][] | null
          id?: number
          isActive?: boolean
          isDefault?: boolean
          modifiedDate?: string | null
          name?: string | null
          shops?: number | null
          startDate?: string | null
          status?: Database["public"]["Enums"]["programStatus"]
          usageCount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      rpc_versions: {
        Row: {
          file_path: string
          git_sha: string | null
          modified_at: string
          name: string
          notes: string | null
          updated_on: string | null
          version: number
        }
        Insert: {
          file_path: string
          git_sha?: string | null
          modified_at?: string
          name: string
          notes?: string | null
          updated_on?: string | null
          version: number
        }
        Update: {
          file_path?: string
          git_sha?: string | null
          modified_at?: string
          name?: string
          notes?: string | null
          updated_on?: string | null
          version?: number
        }
        Relationships: []
      }
      sessions: {
        Row: {
          accessToken: string | null
          accountOwner: boolean | null
          collaborator: boolean | null
          created_at: string
          email: string | null
          emailVerified: boolean | null
          expires: string | null
          firstName: string | null
          id: number
          isOnline: boolean | null
          lastName: string | null
          locale: string | null
          onlineAccessInfo: string | null
          refreshToken: string | null
          refreshTokenExpires: string | null
          scope: string | null
          sessionid: string | null
          shop: string | null
          shopId: string | null
          shops: number | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          accessToken?: string | null
          accountOwner?: boolean | null
          collaborator?: boolean | null
          created_at?: string
          email?: string | null
          emailVerified?: boolean | null
          expires?: string | null
          firstName?: string | null
          id?: number
          isOnline?: boolean | null
          lastName?: string | null
          locale?: string | null
          onlineAccessInfo?: string | null
          refreshToken?: string | null
          refreshTokenExpires?: string | null
          scope?: string | null
          sessionid?: string | null
          shop?: string | null
          shopId?: string | null
          shops?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          accessToken?: string | null
          accountOwner?: boolean | null
          collaborator?: boolean | null
          created_at?: string
          email?: string | null
          emailVerified?: boolean | null
          expires?: string | null
          firstName?: string | null
          id?: number
          isOnline?: boolean | null
          lastName?: string | null
          locale?: string | null
          onlineAccessInfo?: string | null
          refreshToken?: string | null
          refreshTokenExpires?: string | null
          scope?: string | null
          sessionid?: string | null
          shop?: string | null
          shopId?: string | null
          shops?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopAdminNotifications: {
        Row: {
          createdAt: string
          ctaUrl: string | null
          dedupeKey: string | null
          id: number
          isRead: boolean
          message: string
          payload: Json
          readAt: string | null
          shops: number
          title: string
          type: string
        }
        Insert: {
          createdAt?: string
          ctaUrl?: string | null
          dedupeKey?: string | null
          id?: number
          isRead?: boolean
          message: string
          payload?: Json
          readAt?: string | null
          shops: number
          title: string
          type?: string
        }
        Update: {
          createdAt?: string
          ctaUrl?: string | null
          dedupeKey?: string | null
          id?: number
          isRead?: boolean
          message?: string
          payload?: Json
          readAt?: string | null
          shops?: number
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopAdminNotifications_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopAuth: {
        Row: {
          createDate: string | null
          createdBy: string | null
          id: string
          modifiedDate: string | null
          shopGID: string | null
          shopifyScope: string | null
          shopName: string | null
          shops: number | null
          xAccessToken: string | null
        }
        Insert: {
          createDate?: string | null
          createdBy?: string | null
          id: string
          modifiedDate?: string | null
          shopGID?: string | null
          shopifyScope?: string | null
          shopName?: string | null
          shops?: number | null
          xAccessToken?: string | null
        }
        Update: {
          createDate?: string | null
          createdBy?: string | null
          id?: string
          modifiedDate?: string | null
          shopGID?: string | null
          shopifyScope?: string | null
          shopName?: string | null
          shops?: number | null
          xAccessToken?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopauth_shops_fkey"
            columns: ["shops"]
            isOneToOne: true
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopBilling: {
        Row: {
          created_at: string
          id: number
          shop: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          shop?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          shop?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopBilling_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyCheckouts: {
        Row: {
          abandonedCheckoutUrl: string | null
          appliedDiscount: Json
          billingAddress: Json
          browserIp: string | null
          buyerAcceptsMarketing: boolean | null
          cancelledAt: string | null
          cancelReason: string | null
          cartToken: string | null
          checkoutToken: string | null
          clientDetails: Json
          closedAt: string | null
          completedAt: string | null
          confirmed: boolean | null
          createdAt: string | null
          createDate: string | null
          currency: string | null
          customer: Json
          customerId: number | null
          deviceId: number | null
          discountApplications: Json
          discountCodes: Json
          duties: Json
          dutiesIncluded: boolean | null
          email: string | null
          estimatedTaxes: boolean | null
          financialStatus: string | null
          gateway: string | null
          giftCards: Json
          id: number
          landingSite: string | null
          lineItems: Json
          locationId: number | null
          note: string | null
          noteAttributes: Json
          orderId: number | null
          orderStatusUrl: string | null
          payload: Json
          paymentGatewayNames: Json
          poNumber: string | null
          presentmentCurrency: string | null
          presentmentTotalPriceSet: Json
          reference: string | null
          referringSite: string | null
          shippingAddress: Json
          shippingAddressSameAsBilling: boolean | null
          shippingLines: Json
          shippingRate: Json
          shopDomain: string | null
          shopifyCheckoutId: string
          shops: number | null
          sourceName: string | null
          subtotalPrice: number | null
          subtotalPriceSet: Json
          tags: string[] | null
          taxesIncluded: boolean | null
          taxLines: Json
          test: boolean | null
          token: string | null
          totalDiscounts: number | null
          totalDiscountsSet: Json
          totalLineItemsPrice: number | null
          totalPrice: number | null
          totalPriceSet: Json
          totalShippingPriceSet: Json
          totalTax: number | null
          totalTaxSet: Json
          updatedAt: string | null
        }
        Insert: {
          abandonedCheckoutUrl?: string | null
          appliedDiscount?: Json
          billingAddress?: Json
          browserIp?: string | null
          buyerAcceptsMarketing?: boolean | null
          cancelledAt?: string | null
          cancelReason?: string | null
          cartToken?: string | null
          checkoutToken?: string | null
          clientDetails?: Json
          closedAt?: string | null
          completedAt?: string | null
          confirmed?: boolean | null
          createdAt?: string | null
          createDate?: string | null
          currency?: string | null
          customer?: Json
          customerId?: number | null
          deviceId?: number | null
          discountApplications?: Json
          discountCodes?: Json
          duties?: Json
          dutiesIncluded?: boolean | null
          email?: string | null
          estimatedTaxes?: boolean | null
          financialStatus?: string | null
          gateway?: string | null
          giftCards?: Json
          id?: never
          landingSite?: string | null
          lineItems?: Json
          locationId?: number | null
          note?: string | null
          noteAttributes?: Json
          orderId?: number | null
          orderStatusUrl?: string | null
          payload?: Json
          paymentGatewayNames?: Json
          poNumber?: string | null
          presentmentCurrency?: string | null
          presentmentTotalPriceSet?: Json
          reference?: string | null
          referringSite?: string | null
          shippingAddress?: Json
          shippingAddressSameAsBilling?: boolean | null
          shippingLines?: Json
          shippingRate?: Json
          shopDomain?: string | null
          shopifyCheckoutId: string
          shops?: number | null
          sourceName?: string | null
          subtotalPrice?: number | null
          subtotalPriceSet?: Json
          tags?: string[] | null
          taxesIncluded?: boolean | null
          taxLines?: Json
          test?: boolean | null
          token?: string | null
          totalDiscounts?: number | null
          totalDiscountsSet?: Json
          totalLineItemsPrice?: number | null
          totalPrice?: number | null
          totalPriceSet?: Json
          totalShippingPriceSet?: Json
          totalTax?: number | null
          totalTaxSet?: Json
          updatedAt?: string | null
        }
        Update: {
          abandonedCheckoutUrl?: string | null
          appliedDiscount?: Json
          billingAddress?: Json
          browserIp?: string | null
          buyerAcceptsMarketing?: boolean | null
          cancelledAt?: string | null
          cancelReason?: string | null
          cartToken?: string | null
          checkoutToken?: string | null
          clientDetails?: Json
          closedAt?: string | null
          completedAt?: string | null
          confirmed?: boolean | null
          createdAt?: string | null
          createDate?: string | null
          currency?: string | null
          customer?: Json
          customerId?: number | null
          deviceId?: number | null
          discountApplications?: Json
          discountCodes?: Json
          duties?: Json
          dutiesIncluded?: boolean | null
          email?: string | null
          estimatedTaxes?: boolean | null
          financialStatus?: string | null
          gateway?: string | null
          giftCards?: Json
          id?: never
          landingSite?: string | null
          lineItems?: Json
          locationId?: number | null
          note?: string | null
          noteAttributes?: Json
          orderId?: number | null
          orderStatusUrl?: string | null
          payload?: Json
          paymentGatewayNames?: Json
          poNumber?: string | null
          presentmentCurrency?: string | null
          presentmentTotalPriceSet?: Json
          reference?: string | null
          referringSite?: string | null
          shippingAddress?: Json
          shippingAddressSameAsBilling?: boolean | null
          shippingLines?: Json
          shippingRate?: Json
          shopDomain?: string | null
          shopifyCheckoutId?: string
          shops?: number | null
          sourceName?: string | null
          subtotalPrice?: number | null
          subtotalPriceSet?: Json
          tags?: string[] | null
          taxesIncluded?: boolean | null
          taxLines?: Json
          test?: boolean | null
          token?: string | null
          totalDiscounts?: number | null
          totalDiscountsSet?: Json
          totalLineItemsPrice?: number | null
          totalPrice?: number | null
          totalPriceSet?: Json
          totalShippingPriceSet?: Json
          totalTax?: number | null
          totalTaxSet?: Json
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopifyCheckouts_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyInventory: {
        Row: {
          available: number | null
          createDate: string
          id: number
          inventoryItemGID: string | null
          inventoryItemID: number
          itemJSON: Json
          locationID: number
          locationJSON: Json | null
          locationName: string | null
          modifiedDate: string
          products: number | null
          requiresShipping: boolean | null
          shops: number
          sku: string | null
          tracked: boolean | null
          unitCost: number | null
          variants: number | null
          weightUnit: string | null
          weightValue: number | null
        }
        Insert: {
          available?: number | null
          createDate?: string
          id?: number
          inventoryItemGID?: string | null
          inventoryItemID: number
          itemJSON: Json
          locationID: number
          locationJSON?: Json | null
          locationName?: string | null
          modifiedDate?: string
          products?: number | null
          requiresShipping?: boolean | null
          shops: number
          sku?: string | null
          tracked?: boolean | null
          unitCost?: number | null
          variants?: number | null
          weightUnit?: string | null
          weightValue?: number | null
        }
        Update: {
          available?: number | null
          createDate?: string
          id?: number
          inventoryItemGID?: string | null
          inventoryItemID?: number
          itemJSON?: Json
          locationID?: number
          locationJSON?: Json | null
          locationName?: string | null
          modifiedDate?: string
          products?: number | null
          requiresShipping?: boolean | null
          shops?: number
          sku?: string | null
          tracked?: boolean | null
          unitCost?: number | null
          variants?: number | null
          weightUnit?: string | null
          weightValue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopInventory_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyOrderDetails: {
        Row: {
          cogs_total: number | null
          cogs_unit: number | null
          consumers: number | null
          discount_allocations: Json | null
          discount_amount: number | null
          duties: Json | null
          duty_amount: number | null
          grams: number | null
          gross_line_revenue: number | null
          id: number
          inserted_at: string
          is_cancelled: boolean | null
          is_refunded: boolean | null
          lastChange: Json | null
          line_item_id: number
          margin_amount: number | null
          margin_amount_with_ship: number | null
          margin_pct: number | null
          margin_pct_with_ship: number | null
          net_line_revenue: number | null
          net_line_with_shipping: number | null
          offers: number | null
          order_id: number
          pre_tax_price: number | null
          price: number | null
          product_id: number | null
          product_type: string | null
          quantity: number | null
          raw_fulfillments: Json | null
          raw_line_item: Json
          raw_shipping_lines: Json | null
          requires_shipping: boolean | null
          shipping_cogs_alloc: number | null
          shipping_discount_alloc: number | null
          shipping_revenue_alloc: number | null
          shipping_tax_alloc: number | null
          shops: number
          sku: string | null
          tax_amount: number | null
          tax_lines: Json | null
          title: string | null
          total_discount: number | null
          updated_at_supabase: string
          variant_id: number | null
          variant_title: string | null
          vendor: string | null
        }
        Insert: {
          cogs_total?: number | null
          cogs_unit?: number | null
          consumers?: number | null
          discount_allocations?: Json | null
          discount_amount?: number | null
          duties?: Json | null
          duty_amount?: number | null
          grams?: number | null
          gross_line_revenue?: number | null
          id?: number
          inserted_at?: string
          is_cancelled?: boolean | null
          is_refunded?: boolean | null
          lastChange?: Json | null
          line_item_id: number
          margin_amount?: number | null
          margin_amount_with_ship?: number | null
          margin_pct?: number | null
          margin_pct_with_ship?: number | null
          net_line_revenue?: number | null
          net_line_with_shipping?: number | null
          offers?: number | null
          order_id: number
          pre_tax_price?: number | null
          price?: number | null
          product_id?: number | null
          product_type?: string | null
          quantity?: number | null
          raw_fulfillments?: Json | null
          raw_line_item: Json
          raw_shipping_lines?: Json | null
          requires_shipping?: boolean | null
          shipping_cogs_alloc?: number | null
          shipping_discount_alloc?: number | null
          shipping_revenue_alloc?: number | null
          shipping_tax_alloc?: number | null
          shops: number
          sku?: string | null
          tax_amount?: number | null
          tax_lines?: Json | null
          title?: string | null
          total_discount?: number | null
          updated_at_supabase?: string
          variant_id?: number | null
          variant_title?: string | null
          vendor?: string | null
        }
        Update: {
          cogs_total?: number | null
          cogs_unit?: number | null
          consumers?: number | null
          discount_allocations?: Json | null
          discount_amount?: number | null
          duties?: Json | null
          duty_amount?: number | null
          grams?: number | null
          gross_line_revenue?: number | null
          id?: number
          inserted_at?: string
          is_cancelled?: boolean | null
          is_refunded?: boolean | null
          lastChange?: Json | null
          line_item_id?: number
          margin_amount?: number | null
          margin_amount_with_ship?: number | null
          margin_pct?: number | null
          margin_pct_with_ship?: number | null
          net_line_revenue?: number | null
          net_line_with_shipping?: number | null
          offers?: number | null
          order_id?: number
          pre_tax_price?: number | null
          price?: number | null
          product_id?: number | null
          product_type?: string | null
          quantity?: number | null
          raw_fulfillments?: Json | null
          raw_line_item?: Json
          raw_shipping_lines?: Json | null
          requires_shipping?: boolean | null
          shipping_cogs_alloc?: number | null
          shipping_discount_alloc?: number | null
          shipping_revenue_alloc?: number | null
          shipping_tax_alloc?: number | null
          shops?: number
          sku?: string | null
          tax_amount?: number | null
          tax_lines?: Json | null
          title?: string | null
          total_discount?: number | null
          updated_at_supabase?: string
          variant_id?: number | null
          variant_title?: string | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopifyOrderDetails_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrderDetails_offers_fkey"
            columns: ["offers"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrderDetails_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shopifyOrders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrderDetails_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyOrders: {
        Row: {
          billing_address: Json | null
          cancel_reason: string | null
          cancelled_at: string | null
          client_details: Json
          created_at: string | null
          currency: string | null
          current_shipping_price_set: Json
          current_subtotal_price: number | null
          current_subtotal_price_set: Json
          current_total_discounts_set: Json
          current_total_price: number | null
          current_total_price_set: Json
          current_total_tax_set: Json
          customer: Json | null
          discount_applications: Json
          discount_codes: Json
          email: string | null
          financial_status: string | null
          fulfillment_status: string | null
          fulfillments: Json
          id: number
          inserted_at: string
          lastChange: Json | null
          line_items: Json
          modifiedDate: string | null
          name: string | null
          order_id: number | null
          order_number: number | null
          orders: number | null
          payment_gateway_names: Json
          phone: string | null
          presentment_currency: string | null
          processed_at: string | null
          raw_payload: Json
          refunds: Json
          returns: Json
          shipping_address: Json | null
          shipping_lines: Json
          shops: number
          subtotal_price: number | null
          subtotal_price_set: Json
          tax_lines: Json
          total_discounts_set: Json
          total_line_items_price: number | null
          total_price: number | null
          total_price_set: Json
          total_shipping_price_set: Json
          total_tax: number | null
          total_tax_set: Json
          updated_at: string | null
          updated_at_supabase: string
        }
        Insert: {
          billing_address?: Json | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          client_details?: Json
          created_at?: string | null
          currency?: string | null
          current_shipping_price_set?: Json
          current_subtotal_price?: number | null
          current_subtotal_price_set?: Json
          current_total_discounts_set?: Json
          current_total_price?: number | null
          current_total_price_set?: Json
          current_total_tax_set?: Json
          customer?: Json | null
          discount_applications?: Json
          discount_codes?: Json
          email?: string | null
          financial_status?: string | null
          fulfillment_status?: string | null
          fulfillments?: Json
          id: number
          inserted_at?: string
          lastChange?: Json | null
          line_items?: Json
          modifiedDate?: string | null
          name?: string | null
          order_id?: number | null
          order_number?: number | null
          orders?: number | null
          payment_gateway_names?: Json
          phone?: string | null
          presentment_currency?: string | null
          processed_at?: string | null
          raw_payload: Json
          refunds?: Json
          returns?: Json
          shipping_address?: Json | null
          shipping_lines?: Json
          shops: number
          subtotal_price?: number | null
          subtotal_price_set?: Json
          tax_lines?: Json
          total_discounts_set?: Json
          total_line_items_price?: number | null
          total_price?: number | null
          total_price_set?: Json
          total_shipping_price_set?: Json
          total_tax?: number | null
          total_tax_set?: Json
          updated_at?: string | null
          updated_at_supabase?: string
        }
        Update: {
          billing_address?: Json | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          client_details?: Json
          created_at?: string | null
          currency?: string | null
          current_shipping_price_set?: Json
          current_subtotal_price?: number | null
          current_subtotal_price_set?: Json
          current_total_discounts_set?: Json
          current_total_price?: number | null
          current_total_price_set?: Json
          current_total_tax_set?: Json
          customer?: Json | null
          discount_applications?: Json
          discount_codes?: Json
          email?: string | null
          financial_status?: string | null
          fulfillment_status?: string | null
          fulfillments?: Json
          id?: number
          inserted_at?: string
          lastChange?: Json | null
          line_items?: Json
          modifiedDate?: string | null
          name?: string | null
          order_id?: number | null
          order_number?: number | null
          orders?: number | null
          payment_gateway_names?: Json
          phone?: string | null
          presentment_currency?: string | null
          processed_at?: string | null
          raw_payload?: Json
          refunds?: Json
          returns?: Json
          shipping_address?: Json | null
          shipping_lines?: Json
          shops?: number
          subtotal_price?: number | null
          subtotal_price_set?: Json
          tax_lines?: Json
          total_discounts_set?: Json
          total_line_items_price?: number | null
          total_price?: number | null
          total_price_set?: Json
          total_shipping_price_set?: Json
          total_tax?: number | null
          total_tax_set?: Json
          updated_at?: string | null
          updated_at_supabase?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopifyOrders_orders_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrders_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyRefundDetails: {
        Row: {
          id: number
          inserted_at: string
          lastChange: Json | null
          line_item_id: number
          order_id: number
          product_type: string | null
          quantity: number
          raw_refund_line: Json
          refund_cogs: number
          refund_discount: number
          refund_duty: number
          refund_gross: number
          refund_id: number
          refund_tax: number
          requires_shipping: boolean | null
          shops: number
        }
        Insert: {
          id?: number
          inserted_at?: string
          lastChange?: Json | null
          line_item_id: number
          order_id: number
          product_type?: string | null
          quantity: number
          raw_refund_line: Json
          refund_cogs: number
          refund_discount: number
          refund_duty: number
          refund_gross: number
          refund_id: number
          refund_tax: number
          requires_shipping?: boolean | null
          shops: number
        }
        Update: {
          id?: number
          inserted_at?: string
          lastChange?: Json | null
          line_item_id?: number
          order_id?: number
          product_type?: string | null
          quantity?: number
          raw_refund_line?: Json
          refund_cogs?: number
          refund_discount?: number
          refund_duty?: number
          refund_gross?: number
          refund_id?: number
          refund_tax?: number
          requires_shipping?: boolean | null
          shops?: number
        }
        Relationships: [
          {
            foreignKeyName: "shopifyRefundDetails_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shopifyOrders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyRefundDetails_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyRefundShipping: {
        Row: {
          id: number
          order_id: number
          raw_refund: Json
          refund_id: number
          ship_refund_cost: number
          ship_refund_sales: number
          shops: number
        }
        Insert: {
          id?: number
          order_id: number
          raw_refund: Json
          refund_id: number
          ship_refund_cost: number
          ship_refund_sales: number
          shops: number
        }
        Update: {
          id?: number
          order_id?: number
          raw_refund?: Json
          refund_id?: number
          ship_refund_cost?: number
          ship_refund_sales?: number
          shops?: number
        }
        Relationships: [
          {
            foreignKeyName: "shopifyRefundShipping_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shopifyOrders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyRefundShipping_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyUserActivity: {
        Row: {
          actionType: string
          created_at: string | null
          details: Json | null
          entityID: number
          entityType: string
          id: number
          shopifyUsers: number
          shops: number
        }
        Insert: {
          actionType: string
          created_at?: string | null
          details?: Json | null
          entityID: number
          entityType: string
          id?: number
          shopifyUsers: number
          shops: number
        }
        Update: {
          actionType?: string
          created_at?: string | null
          details?: Json | null
          entityID?: number
          entityType?: string
          id?: number
          shopifyUsers?: number
          shops?: number
        }
        Relationships: [
          {
            foreignKeyName: "shopifyUserActivity_shopifyUsers_fkey"
            columns: ["shopifyUsers"]
            isOneToOne: false
            referencedRelation: "shopifyUsers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyUserActivity_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyUsers: {
        Row: {
          created_at: string
          createDate: string | null
          dashboardPrefs: Json | null
          displayName: string | null
          email: string | null
          emailConfirmed: boolean | null
          firstLogin: string | null
          firstName: string | null
          hsContactID: string | null
          id: number
          isActive: boolean | null
          lastLogin: string | null
          lastName: string | null
          modifiedDate: string | null
          notificationPref: Json | null
          onboardingCampaign: string | null
          onboardingstart: boolean | null
          phone: string | null
          profilePicture: string | null
          shopifyUserData: Json | null
          shopifyUserId: number | null
          shops: number | null
          userid: string | null
          userRole: Database["public"]["Enums"]["shopRoles"] | null
        }
        Insert: {
          created_at?: string
          createDate?: string | null
          dashboardPrefs?: Json | null
          displayName?: string | null
          email?: string | null
          emailConfirmed?: boolean | null
          firstLogin?: string | null
          firstName?: string | null
          hsContactID?: string | null
          id?: number
          isActive?: boolean | null
          lastLogin?: string | null
          lastName?: string | null
          modifiedDate?: string | null
          notificationPref?: Json | null
          onboardingCampaign?: string | null
          onboardingstart?: boolean | null
          phone?: string | null
          profilePicture?: string | null
          shopifyUserData?: Json | null
          shopifyUserId?: number | null
          shops?: number | null
          userid?: string | null
          userRole?: Database["public"]["Enums"]["shopRoles"] | null
        }
        Update: {
          created_at?: string
          createDate?: string | null
          dashboardPrefs?: Json | null
          displayName?: string | null
          email?: string | null
          emailConfirmed?: boolean | null
          firstLogin?: string | null
          firstName?: string | null
          hsContactID?: string | null
          id?: number
          isActive?: boolean | null
          lastLogin?: string | null
          lastName?: string | null
          modifiedDate?: string | null
          notificationPref?: Json | null
          onboardingCampaign?: string | null
          onboardingstart?: boolean | null
          phone?: string | null
          profilePicture?: string | null
          shopifyUserData?: Json | null
          shopifyUserId?: number | null
          shops?: number | null
          userid?: string | null
          userRole?: Database["public"]["Enums"]["shopRoles"] | null
        }
        Relationships: [
          {
            foreignKeyName: "shopifyUsers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopifyvariantproductmap: {
        Row: {
          created_date: string | null
          id: number
          imageURL: string | null
          index_product_id_idx: number | null
          productGID: string
          productID: number
          productImageURL: string | null
          productTitle: string | null
          variantCompareAtPrice: number | null
          variantGID: string
          variantID: string
          variantImageURL: string | null
          variantPrice: number | null
        }
        Insert: {
          created_date?: string | null
          id?: number
          imageURL?: string | null
          index_product_id_idx?: number | null
          productGID: string
          productID: number
          productImageURL?: string | null
          productTitle?: string | null
          variantCompareAtPrice?: number | null
          variantGID: string
          variantID: string
          variantImageURL?: string | null
          variantPrice?: number | null
        }
        Update: {
          created_date?: string | null
          id?: number
          imageURL?: string | null
          index_product_id_idx?: number | null
          productGID?: string
          productID?: number
          productImageURL?: string | null
          productTitle?: string | null
          variantCompareAtPrice?: number | null
          variantGID?: string
          variantID?: string
          variantImageURL?: string | null
          variantPrice?: number | null
        }
        Relationships: []
      }
      shops: {
        Row: {
          agenticOffersDisabledAt: string | null
          agenticOffersEnabled: boolean
          agenticOffersEnabledAt: string | null
          billingAddress1: string | null
          billingAddress2: string | null
          billingCity: string | null
          billingCountry: string | null
          billingPhone: string | null
          billingProvince: string | null
          billingZip: string | null
          brandName: string | null
          commercePlatform: string | null
          companyAddress: Json | null
          companyName: string | null
          companyPhone: string | null
          contactEmail: string | null
          createDate: string
          createdBy: string | null
          customerEmail: string | null
          id: number
          installedDate: string | null
          isActive: boolean | null
          lastFetchedAt: string | null
          legalName: string | null
          longDescription: string | null
          modifiedDate: string | null
          planName: string | null
          privacyURL: string | null
          shopAuth: string | null
          shopCurrency: string | null
          shopDomain: string | null
          shopLogo: string | null
          shopOwnerEmail: string | null
          shopOwnerName: string | null
          shopsGID: string | null
          shortDescription: string | null
          signupValidationToken: string | null
          termsURL: string | null
          timezone: string | null
          uninstalledDate: string | null
        }
        Insert: {
          agenticOffersDisabledAt?: string | null
          agenticOffersEnabled?: boolean
          agenticOffersEnabledAt?: string | null
          billingAddress1?: string | null
          billingAddress2?: string | null
          billingCity?: string | null
          billingCountry?: string | null
          billingPhone?: string | null
          billingProvince?: string | null
          billingZip?: string | null
          brandName?: string | null
          commercePlatform?: string | null
          companyAddress?: Json | null
          companyName?: string | null
          companyPhone?: string | null
          contactEmail?: string | null
          createDate?: string
          createdBy?: string | null
          customerEmail?: string | null
          id?: number
          installedDate?: string | null
          isActive?: boolean | null
          lastFetchedAt?: string | null
          legalName?: string | null
          longDescription?: string | null
          modifiedDate?: string | null
          planName?: string | null
          privacyURL?: string | null
          shopAuth?: string | null
          shopCurrency?: string | null
          shopDomain?: string | null
          shopLogo?: string | null
          shopOwnerEmail?: string | null
          shopOwnerName?: string | null
          shopsGID?: string | null
          shortDescription?: string | null
          signupValidationToken?: string | null
          termsURL?: string | null
          timezone?: string | null
          uninstalledDate?: string | null
        }
        Update: {
          agenticOffersDisabledAt?: string | null
          agenticOffersEnabled?: boolean
          agenticOffersEnabledAt?: string | null
          billingAddress1?: string | null
          billingAddress2?: string | null
          billingCity?: string | null
          billingCountry?: string | null
          billingPhone?: string | null
          billingProvince?: string | null
          billingZip?: string | null
          brandName?: string | null
          commercePlatform?: string | null
          companyAddress?: Json | null
          companyName?: string | null
          companyPhone?: string | null
          contactEmail?: string | null
          createDate?: string
          createdBy?: string | null
          customerEmail?: string | null
          id?: number
          installedDate?: string | null
          isActive?: boolean | null
          lastFetchedAt?: string | null
          legalName?: string | null
          longDescription?: string | null
          modifiedDate?: string | null
          planName?: string | null
          privacyURL?: string | null
          shopAuth?: string | null
          shopCurrency?: string | null
          shopDomain?: string | null
          shopLogo?: string | null
          shopOwnerEmail?: string | null
          shopOwnerName?: string | null
          shopsGID?: string | null
          shortDescription?: string | null
          signupValidationToken?: string | null
          termsURL?: string | null
          timezone?: string | null
          uninstalledDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shops_shopAuth_fkey"
            columns: ["shopAuth"]
            isOneToOne: false
            referencedRelation: "shopAuth"
            referencedColumns: ["id"]
          },
        ]
      }
      shopStores: {
        Row: {
          city: string | null
          countrycode: string | null
          created_at: string
          createdby: string | null
          createddate: string | null
          domain: string | null
          email: string | null
          hasdiscounts: boolean | null
          hasgiftcards: boolean | null
          hasstorefront: boolean | null
          id: number
          modifieddate: string | null
          phone: string | null
          shop: number | null
          storeaddress: Json | null
          storecheckoutapi: boolean | null
          storeid: string | null
          storename: string | null
          storeurl: string | null
        }
        Insert: {
          city?: string | null
          countrycode?: string | null
          created_at?: string
          createdby?: string | null
          createddate?: string | null
          domain?: string | null
          email?: string | null
          hasdiscounts?: boolean | null
          hasgiftcards?: boolean | null
          hasstorefront?: boolean | null
          id?: number
          modifieddate?: string | null
          phone?: string | null
          shop?: number | null
          storeaddress?: Json | null
          storecheckoutapi?: boolean | null
          storeid?: string | null
          storename?: string | null
          storeurl?: string | null
        }
        Update: {
          city?: string | null
          countrycode?: string | null
          created_at?: string
          createdby?: string | null
          createddate?: string | null
          domain?: string | null
          email?: string | null
          hasdiscounts?: boolean | null
          hasgiftcards?: boolean | null
          hasstorefront?: boolean | null
          id?: number
          modifieddate?: string | null
          phone?: string | null
          shop?: number | null
          storeaddress?: Json | null
          storecheckoutapi?: boolean | null
          storeid?: string | null
          storename?: string | null
          storeurl?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopstores_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopSyncJobs: {
        Row: {
          createDate: string
          error: string | null
          finishedAt: string | null
          id: number
          jobType: Database["public"]["Enums"]["syncJobType"]
          modifiedDate: string
          ordersBackfillMonths: number | null
          queuedAt: string
          shops: number
          startedAt: string | null
          status: Database["public"]["Enums"]["syncJobStatus"]
        }
        Insert: {
          createDate?: string
          error?: string | null
          finishedAt?: string | null
          id?: number
          jobType: Database["public"]["Enums"]["syncJobType"]
          modifiedDate?: string
          ordersBackfillMonths?: number | null
          queuedAt?: string
          shops: number
          startedAt?: string | null
          status?: Database["public"]["Enums"]["syncJobStatus"]
        }
        Update: {
          createDate?: string
          error?: string | null
          finishedAt?: string | null
          id?: number
          jobType?: Database["public"]["Enums"]["syncJobType"]
          modifiedDate?: string
          ordersBackfillMonths?: number | null
          queuedAt?: string
          shops?: number
          startedAt?: string | null
          status?: Database["public"]["Enums"]["syncJobStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "shopSyncJobs_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shopSyncStatus: {
        Row: {
          catalogLastSyncAt: string | null
          catalogStatus: Database["public"]["Enums"]["syncJobStatus"]
          consumersLastSyncAt: string | null
          consumersStatus: Database["public"]["Enums"]["syncJobStatus"]
          createDate: string
          lastError: string | null
          maxHistoryMonths: number
          modifiedDate: string
          ordersBackfillMonths: number
          ordersLastSyncAt: string | null
          ordersProcessedCount: number
          ordersStatus: Database["public"]["Enums"]["syncJobStatus"]
          shops: number
          totalOrdersToProcess: number | null
          updatedAt: string
          webhooksLastSyncAt: string | null
          webhooksStatus: Database["public"]["Enums"]["syncJobStatus"]
        }
        Insert: {
          catalogLastSyncAt?: string | null
          catalogStatus?: Database["public"]["Enums"]["syncJobStatus"]
          consumersLastSyncAt?: string | null
          consumersStatus?: Database["public"]["Enums"]["syncJobStatus"]
          createDate?: string
          lastError?: string | null
          maxHistoryMonths?: number
          modifiedDate?: string
          ordersBackfillMonths?: number
          ordersLastSyncAt?: string | null
          ordersProcessedCount?: number
          ordersStatus?: Database["public"]["Enums"]["syncJobStatus"]
          shops: number
          totalOrdersToProcess?: number | null
          updatedAt?: string
          webhooksLastSyncAt?: string | null
          webhooksStatus?: Database["public"]["Enums"]["syncJobStatus"]
        }
        Update: {
          catalogLastSyncAt?: string | null
          catalogStatus?: Database["public"]["Enums"]["syncJobStatus"]
          consumersLastSyncAt?: string | null
          consumersStatus?: Database["public"]["Enums"]["syncJobStatus"]
          createDate?: string
          lastError?: string | null
          maxHistoryMonths?: number
          modifiedDate?: string
          ordersBackfillMonths?: number
          ordersLastSyncAt?: string | null
          ordersProcessedCount?: number
          ordersStatus?: Database["public"]["Enums"]["syncJobStatus"]
          shops?: number
          totalOrdersToProcess?: number | null
          updatedAt?: string
          webhooksLastSyncAt?: string | null
          webhooksStatus?: Database["public"]["Enums"]["syncJobStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "shopSyncStatus_shops_fkey"
            columns: ["shops"]
            isOneToOne: true
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      storeleads: {
        Row: {
          average_product_price: string | null
          average_product_price_usd: string | null
          avgannualsales: number | null
          avgannualtraffic: number | null
          avgmonthlysales: number | null
          avgmonthlytraffic: number | null
          avgproductprice: number | null
          campaign: string | null
          categories: string | null
          city: string | null
          company_ids: string | null
          company_location: string | null
          country_code: string | null
          created: string | null
          currency: string | null
          currencycode: string | null
          description: string | null
          domain: string | null
          domain_url: string | null
          emails: string | null
          employee_count: number | null
          estimated_monthly_pageviews: number | null
          estimated_monthly_sales: string | null
          estimated_monthly_visits: number | null
          estimated_yearly_sales: string | null
          facebook: string | null
          highproductprice: number | null
          id: string
          instagram: string | null
          linkedin_account: string | null
          linkedin_url: string | null
          lowproductprice: number | null
          maximum_product_price: string | null
          merchant_name: string | null
          meta_description: string | null
          meta_keywords: string | null
          minimum_product_price: string | null
          most_recent_product_title: string | null
          phones: string | null
          pinterest: string | null
          pinterest_followers: number | null
          plan: string | null
          platform: string | null
          platform_rank: number | null
          product_variants: number | null
          products_created_365: number | null
          products_sold: number | null
          rank: number | null
          sales_channels: string | null
          selected: boolean | null
          selecteddate: string | null
          state: string | null
          status: string | null
          street_address: string | null
          tiktok: string | null
          tiktok_followers: number | null
          tiktok_url: string | null
          twitter: string | null
          twitter_followers: number | null
          youtube: string | null
          youtube_followers: number | null
          youtube_url: string | null
          zip: number | null
        }
        Insert: {
          average_product_price?: string | null
          average_product_price_usd?: string | null
          avgannualsales?: number | null
          avgannualtraffic?: number | null
          avgmonthlysales?: number | null
          avgmonthlytraffic?: number | null
          avgproductprice?: number | null
          campaign?: string | null
          categories?: string | null
          city?: string | null
          company_ids?: string | null
          company_location?: string | null
          country_code?: string | null
          created?: string | null
          currency?: string | null
          currencycode?: string | null
          description?: string | null
          domain?: string | null
          domain_url?: string | null
          emails?: string | null
          employee_count?: number | null
          estimated_monthly_pageviews?: number | null
          estimated_monthly_sales?: string | null
          estimated_monthly_visits?: number | null
          estimated_yearly_sales?: string | null
          facebook?: string | null
          highproductprice?: number | null
          id?: string
          instagram?: string | null
          linkedin_account?: string | null
          linkedin_url?: string | null
          lowproductprice?: number | null
          maximum_product_price?: string | null
          merchant_name?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          minimum_product_price?: string | null
          most_recent_product_title?: string | null
          phones?: string | null
          pinterest?: string | null
          pinterest_followers?: number | null
          plan?: string | null
          platform?: string | null
          platform_rank?: number | null
          product_variants?: number | null
          products_created_365?: number | null
          products_sold?: number | null
          rank?: number | null
          sales_channels?: string | null
          selected?: boolean | null
          selecteddate?: string | null
          state?: string | null
          status?: string | null
          street_address?: string | null
          tiktok?: string | null
          tiktok_followers?: number | null
          tiktok_url?: string | null
          twitter?: string | null
          twitter_followers?: number | null
          youtube?: string | null
          youtube_followers?: number | null
          youtube_url?: string | null
          zip?: number | null
        }
        Update: {
          average_product_price?: string | null
          average_product_price_usd?: string | null
          avgannualsales?: number | null
          avgannualtraffic?: number | null
          avgmonthlysales?: number | null
          avgmonthlytraffic?: number | null
          avgproductprice?: number | null
          campaign?: string | null
          categories?: string | null
          city?: string | null
          company_ids?: string | null
          company_location?: string | null
          country_code?: string | null
          created?: string | null
          currency?: string | null
          currencycode?: string | null
          description?: string | null
          domain?: string | null
          domain_url?: string | null
          emails?: string | null
          employee_count?: number | null
          estimated_monthly_pageviews?: number | null
          estimated_monthly_sales?: string | null
          estimated_monthly_visits?: number | null
          estimated_yearly_sales?: string | null
          facebook?: string | null
          highproductprice?: number | null
          id?: string
          instagram?: string | null
          linkedin_account?: string | null
          linkedin_url?: string | null
          lowproductprice?: number | null
          maximum_product_price?: string | null
          merchant_name?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          minimum_product_price?: string | null
          most_recent_product_title?: string | null
          phones?: string | null
          pinterest?: string | null
          pinterest_followers?: number | null
          plan?: string | null
          platform?: string | null
          platform_rank?: number | null
          product_variants?: number | null
          products_created_365?: number | null
          products_sold?: number | null
          rank?: number | null
          sales_channels?: string | null
          selected?: boolean | null
          selecteddate?: string | null
          state?: string | null
          status?: string | null
          street_address?: string | null
          tiktok?: string | null
          tiktok_followers?: number | null
          tiktok_url?: string | null
          twitter?: string | null
          twitter_followers?: number | null
          youtube?: string | null
          youtube_followers?: number | null
          youtube_url?: string | null
          zip?: number | null
        }
        Relationships: []
      }
      subscriptionAttempts: {
        Row: {
          created_at: string
          id: number
          insertedAt: string | null
          occurredAt: string | null
          orderID: string | null
          payload: Json
          shopDomain: string | null
          shopifyAttemptId: string | null
          shopifySubscriptionGID: string | null
          shops: number | null
          status: string | null
          subscriptions: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          insertedAt?: string | null
          occurredAt?: string | null
          orderID?: string | null
          payload: Json
          shopDomain?: string | null
          shopifyAttemptId?: string | null
          shopifySubscriptionGID?: string | null
          shops?: number | null
          status?: string | null
          subscriptions?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          insertedAt?: string | null
          occurredAt?: string | null
          orderID?: string | null
          payload?: Json
          shopDomain?: string | null
          shopifyAttemptId?: string | null
          shopifySubscriptionGID?: string | null
          shops?: number | null
          status?: string | null
          subscriptions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptionAttempts_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptionAttempts_subscriptions_fkey"
            columns: ["subscriptions"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptionBilling: {
        Row: {
          cappedAmount: number | null
          created_at: string
          currentPeriodEnd: string | null
          id: number
          inserted_at: string | null
          modifiedDate: string | null
          name: string | null
          payload: Json
          shopDomain: string | null
          shopifiyBillingId: string | null
          shops: number | null
          status: string | null
          subscriptions: number | null
          usageBalance: number | null
        }
        Insert: {
          cappedAmount?: number | null
          created_at?: string
          currentPeriodEnd?: string | null
          id?: number
          inserted_at?: string | null
          modifiedDate?: string | null
          name?: string | null
          payload: Json
          shopDomain?: string | null
          shopifiyBillingId?: string | null
          shops?: number | null
          status?: string | null
          subscriptions?: number | null
          usageBalance?: number | null
        }
        Update: {
          cappedAmount?: number | null
          created_at?: string
          currentPeriodEnd?: string | null
          id?: number
          inserted_at?: string | null
          modifiedDate?: string | null
          name?: string | null
          payload?: Json
          shopDomain?: string | null
          shopifiyBillingId?: string | null
          shops?: number | null
          status?: string | null
          subscriptions?: number | null
          usageBalance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptionBilling_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptionBilling_subscriptions_fkey"
            columns: ["subscriptions"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          apiError: string | null
          cappedAmount: number | null
          confirmationURL: string | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          currentPeriodEnd: string | null
          endDate: string | null
          hsDealId: string | null
          id: number
          inserted_at: string | null
          interval: string | null
          modifiedDate: string | null
          name: string | null
          payload: Json
          plans: number | null
          renewalAutomatically: boolean | null
          shop: number | null
          shopDomain: string | null
          shopifyCustomerGID: string | null
          shopifySubscriptionId: string | null
          startDate: string | null
          status: string | null
          subscriptionGID: string | null
          trialStartDate: string | null
          usageBalance: number | null
          usedFreeTrial: boolean | null
          user: string | null
        }
        Insert: {
          apiError?: string | null
          cappedAmount?: number | null
          confirmationURL?: string | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          currentPeriodEnd?: string | null
          endDate?: string | null
          hsDealId?: string | null
          id?: number
          inserted_at?: string | null
          interval?: string | null
          modifiedDate?: string | null
          name?: string | null
          payload: Json
          plans?: number | null
          renewalAutomatically?: boolean | null
          shop?: number | null
          shopDomain?: string | null
          shopifyCustomerGID?: string | null
          shopifySubscriptionId?: string | null
          startDate?: string | null
          status?: string | null
          subscriptionGID?: string | null
          trialStartDate?: string | null
          usageBalance?: number | null
          usedFreeTrial?: boolean | null
          user?: string | null
        }
        Update: {
          apiError?: string | null
          cappedAmount?: number | null
          confirmationURL?: string | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          currentPeriodEnd?: string | null
          endDate?: string | null
          hsDealId?: string | null
          id?: number
          inserted_at?: string | null
          interval?: string | null
          modifiedDate?: string | null
          name?: string | null
          payload?: Json
          plans?: number | null
          renewalAutomatically?: boolean | null
          shop?: number | null
          shopDomain?: string | null
          shopifyCustomerGID?: string | null
          shopifySubscriptionId?: string | null
          startDate?: string | null
          status?: string | null
          subscriptionGID?: string | null
          trialStartDate?: string | null
          usageBalance?: number | null
          usedFreeTrial?: boolean | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plans_fkey"
            columns: ["plans"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      trigger_debug: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          session_data: Json | null
          trigger_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          session_data?: Json | null
          trigger_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          session_data?: Json | null
          trigger_name?: string | null
        }
        Relationships: []
      }
      userBilling: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          address1: string | null
          address2: string | null
          avatarUrl: string | null
          city: string | null
          consumers: number | null
          country: string | null
          createDate: string | null
          displayName: string | null
          email: string
          firstName: string | null
          id: string
          lastName: string | null
          modifiedDate: string | null
          phone: string | null
          postalCode: string | null
          role: string | null
          state: string | null
        }
        Insert: {
          address1?: string | null
          address2?: string | null
          avatarUrl?: string | null
          city?: string | null
          consumers?: number | null
          country?: string | null
          createDate?: string | null
          displayName?: string | null
          email: string
          firstName?: string | null
          id: string
          lastName?: string | null
          modifiedDate?: string | null
          phone?: string | null
          postalCode?: string | null
          role?: string | null
          state?: string | null
        }
        Update: {
          address1?: string | null
          address2?: string | null
          avatarUrl?: string | null
          city?: string | null
          consumers?: number | null
          country?: string | null
          createDate?: string | null
          displayName?: string | null
          email?: string
          firstName?: string | null
          id?: string
          lastName?: string | null
          modifiedDate?: string | null
          phone?: string | null
          postalCode?: string | null
          role?: string | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
        ]
      }
      variantPricing: {
        Row: {
          allowanceDiscounts: number | null
          allowanceFinance: number | null
          allowanceShipping: number | null
          allowanceShrink: number | null
          allowDiscountPercent: number | null
          allowShippingPercent: number | null
          allowShrinkPercent: number | null
          approvedByUser: number | null
          builderPrice: number | null
          createDate: string | null
          createdByUser: number | null
          createdByUserName: string | null
          currency: string | null
          id: number
          isPublished: boolean | null
          itemCost: number | null
          marketAdjustment: number | null
          marketAdjustmentType:
            | Database["public"]["Enums"]["market_adjustment_type"]
            | null
          modifiedDate: string
          notes: string | null
          priceBuilder: Json | null
          productID: string
          profitMarkup: number | null
          profitMarkupPercent: number | null
          publishedDate: string | null
          publishedEndDate: string | null
          publishedPrice: number | null
          shops: number
          source: string | null
          updatedBy: string | null
          variantID: string
          variantOpex: number | null
          variantOpexPercent: number | null
          variants: number
          version: number | null
        }
        Insert: {
          allowanceDiscounts?: number | null
          allowanceFinance?: number | null
          allowanceShipping?: number | null
          allowanceShrink?: number | null
          allowDiscountPercent?: number | null
          allowShippingPercent?: number | null
          allowShrinkPercent?: number | null
          approvedByUser?: number | null
          builderPrice?: number | null
          createDate?: string | null
          createdByUser?: number | null
          createdByUserName?: string | null
          currency?: string | null
          id?: number
          isPublished?: boolean | null
          itemCost?: number | null
          marketAdjustment?: number | null
          marketAdjustmentType?:
            | Database["public"]["Enums"]["market_adjustment_type"]
            | null
          modifiedDate?: string
          notes?: string | null
          priceBuilder?: Json | null
          productID: string
          profitMarkup?: number | null
          profitMarkupPercent?: number | null
          publishedDate?: string | null
          publishedEndDate?: string | null
          publishedPrice?: number | null
          shops: number
          source?: string | null
          updatedBy?: string | null
          variantID: string
          variantOpex?: number | null
          variantOpexPercent?: number | null
          variants: number
          version?: number | null
        }
        Update: {
          allowanceDiscounts?: number | null
          allowanceFinance?: number | null
          allowanceShipping?: number | null
          allowanceShrink?: number | null
          allowDiscountPercent?: number | null
          allowShippingPercent?: number | null
          allowShrinkPercent?: number | null
          approvedByUser?: number | null
          builderPrice?: number | null
          createDate?: string | null
          createdByUser?: number | null
          createdByUserName?: string | null
          currency?: string | null
          id?: number
          isPublished?: boolean | null
          itemCost?: number | null
          marketAdjustment?: number | null
          marketAdjustmentType?:
            | Database["public"]["Enums"]["market_adjustment_type"]
            | null
          modifiedDate?: string
          notes?: string | null
          priceBuilder?: Json | null
          productID?: string
          profitMarkup?: number | null
          profitMarkupPercent?: number | null
          publishedDate?: string | null
          publishedEndDate?: string | null
          publishedPrice?: number | null
          shops?: number
          source?: string | null
          updatedBy?: string | null
          variantID?: string
          variantOpex?: number | null
          variantOpexPercent?: number | null
          variants?: number
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "variantpricing_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variantpricing_variants_fkey"
            columns: ["variants"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          categories: Json | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          displayName: string | null
          id: number
          imageURL: string | null
          inventoryItemID: string | null
          inventoryLevel: number | null
          isActive: boolean | null
          isDefault: boolean | null
          itemCost: number | null
          modifiedDate: string | null
          name: string | null
          pricing: number | null
          productID: string | null
          products: number | null
          shopifyPrice: number | null
          shops: number | null
          variantGID: string | null
          variantHandle: string | null
          variantID: string | null
          variantJSON: Json | null
          variantSKU: string | null
          weight: number | null
          weightUnit: string | null
        }
        Insert: {
          categories?: Json | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          displayName?: string | null
          id?: number
          imageURL?: string | null
          inventoryItemID?: string | null
          inventoryLevel?: number | null
          isActive?: boolean | null
          isDefault?: boolean | null
          itemCost?: number | null
          modifiedDate?: string | null
          name?: string | null
          pricing?: number | null
          productID?: string | null
          products?: number | null
          shopifyPrice?: number | null
          shops?: number | null
          variantGID?: string | null
          variantHandle?: string | null
          variantID?: string | null
          variantJSON?: Json | null
          variantSKU?: string | null
          weight?: number | null
          weightUnit?: string | null
        }
        Update: {
          categories?: Json | null
          created_at?: string
          createDate?: string | null
          createdBy?: string | null
          displayName?: string | null
          id?: number
          imageURL?: string | null
          inventoryItemID?: string | null
          inventoryLevel?: number | null
          isActive?: boolean | null
          isDefault?: boolean | null
          itemCost?: number | null
          modifiedDate?: string | null
          name?: string | null
          pricing?: number | null
          productID?: string | null
          products?: number | null
          shopifyPrice?: number | null
          shops?: number | null
          variantGID?: string | null
          variantHandle?: string | null
          variantID?: string | null
          variantJSON?: Json | null
          variantSKU?: string | null
          weight?: number | null
          weightUnit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "variants_pricing_fkey"
            columns: ["pricing"]
            isOneToOne: false
            referencedRelation: "variantPricing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variants_products_fkey"
            columns: ["products"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variants_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      verificationCodes: {
        Row: {
          attempts: number | null
          code: string
          consumers: number
          contactValue: string
          createDate: string | null
          expireDate: string
          id: number
          users: string
          verificationType: string
          verified: boolean | null
          verifiedDate: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          consumers: number
          contactValue: string
          createDate?: string | null
          expireDate: string
          id?: number
          users: string
          verificationType: string
          verified?: boolean | null
          verifiedDate?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          consumers?: number
          contactValue?: string
          createDate?: string | null
          expireDate?: string
          id?: number
          users?: string
          verificationType?: string
          verified?: boolean | null
          verifiedDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verificationCodes_consumers_fkey"
            columns: ["consumers"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_log: {
        Row: {
          correlation_id: string
          created_at: string | null
          error: string | null
          hmac: string | null
          id: number
          ok: boolean | null
          payload: Json
          received_at: string
          request_id: string | null
          resource_id: string | null
          shop_domain: string
          shopify_id: string | null
          shops: number | null
          topic: string
        }
        Insert: {
          correlation_id?: string
          created_at?: string | null
          error?: string | null
          hmac?: string | null
          id?: number
          ok?: boolean | null
          payload: Json
          received_at?: string
          request_id?: string | null
          resource_id?: string | null
          shop_domain: string
          shopify_id?: string | null
          shops?: number | null
          topic: string
        }
        Update: {
          correlation_id?: string
          created_at?: string | null
          error?: string | null
          hmac?: string | null
          id?: number
          ok?: boolean | null
          payload?: Json
          received_at?: string
          request_id?: string | null
          resource_id?: string | null
          shop_domain?: string
          shopify_id?: string | null
          shops?: number | null
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_log_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_log: {
        Row: {
          correlation_id: string
          detail: Json | null
          finished_at: string | null
          id: number
          started_at: string
          status: string
          step: string
        }
        Insert: {
          correlation_id: string
          detail?: Json | null
          finished_at?: string | null
          id?: number
          started_at?: string
          status: string
          step: string
        }
        Update: {
          correlation_id?: string
          detail?: Json | null
          finished_at?: string | null
          id?: number
          started_at?: string
          status?: string
          step?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_fn_inventory: {
        Row: {
          arg_count: number | null
          args_sig: string | null
          is_trigger_fn: boolean | null
          new_name_suggested: string | null
          oid: unknown
          old_name: unknown
          result_type: string | null
          schema_name: unknown
          suggested_kind: string | null
        }
        Relationships: []
      }
      analytics_offer_order_period_metrics: {
        Row: {
          conversionRate: number | null
          numberOfOffers: number | null
          numberOfOrders: number | null
          offer_filter: string | null
          offer_filter_label: string | null
          period_key: string | null
          period_label: string | null
          period_start: string | null
          refreshedAt: string | null
          shops: number | null
          totalDollarsOffered: number | null
          totalDollarsOrdered: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_allowances_breakdown: {
        Row: {
          allowances: number | null
          category: string | null
          cogs: number | null
          market_adjust: number | null
          profit_markup: number | null
          selling_price: number | null
          shops: number | null
        }
        Relationships: []
      }
      dashboard_conversion_funnel: {
        Row: {
          checkout_conversion_rate: number | null
          fulfillment_rate: number | null
          offers_converted: number | null
          offers_with_checkout: number | null
          order_conversion_rate: number | null
          orders_fulfilled: number | null
          shops: number | null
          total_offers: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_offer_metrics: {
        Row: {
          acceptance_rate_percent: number | null
          approved_offers: number | null
          avg_discount_per_offer: number | null
          last_updated: string | null
          pending_review_offers: number | null
          shops: number | null
          total_discounts: number | null
          total_offers: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_order_revenue: {
        Row: {
          currency: string | null
          fulfilled_orders: number | null
          last_order_date: string | null
          offer_driven_revenue: number | null
          offers_with_orders: number | null
          shops: number | null
          total_orders: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      v_map_shopify_order_details: {
        Row: {
          allowDiscounts: number | null
          allowFinance: number | null
          allowOther: number | null
          allowShipping: number | null
          allowShrink: number | null
          created_at: string | null
          discountAllocation: number | null
          discountsTaken: number | null
          financeTaken: number | null
          itemCost: number | null
          itemName: string | null
          itemQuantity: number | null
          itemSKU: string | null
          itemStatus: Database["public"]["Enums"]["itemStatus"] | null
          itemWeight: number | null
          lineItemID: string | null
          marketAdjust: number | null
          orderID: string | null
          orders: number | null
          product: number | null
          productType: string | null
          profitMarkup: number | null
          sellPrice: number | null
          settlePrice: number | null
          shippingCost: number | null
          shippingSales: number | null
          shippingTaken: number | null
          shopifyItemCost: number | null
          shops: number | null
          shrinkTaken: number | null
          totalMarkup: number | null
          variants: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopifyOrderDetails_order_id_fkey"
            columns: ["orders"]
            isOneToOne: false
            referencedRelation: "shopifyOrders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrderDetails_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      v_order_key_measures: {
        Row: {
          aur: number | null
          gross_discounts: number | null
          gross_items: number | null
          gross_profit: number | null
          gross_profit_net_of_shipping: number | null
          gross_sales: number | null
          gross_units: number | null
          "Net COGS": number | null
          net_cogs: number | null
          net_items: number | null
          net_sales: number | null
          net_shipping_returns: number | null
          net_shipping_sales: number | null
          net_units: number | null
          netaur: number | null
          nor_sales: number | null
          order_gross_for_aov: number | null
          order_id: number | null
          order_net_for_aov: number | null
          return_items: number | null
          return_shipping_cost: number | null
          return_shipping_sales: number | null
          return_units: number | null
          returns: number | null
          shipping_cost: number | null
          shipping_sales: number | null
          shops: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopifyOrderDetails_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shopifyOrders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrderDetails_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      v_order_kpis: {
        Row: {
          gross_cogs: number | null
          gross_discounts: number | null
          gross_items: number | null
          gross_product_sales: number | null
          gross_profit: number | null
          gross_profit_net_of_shipping: number | null
          gross_sales: number | null
          gross_service_sales: number | null
          gross_units: number | null
          net_cogs: number | null
          net_items: number | null
          net_sales: number | null
          net_shipping_returns: number | null
          net_shipping_sales: number | null
          net_units: number | null
          nor_sales: number | null
          order_id: number | null
          return_cogs: number | null
          return_items: number | null
          return_shipping_cost: number | null
          return_shipping_sales: number | null
          return_units: number | null
          returns_refunds_cancels_sales: number | null
          shipping_cost: number | null
          shipping_sales: number | null
          shops: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopifyOrderDetails_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shopifyOrders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopifyOrderDetails_shops_fkey"
            columns: ["shops"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      v_rpc_versions: {
        Row: {
          file_path: string | null
          git_sha: string | null
          modified_at: string | null
          name: string | null
          notes: string | null
          updated_on: string | null
          version: number | null
        }
        Insert: {
          file_path?: string | null
          git_sha?: string | null
          modified_at?: string | null
          name?: string | null
          notes?: string | null
          updated_on?: string | null
          version?: number | null
        }
        Update: {
          file_path?: string | null
          git_sha?: string | null
          modified_at?: string | null
          name?: string | null
          notes?: string | null
          updated_on?: string | null
          version?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bytea_to_text: { Args: { data: string }; Returns: string }
      flag_order_details_status: {
        Args: {
          _is_cancelled: boolean
          _is_refunded: boolean
          _order_id: number
        }
        Returns: undefined
      }
      fn_analyze_counter_performance_by_portfolio: {
        Args: { p_end_date: string; p_shop_id: number; p_start_date: string }
        Returns: {
          acceptance_rate: number
          avg_discount_percent: number
          avg_expected_value: number
          avg_margin_percent: number
          portfolio: string
          total_accepted: number
          total_revenue_cents: number
          total_sent: number
        }[]
      }
      fn_analyze_counter_performance_by_type: {
        Args: { p_end_date: string; p_shop_id: number; p_start_date: string }
        Returns: {
          acceptance_rate: number
          avg_discount_cents: number
          avg_expected_value: number
          avg_margin_percent: number
          counter_type: string
          total_accepted: number
          total_margin_cents: number
          total_rejected: number
          total_revenue_cents: number
          total_sent: number
        }[]
      }
      fn_analyze_counter_performance_by_user: {
        Args: { p_end_date: string; p_shop_id: number; p_start_date: string }
        Returns: {
          acceptance_rate: number
          avg_expected_value: number
          total_accepted: number
          total_margin_cents: number
          total_sent: number
          user_id: number
          user_name: string
        }[]
      }
      fn_calculate_maintained_markup: {
        Args: { p_orderdetails_id: number }
        Returns: undefined
      }
      fn_calculate_shop_portfolios: {
        Args: { p_as_of_date?: string; p_shop_id: number }
        Returns: {
          consumer_id: number
          first_purchase_date: string
          orders_cy: number
          orders_py: number
          portfolio: string
          quintile_cy: number
          quintile_py: number
          sales_cy: number
          sales_py: number
        }[]
      }
      fn_calculate_super_quintiles: {
        Args: { p_as_of_date?: string; p_shop_id: number }
        Returns: {
          consumer_id: number
          orders_cy: number
          orders_py: number
          sales_cy: number
          sales_py: number
          super_quintile_cy: number
          super_quintile_py: number
        }[]
      }
      fn_consumer_12m_install: { Args: never; Returns: undefined }
      fn_consumer_12m_update: { Args: never; Returns: undefined }
      fn_consumer_geolocation: { Args: { p_shop_id: number }; Returns: Json }
      fn_consumer_shop_ltv_recompute: {
        Args: { p_consumers: number; p_shops: number }
        Returns: undefined
      }
      fn_dashboard_sales_summary: { Args: { p_shop_id: number }; Returns: Json }
      fn_ensure_user_profile: { Args: { _email: string }; Returns: undefined }
      fn_myproducts_append_event: {
        Args: {
          p_carts: number
          p_consumers: number
          p_event: Json
          p_handle: string
          p_products: number
          p_shops: number
          p_status: Database["public"]["Enums"]["itemStatus"]
          p_users: string
          p_variant_id: string
          p_variants: number
        }
        Returns: number
      }
      fn_myproducts_recompute_rollups: {
        Args: { p_myproducts_id: number }
        Returns: undefined
      }
      fn_myproducts_upsert_history: {
        Args: {
          p_consumers: number
          p_event: Json
          p_handle?: string
          p_products: number
          p_shopify_variant_id: number
          p_shops: number
          p_status: string
          p_variants: number
        }
        Returns: undefined
      }
      fn_recalculate_order_aggregates: {
        Args: { p_order_id: number }
        Returns: undefined
      }
      fn_save_shop_portfolio_measures: {
        Args: {
          p_as_of_date?: string
          p_period_type?: string
          p_shop_id: number
        }
        Returns: undefined
      }
      fn_save_shop_portfolios: {
        Args: {
          p_as_of_date?: string
          p_period_type?: string
          p_shop_id: number
        }
        Returns: undefined
      }
      fn_set_shop_admin_token: {
        Args: {
          p_access_token: string
          p_scope?: string
          p_shop_domain: string
        }
        Returns: undefined
      }
      fn_shopper_hydrate_new_account: {
        Args: { p_user_id: string }
        Returns: Json
      }
      fn_update_cart_detailed_markups: {
        Args: { cart_id: number }
        Returns: undefined
      }
      fn_update_consumer_shop_ltv: {
        Args: { p_consumer_id?: number; p_shop_id: number }
        Returns: undefined
      }
      fn_update_single_cart_summary: {
        Args: { cart_id: number }
        Returns: undefined
      }
      fn_update_user_profile: {
        Args: {
          _address1: string
          _address2: string
          _city: string
          _country: string
          _display_name: string
          _phone: string
          _postal: string
          _state: string
        }
        Returns: undefined
      }
      "gdpr-consumer-request": { Args: never; Returns: string }
      "gdpr-request-foreign-keys": { Args: never; Returns: string }
      "gdpr-shop-redact": { Args: { shopid: number }; Returns: Json }
      get_all_enum_labels: {
        Args: { enum_schema?: string; enum_types?: string[] }
        Returns: Json
      }
      get_all_enums: {
        Args: { enum_schema?: string; enum_types?: string[] }
        Returns: Json
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "http_request"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_get:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
        SetofOptions: {
          from: "*"
          to: "http_header"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_list_curlopt: {
        Args: never
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_post:
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_reset_curlopt: { Args: never; Returns: boolean }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      jwt_shops_id: { Args: never; Returns: number }
      normalize_email: { Args: { p: string }; Returns: string }
      normalize_phone_us_first: { Args: { p: string }; Returns: string }
      process_offer_allocate_discounts: {
        Args: { p_discount_type?: string; p_offers_id: number }
        Returns: {
          carts_id: number
          discount_cents: number
          updated_lines: number
        }[]
      }
      process_offer_allocate_impact: {
        Args: {
          p_carts_id?: number
          p_discount_cents?: number
          p_discount_scope?: Database["public"]["Enums"]["discountScope"]
          p_offers_id?: number
        }
        Returns: {
          carts_id: number
          discount_cents: number
          discount_scope: Database["public"]["Enums"]["discountScope"]
          offers_id: number
          updated_lines: number
        }[]
      }
      process_offer_enhance_cartitems: {
        Args: { p_cartitems_id: number }
        Returns: undefined
      }
      process_offer_evaluate_offers: {
        Args: { offersid: number }
        Returns: {
          cartsID: number
          consumersID: number
          offersID: number
          programsID: number
          shopsID: number
          status: string
        }[]
      }
      process_offer_finalize_settle: {
        Args: {
          p_carts_id?: number
          p_counter_offers_id?: number
          p_discount_cents?: number
          p_discount_scope?: Database["public"]["Enums"]["discountScope"]
          p_final_price_cents?: number
          p_offers_id?: number
        }
        Returns: {
          carts_id: number
          counter_offers_id: number
          discount_cents: number
          discount_scope: Database["public"]["Enums"]["discountScope"]
          final_price_cents: number
          offers_id: number
          updated_lines: number
        }[]
      }
      process_offer_shopify_discount: {
        Args: { discountsID: number }
        Returns: Json
      }
      process_offer_shopify_response: {
        Args: { discountsID: number; response: Json }
        Returns: undefined
      }
      process_offer_upsert_cartitems: {
        Args: {
          cartsID: number
          consumersID: number
          payload: Json
          shopsID: number
        }
        Returns: {
          inserted: number
          removed: number
          updated: number
        }[]
      }
      process_offer_upsert_carts: {
        Args: { consumersID: number; payload: Json; shopsID: number }
        Returns: {
          cartsID: number
        }[]
      }
      process_offer_upsert_consumers: {
        Args: { payload: Json }
        Returns: {
          consumersID: number
          customerShopifyGID: string
          shopsID: number
        }[]
      }
      process_offer_upsert_discounts: {
        Args: { offersid: number }
        Returns: {
          code: string
          discountsID: number
        }[]
      }
      process_offer_upsert_offers: {
        Args: {
          cartsID: number
          consumersID: number
          payload: Json
          shopsID: number
        }
        Returns: {
          campaignsID: number
          offersID: number
          periodsID: number
          programsID: number
        }[]
      }
      recalculate_order_aggregates: {
        Args: { p_order_id: number }
        Returns: undefined
      }
      reconcile_program_statuses: { Args: never; Returns: undefined }
      rpc_count_shop_offers_current_period: {
        Args: { p_as_of?: string; p_interval?: string; p_shops_id: number }
        Returns: number
      }
      rpc_create_consumer_notification: {
        Args: {
          p_consumers_id: number
          p_counter_offer_id?: number
          p_cta_url?: string
          p_dedupe_key?: string
          p_expires_at?: string
          p_message?: string
          p_offers_id?: number
          p_payload?: Json
          p_shops_id: number
          p_title?: string
          p_type?: string
        }
        Returns: {
          consumers: number
          counterOffers: number | null
          createdAt: string
          ctaUrl: string | null
          dedupeKey: string | null
          expiresAt: string | null
          id: number
          isRead: boolean
          message: string
          offers: number | null
          payload: Json
          readAt: string | null
          shops: number
          title: string
          type: string
        }
        SetofOptions: {
          from: "*"
          to: "consumerNotifications"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rpc_create_shop_counter_offer: {
        Args: {
          p_approved_at?: string
          p_approved_by_user?: number
          p_consumer_response?: string
          p_consumer_response_date?: string
          p_consumers?: number
          p_counter_config?: Json
          p_counter_offer_price: number
          p_counter_reason?: string
          p_counter_status: Database["public"]["Enums"]["counterStatus"]
          p_counter_type: Database["public"]["Enums"]["counterTypes"]
          p_created_by_user?: number
          p_description?: string
          p_discount_percent?: number
          p_earning_period_end?: string
          p_earning_period_start?: string
          p_estimated_margin_cents?: number
          p_estimated_margin_percent?: number
          p_expected_margin_cents?: number
          p_expected_revenue_cents?: number
          p_expiration_date?: string
          p_expiry_minutes?: number
          p_final_amount_cents?: number
          p_firm_discount_cents?: number
          p_headline?: string
          p_internal_notes?: string
          p_item_category_gid?: string
          p_last_change?: Json
          p_margin_impact_cents?: number
          p_offer_status: Database["public"]["Enums"]["offerStatus"]
          p_offers_id: number
          p_original_margin_cents?: number
          p_original_margin_percent?: number
          p_primary_discount_cents?: number
          p_primary_discount_percent?: number
          p_primary_spend_cents?: number
          p_redemption_period_end?: string
          p_redemption_period_start?: string
          p_requires_approval?: boolean
          p_secondary_discount_cents?: number
          p_secondary_discount_percent?: number
          p_secondary_spend_cents?: number
          p_shipping_class?: string
          p_shipping_price_cents?: number
          p_shops_id: number
          p_strategy_rationale?: string
          p_target_audience?: string[]
          p_target_audience_required?: boolean
          p_target_spend_cents?: number
          p_target_variant_gid?: string
          p_threshold_spend_cents?: number
          p_total_discount_cents?: number
        }
        Returns: {
          approvedAt: string | null
          approvedByUser: number | null
          consumerResponse: string | null
          consumerResponseDate: string | null
          consumers: number | null
          counterConfig: Json | null
          counterReason: string | null
          counterStatus: Database["public"]["Enums"]["offerStatus"] | null
          counterType: Database["public"]["Enums"]["counterTypes"] | null
          createDate: string | null
          createdByUser: number | null
          dateSubmitted: string | null
          description: string | null
          discountPercent: number | null
          earningPeriodEnd: string | null
          earningPeriodStart: string | null
          estimatedMargin: number | null
          estimatedMarginPercent: number | null
          expirationDate: string | null
          expiryMinutes: number | null
          finalPrice: number | null
          firmDiscount: number | null
          headline: string | null
          id: number
          internalNotes: string | null
          isActive: boolean
          itemCategoryGID: string | null
          marginImpact: number | null
          modifiedDate: string | null
          offers: number
          orders: number | null
          originalMargin: number | null
          originalMarginPercent: number | null
          redemptionPeriodEnd: string | null
          redemptionPeriodStart: string | null
          requiresApproval: boolean | null
          shippingClass: string | null
          shippingPrice: number | null
          shops: number
          strategyRationale: string | null
          targetAudience: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired: boolean | null
          targetOrderSpend: number | null
          targetUnitPrice: number | null
          targetUnits: number | null
          targetVariantGID: string | null
          tierOneDiscount: number | null
          tierOneDiscountPercent: number | null
          tierTwoDiscount: number | null
          tierTwoDiscountPercent: number | null
          tirggerTierTwoSpend: number | null
          totalDiscount: number | null
          triggerTierOneSpend: number | null
        }
        SetofOptions: {
          from: "*"
          to: "counterOffers"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rpc_debug_rebuild_myproducts_for_consumer: {
        Args: { p_consumers: number; p_reset?: boolean }
        Returns: {
          consumers: number
          deleted_myproducts: number
          upserted_myproducts: number
        }[]
      }
      rpc_debug_seed_myproducts_from_cartitems: {
        Args: { p_consumers: number; p_reset?: boolean }
        Returns: number
      }
      rpc_delete_shop_campaign_cascade: {
        Args: { p_campaign_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_delete_shop_campaign_program: {
        Args: { p_program_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_campaign_latest_program_date: {
        Args: {
          p_campaigns_id: number
          p_exclude_program_id?: number
          p_shops_id: number
        }
        Returns: string
      }
      rpc_get_consumer_notifications: {
        Args: {
          p_consumers_id: number
          p_limit?: number
          p_offset?: number
          p_shops_id: number
          p_unread_only?: boolean
        }
        Returns: {
          consumers: number
          counterOffers: number | null
          createdAt: string
          ctaUrl: string | null
          dedupeKey: string | null
          expiresAt: string | null
          id: number
          isRead: boolean
          message: string
          offers: number | null
          payload: Json
          readAt: string | null
          shops: number
          title: string
          type: string
        }[]
        SetofOptions: {
          from: "*"
          to: "consumerNotifications"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_get_shop_analytics_dashboard: {
        Args: { p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_campaign_edit: {
        Args: { p_campaigns_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_campaigns: { Args: { p_shops_id: number }; Returns: Json[] }
      rpc_get_shop_cart_items: {
        Args: { p_carts_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_carts: {
        Args: {
          p_limit?: number
          p_months_back?: number
          p_page?: number
          p_shops_id: number
          p_statuses?: Database["public"]["Enums"]["cartStatus"][]
        }
        Returns: {
          rows: Json
          total_count: number
        }[]
      }
      rpc_get_shop_counter_offer_analytics: {
        Args: { p_end_date: string; p_shop_id: number; p_start_date: string }
        Returns: Json
      }
      rpc_get_shop_counter_offer_editor_data: {
        Args: {
          p_counter_offer_id?: number
          p_offers_id?: number
          p_shops_id: number
        }
        Returns: Json
      }
      rpc_get_shop_counter_offers: {
        Args: {
          p_limit?: number
          p_months_back?: number
          p_page?: number
          p_shops_id: number
          p_statuses?: Database["public"]["Enums"]["offerStatus"][]
        }
        Returns: {
          rows: Json
          total_count: number
        }[]
      }
      rpc_get_shop_counter_offers_for_offer: {
        Args: { p_offers_id: number; p_shops_id: number }
        Returns: {
          approvedAt: string | null
          approvedByUser: number | null
          consumerResponse: string | null
          consumerResponseDate: string | null
          consumers: number | null
          counterConfig: Json | null
          counterReason: string | null
          counterStatus: Database["public"]["Enums"]["offerStatus"] | null
          counterType: Database["public"]["Enums"]["counterTypes"] | null
          createDate: string | null
          createdByUser: number | null
          dateSubmitted: string | null
          description: string | null
          discountPercent: number | null
          earningPeriodEnd: string | null
          earningPeriodStart: string | null
          estimatedMargin: number | null
          estimatedMarginPercent: number | null
          expirationDate: string | null
          expiryMinutes: number | null
          finalPrice: number | null
          firmDiscount: number | null
          headline: string | null
          id: number
          internalNotes: string | null
          isActive: boolean
          itemCategoryGID: string | null
          marginImpact: number | null
          modifiedDate: string | null
          offers: number
          orders: number | null
          originalMargin: number | null
          originalMarginPercent: number | null
          redemptionPeriodEnd: string | null
          redemptionPeriodStart: string | null
          requiresApproval: boolean | null
          shippingClass: string | null
          shippingPrice: number | null
          shops: number
          strategyRationale: string | null
          targetAudience: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired: boolean | null
          targetOrderSpend: number | null
          targetUnitPrice: number | null
          targetUnits: number | null
          targetVariantGID: string | null
          tierOneDiscount: number | null
          tierOneDiscountPercent: number | null
          tierTwoDiscount: number | null
          tierTwoDiscountPercent: number | null
          tirggerTierTwoSpend: number | null
          totalDiscount: number | null
          triggerTierOneSpend: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "counterOffers"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_get_shop_counter_templates: {
        Args: { p_shops_id: number }
        Returns: {
          accepted: number | null
          acceptRate: number | null
          autoApply: boolean | null
          category: string | null
          config: Json
          createDate: string | null
          createdByUser: number | null
          description: string | null
          headline: string | null
          id: number
          isActive: boolean | null
          isDefault: boolean | null
          isFinal: boolean | null
          maxCartValueCents: number | null
          maxDiscountPercent: number | null
          message: string | null
          minCartValueCents: number | null
          minMarginPercent: number | null
          modifiedDate: string | null
          name: string
          requiresApproval: boolean | null
          shops: number
          target: string[] | null
          targetPortfolios: string[] | null
          type: string
          usage: number | null
          validFrom: string | null
          validUntil: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "counterTemplates"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_get_shop_dashboard: { Args: { p_shops_id: number }; Returns: Json }
      rpc_get_shop_dashboard_metrics: {
        Args: { p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_latest_campaign_date: {
        Args: { p_exclude_campaign_id?: number; p_shops_id: number }
        Returns: string
      }
      rpc_get_shop_offers: {
        Args: {
          p_limit?: number
          p_months_back?: number
          p_page?: number
          p_shops_id: number
          p_statuses?: Database["public"]["Enums"]["offerStatus"][]
        }
        Returns: {
          rows: Json
          total_count: number
        }[]
      }
      rpc_get_shop_offers_by_status: {
        Args: {
          p_limit?: number
          p_months_back?: number
          p_page?: number
          p_shops_id: number
          p_statuses?: Database["public"]["Enums"]["offerStatus"][]
        }
        Returns: {
          rows: Json
          total_count: number
        }[]
      }
      rpc_get_shop_portfolio_metrics: {
        Args: { p_asof_date?: string; p_period?: string; p_shops_id: number }
        Returns: {
          aov_cy: number
          aov_py: number
          gross_profit_cy: number
          gross_profit_py: number
          portfolio_name: string
          portfolio_slug: string
          time_between_orders_cy: number
          time_between_orders_py: number
          yoy_aov_pct: number
          yoy_gross_profit_pct: number
          yoy_tbo_pct: number
        }[]
      }
      rpc_get_shop_product_variants: {
        Args: {
          p_before_created_at?: string
          p_before_id?: number
          p_limit?: number
          p_months_back?: number
          p_page?: number
          p_shops_id: number
        }
        Returns: Json
      }
      rpc_get_shop_programs: { Args: { p_shops_id: number }; Returns: Json[] }
      rpc_get_shop_single_campaign: {
        Args: { p_campaigns_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_single_cart: {
        Args: { p_carts_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_single_counter_offer: {
        Args: { p_counter_offer_id: number; p_shop_id: number }
        Returns: Json
      }
      rpc_get_shop_single_offer: {
        Args: { p_offers_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_shop_single_program: {
        Args: { p_program_id: number; p_shops_id: number }
        Returns: Json
      }
      rpc_get_variant_pricing_for_publish: {
        Args: { p_pricing_id: number; p_shops_id: number }
        Returns: {
          allowanceDiscounts: number | null
          allowanceFinance: number | null
          allowanceShipping: number | null
          allowanceShrink: number | null
          allowDiscountPercent: number | null
          allowShippingPercent: number | null
          allowShrinkPercent: number | null
          approvedByUser: number | null
          builderPrice: number | null
          createDate: string | null
          createdByUser: number | null
          createdByUserName: string | null
          currency: string | null
          id: number
          isPublished: boolean | null
          itemCost: number | null
          marketAdjustment: number | null
          marketAdjustmentType:
            | Database["public"]["Enums"]["market_adjustment_type"]
            | null
          modifiedDate: string
          notes: string | null
          priceBuilder: Json | null
          productID: string
          profitMarkup: number | null
          profitMarkupPercent: number | null
          publishedDate: string | null
          publishedEndDate: string | null
          publishedPrice: number | null
          shops: number
          source: string | null
          updatedBy: string | null
          variantID: string
          variantOpex: number | null
          variantOpexPercent: number | null
          variants: number
          version: number | null
        }
        SetofOptions: {
          from: "*"
          to: "variantPricing"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rpc_initial_installation_queue: {
        Args: { _shops: number }
        Returns: undefined
      }
      rpc_mark_consumer_notification_read: {
        Args: {
          p_consumers_id: number
          p_notification_id: number
          p_shops_id: number
        }
        Returns: {
          consumers: number
          counterOffers: number | null
          createdAt: string
          ctaUrl: string | null
          dedupeKey: string | null
          expiresAt: string | null
          id: number
          isRead: boolean
          message: string
          offers: number | null
          payload: Json
          readAt: string | null
          shops: number
          title: string
          type: string
        }
        SetofOptions: {
          from: "*"
          to: "consumerNotifications"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rpc_mark_variant_price_published: {
        Args: {
          p_pricing_id: number
          p_published_price: number
          p_shops_id: number
          p_user_id?: number
        }
        Returns: undefined
      }
      rpc_pricebuilder_get_variant: {
        Args: { p_shops_id: number; p_variants_id: number }
        Returns: {
          allowance_discounts: number
          allowance_finance: number
          allowance_shipping: number
          allowance_shrink: number
          builder_price: number
          inventory_level: number
          item_cost: number
          market_adjustment: number
          pricing_id: number
          pricing_item_cost: number
          pricing_notes: string
          product_name: string
          profit_markup: number
          shopify_price: number
          variant_gid: string
          variant_id: number
          variant_name: string
          variant_product_id: string
          variant_products_id: number
          variant_shopify_id: string
          variant_sku: string
        }[]
      }
      rpc_refresh_program_metrics: {
        Args: { p_shops_id?: number }
        Returns: undefined
      }
      rpc_shop_enqueue_sync_jobs: {
        Args: { _job_types?: string[]; _shops: number }
        Returns: number
      }
      rpc_shop_install_sync_status: {
        Args: { _shops: number }
        Returns: {
          cataloglastsyncat: string
          catalogstatus: Database["public"]["Enums"]["syncJobStatus"]
          consumerslastsyncat: string
          consumersstatus: Database["public"]["Enums"]["syncJobStatus"]
          lasterror: string
          latestcatalogjobqueued: string
          latestcatalogjobstatus: Database["public"]["Enums"]["syncJobStatus"]
          latestordersjobqueued: string
          latestordersjobstatus: Database["public"]["Enums"]["syncJobStatus"]
          maxhistorymonths: number
          ordersbackfillmonths: number
          orderslastsyncat: string
          ordersprocessedcount: number
          ordersstatus: Database["public"]["Enums"]["syncJobStatus"]
          shops: number
          totalorderstoprocess: number
          webhookslastsyncat: string
          webhooksstatus: Database["public"]["Enums"]["syncJobStatus"]
        }[]
      }
      rpc_shop_run_next_job: { Args: { p_shops_id: number }; Returns: boolean }
      rpc_shop_sync_customers: {
        Args: { _rows: Json; _shops: number }
        Returns: {
          inserted: number
          linked: number
          processed: number
          skipped: number
          updated: number
        }[]
      }
      rpc_shop_sync_info: {
        Args: { _shop: Json; _shops: number }
        Returns: undefined
      }
      rpc_shop_sync_products: {
        Args: { _rows: Json; _shops: number }
        Returns: {
          inserted: number
          processed: number
          skipped: number
          updated: number
        }[]
      }
      rpc_shop_sync_variants: {
        Args: { _rows: Json; _shops: number }
        Returns: {
          inserted: number
          linked_products: number
          processed: number
          skipped: number
          updated: number
        }[]
      }
      rpc_shopify_shop_consumer_redact: {
        Args: {
          p_customer_email: string
          p_customer_gid: string
          p_received_at?: string
          p_shop_domain: string
          p_shop_id: string
        }
        Returns: number
      }
      rpc_shopify_shop_consumer_request: {
        Args: {
          p_customer_email: string
          p_customer_gid: string
          p_received_at?: string
          p_shop_domain: string
          p_shop_id: string
        }
        Returns: number
      }
      rpc_shopify_shop_scopes_update: {
        Args: {
          p_current_scopes: string[]
          p_shop_domain: string
          p_updated_at?: string
        }
        Returns: number
      }
      rpc_shopper_archive_offers: {
        Args: { p_offer_ids: number[] }
        Returns: {
          archived_count: number
        }[]
      }
      rpc_shopper_consumer_cart_detail: {
        Args: { p_carts_id: number }
        Returns: {
          cartComposition: string
          cartitemsID: number
          cartsID: number
          cartStatus: Database["public"]["Enums"]["cartStatus"]
          cartToken: string
          consumersID: number
          createdAt: string
          createDate: string
          currency: string
          discountCents: number
          imageURL: string
          itemCount: number
          lineDiscount: number
          lineSellingSubtotal: number
          lineSettleSubtotal: number
          modifiedDate: string
          name: string
          offersID: number
          productGID: string
          productID: string
          productImageURL: string
          productName: string
          productsID: number
          productURL: string
          shopsID: number
          sku: string
          status: Database["public"]["Enums"]["itemStatus"]
          subtotalCents: number
          template: string
          totalCents: number
          unitCount: number
          unitDiscount: number
          unitOfferPrice: number
          unitPrice: number
          unitQuantity: number
          unitSettlePrice: number
          updatedAt: string
          variantGID: string
          variantID: string
          variantsID: number
        }[]
      }
      rpc_shopper_consumer_cart_summaries: {
        Args: never
        Returns: {
          cartComposition: string
          cartsID: number
          cartStatus: Database["public"]["Enums"]["cartStatus"]
          cartToken: string
          consumersID: number
          createDate: string
          currency: string
          discountCents: number
          itemCount: number
          modifiedDate: string
          offersID: number
          shopsID: number
          subtotalCents: number
          totalCents: number
          unitCount: number
        }[]
      }
      rpc_shopper_consumer_shops: {
        Args: never
        Returns: {
          brandLogo: string
          brandName: string
          cartsCount: number
          firstOfferDate: string
          lastOfferDate: string
          longDescription: string
          offersCount: number
          ordersCount: number
          privacyUrl: string
          shopsID: number
          shortDescription: string
          storeUrl: string
          termsUrl: string
        }[]
      }
      rpc_shopper_consumer_sync: {
        Args: { _phone_hint?: string }
        Returns: {
          attached_consumer_id: number
          needs_phone: boolean
          needs_resolution: boolean
          synced: boolean
        }[]
      }
      rpc_shopper_contact_detail: {
        Args: { p_contact_id: number }
        Returns: {
          anniversary: string
          birthday: string
          contactsID: number
          createDate: string
          email: string
          firstName: string
          fullAddress: string
          lastName: string
          nickname: string
          notes: string
          phone: string
          relationship: string
          updateDate: string
          usersID: string
        }[]
      }
      rpc_shopper_contact_list: {
        Args: never
        Returns: {
          first_name: string
          id: number
          last_name: string
          next_event_date: string
          next_event_label: string
          nickname: string
          primary_email: string
          primary_phone: string
          relationship: string
        }[]
      }
      rpc_shopper_create_profile: { Args: { p_user_id: string }; Returns: Json }
      rpc_shopper_delete_myprofile: { Args: never; Returns: undefined }
      rpc_shopper_delete_profile: {
        Args: { p_soft_delete?: boolean; p_user_id: string }
        Returns: Json
      }
      rpc_shopper_get_carts: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          cart_item_count: number
          cart_total_price: number
          created_at: string
          id: number
          shop: Json
          shops: number
          status: string
        }[]
      }
      rpc_shopper_get_circle_list: {
        Args: never
        Returns: {
          addresses: Json | null
          created_at: string
          createDate: string | null
          displayName: string | null
          emails: Json | null
          events: Json | null
          firstName: string | null
          household: Json | null
          id: number
          lastName: string | null
          middleName: string | null
          modifiedDate: string | null
          nickname: string | null
          notes: string | null
          phones: Json | null
          relationship: Database["public"]["Enums"]["relationshipType"] | null
          users: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "myCircle"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_shopper_get_circle_member_detail: {
        Args: { p_member_id: number }
        Returns: Json
      }
      rpc_shopper_get_consumers: {
        Args: { p_user_email: string; p_user_id?: string; p_user_phone: string }
        Returns: Json
      }
      rpc_shopper_get_me: {
        Args: never
        Returns: {
          accountType: string
          consumersID: number
          displayName: string
          firstName: string
          lastName: string
          planName: string
          usersID: string
        }[]
      }
      rpc_shopper_get_my_products: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          heroImageUrl: string
          lastPurchaseDate: string
          modifiedDate: string
          myProductsID: number
          productHandle: string
          productHistory: Json
          productName: string
          productsID: number
          shopDomain: string
          shopName: string
          shopsID: number
          status: string
          totalPriceCents: number
          totalQuantity: number
          variantID: string
          variantName: string
          variantsID: number
          variantSKU: string
        }[]
      }
      rpc_shopper_get_offer_detail: {
        Args: { p_offer_id: number }
        Returns: {
          cartsID: number
          cartTotalPriceCents: number
          checkoutToken: string
          createDate: string
          hasCounter: boolean
          itemId: number
          itemsCount: number
          latestCounterCreateDate: string
          latestCounterExpirationDate: string
          latestCounterFinalPriceCents: number
          latestCounterHeadline: string
          latestCounterId: number
          latestCounterReason: string
          latestCounterRequiresAction: boolean
          latestCounterStatus: string
          lineSettleSubtotalCents: number
          offerDiscountPriceCents: number
          offerPriceCents: number
          offersID: number
          offerUnitPriceCents: number
          productID: string
          productImageUrl: string
          productName: string
          productUrl: string
          quantity: number
          sellerLineSubtotalCents: number
          sellerUnitPriceCents: number
          shopCustomerEmail: string
          shopDomain: string
          shopLogo: string
          shopName: string
          shopsID: number
          sku: string
          status: string
          unitsSum: number
          variantID: string
          variantImageUrl: string
          variantName: string
        }[]
      }
      rpc_shopper_get_offers: {
        Args: { p_limit?: number; p_offset?: number; p_statuses?: string[] }
        Returns: {
          cartTotalPrice: number
          checkoutToken: string
          counterCreateDate: string
          counterExpiresDate: string
          counterRequiresAction: boolean
          counterStatus: string
          createDate: string
          hasCounter: boolean
          itemsCount: number
          modifiedDate: string
          offerApprovedPrice: number
          offerDiscountPrice: number
          offerPrice: number
          offersID: number
          shopLogo: string
          shopName: string
          shopsID: number
          status: string
          unitsSum: number
        }[]
      }
      rpc_shopper_get_order_detail: {
        Args: { p_order_id: number }
        Returns: {
          financialStatus: string
          fulfillmentStatus: string
          itemId: number
          itemsCount: number
          lineSubtotalCents: number
          modifiedDate: string
          orderDate: string
          ordersID: number
          productGID: string
          productName: string
          productsID: number
          quantity: number
          settledTotalPriceCents: number
          settledUnitPriceCents: number
          shopDomain: string
          shopLogo: string
          shopName: string
          shopsID: number
          sku: string
          unitsSum: number
          variantGID: string
          variantsID: number
        }[]
      }
      rpc_shopper_get_orders: {
        Args: { p_limit?: number; p_offset?: number; p_statuses?: string[] }
        Returns: {
          financialStatus: string
          fulfillmentStatus: string
          itemsCount: number
          modifiedDate: string
          orderDate: string
          ordersID: number
          settledTotalPriceCents: number
          shopLogo: string
          shopName: string
          shopsID: number
          unitsSum: number
        }[]
      }
      rpc_shopper_get_places: {
        Args: never
        Returns: {
          addressLabel: string | null
          addressType: Database["public"]["Enums"]["addressType"] | null
          city: string | null
          contactEmail: string | null
          contactPhone: string | null
          created_at: string
          createDate: string | null
          createdBy: string | null
          displayName: string | null
          geoAddress: Json | null
          id: number
          isDefault: boolean | null
          isValidated: boolean | null
          lastUsedDate: string | null
          modifiedDate: string | null
          myCircle: number | null
          postalCode: string | null
          province: string | null
          state: string | null
          streetName: string | null
          streetNumber: string | null
          users: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "myPlaces"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_shopper_get_profile: { Args: { p_user_id?: string }; Returns: Json }
      rpc_shopper_get_watchlist: {
        Args: never
        Returns: {
          brandName: string
          capabilities: Json
          createDate: string
          isActive: boolean
          lastInventory: number
          lastPriceCents: number
          modifiedDate: string
          myProductsID: number
          myWatchListID: number
          productID: string
          productImageURL: string
          productName: string
          productPageURL: string
          repurchaseDate: string
          repurchaseDays: number
          shopDomain: string
          shopsID: number
          source: Database["public"]["Enums"]["watchListSource"]
          targetPriceCents: number
          trackInventory: boolean
          trackPrice: boolean
          variantID: string
          variantImageURL: string
          variantName: string
        }[]
      }
      rpc_shopper_request_verification: {
        Args: {
          p_consumer_id: number
          p_contact_value: string
          p_user_id: string
          p_verification_type: string
        }
        Returns: Json
      }
      rpc_shopper_signup_sync_flow: {
        Args: {
          p_auth_user_id: string
          p_email: string
          p_first_name?: string
          p_last_name?: string
          p_phone: string
        }
        Returns: {
          address1: string | null
          address2: string | null
          avatarUrl: string | null
          city: string | null
          consumers: number | null
          country: string | null
          createDate: string | null
          displayName: string | null
          email: string
          firstName: string | null
          id: string
          lastName: string | null
          modifiedDate: string | null
          phone: string | null
          postalCode: string | null
          role: string | null
          state: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "users"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_shopper_sync_consumers: {
        Args: { p_email: string; p_phone: string }
        Returns: Json
      }
      rpc_shopper_update_profile_v3: { Args: { p_params: Json }; Returns: Json }
      rpc_shopper_upsert_circle_member: {
        Args: { p_params: Json }
        Returns: Json
      }
      rpc_shopper_upsert_my_watchlist: {
        Args: {
          p_action: string
          p_product_id: string
          p_product_image_url?: string
          p_product_page_url?: string
          p_shop_domain?: string
          p_shops: number
          p_target_price_cents?: number
          p_track_inventory?: boolean
          p_track_price?: boolean
          p_variant_id: string
          p_variant_image_url?: string
        }
        Returns: {
          action: string
          isActive: boolean
          myWatchListID: number
        }[]
      }
      rpc_shopper_upsert_myproducts_flags: {
        Args: {
          p_is_favorite?: boolean
          p_is_watch_list?: boolean
          p_my_products_id: number
        }
        Returns: {
          isFavorite: boolean
          isWatchList: boolean
          modifiedDate: string
          myProductsID: number
          watchListStart: string
        }[]
      }
      rpc_shopper_upsert_place: { Args: { p_params: Json }; Returns: Json }
      rpc_shopper_verify_and_link: {
        Args: { p_code: string; p_consumer_id: number; p_user_id: string }
        Returns: Json
      }
      rpc_update_shop_counter_offer: {
        Args: { p_counter_offer_id: number; p_shops_id: number; p_update: Json }
        Returns: {
          approvedAt: string | null
          approvedByUser: number | null
          consumerResponse: string | null
          consumerResponseDate: string | null
          consumers: number | null
          counterConfig: Json | null
          counterReason: string | null
          counterStatus: Database["public"]["Enums"]["offerStatus"] | null
          counterType: Database["public"]["Enums"]["counterTypes"] | null
          createDate: string | null
          createdByUser: number | null
          dateSubmitted: string | null
          description: string | null
          discountPercent: number | null
          earningPeriodEnd: string | null
          earningPeriodStart: string | null
          estimatedMargin: number | null
          estimatedMarginPercent: number | null
          expirationDate: string | null
          expiryMinutes: number | null
          finalPrice: number | null
          firmDiscount: number | null
          headline: string | null
          id: number
          internalNotes: string | null
          isActive: boolean
          itemCategoryGID: string | null
          marginImpact: number | null
          modifiedDate: string | null
          offers: number
          orders: number | null
          originalMargin: number | null
          originalMarginPercent: number | null
          redemptionPeriodEnd: string | null
          redemptionPeriodStart: string | null
          requiresApproval: boolean | null
          shippingClass: string | null
          shippingPrice: number | null
          shops: number
          strategyRationale: string | null
          targetAudience: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired: boolean | null
          targetOrderSpend: number | null
          targetUnitPrice: number | null
          targetUnits: number | null
          targetVariantGID: string | null
          tierOneDiscount: number | null
          tierOneDiscountPercent: number | null
          tierTwoDiscount: number | null
          tierTwoDiscountPercent: number | null
          tirggerTierTwoSpend: number | null
          totalDiscount: number | null
          triggerTierOneSpend: number | null
        }
        SetofOptions: {
          from: "*"
          to: "counterOffers"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rpc_update_variant_price_published: {
        Args: {
          p_pricing_id: number
          p_published_price: number
          p_shops_id: number
          p_user_id?: number
        }
        Returns: undefined
      }
      rpc_upsert_shop_counter_offer: {
        Args: {
          p_confidence_score: number
          p_counter_config: Json
          p_counter_offer_price: number
          p_counter_templates_id?: number
          p_counter_type: string
          p_created_by_user: number
          p_description: string
          p_estimated_margin_cents: number
          p_estimated_margin_percent: number
          p_expected_margin_cents: number
          p_expected_revenue_cents: number
          p_expected_value_score: number
          p_expires_at?: string
          p_headline: string
          p_internal_notes?: string
          p_margin_impact_cents: number
          p_offers_id: number
          p_original_margin_cents: number
          p_original_margin_percent: number
          p_predicted_acceptance_probability: number
          p_prediction_factors: Json
          p_reason?: string
          p_requires_approval?: boolean
          p_shops_id: number
          p_strategy_rationale?: string
          p_total_discount_cents: number
        }
        Returns: {
          approvedAt: string | null
          approvedByUser: number | null
          consumerResponse: string | null
          consumerResponseDate: string | null
          consumers: number | null
          counterConfig: Json | null
          counterReason: string | null
          counterStatus: Database["public"]["Enums"]["offerStatus"] | null
          counterType: Database["public"]["Enums"]["counterTypes"] | null
          createDate: string | null
          createdByUser: number | null
          dateSubmitted: string | null
          description: string | null
          discountPercent: number | null
          earningPeriodEnd: string | null
          earningPeriodStart: string | null
          estimatedMargin: number | null
          estimatedMarginPercent: number | null
          expirationDate: string | null
          expiryMinutes: number | null
          finalPrice: number | null
          firmDiscount: number | null
          headline: string | null
          id: number
          internalNotes: string | null
          isActive: boolean
          itemCategoryGID: string | null
          marginImpact: number | null
          modifiedDate: string | null
          offers: number
          orders: number | null
          originalMargin: number | null
          originalMarginPercent: number | null
          redemptionPeriodEnd: string | null
          redemptionPeriodStart: string | null
          requiresApproval: boolean | null
          shippingClass: string | null
          shippingPrice: number | null
          shops: number
          strategyRationale: string | null
          targetAudience: Database["public"]["Enums"]["portfolioName"][] | null
          targetAudienceRequired: boolean | null
          targetOrderSpend: number | null
          targetUnitPrice: number | null
          targetUnits: number | null
          targetVariantGID: string | null
          tierOneDiscount: number | null
          tierOneDiscountPercent: number | null
          tierTwoDiscount: number | null
          tierTwoDiscountPercent: number | null
          tirggerTierTwoSpend: number | null
          totalDiscount: number | null
          triggerTierOneSpend: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "counterOffers"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_upsert_shop_counter_offer_forecast: {
        Args: { p_counter_offer_id?: number; p_input: Json; p_shops_id: number }
        Returns: Json
      }
      rpc_upsert_shop_counter_templates: {
        Args: {
          p_accept_rate?: number
          p_accepted?: number
          p_config: Json
          p_counter_type: string
          p_description?: string
          p_focus?: string
          p_is_active?: boolean
          p_name: string
          p_shops_id: number
          p_usage?: number
        }
        Returns: {
          accepted: number | null
          acceptRate: number | null
          autoApply: boolean | null
          category: string | null
          config: Json
          createDate: string | null
          createdByUser: number | null
          description: string | null
          headline: string | null
          id: number
          isActive: boolean | null
          isDefault: boolean | null
          isFinal: boolean | null
          maxCartValueCents: number | null
          maxDiscountPercent: number | null
          message: string | null
          minCartValueCents: number | null
          minMarginPercent: number | null
          modifiedDate: string | null
          name: string
          requiresApproval: boolean | null
          shops: number
          target: string[] | null
          targetPortfolios: string[] | null
          type: string
          usage: number | null
          validFrom: string | null
          validUntil: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "counterTemplates"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      rpc_upsert_shop_program: {
        Args: {
          p_accept_rate?: number
          p_code_prefix?: string
          p_combine_order_discounts?: boolean
          p_combine_product_discounts?: boolean
          p_combine_shipping_discounts?: boolean
          p_created_by_user?: number
          p_created_by_user_name?: string
          p_decline_rate?: number
          p_description?: string
          p_end_date?: string
          p_expiry_minutes?: number
          p_focus?: Database["public"]["Enums"]["programFocus"]
          p_goal_metric?: string
          p_goal_type?: string
          p_goal_value?: number
          p_is_default?: boolean
          p_name: string
          p_program_id?: number
          p_shops_id: number
          p_start_date?: string
          p_status?: Database["public"]["Enums"]["programStatus"]
        }
        Returns: {
          acceptRate: number
          codePrefix: string | null
          combineOrderDiscounts: boolean
          combineProductDiscounts: boolean
          combineShippingDiscounts: boolean
          created_at: string
          createDate: string | null
          createdBy: string | null
          createdByUser: number | null
          createdByUserName: string | null
          declineRate: number
          description: string | null
          discountPrefix: string | null
          endDate: string | null
          expiryMinutes: number
          focus: Database["public"]["Enums"]["programFocus"] | null
          goals: Database["public"]["Enums"]["goalType"][] | null
          id: number
          isActive: boolean
          isDefault: boolean
          modifiedDate: string | null
          name: string | null
          shops: number | null
          startDate: string | null
          status: Database["public"]["Enums"]["programStatus"]
          usageCount: number | null
        }
        SetofOptions: {
          from: "*"
          to: "programs"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rpc_upsert_shop_saved_variant_prices: {
        Args: { p_payload?: Json; p_shops_id: number }
        Returns: Json
      }
      rpc_upsert_shop_single_variant_price: {
        Args: {
          p_allowance_discounts: number
          p_allowance_finance?: number
          p_allowance_shipping?: number
          p_allowance_shrink?: number
          p_builder_price?: number
          p_created_by_user?: number
          p_created_by_user_name?: string
          p_item_cost?: number
          p_market_adjustment?: number
          p_notes?: string
          p_price_builder?: Json
          p_product_id: string
          p_profit_markup?: number
          p_published?: boolean
          p_published_date?: string
          p_published_price?: number
          p_shops: number
          p_variant_id: string
          p_variants: number
        }
        Returns: number
      }
      rpc_upsert_shopify_order_details: {
        Args: { _order_id: number; _payload?: Json; _shops_id: number }
        Returns: number
      }
      rpc_webhook_uninstall_shop: {
        Args: { _shop_domain: string; _shops_id: number }
        Returns: boolean
      }
      rpc_whoo_upsert_shop_variants: {
        Args: {
          p_inventoryItemID: number
          p_isActive: boolean
          p_price: number
          p_productID: number
          p_shopsID: number
          p_sku: string
          p_unitCost: number
          p_variantGID: string
          p_variantID: number
          p_variantJSON: Json
        }
        Returns: undefined
      }
      rpc_whook_delete_shop_products: {
        Args: { p_productID: number; p_shopsID: number }
        Returns: undefined
      }
      rpc_whook_delete_shop_variants: {
        Args: { p_shopsID: number; p_variantID: number }
        Returns: undefined
      }
      rpc_whook_delete_shop_variants_by_product: {
        Args: { p_productID: number; p_shopsID: number }
        Returns: undefined
      }
      rpc_whook_finalize_fulfilled_order: {
        Args: { _payload?: Json; _shopify_order_id: number; _shops_id: number }
        Returns: Json
      }
      rpc_whook_ingest_shopify_checkout: {
        Args: { _payload: Json; _shop_domain: string; _shops_id: number }
        Returns: string
      }
      rpc_whook_ingest_shopify_order: {
        Args: { _payload: Json; _shops_id: number }
        Returns: number
      }
      rpc_whook_log_webhook_event: {
        Args: {
          _error?: string
          _hmac?: string
          _ok?: boolean
          _payload: Json
          _request_id?: string
          _resource_id: string
          _shop_domain: string
          _shops_id: number
          _topic: string
        }
        Returns: number
      }
      rpc_whook_shop_inventory_items: {
        Args: {
          p_inventoryItemGID: string
          p_inventoryItemID: number
          p_itemJSON: Json
          p_requiresShipping: boolean
          p_shopsID: number
          p_sku: string
          p_tracked: boolean
          p_unitCost: number
          p_weightUnit: string
          p_weightValue: number
        }
        Returns: undefined
      }
      rpc_whook_shop_inventory_levels: {
        Args: {
          p_available: number
          p_inventoryItemID: number
          p_itemJSON: Json
          p_locationID: number
          p_locationJSON: Json
          p_locationName: string
          p_shopsID: number
        }
        Returns: undefined
      }
      rpc_whook_shopify_shop_redact: {
        Args: {
          p_received_at?: string
          p_shop_domain: string
          p_shop_id: string
        }
        Returns: number
      }
      rpc_whook_uninstall_shop: {
        Args: { _shop_domain: string; _shops_id: number }
        Returns: boolean
      }
      rpc_whook_upsert_app_subscription: {
        Args: {
          _payload: Json
          _shop_domain: string
          _status_override?: string
        }
        Returns: {
          is_active_subscription: boolean
          plan_id: number
          plan_slug: string
          previous_plan_id: number
          previous_plan_slug: string
          shops_id: number
          status: string
          subscription_id: number
        }[]
      }
      rpc_whook_upsert_shop_products: {
        Args: {
          p_productGID: string
          p_productHandle?: string
          p_productID: number
          p_productImageURL?: string
          p_productJSON: Json
          p_productType: string
          p_publishedAt: string
          p_shopsID: number
          p_status: string
          p_title: string
          p_vendor: string
        }
        Returns: undefined
      }
      rpc_whook_upsert_shop_variants: {
        Args: {
          p_displayName: string
          p_imageUrl: string
          p_inventoryItemID: number
          p_inventoryQuantity: number
          p_isActive: boolean
          p_price: number
          p_productID: number
          p_shopsID: number
          p_sku: string
          p_unitCost: number
          p_variantGID: string
          p_variantID: number
          p_variantJSON: Json
          p_variantName: string
          p_weight: number
          p_weightUnit: string
        }
        Returns: undefined
      }
      safe_num: { Args: { txt: string }; Returns: number }
      safe_num_to_cents: { Args: { txt: string }; Returns: number }
      safe_ts: { Args: { txt: string }; Returns: string }
      text_to_bytea: { Args: { data: string }; Returns: string }
      urlencode:
        | { Args: { data: Json }; Returns: string }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
      write_pixel_events_batch: {
        Args: { p_events: Json; p_shops_id: number }
        Returns: undefined
      }
    }
    Enums: {
      addressType:
        | "Home"
        | "Work"
        | "Vacation"
        | "Other"
        | "Restaurant"
        | "Park"
        | "Event Venue"
        | "Sports Arena"
        | "School"
        | "Church"
      campaignFocus:
        | "New Collection"
        | "New Category"
        | "New Products"
        | "New Services"
        | "Holiday"
        | "Event"
      campaignStatus:
        | "Draft"
        | "Pending"
        | "Active"
        | "Paused"
        | "Completed"
        | "Archived"
        | "Cancelled"
      cartStatus:
        | "Abandoned"
        | "Offered"
        | "Checkout"
        | "Expired"
        | "Closed-Won"
        | "Closed-Lost"
        | "Archived"
      commercePlatform:
        | "Shopify"
        | "WooCommerce"
        | "BigCommerce"
        | "Magento"
        | "Commerce Cloud"
        | "Squarespace"
      consumerDeclineReasons:
        | "Price Too High"
        | "Options Not Available"
        | "Just Browsing"
        | "Not Ready To Buy"
        | "Does Not Meet My Needs"
        | "Other"
      contactEventType:
        | "Birthday"
        | "Anniversary"
        | "Graduation"
        | "Holiday"
        | "Other"
      counterStatus:
        | "Reviewed Countered"
        | "Consumer Accepted"
        | "Consumer Declined"
        | "Consumer Countered"
        | "Counter Accepted Expired"
        | "Countered Withdrawn"
        | "Accepted Consumer Counter"
        | "Declined Consumer Counter"
        | "Approval Required"
      counterTypes:
        | "bounceback_current"
        | "bounceback_future"
        | "bounceback_category"
        | "bogo"
        | "order_discount_percent"
        | "order_discount_firm"
        | "item_discount_percent"
        | "item_discount_firm"
        | "category_discount_percent"
        | "category_discount_firm"
        | "channel_discount_percent"
        | "channel_discount_firm"
        | "subscription_discount_percent"
        | "subscription_discount_firm"
        | "target_bundles"
        | "service_products"
        | "rewards_program"
        | "membership_fee"
        | "financing_offers"
        | "two_threshold_offers"
        | "recommended_product"
      currencyCode:
        | "USD"
        | "EUR"
        | "GBP"
        | "JPY"
        | "CAD"
        | "AUD"
        | "CHF"
        | "CNY"
        | "HKD"
        | "NZD"
        | "SEK"
        | "KRW"
        | "SGD"
        | "NOK"
        | "MXN"
        | "INR"
        | "RUB"
        | "ZAR"
        | "TRY"
        | "BRL"
        | "TWD"
        | "DKK"
        | "PLN"
        | "THB"
        | "IDR"
        | "HUF"
        | "CZK"
        | "ILS"
        | "CLP"
        | "PHP"
        | "AED"
        | "COP"
        | "SAR"
        | "MYR"
        | "RON"
      discountScope:
        | "Cart"
        | "Item"
        | "Bundle"
        | "Shipping"
        | "Cart + Shipping"
        | "Item + Shipping"
        | "Bundle + Shipping"
      discountStatus: "Active" | "Claimed" | "Cancelled" | "Expired - Not Used"
      discountType: "Order" | "Shipping" | "Product"
      emailType: "Personal" | "Work" | "Other"
      goalMetric:
        | "Consumers"
        | "Orders"
        | "Units"
        | "Bundles"
        | "Items"
        | "Dollars"
        | "Percent"
      goalType:
        | "Gross Margin"
        | "Maintained Markup"
        | "Average Order Value"
        | "New Customers"
        | "Reactivate Customers"
        | "Increase LTV"
        | "Conversion Rate"
        | "Category Sell Through"
        | "Unit Volume"
        | "Transaction Volume"
        | "Other"
      itemChangeType:
        | "Quantity Change"
        | "Price Change"
        | "Variant Change"
        | "Allocation Change"
      itemStatus:
        | "In Cart"
        | "Inactive"
        | "Removed"
        | "Sold"
        | "Returned"
        | "Refunded"
        | "Cancelled"
        | "Shipped"
      market_adjustment_type:
        | "nearest_99_cents"
        | "nearest_nine_dollars_99_cents"
        | "nearest_nine_dollars"
        | "none"
      myProductStatus:
        | "offered"
        | "checkout"
        | "ordered"
        | "fulfilled"
        | "archived"
      offerOrigin:
        | "Storefront Offer"
        | "Storefront Re-Offer"
        | "Consumer App Offer"
        | "Consumer App Re-Offer"
        | "Consumer Counter Offer"
        | "Shop Counter Offer"
        | "Consumer Web Offer"
        | "Consumer Web Re-Offer"
        | "Shop Offer"
      offerStatus:
        | "Auto Accepted"
        | "Auto Declined"
        | "Pending Review"
        | "Consumer Accepted"
        | "Consumer Declined"
        | "Reviewed Accepted"
        | "Reviewed Countered"
        | "Reviewed Declined"
        | "Accepted Expired"
        | "Counter Accepted Expired"
        | "Countered Withdrawn"
        | "Requires Approval"
        | "Consumer Countered"
        | "Declined Consumer Counter"
        | "Accepted Consumer Counter"
        | "Counter Consumer Accepted"
        | "Counter Consumer Declined"
        | "Consumer Withdrawn"
        | "Re-Offered Cart"
      offerType:
        | "Customer Generated Offer"
        | "Shop Private Offer"
        | "Shop Counter Offer"
        | "Consumer Counter Offer"
      phoneType: "Mobile" | "Home" | "Work" | "Other"
      portfolioName:
        | "New"
        | "Reactivated"
        | "Stable"
        | "Growth"
        | "Declining"
        | "Defected"
      portfolioPeriod: "12 Months" | "6 Months" | "3 Months"
      programFocus:
        | "Acquisition"
        | "Growth"
        | "Reactivation"
        | "Reverse Declining"
        | "Inventory Clearance"
      programStatus:
        | "Draft"
        | "Pending"
        | "Active"
        | "Paused"
        | "Completed"
        | "Archived"
        | "Cancelled"
      relationshipType:
        | "Spouse"
        | "Wife"
        | "Husband"
        | "Partner"
        | "Child"
        | "Niece"
        | "Nephew"
        | "Parent"
        | "Grand Parent"
        | "Father"
        | "Mother"
        | "Step Father"
        | "Step Mother"
        | "Cousin"
        | "Grand Mother"
        | "Grand Father"
        | "Great Grand Father"
        | "Great Grand Mother"
        | "Great Aunt"
        | "Great Uncle"
        | "Family Friend"
        | "Neighbor Friend"
        | "Work Friend"
        | "Step Son"
        | "Step Daughter"
        | "Other"
      sellerDeclineReasons:
        | "Offer Too Low"
        | "Out of Stock"
        | "Service Issue"
        | "Fulfillment Issue"
        | "Other"
      sellerUserRoles:
        | "Account Admin"
        | "Campaign Admin"
        | "Customer Service User"
        | "Customer Service Admin"
      shopRoles:
        | "owner"
        | "admin"
        | "manager"
        | "staff"
        | "viewer"
        | "Shop Associate"
      subscriptionStatus:
        | "Active"
        | "Cancelled"
        | "Ended"
        | "Paused - Seller"
        | "Paused - User"
        | "Pending"
        | "Refunded"
        | "Trial Stage"
      syncJobStatus: "pending" | "running" | "complete" | "error"
      syncJobType:
        | "seed_consumers"
        | "seed_products"
        | "seed_variants"
        | "backfill_orders"
        | "prune_orders"
        | "seed_webhooks"
      watchListSource:
        | "Offered Not Purchased"
        | "Offered And Purchased"
        | "Searched"
        | "Purchased Not Offered"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
      addressType: [
        "Home",
        "Work",
        "Vacation",
        "Other",
        "Restaurant",
        "Park",
        "Event Venue",
        "Sports Arena",
        "School",
        "Church",
      ],
      campaignFocus: [
        "New Collection",
        "New Category",
        "New Products",
        "New Services",
        "Holiday",
        "Event",
      ],
      campaignStatus: [
        "Draft",
        "Pending",
        "Active",
        "Paused",
        "Completed",
        "Archived",
        "Cancelled",
      ],
      cartStatus: [
        "Abandoned",
        "Offered",
        "Checkout",
        "Expired",
        "Closed-Won",
        "Closed-Lost",
        "Archived",
      ],
      commercePlatform: [
        "Shopify",
        "WooCommerce",
        "BigCommerce",
        "Magento",
        "Commerce Cloud",
        "Squarespace",
      ],
      consumerDeclineReasons: [
        "Price Too High",
        "Options Not Available",
        "Just Browsing",
        "Not Ready To Buy",
        "Does Not Meet My Needs",
        "Other",
      ],
      contactEventType: [
        "Birthday",
        "Anniversary",
        "Graduation",
        "Holiday",
        "Other",
      ],
      counterStatus: [
        "Reviewed Countered",
        "Consumer Accepted",
        "Consumer Declined",
        "Consumer Countered",
        "Counter Accepted Expired",
        "Countered Withdrawn",
        "Accepted Consumer Counter",
        "Declined Consumer Counter",
        "Approval Required",
      ],
      counterTypes: [
        "bounceback_current",
        "bounceback_future",
        "bounceback_category",
        "bogo",
        "order_discount_percent",
        "order_discount_firm",
        "item_discount_percent",
        "item_discount_firm",
        "category_discount_percent",
        "category_discount_firm",
        "channel_discount_percent",
        "channel_discount_firm",
        "subscription_discount_percent",
        "subscription_discount_firm",
        "target_bundles",
        "service_products",
        "rewards_program",
        "membership_fee",
        "financing_offers",
        "two_threshold_offers",
        "recommended_product",
      ],
      currencyCode: [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "CAD",
        "AUD",
        "CHF",
        "CNY",
        "HKD",
        "NZD",
        "SEK",
        "KRW",
        "SGD",
        "NOK",
        "MXN",
        "INR",
        "RUB",
        "ZAR",
        "TRY",
        "BRL",
        "TWD",
        "DKK",
        "PLN",
        "THB",
        "IDR",
        "HUF",
        "CZK",
        "ILS",
        "CLP",
        "PHP",
        "AED",
        "COP",
        "SAR",
        "MYR",
        "RON",
      ],
      discountScope: [
        "Cart",
        "Item",
        "Bundle",
        "Shipping",
        "Cart + Shipping",
        "Item + Shipping",
        "Bundle + Shipping",
      ],
      discountStatus: ["Active", "Claimed", "Cancelled", "Expired - Not Used"],
      discountType: ["Order", "Shipping", "Product"],
      emailType: ["Personal", "Work", "Other"],
      goalMetric: [
        "Consumers",
        "Orders",
        "Units",
        "Bundles",
        "Items",
        "Dollars",
        "Percent",
      ],
      goalType: [
        "Gross Margin",
        "Maintained Markup",
        "Average Order Value",
        "New Customers",
        "Reactivate Customers",
        "Increase LTV",
        "Conversion Rate",
        "Category Sell Through",
        "Unit Volume",
        "Transaction Volume",
        "Other",
      ],
      itemChangeType: [
        "Quantity Change",
        "Price Change",
        "Variant Change",
        "Allocation Change",
      ],
      itemStatus: [
        "In Cart",
        "Inactive",
        "Removed",
        "Sold",
        "Returned",
        "Refunded",
        "Cancelled",
        "Shipped",
      ],
      market_adjustment_type: [
        "nearest_99_cents",
        "nearest_nine_dollars_99_cents",
        "nearest_nine_dollars",
        "none",
      ],
      myProductStatus: [
        "offered",
        "checkout",
        "ordered",
        "fulfilled",
        "archived",
      ],
      offerOrigin: [
        "Storefront Offer",
        "Storefront Re-Offer",
        "Consumer App Offer",
        "Consumer App Re-Offer",
        "Consumer Counter Offer",
        "Shop Counter Offer",
        "Consumer Web Offer",
        "Consumer Web Re-Offer",
        "Shop Offer",
      ],
      offerStatus: [
        "Auto Accepted",
        "Auto Declined",
        "Pending Review",
        "Consumer Accepted",
        "Consumer Declined",
        "Reviewed Accepted",
        "Reviewed Countered",
        "Reviewed Declined",
        "Accepted Expired",
        "Counter Accepted Expired",
        "Countered Withdrawn",
        "Requires Approval",
        "Consumer Countered",
        "Declined Consumer Counter",
        "Accepted Consumer Counter",
        "Counter Consumer Accepted",
        "Counter Consumer Declined",
        "Consumer Withdrawn",
        "Re-Offered Cart",
      ],
      offerType: [
        "Customer Generated Offer",
        "Shop Private Offer",
        "Shop Counter Offer",
        "Consumer Counter Offer",
      ],
      phoneType: ["Mobile", "Home", "Work", "Other"],
      portfolioName: [
        "New",
        "Reactivated",
        "Stable",
        "Growth",
        "Declining",
        "Defected",
      ],
      portfolioPeriod: ["12 Months", "6 Months", "3 Months"],
      programFocus: [
        "Acquisition",
        "Growth",
        "Reactivation",
        "Reverse Declining",
        "Inventory Clearance",
      ],
      programStatus: [
        "Draft",
        "Pending",
        "Active",
        "Paused",
        "Completed",
        "Archived",
        "Cancelled",
      ],
      relationshipType: [
        "Spouse",
        "Wife",
        "Husband",
        "Partner",
        "Child",
        "Niece",
        "Nephew",
        "Parent",
        "Grand Parent",
        "Father",
        "Mother",
        "Step Father",
        "Step Mother",
        "Cousin",
        "Grand Mother",
        "Grand Father",
        "Great Grand Father",
        "Great Grand Mother",
        "Great Aunt",
        "Great Uncle",
        "Family Friend",
        "Neighbor Friend",
        "Work Friend",
        "Step Son",
        "Step Daughter",
        "Other",
      ],
      sellerDeclineReasons: [
        "Offer Too Low",
        "Out of Stock",
        "Service Issue",
        "Fulfillment Issue",
        "Other",
      ],
      sellerUserRoles: [
        "Account Admin",
        "Campaign Admin",
        "Customer Service User",
        "Customer Service Admin",
      ],
      shopRoles: [
        "owner",
        "admin",
        "manager",
        "staff",
        "viewer",
        "Shop Associate",
      ],
      subscriptionStatus: [
        "Active",
        "Cancelled",
        "Ended",
        "Paused - Seller",
        "Paused - User",
        "Pending",
        "Refunded",
        "Trial Stage",
      ],
      syncJobStatus: ["pending", "running", "complete", "error"],
      syncJobType: [
        "seed_consumers",
        "seed_products",
        "seed_variants",
        "backfill_orders",
        "prune_orders",
        "seed_webhooks",
      ],
      watchListSource: [
        "Offered Not Purchased",
        "Offered And Purchased",
        "Searched",
        "Purchased Not Offered",
      ],
    },
  },
} as const
