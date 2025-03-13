'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Frame, Menu, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { LanguageSwitcher } from '@/components/lang-switcher';
import Link from 'next/link';

export function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null | undefined>(null);
  const navItems = [
    {
      href: '/',
      label: t('home'),
    },
    {
      href: '/men',
      label: t('men'),
      subItems: [
        {
          title: 'Top Wear',
          items: [
            { href: '/men/t-shirts', label: 'T-Shirt' },
            { href: '/men/casual-shirts', label: 'Casual Shirts' },
            { href: '/men/formal-shirts', label: 'Formal Shirts' },
          ],
        },
        {
          title: 'Winter Collect',
          items: [
            { href: '/men/blazers-coats', label: 'Blazers & Coats' },
            { href: '/men/suits', label: 'Suits' },
            { href: '/men/jackets', label: 'Jackets' },
          ],
        },
        {
          title: 'Summer Collect',
          items: [{ href: '/men/wedding-collect', label: 'Wedding Collect' }],
        },
        {
          title: 'Trending Collect',
          items: [
            { href: '/men/belts-scarves', label: 'Belts, Scarves & More' },
            { href: '/men/watches-wearables', label: 'Watches & Wearables' },
          ],
        },
        {
          title: 'Gift Collector',
          items: [],
        },
      ],
      image: '/path/to/men-image.jpg', // Replace with actual image path
    },
    {
      href: '/women',
      label: t('women'),
      subItems: [
        {
          title: 'Western Wear',
          items: [
            { href: '/women/dresses', label: 'Dresses' },
            { href: '/women/jumpsuits', label: 'Jumpsuits' },
            { href: '/women/tops-shirts', label: 'Tops, T-Shirts & Shirts' },
            { href: '/women/shorts-skirts', label: 'Shorts & Skirts' },
            { href: '/women/shrugs', label: 'Shrugs' },
            { href: '/women/blazers', label: 'Blazers' },
          ],
        },
        {
          title: 'Plus Size',
          items: [{ href: '/women/plus-size', label: 'Plus Size' }],
        },
        {
          title: 'Sunglasses & Frames',
          items: [{ href: '/women/sunglasses', label: 'Sunglasses & Frames' }],
        },
      ],
      image: '/path/to/women-image.jpg', // Replace with actual image path
    },
    { href: '/search', label: t('search') },
    {
      href: '/shops',
      label: t('shops'),
      subItems: [
        {
          title: 'Footwear',
          items: [
            { href: '/shops/flats', label: 'Flats' },
            { href: '/shops/casual-shoes', label: 'Casual Shoes' },
            { href: '/shops/heels', label: 'Heels' },
            { href: '/shops/boots', label: 'Boots' },
          ],
        },
        {
          title: 'Sports & Active Wear',
          items: [
            { href: '/shops/sports-clothing', label: 'Clothing' },
            { href: '/shops/sports-footwear', label: 'Footwear' },
            { href: '/shops/sports-accessories', label: 'Sports Accessories' },
          ],
        },
      ],
    },
    {
      href: '/pages',
      label: 'Pages',
      subItems: [
        {
          title: 'Lingerie & Sleepwear',
          items: [
            { href: '/pages/bra', label: 'Bra' },
            { href: '/pages/briefs', label: 'Briefs' },
            { href: '/pages/sleepwear', label: 'Sleepwear' },
          ],
        },
        {
          title: 'Belts, Scarves & More',
          items: [{ href: '/pages/belts-scarves', label: 'Belts, Scarves & More' }],
        },
        {
          title: 'Makeup',
          items: [
            { href: '/pages/skincare', label: 'Skincare' },
            { href: '/pages/premium-beauty', label: 'Premium Beauty' },
            { href: '/pages/lipsticks', label: 'Lipsticks' },
          ],
        },
      ],
    },
    {
      href: '/gadgets',
      label: 'Gadgets',
      subItems: [
        {
          title: 'Gadgets',
          items: [
            { href: '/gadgets/smart-wearables', label: 'Smart Wearables' },
            { href: '/gadgets/headphones', label: 'Headphones' },
          ],
        },
        {
          title: 'Jewellers',
          items: [
            { href: '/gadgets/fashion-jewellery', label: 'Fashion Jewellery' },
            { href: '/gadgets/fine-jewellers', label: 'Fine Jewellers' },
          ],
        },
        {
          title: 'Backpacks',
          items: [
            { href: '/gadgets/backpacks', label: 'Backpacks' },
            { href: '/gadgets/handbags-wallets', label: 'Handbags & Wallets' },
          ],
        },
      ],
      image: '/path/to/gadgets-image.jpg', // Replace with actual image path
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-center px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-6">
          <Frame className="h-6 w-6" />
          <span className="hidden sm:inline-block">CHAWK</span>
        </Link>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {navItems.map((item) => {
              return (
                <NavigationMenuItem key={item.href}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger
                        onMouseEnter={() => {
                          console.log(item);
                          setOpenMenu(item.href);
                        }}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent data-state={openMenu === item.href ? 'open' : 'closed'}>
                        <div className="w-[800px] p-4 grid grid-cols-[1fr_1fr_1fr_1fr_200px] gap-4">
                          {item.subItems?.map((category, index) => (
                            <div key={index} className="space-y-2">
                              {category.title && <h4 className="text-sm font-medium">{category.title}</h4>}
                              <ul className="space-y-1">
                                {category.items.map((subItem) => (
                                  <li key={subItem.href}>
                                    <NavigationMenuLink asChild>
                                      <Link href={subItem.href} className={navigationMenuTriggerStyle()}>
                                        {subItem.label}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={`${navigationMenuTriggerStyle()} ${pathname === item.href ? 'font-bold' : ''}`}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 text-lg">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? 'font-bold' : 'text-muted-foreground'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 text-base">
                      {item.subItems.map((category) =>
                        category.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        )),
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center ml-auto gap-2">
          <LanguageSwitcher />

          <Button variant="ghost" size="icon" className="ml-1">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button variant="ghost" size="icon" className="ml-1 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              2
            </span>
            <span className="sr-only">Shopping cart</span>
          </Button>

          <Button variant="outline" size="sm" className="ml-4 hidden sm:flex">
            {t('signIn')}
          </Button>
        </div>
      </div>
    </header>
  );
}
