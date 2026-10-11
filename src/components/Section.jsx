/**
 * 페이지 안의 한 구획. id가 곧 상단 네비게이션의 앵커다.
 * scroll-mt-20은 sticky 헤더(h-16) 아래로 제목이 숨지 않게 하는 여백.
 */
export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-20 w-full ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <header className="py-8 sm:py-12">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900">{title}</h2>
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
