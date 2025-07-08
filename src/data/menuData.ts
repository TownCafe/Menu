import { Cigarette, Coffee, Droplet, Wine } from 'lucide-react';
import { MenuCategory } from '../types';

export const menuData: MenuCategory[] = [
  {
    id: 'shisha',
    title: 'Shisha',
    titleAr: 'الشيشة',
    icon: Cigarette,
    description: 'Premium shisha flavors',
    descriptionAr: 'نكهات شيشة ممتازة',
    items: [
      {
        id: 'shisha',
        name: 'Shisha',
        nameAr: 'شيشة',
        price: 500000,
        description: 'Premium shisha with your choice of flavor',
        descriptionAr: 'شيشة ممتازة مع النكهة التي تختارها',
        image: 'https://images.pexels.com/photos/6249509/pexels-photo-6249509.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'shisha',
        preparationTime: 15,
        isPopular: true,
        tags: ['popular', 'premium']
      }
    ]
  },
  {
    id: 'soft-drinks',
    title: 'Soft Drinks',
    titleAr: 'المشروبات الغازية',
    icon: Droplet,
    description: 'Refreshing beverages',
    descriptionAr: 'مشروبات منعشة',
    items: [
      {
        id: 'pepsi',
        name: 'Pepsi',
        nameAr: 'بيبسي',
        price: 150000,
        description: 'Classic cola drink',
        descriptionAr: 'مشروب كولا كلاسيكي',
        image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'soft-drinks',
        preparationTime: 2,
        tags: ['refreshing']
      },
      {
        id: 'pepsi-diet',
        name: 'Pepsi Diet',
        nameAr: 'بيبسي دايت',
        price: 150000,
        description: 'Sugar-free cola drink',
        descriptionAr: 'مشروب كولا خالي من السكر',
        image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'soft-drinks',
        preparationTime: 2,
        tags: ['diet', 'sugar-free']
      },
      {
        id: 'miranda',
        name: 'Miranda',
        nameAr: 'ميراندا',
        price: 150000,
        description: 'Orange flavored soft drink',
        descriptionAr: 'مشروب غازي بطعم البرتقال',
        image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'soft-drinks',
        preparationTime: 2,
        tags: ['orange', 'citrus']
      },
      {
        id: '7up',
        name: '7UP',
        nameAr: 'سفن أب',
        price: 150000,
        description: 'Lemon-lime flavored soda',
        descriptionAr: 'مشروب غازي بطعم الليمون',
        image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'soft-drinks',
        preparationTime: 2,
        tags: ['lemon', 'lime']
      },
      {
        id: '7up-diet',
        name: '7UP Diet',
        nameAr: 'سفن أب دايت',
        price: 150000,
        description: 'Sugar-free lemon-lime soda',
        descriptionAr: 'مشروب غازي خالي من السكر بطعم الليمون',
        image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'soft-drinks',
        preparationTime: 2,
        tags: ['diet', 'sugar-free', 'lemon']
      },
      {
        id: 'water',
        name: 'Water',
        nameAr: 'مياه',
        price: 50000,
        description: 'Pure drinking water',
        descriptionAr: 'مياه شرب نقية',
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'soft-drinks',
        preparationTime: 1,
        tags: ['healthy', 'pure']
      }
    ]
  },
  {
    id: 'hot-beverages',
    title: 'Hot Beverages',
    titleAr: 'المشروبات الساخنة',
    icon: Coffee,
    description: 'Coffee, tea and hot drinks',
    descriptionAr: 'قهوة وشاي ومشروبات ساخنة',
    items: [
      {
        id: 'coffee',
        name: 'Coffee',
        nameAr: 'قهوة',
        price: 100000,
        description: 'Fresh brewed coffee',
        descriptionAr: 'قهوة طازجة محضرة',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'hot-beverages',
        preparationTime: 5,
        isPopular: true,
        tags: ['hot', 'popular']
      },
      {
        id: 'nescafe',
        name: 'Nescafe',
        nameAr: 'نسكافه',
        price: 100000,
        description: 'Instant coffee',
        descriptionAr: 'قهوة سريعة التحضير',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'hot-beverages',
        preparationTime: 3,
        tags: ['instant', 'quick']
      },
      {
        id: 'tea',
        name: 'Tea',
        nameAr: 'شاي',
        price: 100000,
        description: 'Traditional black tea',
        descriptionAr: 'شاي أسود تقليدي',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'hot-beverages',
        preparationTime: 5,
        tags: ['traditional', 'hot']
      }
    ]
  },
  {
    id: 'cold-beverages',
    title: 'Cold Beverages',
    titleAr: 'المشروبات الباردة',
    icon: Wine,
    description: 'Iced drinks and cold beverages',
    descriptionAr: 'مشروبات مثلجة وباردة',
    items: [
      {
        id: 'ice-tea',
        name: 'Ice Tea',
        nameAr: 'شاي مثلج',
        price: 150000,
        description: 'Refreshing iced tea',
        descriptionAr: 'شاي مثلج منعش',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'cold-beverages',
        preparationTime: 5,
        tags: ['iced', 'refreshing']
      },
      {
        id: 'ice-coffee',
        name: 'Ice Coffee',
        nameAr: 'قهوة مثلجة',
        price: 150000,
        description: 'Cold brewed iced coffee',
        descriptionAr: 'قهوة مثلجة باردة',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'cold-beverages',
        preparationTime: 5,
        tags: ['iced', 'coffee']
      }
    ]
  },
  {
    id: 'premium-drinks',
    title: 'Premium Drinks',
    titleAr: 'المشروبات المميزة',
    icon: Wine,
    description: 'Special and premium beverages',
    descriptionAr: 'مشروبات خاصة ومميزة',
    items: [
      {
        id: 'xxl',
        name: 'XXL',
        nameAr: 'اكس اكس ال',
        price: 150000,
        description: 'Premium energy drink',
        descriptionAr: 'مشروب طاقة مميز',
        image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 2,
        tags: ['energy', 'premium']
      },
      {
        id: 'almaza',
        name: 'Almaza',
        nameAr: 'الماظة',
        price: 200000,
        description: 'Premium Lebanese beer',
        descriptionAr: 'بيرة لبنانية مميزة',
        image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 2,
        tags: ['beer', 'lebanese', 'premium']
      },
      {
        id: 'almaza-light',
        name: 'Almaza Light',
        nameAr: 'الماظة لايت',
        price: 200000,
        description: 'Light Lebanese beer',
        descriptionAr: 'بيرة لبنانية خفيفة',
        image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 2,
        tags: ['beer', 'light', 'lebanese']
      },
      {
        id: 'maccaw',
        name: 'Maccaw',
        nameAr: 'ماكاو',
        price: 100000,
        description: 'Tropical fruit drink',
        descriptionAr: 'مشروب فواكه استوائية',
        image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 3,
        tags: ['tropical', 'fruit']
      },
      {
        id: 'extra-ras',
        name: 'Extra Ras',
        nameAr: 'اكسترا راس',
        price: 150000,
        description: 'Special local beverage',
        descriptionAr: 'مشروب محلي خاص',
        image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 3,
        tags: ['local', 'special']
      },
      {
        id: 'rakwe-ahwe',
        name: 'Rakwe Ahwe',
        nameAr: 'ركوة قهوة',
        price: 300000,
        description: 'Traditional Arabic coffee service',
        descriptionAr: 'خدمة قهوة عربية تقليدية',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 10,
        isChefRecommended: true,
        tags: ['traditional', 'arabic', 'premium']
      },
      {
        id: 'termos',
        name: 'Termos',
        nameAr: 'ترموس',
        price: 100000,
        description: 'Thermos hot beverage',
        descriptionAr: 'مشروب ساخن في ترموس',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 5,
        tags: ['hot', 'thermos']
      },
      {
        id: 'jazar',
        name: 'Jazar',
        nameAr: 'جزر',
        price: 100000,
        description: 'Fresh carrot juice',
        descriptionAr: 'عصير جزر طازج',
        image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'premium-drinks',
        preparationTime: 5,
        tags: ['fresh', 'healthy', 'juice']
      }
    ]
  },
  {
    id: 'snacks',
    title: 'Snacks',
    titleAr: 'الوجبات الخفيفة',
    icon: Coffee,
    description: 'Light snacks and treats',
    descriptionAr: 'وجبات خفيفة ومعاملات',
    items: [
      {
        id: 'nuts',
        name: 'Nuts',
        nameAr: 'مكسرات',
        price: 100000,
        description: 'Mixed nuts assortment',
        descriptionAr: 'تشكيلة مكسرات مختلطة',
        image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'snacks',
        preparationTime: 1,
        tags: ['healthy', 'crunchy']
      }
    ]
  }
];