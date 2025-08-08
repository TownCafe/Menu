# Town Café Menu Images Guide

This directory contains all the images for the Town Café menu items. The images are automatically assigned using the `getImageForItem()` function.

## Image Organization

### Expected Image Files:

#### Soft Drinks
- `pepsi-can.jpg` - Pepsi cola can
- `pepsi-diet-can.jpg` - Pepsi Diet cola can
- `miranda-orange.jpg` - Miranda orange drink
- `7up-can.jpg` - 7UP lemon-lime soda can
- `7up-diet-can.jpg` - 7UP Diet can
- `water-bottle.jpg` - Pure water bottle

#### Hot Beverages
- `hot-coffee-cup.jpg` - Fresh brewed coffee in cup
- `nescafe-instant.jpg` - Nescafe instant coffee
- `black-tea-cup.jpg` - Traditional black tea in cup

#### Cold Beverages
- `iced-tea-glass.jpg` - Iced tea in glass with ice
- `iced-coffee-glass.jpg` - Iced coffee in glass with ice

#### Premium Drinks
- `xxl-energy-drink.jpg` - XXL energy drink can/bottle
- `almaza-beer-bottle.jpg` - Almaza Lebanese beer bottle
- `almaza-light-beer.jpg` - Almaza Light beer bottle
- `maccaw-tropical-drink.jpg` - Maccaw tropical fruit drink
- `extra-ras-beverage.jpg` - Extra Ras local beverage
- `arabic-coffee-set.jpg` - Traditional Arabic coffee set (Rakwe Ahwe)
- `thermos-hot-drink.jpg` - Hot beverage in thermos
- `carrot-juice-glass.jpg` - Fresh carrot juice in glass

#### Shisha
- `premium-shisha-setup.jpg` - Premium shisha hookah setup

#### Snacks
- `mixed-nuts-bowl.jpg` - Mixed nuts in bowl

### Fallback Images
- `soft-drink-generic.jpg` - Generic soft drink
- `hot-beverage-generic.jpg` - Generic hot beverage
- `cold-beverage-generic.jpg` - Generic cold beverage
- `premium-drink-generic.jpg` - Generic premium drink
- `shisha-generic.jpg` - Generic shisha
- `snacks-generic.jpg` - Generic snacks
- `menu-item-placeholder.jpg` - Ultimate fallback for any item

## Image Requirements

- **Format**: JPG or PNG preferred
- **Size**: Recommended 400x400px minimum, square aspect ratio
- **Quality**: High-quality, professional food/beverage photography
- **Style**: Clean, well-lit product shots with consistent lighting
- **Background**: White or neutral background preferred

## Adding New Items

When adding new menu items:

1. Add the image file to this directory using the naming convention: `{item-name}.jpg`
2. Update the `imageDatabase` in `/src/utils/imageAssignment.ts`
3. Use lowercase and dashes instead of spaces in filenames

Example:
- Item: "Fresh Orange Juice" → Image: `fresh-orange-juice.jpg`

## Usage

The image assignment system automatically:
- Matches items by ID first
- Falls back to normalized name matching
- Uses category fallbacks if no specific image found
- Provides ultimate fallback for any unmatched items

## Image Sources

For high-quality product images, consider:
- Unsplash.com (free, high-quality)
- Pexels.com (free stock photos)
- Professional product photography
- Brand official images (with permission)

Make sure all images are properly licensed for commercial use.
