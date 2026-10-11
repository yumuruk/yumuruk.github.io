import profileImg from '../assets/yhs.jpg'

const VelogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[0.85em] h-[0.85em] translate-y-[2px]"
  >
    <path d="M0 3C0 1.343 1.343 0 3 0h18c1.657 0 3 1.343 3 3v18c0 1.657-1.343 3-3 3H3c-1.657 0-3-1.343-3-3V3zm10.5 16h3L17.7 8h-2.4l-3.6 8.3L8.4 8H6l4.5 11z" />
  </svg>
)

const socialLink =
  'text-slate-500 hover:text-emerald-800 text-3xl transition-transform hover:scale-110'

export default function Home() {
  return (
    <section
      id="home"
      className="scroll-mt-20 w-full min-h-[calc(100vh-4rem)] px-4 flex items-start justify-center pt-20 sm:pt-32 pb-16"
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

          <div className="flex justify-center items-center space-x-6">
            <a
              href="https://github.com/yumuruk"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={socialLink}
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/%ED%95%9C%EC%84%B1-%EC%9C%A0-617055317/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={socialLink}
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://velog.io/@yumuruk/posts"
              target="_blank"
              rel="noreferrer"
              aria-label="velog"
              className="text-slate-500 hover:text-[#20c997] text-3xl transition-transform hover:scale-110 flex items-center"
            >
              <VelogIcon />
            </a>
            <a href="mailto:chiccc98@gmail.com" aria-label="Email" className={socialLink}>
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
