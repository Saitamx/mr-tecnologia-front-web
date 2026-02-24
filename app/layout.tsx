import type { Metadata } from "next";
import "./globals.css";
import { HydrationFix } from "@/components/HydrationFix";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "MR Tecnología - Accesorios Tecnológicos",
  description: "Tienda física de accesorios tecnológicos. Carcasas personalizadas, productos JBL, Samsung y más. Encuéntranos en Versluys SPP.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                'use strict';
                function removeBisAttributes() {
                  try {
                    if (typeof document !== 'undefined' && document.getElementsByTagName) {
                      var allElements = document.getElementsByTagName('*');
                      for (var i = 0; i < allElements.length; i++) {
                        if (allElements[i].hasAttribute && allElements[i].hasAttribute('bis_skin_checked')) {
                          allElements[i].removeAttribute('bis_skin_checked');
                        }
                      }
                    }
                  } catch (e) {}
                }
                
                if (typeof document !== 'undefined') {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', removeBisAttributes, { once: true });
                  } else {
                    removeBisAttributes();
                  }
                  
                  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
                    var observer = new MutationObserver(function(mutations) {
                      mutations.forEach(function(mutation) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                          mutation.target.removeAttribute('bis_skin_checked');
                        }
                        mutation.addedNodes.forEach(function(node) {
                          if (node.nodeType === 1 && node.hasAttribute) {
                            if (node.hasAttribute('bis_skin_checked')) {
                              node.removeAttribute('bis_skin_checked');
                            }
                            try {
                              var children = node.querySelectorAll('[bis_skin_checked]');
                              for (var j = 0; j < children.length; j++) {
                                children[j].removeAttribute('bis_skin_checked');
                              }
                            } catch (e) {}
                          }
                        });
                      });
                    });
                    
                    observer.observe(document.documentElement, {
                      attributes: true,
                      attributeFilter: ['bis_skin_checked'],
                      childList: true,
                      subtree: true
                    });
                  }
                  
                  setInterval(removeBisAttributes, 10);
                }
              })();
            `,
          }}
        />
        <HydrationFix />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
