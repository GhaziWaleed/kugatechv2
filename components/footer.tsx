import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-md py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-[#30BAAF]">Kuga</span>Tech
            </h2>
            <p className="text-gray-300 mt-2">Keen | Unified | Global | Agile</p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">

            <a href="https://pk.linkedin.com/company/kuga-tech?trk=public_post_feed-actor-name" className="text-gray-300 hover:text-[#30BAAF] transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/kuga_technologies/?theme=dark" className="text-gray-300 hover:text-[#30BAAF] transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>

          <div className="text-gray-300">
            <p>&copy; {new Date().getFullYear()} KugaTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
