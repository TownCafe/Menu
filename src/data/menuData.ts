import { Cigarette, Coffee, Droplet, Wine } from 'lucide-react';
import { MenuCategory } from '../types';
import { getImageForItem } from '../utils/imageAssignment';

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
        image: getImageForItem('shisha', 'Shisha', 'shisha'),
        category: 'shisha',
        preparationTime: 15,
        isPopular: true,
        tags: ['popular', 'premium']
      },
      {
        id: 'extra-ras',
        name: 'Extra Ras',
        nameAr: 'اكسترا راس',
        price: 150000,
        description: 'Special local beverage',
        descriptionAr: 'مشروب محلي خاص',
        image: getImageForItem('extra-ras', 'Extra Ras', 'shisha'),
        category: 'shisha',
        preparationTime: 3,
        tags: ['local', 'special']
      },
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
        image: getImageForItem('pepsi', 'Pepsi', 'soft-drinks'),
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
        image: getImageForItem('pepsi-diet', 'Pepsi Diet', 'soft-drinks'),
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
        image: getImageForItem('miranda', 'Miranda', 'soft-drinks'),
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
        image: getImageForItem('7up', '7UP', 'soft-drinks'),
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
        image: getImageForItem('7up-diet', '7UP Diet', 'soft-drinks'),
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
        image: getImageForItem('water', 'Water', 'soft-drinks'),
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
        image: getImageForItem('coffee', 'Coffee', 'hot-beverages'),
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
        image: getImageForItem('nescafe', 'Nescafe', 'hot-beverages'),
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
        image: getImageForItem('tea', 'Tea', 'hot-beverages'),
        category: 'hot-beverages',
        preparationTime: 5,
        tags: ['traditional', 'hot']
      },
      {
        id: 'rakwe-ahwe',
        name: 'Rakwe Ahwe',
        nameAr: 'ركوة قهوة',
        price: 300000,
        description: 'Traditional Arabic coffee service',
        descriptionAr: 'خدمة قهوة عربية تقليدية',
        image: getImageForItem('rakwe-ahwe', 'Rakwe Ahwe', 'hot-beverages'),
        category: 'hot-beverages',
        preparationTime: 10,
        isChefRecommended: true,
        tags: ['traditional', 'arabic', 'premium']
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
        image: getImageForItem('ice-tea', 'Ice Tea', 'cold-beverages'),
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
        image: getImageForItem('ice-coffee', 'Ice Coffee', 'cold-beverages'),
        category: 'cold-beverages',
        preparationTime: 5,
        tags: ['iced', 'coffee']
      },{
        id: 'xxl',
        name: 'XXL',
        nameAr: 'اكس اكس ال',
        price: 150000,
        description: 'Premium energy drink',
        descriptionAr: 'مشروب طاقة مميز',
        image: getImageForItem('xxl', 'XXL', 'cold-beverages'),
        category: 'cold-beverages',
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
        image: getImageForItem('almaza', 'Almaza', 'cold-beverages'),
        category: 'cold-beverages',
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
        image: getImageForItem('almaza-light', 'Almaza Light', 'cold-beverages'),
        category: 'cold-beverages',
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
        image: getImageForItem('maccaw', 'Maccaw', 'cold-beverages'),
        category: 'cold-beverages',
        preparationTime: 3,
        tags: ['tropical', 'fruit']
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
        image: getImageForItem('nuts', 'Nuts', 'snacks'),
        category: 'snacks',
        preparationTime: 1,
        tags: ['healthy', 'crunchy']
      },
      {
        id: 'termos',
        name: 'Termos',
        nameAr: 'ترموس',
        price: 100000,
        description: 'Thermos hot beverage',
        descriptionAr: 'مشروب ساخن في ترموس',
        image: getImageForItem('termos', 'Termos', 'snacks'),
        category: 'snacks',
        preparationTime: 5,
        tags: ['hot', 'thermos']
      },
      {
        id: 'jazar',
        name: 'Carrots',
        nameAr: 'جزر',
        price: 100000,
        description: 'Fresh carrot juice',
        descriptionAr: 'عصير جزر طازج',
        image: getImageForItem('jazar', 'Jazar', 'snacks'),
        category: 'snacks',
        preparationTime: 5,
        tags: ['fresh', 'healthy', 'juice']
      }
    ]
  }
];