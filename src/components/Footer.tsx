import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">LookupID</h3>
            <p className="text-gray-500 text-sm">
              Professional Discord user lookup tool.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by nekolas</span>
          </div>

          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LookupID. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
