import profileImg from '../assets/yhs.jpg'
import SocialLinks from '../components/SocialLinks.jsx'

export default function Home() {
  return (
    <section
      id="home"
      className="lg:hidden scroll-mt-20 w-full min-h-[calc(100vh-4rem)] px-4 flex items-start justify-center pt-20 sm:pt-32 pb-16"
    >
      <div className="max-w-2xl w-full">
        <div className="text-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-slate-200 mb-6 overflow-hidden shadow-lg border-4 border-white">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover object-[center_20%]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Hello, I'm <span className="text-emerald-600">YuHansung</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
            I am a student interested in Computer Vision/Deep learning
            <br className="hidden sm:block" />
          </p>

          <SocialLinks className="justify-center space-x-6" linkClassName="text-3xl transition-transform hover:scale-110" />
        </div>
      </div>
    </section>
  )
}
