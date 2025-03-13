import { useTranslations } from 'next-intl';
import { Frame, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('navigation');

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Frame className="h-6 w-6" />
              <span>CHAWK</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Modern e-commerce platform with the latest fashion trends for men and women.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('men')}
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('women')}
                </Link>
              </li>
              <li>
                <Link href="/shops" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('shops')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter to get updates on our latest offers!
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                required
              />
              <button
                type="submit"
                className="rounded-r-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Chawkbazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
