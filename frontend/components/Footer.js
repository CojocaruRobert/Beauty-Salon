import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Katy Regal Beauty Salon</h3>
            <p className="text-gray-300">
              Providing premium beauty services in a luxurious environment. Make yourself feel beautiful inside and out.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p>123 Beauty Street</p>
              <p>New York, NY 10001</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@katyregal.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© {currentYear} Katy Regal Beauty Salon. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-primary">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.231.585 1.794 1.148.563.563.898 1.126 1.148 1.794.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427-.25.668-.585 1.231-1.148 1.794-.563.563-1.126.898-1.794 1.148-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465-.668-.25-1.231-.585-1.794-1.148-.563-.563-.898-1.126-1.148-1.794-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.231 1.148-1.794.563-.563 1.126-.898 1.794-1.148.636-.247 1.363-.416 2.427-.465C9.16 2.013 9.516 2 12 2h.315zm-.075 1.802h-.24c-2.597 0-2.943.011-3.973.058-.958.044-1.49.196-1.835.33-.458.177-.789.377-1.136.721-.347.346-.549.677-.724 1.134-.133.346-.287.875-.33 1.834-.047 1.03-.058 1.376-.058 3.973v.24c0 2.598.011 2.944.058 3.974.044.959.196 1.49.33 1.835.177.458.377.789.721 1.136.346.347.677.549 1.134.724.346.133.875.287 1.834.33 1.03.047 1.376.058 3.973.058h.24c2.598 0 2.944-.011 3.974-.058.959-.044 1.49-.196 1.835-.33.458-.177.789-.377 1.136-.721.347-.346.549-.677.724-1.134.133-.346.287-.875.33-1.834.047-1.03.058-1.376.058-3.973v-.24c0-2.598-.011-2.944-.058-3.974-.044-.959-.196-1.49-.33-1.835-.177-.458-.377-.789-.721-1.136-.346-.347-.677-.549-1.134-.724-.346-.133-.875-.287-1.834-.33-1.03-.047-1.376-.058-3.973-.058zm0 3.848a4.35 4.35 0 110 8.701 4.35 4.35 0 010-8.701zm0 7.182a2.833 2.833 0 100-5.666 2.833 2.833 0 000 5.666zm4.965-8.41a1.07 1.07 0 01-2.14 0 1.07 1.07 0 012.14 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 