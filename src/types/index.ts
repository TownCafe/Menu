import React from 'react';

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  description?: string;
  descriptionAr?: string;
  image: string;
  category: string;
  preparationTime?: number;
  calories?: number;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  isNutFree?: boolean;
  isPopular?: boolean;
  isChefRecommended?: boolean;
  allergens?: string[];
  ingredients?: string[];
  ingredientsAr?: string[];
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags?: string[];
  customizations?: {
    spiceLevel?: boolean;
    size?: string[];
    extras?: string[];
  };
}

export interface CustomerCustomizations {
  spiceLevel?: string;
  size?: string;
  extras?: string[];
  notes?: string;
}

export interface CartItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  description?: string;
  descriptionAr?: string;
  image: string;
  category: string;
  quantity: number;
  customizations?: CustomerCustomizations;
}

export interface MenuCategory {
  id: string;
  title: string;
  titleAr: string;
  icon: React.ComponentType<{ className?: string; size?: number; }>;
  items: MenuItem[];
  description?: string;
  descriptionAr?: string;
}