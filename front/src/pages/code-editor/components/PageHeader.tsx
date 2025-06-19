import { Home } from 'lucide-react';

const PageHeader = () => {
    return (
      <div className="landing-layout col-span-12 p-4 mt-5 mx-2 md:mx-5 font-mono text-base md:text-lg">
        <nav className="text-gray-400" aria-label="Breadcrumb">
          <ol className="list-reset flex flex-wrap">
            <li>
              <a href="/" className="flex items-center text-gray-400 hover:text-gray-700 transition-colors">
                <Home className="w-5 h-5 mr-1" />
                <span className="mx-2">{'>'}</span>
              </a>
            </li>
            <li>
              <span className="text-gray-400">Activités</span>
              <span className="mx-2">{'>'}</span>
            </li>
            <li>
              <span className="text-gray-400">Ado</span>
              <span className="mx-2">{'>'}</span>
            </li>
            <li className="text-gray-900 font-semibold">Programme robotique</li>
          </ol>
        </nav>
      </div>
    )
}
  
export default PageHeader;